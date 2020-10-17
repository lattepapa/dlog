---
title: "[JS] this, apply, call 그리고 bind"
category: javascript
path: /javascript/mil10
date: 2020-09-02 23:00:09
---

### Arrow Function(화살표함수)

'function' 키워드를 화살표로 축약할 수 있다. 이때 return과 중괄호(curly brackets)도 생략한다. 이러한 화살표함수는 클로저(Closure)를 사용할 때 매우 유리하다.

```jsx
// 함수표현식에 의한 클로저 구현
const adder = function (x) {
  return function (y) {
    return x + y;
  };
};

adder(5)(7); // 12
```

```jsx
// 화살표함수에 의한 클로저 구현
const adder = (x) => (y) => x + y;

adder(5)(7); // 12
```

<br>

단, 화살표함수는 **.apply(), .call(), .bind() 메소드에 사용할 수 없다**. 왜냐하면 이러한 .apply, .call, .bind 메소드는 this에 **부모객체를 바인딩할 것을 전제**하는데 화살표함수는 애초에 **this**에 무엇이 바인딩 되었는지 결정짓지 않기 때문이다.

### this

#### this Object argument

함수 실행 시, 그 **맥락**(context, 즉, this가 무엇을 가리키는지)을 어떻게 호출(invocation)하는가에 따라 **this에 바인딩될 객체**가 결정된다.  
[1] **Global**에서 this를 호출 : 브라우저라면 window가 바인딩되고, node.js라면 module.exports가 바인딩  
[2] **함수**에서 this를 호출 : 브라우저라면 window, node.js라면 global이 바인딩  
[3] **메소드**에서 this를 호출 : 메소드의 대상인 부모객체가 this에 바인딩  
[4] **new 키워드**에서 this를 호출 : 클래스의 인스턴스 객체가 this에 바인딩  
[5] **.call(this, args1, ...), .apply(this, args1, ...)**에서 this를 호출 : 첫번째 argument로 전달된 객체가 this에 바인딩

#### 메소드에서 this 호출 상세

```jsx{numberLines: true}
// 객체가 싱글톤(Singleton) 패턴인 경우
let counter1 = {
  value: 0,
  increase: function () {
    this.value++;
  },
  decrease: function () {
    this.value--;
  },
  getValue: function () {
    return this.value;
  },
};

counter1.increase(); // 1
counter1.increase(); // 2
counter1.decrease(); // 1
counter1.getValue(); // 1
```

```jsx{numberLines: true}
// 객체가 클로저(Closure) 패턴인 경우
function makeCounter() {
  return {
    value: 0,
    increase: function () {
      this.value++;
    },
    decrease: function () {
      this.value--;
    },
    getValue: function () {
      return this.value;
    },
  };
}

let counter1 = makeCounter();
counter1.increase(); // 1
counter1.increase(); // 2
counter1.getValue(); // 2

let counter2 = makeCounter();
counter2.increase(); // 1
counter2.decrease(); // 0
counter2.getValue(); // 0
```

<br>

#### new 키워드에서 this 호출 상세

```jsx{numberLines: true}
class Counter {
  // highlight-start
  constructor() {
    this.value = 0;
  }
  // highlight-end
  increase() {
    this.value++;
  }
  decrease() {
    this.value--;
  }
  getValue() {
    return this.value;
  }
}

let counter1 = new Counter();
counter1.increase(); // 1
counter1.increase(); // 2
counter1.decrease(); // 1
counter1.getValue(); // 1
```

<br>
<br>
<br>

### .call(), .apply(), 그리고 .bind()

#### .call(), .apply()와 .bind()의 공통점

this에 argument를 **명시적**으로 지정하고 싶을 때 사용

#### .call(), .apply()와 .bind()의 차이점

**.call()**과 **.apply()**는 바로 바인딩된 함수를 실행시켜서 그 리턴값을 출력하는 것에 반해, **.bind()**는 바인딩된 함수를 당장 실행하지 않고 일단 그 함수 자체만 리턴한다. 이는 앞서 살펴본 **이벤트 바인딩** 그 자체를 의미한다. 예를들어 onclick 이벤트의 객체로써 어떤 함수를 **.bind()** 메소드로 바인딩하여, 클릭 이벤트가 발생했을 때만 콜백함수를 실행하게 된다.

#### .call()과 .apply()를 사용해야 하는 예시

```jsx{numberLines: true}
// Prototype 상속이 필요한 상황1("concat하겠다, array1과 array2를")
const array1 = ["united", "states"];
const array2 = ["president"];

Array.prototype.concat.call(array1, array2); // [ 'united', 'states', 'president' ]
Array.prototype.concat.apply(array1, [array2]); // [ 'united', 'states', 'president' ]

// Prototype 상속이 필요한 상황2
"".split.call("피,땀,사나이한목숨", ","); // [ '피', '땀', '사나이한목숨' ]
"피,땀,사나이한목숨".split(","); // [ '피', '땀', '사나이한목숨' ]
```

```jsx{numberLines: true}
// 유사배열 상황1
let divs = document.querySelectorAll("div");

[].map.call(divs, function (el) {
  return el.textContent.includes("BTS");
}); // 'BTS'가 포함된 모든 div element(기사가 document.body라고 가정)를 불러오기

// 유사배열 상황2
const nodeList = {
  length: 3,
  0: "div#target",
  1: "li",
  2: "span#new",
};

nodeList.length; // 3
nodeList[0]; // 'div#target'
nodeList[1]; // 'li'
nodeList[2]; // 'span#new'

Array.prototype.slice.apply(nodeList, [0, 1]); // [ 'div#target' ]
Array.prototype.slice.call(nodeList, 0, 1); // [ 'div#target' ]
```

```jsx{numberLines: true}
// 객체지향프로그래밍 상황
// highlight-start
function Product(name, price) {
  this.name = name;
  this.price = price;
}
// highlight-end

function FoodProduct(name, price) {
  Product.call(this, name, price); // 이때의 this는 바로 위의 Product를 의미
  this.category = "food";
}

let cheese = new FoodProduct("ricotta", 5000);

cheese; // Food{ name: 'ricotta', price: 5000, category: 'food' }
```

#### .bind()를 사용해야 하는 예시

```jsx{numberLines: true}
// eventHandler 상황
<div id="target">클릭하십쇼</div>;

let target = document.querySelector("#target");
let users = ["김코딩", "박해커", "최초보"];

users.forEach(function (user) {
  let btn = document.createElement("button");
  btn.textContent = user;
  btn.onclick = handleClick.bind(user);
  target.appendChild(btn);
});
// 만약 btn.onclick = handleClick.bind(null, user)로 쓸경우
// function handleClick(user) { console.log(user) };

function handleClick() {
  console.log(this);
}
```

```jsx{numberLines: true}
// setTimeout 상황
class Rectangle {
  // highlight-start
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  // highlight-end

  getArea() {
    return this.width * this.height;
  }

  printArea() {
    console.log("사각형의 넓이는 " + this.getArea() + " 입니다");
  }

  printSync() {
    // 즉시 사각형의 넓이를 콘솔에 표시합니다
    this.printArea();
  }

  printAsync() {
    // 1초 후 사각형의 넓이를 콘솔에 표시합니다
    setTimeout(this.printArea.bind(this), 2000);
  }
}

let box = new Rectangle(40, 20);
box.printSync(); // '사각형의 넓이는 800 입니다'
box.printAsync(); // 에러 발생!
```

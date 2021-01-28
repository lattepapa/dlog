---
title: "화살표함수"
category: javascript
path: /javascript/mil26
date: 2021-01-28 20:22:34
---

기존의 function 키워드 대신 화살표(=>)를 사용하여 간단히 함수 선언문을 표현한 것을 말한다. 화살표함수는 **익명함수**로만 호출되기 때문에 함수 표현식으로만 구현되며, 다음과 같은 특성을 갖는다.

### 화살표함수의 특징

#### 바인딩되지 않는 this

원래 **this**는 그것의 **실행 컨텍스트**에 따라  
1\) 전역범위에서 사용될때 : 전역객체  
2\) 함수에서 사용될때 : 전역객체  
3\) 객체에 속한 메서스에서 사용될때 : 그 메서드의 객체  
4\) 객체에 속한 메서드의 내부함수에서 사용될때 : 전역객체  
5\) 생성자에서 사용될때 : 생성자로 인해 생성된 새로운 객체

를 각각 가르키게(=바인딩) 된다. 그러나 화살표함수 환경에서는 this는 화살표함수를 둘러싼 환경(= **lexical scope** = 즉, 상위 scope)으로부터 this를 유추하여 그것이 가리키는 값을 파악한다. 다시 말하면, 현재 화살표함수 범위에서 존재하지 않는 this를 찾을 때, 화살표 함수는 바로 바깥 범위에서 this를 찾는 것으로 검색을 끝낸다.

```jsx
function Person() {
  this.age = 0;

  // highlight-start
  setInterval(() => {
    this.age++; // |this|는 Person 객체를 참조
    // highlight-end
  }, 1000);
}

var p = new Person();
```

<br />

이러한 특성은 call, apply를 사용할 때 this가 인자에서 무시되는 현상을 만든다. 이 말은 call, apply를 사용하여 this를 변경할 수 없다는 의미이다.

```jsx
window.x = 1;

// 일반함수
const normal = function () {
  return this.x;
};

// 화살표함수
const arrow = () => this.x;

normal.call({ x: 10 }); // 10
arrow.call({ x: 10 }); // 1
```

<br />

#### 바인딩되지 않는 arguments

화살표함수는 **arguments 객체**도 바인딩하지 않는다. 대신, **Rest 파라미터**를 사용하여 이를 보완할 수 있다.

```jsx
var arguments = [1, 2, 3];

// 화살표함수
var arr = () => arguments[0];

// 일반함수
function foo(n) {
  var f = () => arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
  return f(2);
}

// 화살표함수에 Rest 파라미터
function bar(n) {
  var f = (...args) => args[0] + n;
  return f(2);
}

arr(); // 1
foo(1); // 2
bar(1); // 3
```

<br />

### 화살표함수를 쓰지 말아야 하는 경우

다음은 화살표함수를 사용할 경우 문법적 혼란이 가중되는 경우이다.

#### 메소드

화살표함수에서의 this는 lexical scope, 즉, 상위 함수 scope에서 자신이 가리킬 대상을 찾을텐데, 메소드 안에서 화살표함수가 쓰인다면 메소드가 아닌 메소드 밖 함수 환경에서 찾게된다. 이는 곧 전역을 의미하므로 의도하는 바를 달성할 수 없게 된다. 따라서 메소드에서 함수를 사용하고자 한다면 다음과 같이 사용할 수 있다.

```jsx
// 나쁜 예
const person = {
  name: "Lee",
  sayHi: () => console.log(`Hi ${this.name}`),
};

person.sayHi(); // Hi undefined
```

```jsx
// 개선한 것
const person = {
  name: "Lee",
  sayHi() {
    // === sayHi: function() {
    console.log(`Hi ${this.name}`);
  },
};

person.sayHi(); // Hi Lee
```

<br />

#### 프로토타입

위의 메소드와 거의 동일한 이유이다.

```jsx
// 나쁜 예
const person = {
  name: "Lee",
};

Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);

person.sayHi(); // Hi undefined
```

```jsx
// 개선한 것
const person = {
  name: "Lee",
};

Object.prototype.sayHi = function () {
  console.log(`Hi ${this.name}`);
};

person.sayHi(); // Hi Lee
```

<br />

#### 생성자함수

화살표함수는 애초에 프로토타입 프로퍼티를 갖지 못하므로 당연히 생성자함수에 사용할 수 없다.

```jsx
const Foo = () => {};

// 화살표 함수는 prototype 프로퍼티가 없다
console.log(Foo.hasOwnProperty("prototype")); // false

const foo = new Foo(); // TypeError: Foo is not a constructor
```

<br />

#### addEventListener의 콜백함수

addEventListener 함수의 콜백 함수를 화살표 함수로 정의하면 this가 상위 컨택스트인 전역 객체 window를 가리킨다. 따라서 function 키워드를 사용해야 한다.

```jsx
// 나쁜 예
var button = document.getElementById("myButton");

button.addEventListener("click", () => {
  console.log(this === window); // => true
  this.innerHTML = "Clicked button";
});
```

```jsx
// 개선한 것
var button = document.getElementById("myButton");

button.addEventListener("click", function () {
  console.log(this === button); // => true
  this.innerHTML = "Clicked button";
});
```

<br />
<br />
<br />

<text style="color:gray">_\*참고: https://poiemaweb.com/es6-arrow-function_</text>

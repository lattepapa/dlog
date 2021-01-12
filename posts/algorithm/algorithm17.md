---
title: "메모리 관리"
category: algorithm
path: /algorithm/algorithm17
date: 2021-01-10 21:44:00
---

### 메모리 누수가 발생하는 경우

#### 객체에 대한 참조

객체에 대한 참조가 있다면 해당 참조는 메모리에 존재하는 것이다. 따라서 어떤 객체가 존재할 때, 일부 속성만 참조한다고 하더라도 객체 전체를 함수에서 로딩해야 하는 것이므로 참조하지 않는 속성도 메모리를 차지한다.

```jsx
// 메모리 누수가 발생한 객체 참조
let test = {
  prop1: "test1",
};

function print(test) {
  console.log(test.prop1);
}

print(test);
```

<br />

따라서 객체의 속성을 활용할 땐 반드시 참조하는 속성만 매개변수에서 쓰일 수 있도록 제한해야 한다.

```jsx
// 메모리 누수해소
let test = {
  prop1: "test1",
};

function print(prop) {
  console.log(prop);
}

print(test.prop1);
```

<br />

#### 이벤트 콜백에서의 DOM 참조

DOM 항목을 가리키는 변수가 이벤트 콜백 외부에 선언된 경우, 해당 DOM 항목을 제거하더라도 여전히 해당 항목은 메모리에 남게 된다. 예를 들어 아래와 같이 **addEventListener** 콜백의 바깥에 ID가 two인 DOM 항목이 선언되어 있기 때문에, 아무리 이러한 이벤트 콜백 안에서 제거(remove)했다고 하더라도 메모리에 존재한 two 항목이 사라지진 않는다.

```jsx
// 메모리 누수가 발생한 이벤트 콜백의 DOM 항목 참조
let one = document.getElementById("one");
let two = document.getElementById("two");

one.addEventListener("click", function () {
  two.remove();
  console.log(two);
});
```

<br />

만약 이러한 DOM 항목의 메모리 누수를 방지하고자 한다면 아래와 같은 리팩토링을 할 수 있다.

```jsx
// 메모리 누수해소
let one = document.getElementById("one");

one.addEventListener("click", function () {
  let two = document.getElementById("two");
  two.remove();
});

one.removeEventListener("click");
```

<br />

#### window 전역 객체

window 전역 객체에 포함된 객체들은 언제든지 브라우저에서 활용할 수 있어야 하므로 항상 메모리에 상주한다. 따라서 가능하면 전역변수에 값을 선언하는 것은 피하는 것이 좋다.

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>

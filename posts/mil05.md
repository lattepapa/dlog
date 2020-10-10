---
title: for-each
category: javascript
path: /mil05
date: 2020-10-10 00:00:00
---

last Month what I Learned, 그 다섯번째.

### forEach 메소드

while이나 for를 통해 반복문을 작성하는 방법 이외에도, **forEach**라고 하는 **메소드**(method)를 통한 반복문 실행의 방법이 존재한다. 자세히 말하자면 **forEach 메소드**가, 반복하기를 희망하는 **함수**(function)를 자신의 **변수**로 대입시키는 방법을 말한다. 먼저 **forEach**에 대한 MDN 레퍼런스를 확인하자.

> "_The **forEach() method executes a provided function** once for each array element._" - [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) > <br>

예를 들어 아래와 같은 for 반복문이 먼저 있다고 하자.

```js
let arr = [
  { brand: "BMW", model: "mini cooper" },
  { brand: "Mercedes", model: "CLA 250" },
  { brand: "volkswagen", model: "Golf TDI" },
];

for (let i = 0; i < arr.length; i++) {
  console.log(`Name: ${arr[i].brand} ${arr[i].model}`);
}
```

<table>
  <tr><td>Name: BMW mini cooper</td></tr>
  <tr><td>Name: Mercedes CLA 250</td></tr>
  <tr><td>Name: volkswagen Golf TDI</td></tr>
</table>
<br>
<br>
<br>

이것을 **forEach 메소드**를 활용하여 아래와 같이 바꿔서 표현할 수 있다. 이때, 위에서 `arr[i]`라고 썼던 arr의 요소들은 함수 `printCarName`에서 `car`라고 하는 임의의 **입력변수**로 대신 표현할 수 있게 된다.

```js
let arr = [
  { brand: "BMW", model: "mini cooper" },
  { brand: "Mercedes", model: "CLA 250" },
  { brand: "volkswagen", model: "Golf TDI" },
];

function printCarName(car) {
  console.log(`Name: ${car.brand} ${car.model}`);
}

arr.forEach(printCarName);
```

<table>
  <tr><td>Name: BMW mini cooper</td></tr>
  <tr><td>Name: Mercedes CLA 250</td></tr>
  <tr><td>Name: volkswagen Golf TDI</td></tr>
</table>
<br>
<br>
<br>

즉, **forEach 메소드**는 자신이 적용될 배열에 대해 '**주어진 함수**'(`printCarName`)를 그 배열의 요소들에 차례대로 적용해준다는 것을 알 수 있다. 그렇기 때문에 메소드에 대입될 **변수**로는 함수값이 아니라 **함수 자체**(`printCarName`)이어야 한다. 만약 함수값(`printCarName(car)`)이 대입된다면 배열의 요소에 적용할 규칙이 없는 것이 되어버리기 때문이다. 이러한 사실을 활용하여 위의 구문을 다시 써보면 아래와 같이 할 수 있다.

```js
let arr = [
  { brand: "BMW", model: "mini cooper" },
  { brand: "Mercedes", model: "CLA 250" },
  { brand: "volkswagen", model: "Golf TDI" },
];

arr.forEach(function (car) {
  console.log(`Name: ${car.brand} ${car.model}`);
});
```

<table>
  <tr><td>Name: BMW mini cooper</td></tr>
  <tr><td>Name: Mercedes CLA 250</td></tr>
  <tr><td>Name: volkswagen Golf TDI</td></tr>
</table>
<br>
<br>
<br>

또는 아래와 같이도 바꿔서 쓸 수 있다.

```js
let arr = [
  { brand: "BMW", model: "mini cooper" },
  { brand: "Mercedes", model: "CLA 250" },
  { brand: "volkswagen", model: "Golf TDI" },
];

arr.forEach((car) => {
  console.log(`Name: ${car.brand} ${car.model}`);
});
```

<table>
  <tr><td>Name: BMW mini cooper</td></tr>
  <tr><td>Name: Mercedes CLA 250</td></tr>
  <tr><td>Name: volkswagen Golf TDI</td></tr>
</table>
<br>
<br>
<br>

이렇게 다양한 방식으로 작성할 수 있는데, 재차 반복해서 말하자면 **forEach**는 **Array.prototype의 메소드**이기 때문에 가능한 것이다. 한편, **forEach**는 이 포스팅의 가장 서두에서 MDN 레퍼런스로 인용하였듯이, 그 안에 **받을 수 있는 변수가 최대 3가지**(this 객체는 잠깐 잊어두자) 정도라고 생각할 수 있다. 조금 복잡하게 말하자면, **forEach**에 대입할 함수는 최대 3개의 **인자**(argument)를 받는다. 이때 인자의 첫번째는 배열의 요소, 두번째는 배열의 인덱스, 세번째는 배열 원본을 의미한다. 이는 아래와 같이 확인할 수 있다.

```js
let arr = [
  { brand: "BMW", model: "mini cooper" },
  { brand: "Mercedes", model: "CLA 250" },
  { brand: "volkswagen", model: "Golf TDI" },
];

function printCarName(car, idx) {
  console.log(`Name: ${car.brand} ${car.model} (${idx}번째 요소)`);
}

arr.forEach(printCarName);
```

<table>
  <tr><td>Name: BMW mini cooper (0번째 요소)</td></tr>
  <tr><td>Name: Mercedes CLA 250 (1번째 요소)</td></tr>
  <tr><td>Name: volkswagen Golf TDI (2번째 요소)</td></tr>
</table>
<br>
<br>

```js
let arr = ["mini", "CLA", "Golf"];

function printCarName(car, idx, origin) {
  console.log(`Name: ${car} (= ${origin} 배열의 ${idx}번째 요소)`);
}

arr.forEach(printCarName);
```

<table>
  <tr><td>Name: mini (= mini,CLA,Golf 배열의 0번째 요소)</td></tr>
  <tr><td>Name: CLA (= mini,CLA,Golf 배열의 1번째 요소)</td></tr>
  <tr><td>Name: Golf (= mini,CLA,Golf 배열의 2번째 요소)</td></tr>
</table>
<br>
<br>
<br>

#### 1. 너구리 라면을 먹고 싶은 Jason과, 아이스아메리카노를 마시고 싶은 Tony가 있다. PC방 주문기계를 통해 이 두명의 주문을 '비동기적(asynchronously)'으로 처리하고자 한다. 주문 후 5초만에 전달에 이르는 로직을 생각해보자.

```js
// [더이상 쪼갤 수 없는 것] 주문 후 5초에는 전달이 완료되어야 함
function delivery(callback, ms) {
  setTimeout(callback, ms);
}

function complete(who, snack) {
  console.log(`${who}에게 ${snack} 전달완료`);
}

// [로직1] 주문 정보 작성
let orders = [
  { name: "Jason", buy: "너구리" },
  { name: "Tony", buy: "아이스아메리카노" },
];

function process(what, callback) {
  // [로직2] 주문 받은 메시지를 카운터에 띄우고
  console.log(`${what} 주문이 접수되었습니다.`);

  // [로직3] 5초만에 해당 주문을 전달처리하는 로직 완성
  delivery(function () {
    callback(what);
  }, 5000);
}

// [로직4] 이들을 토대로 orders의 요소들을 비동기처리(call asynchronously)
orders.forEach(function (orderUser) {
  process(orderUser.buy, function (snack) {
    complete(orderUser.name, snack);
  });
});
```

<span style="color:#088A68">
<table style="border-color:#088A68">
  <tr><td>너구리 주문이 접수되었습니다.</td></tr>
  <tr><td>아이스아메리카노 주문이 접수되었습니다.</td></tr>
</table>
(5초 후)
<table style="border-color:#088A68">
  <tr><td>Jason에게 너구리 전달완료</td></tr>
  <tr><td>Tony에게 아이스아메리카노 전달완료</td></tr>
</table>
<br>

이때 **forEach 메소드** 부분은 아래와 같이도 쓸 수 있다.  
</span>

```js
orders.forEach((orderUser) => {
  process(orderUser.buy, (snack) => {
    result(orderUser.name, snack);
  });
});
```

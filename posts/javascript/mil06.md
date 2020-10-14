---
title: "map과 filter"
category: javascript
path: /javascript/mil06
date: 2020-08-14 23:00:05
---

### map 메소드

> "_The **Map** object holds key-value pairs and **remembers the original** insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value._" - [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

**map 메소드**는 이전 포스팅인 forEach 메소드와 동일한 논리구조를 갖는다. 즉, 원본배열의 요소들에 대해 **주어진 함수**를 적용시키는 구조이다. 여기서 중요한 것은 **map 메소드**는 **immutable**(원본불변)의 성질을 갖는다는 것이다. **map 메소드**에 의해서는 원본배열은 수정되지 않으며, 마치 **slice 메소드**와 같이 새로운 배열이 도출된다. 예를 들어 아래와 같은 for 반복문이 먼저 있다고 하자.

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

이것을 **map 메소드**를 활용하여 아래와 같이 바꿔서 표현할 수 있다. forEach 메소드에서의 경우와 마찬가지로, 위에서 `arr[i]`라고 썼던 arr의 요소들은 함수 `printCarName`에서 `car`라고 하는 임의의 **입력변수**로 대신 표현할 수 있게 된다.

```js
let arr = [
  { brand: "BMW", model: "mini cooper" },
  { brand: "Mercedes", model: "CLA 250" },
  { brand: "volkswagen", model: "Golf TDI" },
];

function printCarName(car) {
  console.log(`Name: ${car.brand} ${car.model}`);
}

arr.map(printCarName);
```

<table>
  <tr><td>Name: BMW mini cooper</td></tr>
  <tr><td>Name: Mercedes CLA 250</td></tr>
  <tr><td>Name: volkswagen Golf TDI</td></tr>
</table>
<br>

이처럼 **map 메소드**는 forEach 메소드와 동일한 결과물을 만들 수 있다. 한편, 위의 스크립트는 forEach처럼 반복나열 기능을 수행하도록 한 것이었는데 아래와 같이 **함수** 내용들을 바꾸면 다양한 변주가 가능하다.

```js
let arr = [
  { brand: "BMW", model: "mini cooper" },
  { brand: "Mercedes", model: "CLA 250" },
  { brand: "volkswagen", model: "Golf TDI" },
];

arr.map(function (car) {
  return (car.brand = "Made in Germany, " + car.brand);
});

/*
또는 다음과 같이 표현할 수도 있다.
function nation(car) {
  return car.brand = 'Made in Germany, ' + car.brand;
};

arr.map(nation);
*/
```

<table>
  <tr><td>[ "Made in Germany, BMW", "Made in Germany, Mercedes", "Made in Germany, volkswagen" ]</td></tr>
</table>
<br>

즉, **map 메소드**는 원본배열을 수정하지 않고 **주어진 함수**의 내용에 따라서, **원본배열의 길이**(원본배열의 요소개수)만큼 **새로운 배열을 리턴**한다.
<br>
<br>
<br>

### filter 메소드

> "_The **filter**() method creates a new array with all elements that **pass the test** implemented by the provided function._" - [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

**filter 메소드**도 map 메소드와 forEach 메소드처럼 원본배열의 요소들에 대해 **주어진 함수**를 적용하는 구조이다. 또한 **filter 메소드**도 마찬가지로 **immutable**(원본불변) 하다. 아래의 예를 통해 확인하자.

```js
let arr = [
  { brand: "BMW", model: "mini cooper" },
  { brand: "Mercedes", model: "CLA 250" },
  { brand: "volkswagen", model: "Golf TDI" },
];

function luxury(car) {
  return car.brand.indexOf("M") !== -1;
}

arr.filter(luxury);

/*
마찬가지로 다음과 같이 표현할 수 있다.
arr.filter(function(car) {
  return car.brand.indexOf('M') !== -1;
});
*/
```

<table>
  <tr><td>[ </td></tr>
  <tr><td align= "center">{ brand: 'BMW', model: 'mini cooper' },</td></tr>
  <tr><td align= "center">{ brand: 'Mercedes', model: 'CLA 250' }</td></tr>
  <tr><td> ]</td></tr>
</table>
<br>

즉, **filter 메소드**는 원본배열을 수정하진 않지만 map 메소드와 달리 **주어진 함수**의 **내용(=조건)에 들어맞는 요소**들만 추려내어 **새로운 배열을 리턴**한다.
<br>
<br>
<br>

#### 1. 아래 힌트와 같이 Netfix 시청 현황정보가 주어졌다. 주어진 정보를 토대로 30대 남성이 가장 좋아하는 장르를 알고자 한다.

<span style="color:#088A68">**힌트** </span>

```
let list = [
  { n:'Thor', a:34, t:'Die Hard 3', g:'action', d:'18 Jul' },
  { n:'Tony', a:38, t:'Ghost Busters', g:'comic', d:'3 Jul' },
  { n:'Wanda', a:18, t:'Conjuring', g:'horor', d:'20 Jul' },
  { n:'Steve', a:39, t:'First Avenger', g:'action', d:'1 Jul' },
  { n:'Parker', a:18, t:'AI', g:'sf', d:'18 Jul' },
  { n:'Wakanda', a:36, t:'Conjuring2', g:'horor', d:'20 Jul' },
  { n:'Strange', a:43, t:'ET', g:'sf', d:'3 Jul' }
]
```

<br>

```js
// [더이상 쪼갤 수 없는 것] 30대
let temp = list.filter((man) => {
  return Math.floor(Number(man.a) / 10) === 3;
});

// [로직1] 30대 시청현황 배열에서 장르요소(g)만 산출
let arr = [];
temp.forEach((genre) => {
  arr.push(genre.g);
});

// [로직2] arr 배열 내 요소들이 각각 얼마나 반복되는 지 확인
let obj = { mostGenre: "", mostCnt: 0 };
for (let i = 0; i < arr.length; i++) {
  // obj에 정의되지 않았다면 key와 value를 만들어주고
  if (obj[arr[i]] === undefined) {
    obj[arr[i]] = 1;
  }
  // key가 존재한다면 value에 1을 더해주는데,
  obj[arr[i]] += 1;

  // 만약 obj의 mostCnt key의 value보다 크다면 각각 모스트 key로 대입됨!
  if (obj[arr[i]] > obj["mostCnt"]) {
    obj["mostCnt"] = obj[arr[i]];
    obj["mostGenre"] = arr[i];
  }
}

// 최종값 확인
// obj.['mostGenre'];
obj;
```

<span style="color:#088A68">
<table style="border-color:#088A68">
  <tr><td>{ mostGenre: "action", mostCnt: 3, action: 3, comic: 2, horor: 2 }</td></tr>
  </table>
</span>

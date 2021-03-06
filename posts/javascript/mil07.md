---
title: "reduce"
category: javascript
path: /javascript/mil07
date: 2020-08-17 23:00:06
---

> _'The **reduce**() method executes a reducer function (that you provide) on each element of the array, **resulting in single output** value.'_ - **MDN**

**reduce 메소드**는 MDN reference에 나온 정의 그대로, 어떤 배열을 **주어진 함수**(reducer)에 적용하여 그 엘리먼트들을 **하나의 결과**로 도출할 때 사용된다. 물론 배열의 엘리먼트가 단순한 숫자일수도, 문자일수도, 아니면 배열이나 객체일 수도 있을 것이다. 하지만 중요한 것은 **reduce 메소드**는 그 엘리먼트들을 **reducer**(주어진 함수)를 통해 요리하여 **하나의 결과**로 만들어준다는 것이다. 참고로 아래는 map, filter와 이 reduce를 잘 요약하는 그림이다.
![](https://images.velog.io/images/lattepapa/post/c6e4c69d-2545-4292-be2c-2e4b1a00df6b/map%20filter%20reduce.jpg)
<br>

#### reduce 메소드가 유용한 상황

배열을 문자 또는 숫자로 변환하거나, 배열을 객체로 변환할 때 매우 유용하다.

#### reduce 메소드에 필요한 입력변수

1\) **accumulator**: reducer에 의해 배열의 엘리먼트들이 연산되어진 결과값  
2\) **current value**: reducer에 의해 accumulator와 연산될 현재순번의 엘리먼트  
3\) **inital value**: reducer 연산의 최초 수행을 위해 accumulator에 지정될 초기값

#### reduce 메소드로 배열을 문자 또는 숫자로 전환하는 경우

```jsx{numberLines: true}
let arr = [
  { brand: "BMW", model: "mini cooper", nation: "Germany" },
  { brand: "Mercedes", model: "CLA 250", nation: "Germany" },
  { brand: "volkswagen", model: "Golf TDI", nation: "Germany" },
  { brand: "Mercedes", model: "C class", nation: "Germany" },
];

// highlight-start
function summaryByLine(list, car) {
  list = list + car.model + ". ";
  return list;
}

arr.reduce(summaryByLine, "");
// highlight-end
```

<br>
위의 결과는 다음과 같이 나오게 된다.

```jsx{numberLines: true}
"mini cooper. CLA 250. Golf TDI. C class. ";

```

<br>
이는 다음과 같은 모식도로 reduce 구동의 단계를 살펴볼 수 있다.

<table style="font-size:9pt">
  <tr><th>#</th><th>acc(list)</th><th>cur(car)</th><th>return</th></tr>
  <tr><td>1</td><td>''</td><td>'mini cooper'</td><td>'mini cooper. '</td></tr>
  <tr><td>2</td><td>'mini cooper. '</td><td>'CLA 250'</td><td>'mini cooper. CLA 250. '</td></tr>
  <tr><td>3</td><td>'mini cooper. CLA 250. '</td><td>'Golf TDI' </td><td>'mini cooper. CLA 250. Golf TDI. '</td></tr>
  <tr><td>4</td><td>'mini cooper. CLA 250. Golf TDI. ' </td><td>'C class'</td><td>'mini cooper. CLA 250. Golf TDI. C class. '</td></td></tr>
</table>
<br>
<br>
<br>

#### reduce 메소드로 배열을 객체로 전환하는 경우

```jsx{numberLines: true}
let arr = [
  { brand: "BMW", model: "mini cooper", nation: "Germany" },
  { brand: "Mercedes", model: "CLA 250", nation: "Germany" },
  { brand: "volkswagen", model: "Golf TDI", nation: "Germany" },
  { brand: "Mercedes", model: "C class", nation: "Germany" },
  { brand: "Chevy", model: "Mustang", nation: "USA" },
];

function sortByNation(list, car) {
  // 분류기준(key)를 arr 배열의 임의의 엘리먼트(car)의 nation key로부터 추출
  let ntKey = car.nation;

  // 만일 임의의 list 객체에 ntKey와 일치하는게 있다면 그 value에 car 엘리먼트를 추가
  if (ntKey in list) {
    list[ntKey].push(car);
  }

  // 만일 ntKey와 일치하는 key가 list 객체에 없다면 해당 key를 만들고 car 엘리먼트 추가
  else {
    list[ntKey] = [];
    list[ntKey].push(car);
  }

  return list;
}

// 초기값은 빈 객체로 하여 reduce 메소드 구현
arr.reduce(sortByNation, {});
```

<br>
위의 결과는 다음과 같이 나오게 된다.

```jsx{numberLines: true}
{
  Germany: [
    { brand: 'BMW', nation: 'Germany' },
    { brand: 'Mercedes', nation: 'Germany' },
    { brand: 'volkswagen', nation: 'Germany' },
    { brand: 'Mercedes', nation: 'Germany' }
  ],
  USA: [
    { brand: 'Chevy', model: 'Mustang', nation: 'USA' }
  ]
}
```

<br>
이는 다음과 같은 모식도로 reduce 구동의 단계를 살펴볼 수 있다.

<table style="font-size:9pt">
  <tr><th>#</th><th>acc(list)</th><th>cur(car)</th><th>return</th></tr>
  <tr><td>1</td><td>{}</td><td>{ brand: 'BMW', nation: 'Germany' }</td><td>{ <br> &nbsp&nbsp Germany: [ <br> &nbsp&nbsp&nbsp&nbsp { brand: 'BMW', nation: 'Germany' }
    <br> &nbsp&nbsp ] <br> }</td></tr>
  <tr><td>2</td><td>{ <br> &nbsp&nbsp Germany: [ <br> &nbsp&nbsp&nbsp&nbsp { brand: 'BMW', nation: 'Germany' }
    <br> &nbsp&nbsp ] <br> }</td><td>{ brand: 'Mercedes', nation: 'Germany' }</td><td>{ <br> &nbsp&nbsp Germany: [ <br> &nbsp&nbsp&nbsp&nbsp { brand: 'BMW', nation: 'Germany' }, <br> &nbsp&nbsp&nbsp&nbsp { brand: 'Mercedes', nation: 'Germany' }
    <br> &nbsp&nbsp ] <br> }</td></tr>
  <tr><td>3</td><td>{ <br> &nbsp&nbsp Germany: [ <br> &nbsp&nbsp&nbsp&nbsp { brand: 'BMW', nation: 'Germany' }, <br> &nbsp&nbsp&nbsp&nbsp { brand: 'Mercedes', nation: 'Germany' }
    <br> &nbsp&nbsp ] <br> }</td><td>{ brand: 'volkswagen', nation: 'Germany' }</td><td>{ <br> &nbsp&nbsp Germany: [ <br> &nbsp&nbsp&nbsp&nbsp { brand: 'BMW', nation: 'Germany' }, <br> &nbsp&nbsp&nbsp&nbsp { brand: 'Mercedes', nation: 'Germany' }, <br> &nbsp&nbsp&nbsp&nbsp { brand: 'volkswagen', nation: 'Germany' }
    <br> &nbsp&nbsp ] <br> }</td></tr>
  <tr><td>4</td><td>{ <br> &nbsp&nbsp Germany: [ <br> &nbsp&nbsp&nbsp&nbsp { brand: 'BMW', nation: 'Germany' }, <br> &nbsp&nbsp&nbsp&nbsp { brand: 'Mercedes', nation: 'Germany' }, <br> &nbsp&nbsp&nbsp&nbsp { brand: 'volkswagen', nation: 'Germany' }
    <br> &nbsp&nbsp ] <br> }</td><td>{ brand: 'Chevy', nation: 'USA' }</td><td>{ <br> &nbsp&nbsp Germany: [ <br> &nbsp&nbsp&nbsp&nbsp { brand: 'BMW', nation: 'Germany' }, <br> &nbsp&nbsp&nbsp&nbsp { brand: 'Mercedes', nation: 'Germany' }, <br> &nbsp&nbsp&nbsp&nbsp { brand: 'volkswagen', nation: 'Germany' }
    <br> &nbsp&nbsp ], <br> &nbsp&nbsp USA: [ { brand: 'Chevy', nation: 'USA' }
    <br> &nbsp&nbsp ] <br> }</td></tr>
</table>
<br>
<br>
<br>

<hr />

#### 연습문제1

학생의 정보가 담긴 객체를 엘리먼트로 갖는 배열을 입력받아 여학생들의 경우에만 평균 점수(정수)를 계산하여 해당 결과를 배열로 리턴하고자 한다.

<span style="color:#088A68">**힌트**</span>

```
let studentList = [
  {
    name: 'Wanda',
    gender: 'f',
    grades: [1.5, 3.5, 2],
  },
  {
    name: 'Natasha',
    gender: 'f',
    country: 'Soviet Union',
    grades: [5, 4, 4.5],
  },
  {
    name: 'Steve',
    gender: 'm',
    grades: [2, 2.5, 3, 3],
  },
  {
    name: 'Parker',
    gender: 'm',
    grades: [4, 5, 5],
  },
];

// result
[
  { name: 'Wanda', gender: 'f', grades: 2 },
  { name: 'Natasha', gender: 'f', grades: 5 },
];

```

<br>

#### Reference Code

```jsx{numberLines: true}
function filterGirlsGrade(students) {
  // [더이상 쪼갤 수 없는 것] 여자
  let girls = students.filter((someone) => {
    return someone.gender === "f";
  });

  // [로직1] girls 배열에 담긴 엘리먼트들 중 grades key를 평균으로 reduce해야 함
  return girls.map((el) => {
    let sum = el.grades.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    let avg = sum / el.grades.length;

    el.grades = avg;
    return el;
  });
}
```

<br>
<br>
<br>

#### 연습문제2

배열을 입력받아 배열에서 가장 짧은 길이를 가진 문자열 엘리먼트를 리턴하고자 한다.

#### Reference Code

```jsx{numberLines: true}
function whatIsTheShortestLetter(arr) {
  // [더이상 쪼갤 수 없는 것] 문자일 때
  let letterOnly = arr.filter((el) => typeof el === "string");
  if (letterOnly.length === 0) {
    return "";
  }

  // [로직1] letterOnly에 저장한 문자들의 길이를 reduce로 비교하여 줄여감
  // highlight-start
  return letterOnly.reduce((acc, cur) => {
    if (acc.length <= cur.length) {
      return acc;
    } else {
      return cur;
    }
  }, 0);
  // highlight-end
}
```

<br>
<br>
<br>

#### 연습문제3

어떤 형태의 배열이든, 배열들의 엘리먼트를 모두 담고 있는 단일 배열을 리턴하고자 한다.

#### Reference Code

```jsx{numberLines: true}
function arrayFlatten(arr) {
  // 결과값(accumulator) 엘리먼트에 계속 현재의 엘리먼트(cur)를 concat시키면 간단하다.
  let flattened = arr.reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);
  return flattened;
}
```

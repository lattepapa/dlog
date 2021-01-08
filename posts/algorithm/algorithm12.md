---
title: "배열과 알고리즘(1)"
category: algorithm
path: /algorithm/algorithm12
date: 2021-01-06 21:06:00
---

### 배열 기초

#### 원본제어

```jsx
let array = [1, 2, 3, 4];

array.push(5);
// array = [1,2,3,4,5]

array.pop(); // 5
// array = [1,2,3,4]

array.shift(); // 1
// array = [2,3,4]

array.unshift(6);
// array = [6,2,3,4]
```

<br />

#### slice 메소드

**slice**는 원본을 **참조**하여 새로운 배열을 리턴한다. **참조**한다는 것이 매우 중요한데, 만약 slice 메소드로 복사한 배열의 항목을 변경하면 원본 배열의 항목도 변경된다.

```jsx
let array = ["a", "b", "c"];

array.slice(1, 2); // ["b"]

let brray = array.slice(); // ["a", "b", "c"]
brray[0] = 5;

console.log(brray); // [5, "b", "c"]
console.log(array); // [5, "b", "c"]
```

<br />

#### Array.from 메소드

위의 slice 메소드의 참조특성을 피하고 완전히 새로운 배열로 원본 배열을 복사하고자 할 때 쓰인다.

```jsx
let array = ["a", "b", "c"];

let brray = Array.from(array); // ["a", "b", "c"]
brray[0] = 5;

console.log(brray); // [5, "b", "c"]
console.log(array); // ["a", "b", "c"]
```

<br />

#### splice 메소드

**splice**는 1) 제거를 시작할 인덱스, 2) 제거할 항목의 크기, 3...) 제거 후 추가할 신규항목(들)을 파라미터로 받는다. 단, 리턴하는 값은 제거한 항목들이다.

```jsx
let array = ["a", "b", "c", 1, 2, 3];

array.splice(); // []
array.splice(2, 3, "f", "g"); // ["c", 1, 2]

console.log(array); // ["a", "b", "f", "g", 3]
```

<br />

#### concat 메소드

**concat**은 원본 배열 뒤에 데이터가 추가된, **새로운 배열**을 반환한다.

```jsx
let array = ["a", "b", "c"];

array.concat(); // ["a", "b", "c"]
array.concat([1, 2, "a", 3]); // ["a", "b", "c", 1, 2, "a", 3]

console.log(array); // ["a", "b", "c"]
```

<br />

#### 조건 반복

조건이 참(i < array.length)이면 반복, 조건이 거짓이면 변수를 수정(i++)한다.

```jsx
let array = ["a", "b", "c"];

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
// a
// b
// c
```

```jsx
let array = ["a", "b", "c"];

let i = 0;
while (i < array.length) {
  i++;
  console.log(array[i]);
}
// a
// b
// c
```

<br />

#### 무조건 반복

**for ... in**은 배열의 첫 **인덱스**(index)부터 마지막까지 하나씩 호출하는 반복문이며, **for ... of**은 배열의 첫 **항목**(element)부터 마지막까지 하나씩 호출하는 반복문이다.

```jsx
let array = ["a", "b", "c"];

for (let i in array) {
  console.log(array[i]);
}
// a
// b
// c
```

```jsx
let array = ["a", "b", "c"];

for (let el of array) {
  console.log(el);
}
// a
// b
// c
```

```jsx
let array = ["a", "b", "c"];

array.forEach((el, i) => {
  console.log(el);
});
// a
// b
// c

array.forEach((el, i) => {
  console.log(array[i]);
});
// a
// b
// c
```

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>

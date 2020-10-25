---
title: "for 반복문(1)"
category: javascript
path: /javascript/mil03
date: 2020-08-07 23:00:02
---

> _'The **for** statement creates a loop that consists of three optional expressions, enclosed in parentheses and separated by semicolons, followed by a statement (usually a block statement) to be executed in the loop.'_ - **MDN**

**for** 반복문은 while과 그 목적과 쓰임이 거의 동일하다. for 반복문으로 표현 가능한 것 중 while 반복문으로 표현할 수 없는 것은 없다(vice versa). 일반적으로 for 반복문은 **배열**(Array)에 담긴 **엘리먼트**(element)들을 **순차적**(by index)으로 다루고자 할 때 유용하다. **시간복잡도**(time complexity)라는 관점에서 for 반복문은, 둘러봐야 할 엘리먼트들의 숫자만큼의 복잡도를 갖는다. 이는 먼저 언급했다시피 for 반복문에 채택됨으로써 각 엘리먼트들이 강제로 순차성을 부여받기 때문이다.

```jsx{numberLines: true}
for(let i = 0; i < arrayName.length; i++) {
  array를 제어할 명령 내용(statement);
}
```

<br>

만약 위와 같은 엘리먼트 인덱스의 제어까지는 필요없고, 단지 순차적으로 요소들 자체에 대해 제어하고자 한다면 아래와 같이 **for...of** 구문의 형식으로 표현하는 것도 가능하다. 이는 **ES6**(ECMA Script 2015)에서 새롭게 제공되는 문법(syntax)의 하나이다.

```jsx{numberLines: true}
for(let elementName of arrayName) {
  element를 제어할 명령 내용(statement);
}
```

<br>

한편, 배열뿐만 아니라 **객체**(Object)의 경우에도 for 반복문을 통한 제어가 가능하다. 이때 제어의 대상은 객체가 가진 **속성**(property)의 **키**(key)와 그것의 **키값**(value)이다.

```jsx{numberLines: true}
for(let keyName in objectName) {
  key를 제어할 명령 내용(statement);
}
```

<br>
<br>
<br>

<hr />

#### 연습문제1

어떤 문장이든 제목칸에 입력하면 무조건 문장 내 단어의 맨 첫 글자는 대문자로 변환하여 제목으로 보여주고자 한다.

#### Reference Code

```jsx{numberLines: true}
function convertToTitle(str) {
  // [더이상 쪼갤 수 없는 것] 단어끼리 묶음
  let arr = str.split(' ');

  // highlight-start
  for(let i = 0; i < arr.length; i++) {
    // [로직1] 요소(= 여기선 단어)가 존재하는 지 여부를 확인하여
    if(arr[i] !=== 0) {
      // [로직2] 존재할 경우에만 해당 요소의 첫번째 인덱스만 대문자로 하여 재 대입
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
  }
  // highlight-end

  // 최종값 리턴
  return arr.join(' ');
}
```

<br>
<br>
<br>

#### 연습문제2

어떤 상품의 QR코드를 찍으면 이것으로부터 2차원 배열을 입력받아 각 배열을 이용해 만든 객체를 출력하려고 한다. 만들어진 객체를 DOM CRUD로 다듬어서 HTML 문서로까지 보여줄 것이다.

#### Reference Code

```jsx{numberLines: true}
function convertToObject(arr) {
  // [더이상 쪼갤 수 없는 것] 객체의 속성에 key든 value든 아무 정보도 없는 것
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    // [로직1] 객체의 속성인 i번째 요소가 빈 배열이 아니면서,
    // [로직2] 아직 obj에 key 정보가 정해지지 않은 경우에만 obj에 속성 일체형성
    if (arr[i].length > 0 && obj[arr[i][0]] === undefined) {
      obj[arr[i][0]] = arr[i][1];
    }
  }

  // 최종값 리턴
  return obj;
}
```

<br>
<br>
<br>

#### 연습문제3

문자열을 요소로 갖는 배열을 입력받아 가장 짧은 문자열과 가장 긴 문자열을 제거한 배열을 출력하려고 한다. 단, 모든 요소의 길이가 같은 경우는 배제하기로 하며, 길이가 동일한 요소들이 여러 개 있을 경우, 가장 마지막 요소는 제거한다.

#### Reference Code

```jsx{numberLines: true}
function eleminateExtremeElement(arr) {
  // [더이상 쪼갤 수 없는 것] 최소길이가 20이거나, 최대길이가 0인 경우
  let iamMaxLength = 0;
  let iamMinLength = 20;

  // [로직1] 위의 초기 최소길이, 초기 최대길이와 비교한 결과를 담을 곳 생성
  let iamMaxIdx = 0;
  let iamMinIdx = 0;

  for (let i = 0; i < arr.length; i++) {
    // [로직2] 요소의 길이를 최대길이와 비교 => 길면 그 길이와 인덱스값을 각각 저장
    if (arr[i].length >= iamMaxLength) {
      iamMaxLength = arr[i].length;
      iamMaxIdx = i;
    }

    // [로직3] 요소의 길이를 최소길이와 비교 => 짧으면 그 길이와 인덱스값을 각각 저장
    if (arr[i].length <= iamMinLength) {
      iamMinLength = arr[i].length;
      iamMinIdx = i;
    }
  }

  // [로직4] 위의 반복문으로 나오는 최대/최소값 중, 어느 것도 아닌 인덱스 고르면 끝
  let arrFinal = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== iamMaxIdx && i !== iamMinIdx) {
      arrFinal.push(arr[i]);
    }
  }

  // 최종값 리턴
  return arrFinal;
}
```

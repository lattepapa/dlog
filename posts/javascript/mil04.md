---
title: "[JS] for 반복문(2)"
category: javascript
path: /javascript/mil04
date: 2020-08-10 23:00:03
---

두개 이상의 for 반복문을 중첩적으로도 사용할 수 있다. 이를 **이중 for문**이라고 흔히 말한다. 바로 행렬(matrix)이 이중 for문으로 생각할 수 있는 대표적인 사례이다. 예를 들어 3x3 행렬을 가정한다면, 행$(i)$과 열$(j)$의 조합은

> $i = 0$일 때 $[(0,0), (0,1), (0,2)]$  
> $i = 1$일 때 $[(1,0), (1,1), (1,2)]$  
> $i = 2$일 때 $[(2,0), (2,1), (2,2)]$

로 표현할 수 있다. 이중 for문은 여기서 행$(i)$를 기준으로 차례대로 행렬의 순서쌍을 순회하는 것에서 시작한다. 즉, $i = 0$일때 $j = 0$, $j = 1$, $j = 2$인 순서쌍을 확인한다. 이렇게 0번째 행의 모든 열에 대한 순회가 끝나야 비로소 다음 행인 $i = 1$일 때의 열 순회를 시작한다. 따라서 시간복잡도 관점에서 이중 for문은 각 행당 모든 열을 순회하는 경우의 수를 확인해야 하므로 for 반복문의 제곱에 해당하는 $i^2$ 만큼의 시간이 필요하다.
<br>
<br>
<br>

#### 1. 일정 위치의 경도와 위도 범위를 정한 것을 토대로 2차원 배열(배열을 요소로 갖는 배열)에 반영하였다. 사용자가 클릭 또는 터치 등의 이벤트를 입력한 지점의 위치 정보를 요소로 갖는 배열을 하고자 한다. 이 배열 정보를 다시 지도에 핀 형식으로 보여줄 것이다.

```jsx{numberLines: true}
function pickedMapPosition(arr) {
  // [더이상 쪼갤 수 없는 것] 요소들은 '행(i)', 그 요소들의 요소들은 '열(j)'이다.
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      // [로직1] i번째 요소의 j번째 요소가 클릭지점(y)인지 확인하여 최종값 리턴
      if (arr[i][j] === "y") {
        return [i, j];
      }
    }
  }
}
```

<br>
<br>
<br>

#### 2. 문자열을 요소로 갖는 배열을 입력받아 문자열을 세로로 읽었을 때의 문자열을 리턴하고자 한다.

```jsx{numberLines: true}
function mergeLettersByIndex(arr) {
  // [더이상 쪼갤 수 없는 것] 주어진 배열의 요소(=단어)의 요소(=글자)
  let result = [];

  // [로직1] 요소들을 순회하면서, 해당 요소(=단어)를 변수 el에 저장
  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];
    for (let j = 0; j < arr[i].length; j++) {
      // [로직2] 먼저 result에 첫번째 요소(i=0)의 각 글자(j=0 ~)를 차례로 대입
      if (result.length === j) {
        result.push(el[j]);
      }

      // [로직3] 첫번째 요소의 마지막 글자의 인덱스와 j가 같아지기 전까지
      // result의 j번째 글자 뒤에는 항상 i=1인 el의 j번째 글자가 따라오도록 대입
      // 즉, result의 0번째 글자(=0번째 요소의 첫글자)에 1번째 요소의 첫글자가 붙음
      else {
        result[j] = result[j] + el[j];
      }
    }
  }

  // 최종값 리턴
  return result.join("");
}
```

<br>
<br>
<br>

#### 3. 수를 요소로 갖는 배열을 입력받아 각 요소들이 그 이전의 요소들의 합보다 큰지 여부를 알고자 한다.

```jsx{numberLines: true}
function comparisonAccSum(arr) {
  // [더이상 쪼갤 수 없는 것] 첫번째 요소는 그 무엇과도 크기를 비교할 수 없음
  let sum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    // [로직1] i=1번째부터 sum과 비교하여, sum보다 작은 경우만 sum에 누산(true)
    if (arr[i] >= sum) {
      return false;
    }
    sum += arr[i];
  }

  // 최종값 리턴
  return true;
}
```

<br>
<br>
<br>

#### 4. 두 수를 입력받아, 하나를 다른 하나로 나눈 나머지를 리턴하고자 한다.

```jsx{numberLines: true}
function getRemainder(num1, num2) {
  // [더이상 쪼갤 수 없는 것] 제수가 0이면 무조건 0, 피제수는 0이 되어선 안됨
  if (num2 === 0) {
    return "Error: invalid number";
  }

  // [로직1] 제수가 피제수보다 작기 직전까지 계속 제수-피제수의 값을 제수에 재 대입
  while (num1 >= num2) {
    num1 -= num2;
  }

  // 최종값(제수) 리턴
  return num1;
}
```

이것을 for 반복문을 사용한다면, 아래와 같이 할 수도 있다.

```jsx{numberLines: true}
function getRemainder(num1, num2) {
  if(num2 === 0) {
    return 'Error: invalid number';
  }

  for(let i = num2; num2 <= num1;) {
    num1 -= i;
  }

  return num1;
```

<br>
<br>
<br>

#### 5. 입력받은 정수의 제곱근을 구하고자 한다. 단, `Math.sqrt()` 함수는 사용할 수 없으며 소숫점 둘때자리까지 구해야 한다.

```jsx{numberLines: true}
function getSquarRoot(num) {
  // [더이상 쪼갤 수 없는 것] 피제곱수가 소숫점 셋째자리, 그리고 1일 경우
  let pool = [1, 0.1, 0.01, 0.001];
  let el = 1;

  // highlight-start
  for (let i = 0; i < pool.length; i++) {
    // [로직1] 입력받은 정수에 이르기 전까지, 피제곱수에 pool 요소를 더하여 제곱
    while (el * el <= num) {
      el += pool[i];
    }
    // highlight-end

    // [로직2] 만약 위의 반복을 통해 바로 입력받은 정수가 나오면 그 피제곱수를 리턴
    if (el * el === num) {
      return el;
    }

    // [로직3] 그렇지 않다면 다시 피제곱수에 pool 요소를 빼보고 다음 반복문 준비
    else {
      el -= pool[i];
    }
  }

  // 최종값(소숫점 둘째자리까지 반올림) 리턴
  return Number(el.toFixed(2));
}
```

<br>
<br>
<br>

#### 6. 카이사르 암호법(Caesar cipher)으로 만들어진 암호를, 그것의 복호화 숫자를 입력받아 복호화하고자 한다.

```jsx{numberLines: true}
function goDecrypt(pw, num) {
  // [더이상 쪼갤 수 없는 것] 알파벳들 그 자체
  let alpabet = "abcdefghijklmnopqrstuvwxyz";

  let decrypt = "";
  for (let i = 0; i < pw.length; i++) {
    if (pw[i] === " ") {
      decrypt += " ";
    }

    // [로직1] 복호화 숫자가 적용된 알파벳 순서를 계산
    let idxTmp = alphabet.length + alphabet.indexOf(pw[i]) - num;

    // [로직2] 주어진 암호의 글자의 알파벳 순서보다 복호화 숫자가 작을 경우를 고려
    let idx = idxTmp % alphabet.length;

    // [로직3] 복호화된 글자들을 차례대로 변수에 저장
    decrypt += alphabet[idx];
  }

  // 최종값 리턴
  return decrypt;
}
```

<br>
<br>
<br>
  
#### 7. 문자열을 입력받아 연속되는 문자가 있을 경우, 연속 구간을 반복되는 수와 문자로 조합한 형태로 압축한 문자열을 리턴하고자 한다.

```jsx{numberLines: true}
function countLettersOver3Times(str) {
  // [더이상 쪼갤 수 없는 것] 글자가 연속되지 않은 것

  // [로직1] 글자를 받을 결과변수와, 반복횟수를 측정할 변수를 선언
  let result = "";
  let cnt = 1;

  // [로직2] 입력받는 문자의 첫 글자를 비교용 변수에 대입 및 선언
  let recursive = str[0];

  // [로직3] 끝글자도 for loop으로 고려하기 위해 임의로 str 뒤에 공백문자 추가
  str = str + "";
  for (let i = 1; i < str.length; i++) {
    // [로직4] 비교변수와 i번째 글자가 같다면 반복횟수 +1 후 다음 반복문 실행
    if (recursive === str[i]) {
      cnt += 1;
    }

    // [로직5] 비교변수와 i번째 글자가 다르다면
    else {
      // 반복횟수가 1이라면, 비교문자(=i-1번째 글자)를 결과변수에 대입
      if (cnt === 1) {
        result += recursive;
      }

      // 반복횟수가 2라면, 비교문자(=i-1번째 글자)를 결과변수에 2개 붙여서 대입
      else if (cnt === 2) {
        result += recursive + recursive;
      }

      // 3회 이상 반복이면, 횟수와 비교문자(=i-1번째 글자)를 붙여서 대입
      else if (cnt >= 3) {
        result += `${cnt}${recursive}`;
      }

      // 글자를 비교문자(=다음 반복의 i-1번째 글자가 됨)에 대입, 반복횟수 1로 초기화
      recursive = str[i];
      cnt = 1;
    }
  }

  // 최종값 리턴
  return result;
}
```

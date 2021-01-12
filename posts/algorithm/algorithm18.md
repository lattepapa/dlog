---
title: "재귀"
category: algorithm
path: /algorithm/algorithm18
date: 2021-01-10 23:10:00
---

### 재귀의 규칙

무한 재귀 호출로 인한 **스택 오버플로**를 방지하기 위해서는 반드시 **기저 조건**을 설정해야 한다. 기저 조건을 바탕으로 **분할 정복 방식**으로 문제를 쪼개어 접근한다.

#### 기저 조건

기저 조건이란, 더 이상 재귀함수를 호출하지 않게하는 조건을 의미한다.

#### 분할 정복 방식

분할 정복 방식이란, 어떤 문제를 작은 단위로 나눠서 해당 작은 단위의 문제들을 모두 해결함으로써 전체 문제를 해결하는 것을 의미한다. 피보나치 수열을 예로 들면, 5번째 수는 3번째 수와 4번째 수의 합인데 3번째 수와 4번째 수는 각각 1번째 수와 2번째 수, 그리고 2번째 수와 3번째 수의 합이라고 생각할 수 있다. 이렇게 재귀적으로 진행되는 일련의 로직을 함수의 가장 마지막에 재귀적으로 호출하도록 설계할 수 있는데 이러한 방법을 특별히 **꼬리 재귀**라고 부른다.

#### 피보나치 수열

아래의 꼬리 재귀는 $O(n)$의 시간복잡도와 공간복잡도를 갖는다. 특히, 이러한 공간 복잡도는 **스택 콜**에 의해 도출된다.

```jsx
// 방법1: 꼬리 재귀
function fibonacci(n, later, latest) {
  // 기저 조건
  if (n === 0) return latest;
  if (n === 1) return later;

  // 꼬리 재귀(분할 정복)
  // highlight-start
  return fibonacci(n - 1, later, later + latest);
  // highlight-end
}
```

```jsx
// 방법2: 메모이제이션을 활용한 꼬리 재귀
function fibonacci(n) {
  // 메모
  // highlight-start
  const memo = [0, 1];
  // highlight-end

  // 꼬리 재귀(분할 정복)
  function aux(n) {
    if (memo[n] !== undefined) return memo[n];
    memo[n] = aux(n - 1) + aux(n - 2);
    return memo[n];
  }

  return aux(n);
}
```

<br />

#### 파스칼 삼각형

![pascal](https://user-images.githubusercontent.com/67884699/104325264-c90d9f80-552b-11eb-9345-43c412c33704.jpg)

파스칼 삼각형은 위의 그림과 같이 어떤 항목의 값이 해당 항목의 위쪽 두 개 항목 값의 합인 삼각형이다. 파스칼 삼각형에서 **기저 조건**은 최상위 항목, 즉, 행(row)과 열(col)이 모두 0일 때이며 이때의 값은 1이다. 또한, 각 행마다 열(col)이 0이면 값은 1이다. 한편, **분할 정복**에 의하면 파스칼 삼각형에서 어떤 수는 해당 수의 위쪽 두 수의 합이다. 따라서 아래와 같은 코드로 파스칼 삼각형을 표현할 수 있다.

```jsx
function pascalTriangle(row, col) {
  // 기저 조건
  if (row === 0) return 0;
  if (col === 0) return 1;

  // 꼬리 재귀(분할 정복)
  return pascalTriangle(row - 1, col) + pascalTriangle(row - 1, col - 1);
}
```

<br />

### Big O 분석

#### 점화식(Recurrence Relations)

재귀 함수에서의 점화식은 기저 조건에 대한 시간복잡도와 재귀에 대한 시간복잡도를 분석하는 것으로 나눠진다. 피보나치 수열을 예로 들면,

```jsx
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

<br />

기저 조건은 $T(n) = O(1)$을 만족하고 재귀는 $T(n) = T(n-1) + T(n-2) + O(1)$을 만족한다. 이때 $n$ 대신 $n-1$의 경우라면 재귀의 시간복잡도는 $T(n-1) = T(n-2) + T(n-3)$이 된다. 이와 같은 모습들을 종합하면, **재귀가 호출될 때마다 두개의 함수 호출이 추가**됨을 알 수 있다. 따라서 전체 시간복잡도는 $O(2{^{n}})$가 된다.

#### 마스터 정리

$a$를 재귀 호출에 곱해지는 계수, $b$를 재귀 호출에 $n$을 나누는 항, $c$를 비재귀 구성요소에 대한 다항식 항이라고 할 때, $a >= 1$이고 $b >= 1$인 $T(n) = aT(n/b) + O(n^c)$인 점화식에 대해 세 가지 조건에 따른 시간복잡도를 각각 도출할 수 있다.

- $c<log{_b}a$이면 $O(n^{log{_b}{a}})$이다
- $c=log{_b}a$이면 $O(n^{c}logn)$이다
- $c>log{_b}a$이면 $O(f(n))$이다

#### 재귀 호출 스택 메모리

재귀함수에서 각 재귀 호출은 기자 조건이 해결될 때까지 메모리에 저장되어야 하며, 이러한 일련의 상태를 **콜 스택**이라고 부른다. 이러한 이유 때문에 재귀 해결보다는 반복 루프를 통한 문제 해결이 더 선호된다.

#### 십진수를 이진수로 변환하기

기저 조건은 주어진 인자 $n$이 2보다 작을 때이다. 왜냐하면 2보다 작다는 것은 0 또는 1이라는 의미가 되기 때문이다. 기본적으로 이진법 변환을 위해 2로 나누는 연산을 반복적으로 수행하므로 시간복잡도는 $O(log{_2}n)$이 된다. 공간복잡도 또한 동일하다.

```jsx{numberLines: true}
function base10ToString(n) {
  let binaryString = "";

  function helper(n) {
    if (n < 2) {
      binaryString += n;
      return;
    }
    // highlight-start
    // Math.floor(n / 2)의 값이 기저 조건에 다다를 때까지
    helper(Math.floor(n / 2));
    // 매 n % 2의 재귀연산 결과들은 콜 스택에 저장되었다가
    helper(n % 2);
    // 기저 조건에 다다르면 콜 스택에 쌓인 값들이 FILO로 나오게 된다
    // highlight-end
  }

  helper(n);
  return binaryString;
}

base10ToString(232); // 11101000
```

<br />

#### 배열의 항목들로 만들 수 있는 모든 경우의 수

기저 조건은 begin 인덱스와 end 인덱스가 동일해지는 경우이다. 시간복잡도와 공간복잡도 모두 $O(n!)$를 만족한다.

```jsx{numberLines: true}
function swap(arr, i1, i2) {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

function permute(arr, begin, end) {
  if (begin === end) console.log(arr);

  for (let i = begin; i < end; i++) {
    swap(arr, begin, i);
    permute(arr, begin + 1, end);
    swap(arr, begin, i);
  }
}

function permuteArray(arr) {
  permute(arr, 0, arr.length);
}

permuteArray(["A", "B", "C"]);
```

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>

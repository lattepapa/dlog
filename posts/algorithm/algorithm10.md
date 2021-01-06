---
title: "Number 객체와 숫자 알고리즘"
category: algorithm
path: /algorithm/algorithm10
date: 2021-01-04 17:43:00
---

자바스크립트는 **64비트 부동소수점**으로 숫자를 표현한다. 63번째 비트는 부호(sign)을 표현하며 1이면 음수이다. 62번째부터 52번째 비트는 지수($e$값)을 표현한다. 그리고 51번째 비트부터 나머지 비트는 소수를 표현한다. 이는 다음의 공식으로 계산된다고 한다.

$\large value = (-1)^{sign} * 2^{e-1023} * (1 + \displaystyle\sum_{i=1}^{52} b_{52-i}2^{-i})$

### Number 객체의 활용

#### Number.EPSILON

두 개의 표현 가능한 숫자 사이의 가장 작은 간격을 반환한다.

```jsx
function case(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

case(0.1 + 0.2, 0.3);
// true
```

<br />

#### Number.MAX<u>&nbsp;&nbsp;</u>SAFE<u>&nbsp;&nbsp;</u>INTEGER

가장 큰 정수를 반환한다.
<br />

#### Number.MAX<u>&nbsp;&nbsp;</u>VALUE

정수와 부동소수점을 포함한 가장 큰 숫자($1.7976931348623157e + 308$)를 반환한다.

```jsx
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2;
// true

Number.MAX_SAFE_INTEGER + 1.1 === Number.MAX_SAFE_INTEGER + 2.1;
// false

Number.MAX_VALUE + 1 === Number.MAX_VALUE + 2;
// true

Number.MAX_VALUE + 1.1 === Number.MAX_VALUE + 2.1;
// true
```

<br />

#### Number.MIN<u>&nbsp;&nbsp;</u>SAFE<u>&nbsp;&nbsp;</u>INTEGER

가장 작은 정수($-9007199254740991$)를 반환한다.
<br />

#### Number.MIN<u>&nbsp;&nbsp;</u>VALUE

가장 0에 가까운 부동소수점을 반환한다.

```jsx
Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2;
// true

Number.MIN_SAFE_INTEGER - 1.1 === Number.MIN_SAFE_INTEGER - 2.1;
// false

Number.MIN_VALUE - 1 === -1;
// true
```

<br />

#### 대소관계

음수 구간에서는 $-$Infinity $<$ Number.MIN<u>&nbsp;&nbsp;</u>SAFE<u>&nbsp;&nbsp;</u>INTEGER $< 0$을 만족한다. 또한 양수 구간에서는 $0 <$ Number.MIN<u>&nbsp;&nbsp;</u>VALUE $<$ Number.MAX<u>&nbsp;&nbsp;</u>SAFE<u>&nbsp;&nbsp;</u>INTEGER $<$ Number.MAX<u>&nbsp;&nbsp;</u>VALUE $<$ Infinity를 만족한다.

<br />

### 숫자 알고리즘

#### 소수 테스트

입력값 $n$이 소수인지 알아보기 위해 반복문을 돌리되, 시간복잡도 개선을 위해 $\sqrt{n}$까지만 확인한다. 따라서 이 경우 시간복잡도는 $O(\sqrt{n})$을 만족한다.

```jsx{numberLines: true}
function isPrime(n) {
  // n이 1이면 false, 2, 3이면 true
  if (n <= 1) return false;
  if (n <= 3) return true;

  // n이 4 이상이지만 2, 3의 배수일 경우 false
  if (n % 2 === 0 || n % 3 === 0) return false;

  // highlight-start
  // n이 26 이상이지만 6k+1, 6k-1을 만족하지 않는 경우 false
  for (let i = 5; i * i < n; i = i + 6) {
    // highlight-end
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}

isPrime(17);
// true
isPrime(236213467);
// false
```

<br />

#### n보다 작은 모든 소수

**isPrime**의 로직을 그대로 활용하면 된다. 즉, $O(\sqrt{n})$의 시간복잡도를 갖는 **isPrime**이 $n$번 실행되는 알고리즘이므로 이 경우에도 시간복잡도는 $O(\sqrt{n})$이 된다.

```jsx{numberLines: true}
function allPrimesLessThanN(n) {
  // 소수 판별용 헬퍼함수
  const isPrime = (n) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i < n; i = i + 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  // n보다 작은 소수만 리턴
  let result = [];
  for (let i = 0; i < n; i++) {
    if (isPrime(i)) result.push(i);
  }

  return result;
}

allPrimesLessThanN(4);
// [2, 3]
allPrimesLessThanN(12);
// [2, 3, 5, 7, 11]
```

<br />

#### 소인수분해

**isPrime**의 로직과 비슷할 것으로 생각할 수 있으나, 입력값 $n$이 짝수인 경우와 홀수인 경우를 모두 고려해야 한다. 따라서 n이 적어도 홀수일 경우, 모든 홀수 입력값에 대한 연산이 필요할 수도 있으므로 시간복잡도는 $O(n)$가 된다.

```jsx{numberLines: true}
function primeFactors(n) {
  let primes = [];

  // n이 2의 배수라면, 나눠질 수 있는만큼 2로 인수분해
  while (n % 2 === 0) {
    primes.push(2);
    n = n / 2;
  }

  // highlight-start
  // n이 10 이상의 홀수라면, 홀수(i+2)로 나눠질 수 있는만큼 인수분해
  for (let i = 3; i < n; i = i + 2) {
    // highlight-end
    while (n % i === 0) {
      primes.push(i);
      n = n / i;
    }
  }

  // n이 2보다 큰 소수라면, 그대로 결과배열에 push
  if (n > 2) primes.push(n);

  return primes;
}

primeFactors(9);
// [3, 3]
primeFactors(13252);
// [2, 2, 3313]
```

<br />

#### 소인수가 2 또는 3 또는 5만 존재하는 n개의 소인수집합

이를 위해 각 제수들(2, 3, 5)들로 입력값을 나눠서, 입력값이 1이 될때까지 만드는 작업이 필요하다. 참고로 나눗셈 작업은 $O(log{_{제수}}{피제수})$의 시간복잡도를 갖는다. 이러한 나눗셈 작업이 입력값 $n$만큼 반복되므로 최종 시간복잡도는 $O(nlog{_2}{n})$이 된다.

```jsx{numberLines: true}
function arrayNUglyNumbers(n) {
  // 2, 3, 5 나눗셈 헬퍼 함수
  const isUgly = (number) => {
    while (number % 2 === 0) {
      number = number / 2;
    }
    while (number % 3 === 0) {
      number = number / 3;
    }
    while (number % 5 === 0) {
      number = number / 5;
    }
    return number === 1;
  };

  // 소인수집합 도출
  let counter = 0,
    number = 1,
    result = [];
  while (counter !== n) {
    if (isUgly(number)) {
      counter++;
      result.push(number);
    }
    number++;
  }
  return result;
}

arrayNUglyNumbers(7);
// [1, 2, 3, 4, 5, 6, 8]
arrayNUglyNumbers(10);
// [1, 2, 3, 4, 5, 6, 8, 9, 10, 12]
```

#### 무작위 수 생성

```jsx
Math.floor(Math.random() * 100);
// 0부터 99까지의 정수 중 무작위 생성

Math.round(Math.random() * 25) + 5;
// 5부터 30까지의 정수 중 무작위 생성

Math.ceil(Math.random() * 10) - 100;
// -100부터 -90까지의 정수 중 무작위 생성
```

<br />

#### 모듈러 거듭제곱

**공개키 암호화**를 위해 $base$, $exponent$, $modulus$를 입력값으로 받아, $base{^{exponent}}$ % $modulus$를 계산할 때, 해당 결과값을 적어도 256비트에도 저장할 수 있게 하는 알고리즘은 다음과 같이 코드를 작성함으로써 $O(n)$을 달성할 수 있다.

```jsx{numberLines: true}
function modularExponentiation(base, exponent, modulus) {
  if (modulus === 1) return 0;

  let result = 1;
  for (let i = 0; i < exponent; i++) {
    // highlight-start
    result = (result * base) % modulus;
    // highlight-end
  }

  return result;
}
```

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>

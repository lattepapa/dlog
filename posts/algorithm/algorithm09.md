---
title: "Big 'O'(빅오표기법)"
category: algorithm
path: /algorithm/algorithm09
date: 2021-01-03 10:02:00
---

빅오 표기법은 알고리즘 상 최악의 복잡도를 측정하여 표시하는 방법이다. 이때 $O(N)$에서 $N$은 입력의 개수이다. 즉, 빅오 표기법은 $N$이 무한대로 커질 때 알고리즘의 시간복잡도는 어떻게 되는지 심플하게 요약하고자 하는 방법론이다.

### 빅오의 법칙들

#### 계수 법칙

> _'상수 $k > 0$인 경우 $f(N) = O(g(N))$이면 $kf(N) = O(g(N))$이다'_

이는 빅오에서 입력 크기가 충분히 크다면 시간복잡도의 계수(상수)를 무시할 수 있다는 의미이다. 예를 들어 $3f(N)$인 알고리즘과 $f(N)$인 알고리즘은 모두 $O(N)$이라는 동일한 시간복잡도를 갖는다고 이해할 수 있다.

```jsx
function aCase(n) {
  let count = 0;
  // highlight-start
  // f(n) = n인 알고리즘
  for (let i = 0; i < n; i++) {
    // highlight-end
    count = count + 1;
  }
  return count;
}
```

```jsx
function bCase(n) {
  let count = 0;
  // highlight-start
  // f(n) = 3n인 알고리즘
  for (let i = 0; i < 3 * n; i++) {
    // highlight-end
    count = count + 1;
  }
  return count;
}
```

<br />

#### 합의 법칙

> _'$f(N) = O(h(N))$이고 $g(N) = O(p(N))$이라면 $f(N) + g(N) = O(h(N) + p(N))$이다'_

이는 알고리즘에 서로 다른 알고리즘들이 포함되어 있다면, 두 알고리즘의 시간 복잡도를 더할 수 있다는 의미이다. 예를 들어 $3f(N)$인 알고리즘과 $f(N)$인 알고리즘이 하나의 상위 알고리즘에 속해있다면, 이 상위 알고리즘의 시간복잡도는 $4O(N)$이 된다. 이때 계수 법칙을 적용하여 최종 시간복잡도는 $O(N)$이 된다.

```jsx
function case(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    count = count + 1;
  }
  for (let i = 0; i < 3 * n; i++) {
    count = count + 1;
  }
  return count;
}
```

<br />

#### 곱의 법칙

> _'$f(N) = O(h(N))$이고 $g(N) = O(p(N))$이라면 $f(N)g(N) = O(h(N)p(N))$이다'_

이는 두 개의 중첩 for 루프에 적용되는 의미이다. 예를 들어 $N$번 실행되는 알고리즘에 의해 각 횟수마다 $3N$번 실행되는 알고리즘이 있다면 전체 시간복잡도는 $3N^2$가 된다. 이때 계수 법칙을 적용하여 최종 시간복잡도는 $O(N{^2})$이 된다.

```jsx
function case(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    count = count + 1;
    for (let i = 0; i < 3 * n; i++) {
      count = count + 1;
    }
  }
  return count;
}
```

<br />

#### 교환 법칙

> _'$f(N) = O(g(N))$이고 $g(N) = O(h(N))$이라면 $f(N) = O(h(N))$이다'_

<br />

#### 다항 법칙

> _'$f(N)$이 $k$차 다항식이면 $f(N) = O(N{^k})$이다'_

이는 알고리즘의 입력이 $k$ㅊ 차수를 갖는 것이 시간복잡도의 차수에 반영된다는 의미이다. 예를 들어 $N{^2}$번 실행되는 알고리즘은 $O(N{^2})$의 시간복잡도를 갖는다.

```jsx
function case(n) {
  let count = 0;
  // highlight-start
  // f(n) = n * n인 알고리즘
  for (let i = 0; i < n * n; i++) {
    // highlight-end
    count = count + 1;
  }
  return count;
}
```

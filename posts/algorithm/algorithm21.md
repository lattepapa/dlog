---
title: "동적 프로그래밍(2)"
category: algorithm
path: /algorithm/algorithm21
date: 2021-01-11 17:48:00
---

#### 최장 공통 부분 수열 알고리즘

두 개의 수열이 있을 때 두 수열의 가장 긴 공통 부분 수열의 길이를 찾는다. 이때 부분 수열 내 항목들이 연속일 필요는 없고 순서만 맞으면 된다. 예를 들어 sam, sie, aie와 같은 부분수열은 sammie의 부분 수열이다. 기본적으로 문자열 길이가 $n$일 때 $2^n$개의 부분 수열들이 산출된다.

하지만 아래와 같이 **행렬 메모이제이션**을 활용하면 각 문자열의 길이만큼씩만 순회하면 문제 해결이 간결해진다. 두 수열의 길이보다 1씩 크고 0으로 채워진 메모이제이션 행렬을 만들어서, 두 글자가 서로 같은 $(i, j)$ 쌍을 찾았을 때 해당 자리에 1을 더해놓는다. 그러한 쌍이 생길 때마다 1이 더해진 수를 별도 변수에 저장해놓고 모든 반복 루프가 끝날 때 해당 변수를 반환하면 공통된 부분 수열의 가장 긴 길이가 산출된다.

이러한 방식은 시간복잡도와 공간복잡도 모두 $O(str1의 길이 * str2의 길이)$를 만족한다.

```jsx{numberLines: true}
function longestCommonSequence(str1, str2) {
  // 메모이제이션을 위해 초기값 0으로 항목들이 구성된 행렬을 만든다
  let max = 0,
    // highlight-start
    matrix = Array(str1.length + 1).fill(Array(str2.length + 1).fill(0));
  // highlight-end

  // 두 문자열의 글자들을 차례대로 순회
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      let str1CharIdx = str1.charAt(i - 1),
        str2CharIdx = str2.charAt(j - 1);

      // highlight-start
      if (str1CharIdx === str2CharIdx) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
        max = Math.max(matrix[i][j], max);
      }
      // highlight-end
    }
  }

  return max;
}

longestCommonSequence("macbookpro", "imacpro"); // 6 : macpro
/*
[     i  m  a  c  p  r  o
  [0, 0, 0, 0, 0, 0, 0, 0],
m [0, 0, 1, 0, 0, 0, 0, 0],
a [0, 0, 0, 2, 0, 0, 0, 0],
c [0, 0, 0, 0, 3, 0, 0, 0],
b [0, 0, 0, 0, 0, 0, 0, 0],
o [0, 0, 0, 0, 0, 0, 0, 0],
o [0, 0, 0, 0, 0, 0, 0, 0],
k [0, 0, 0, 0, 0, 0, 0, 0],
p [0, 0, 0, 0, 0, 4, 0, 0],
r [0, 0, 0, 0, 0, 0, 5, 0],
o [0, 0, 0, 0, 0, 0, 0, 6],
]
*/
```

<br />

#### 잔돈 교환 알고리즘

금액 종류가 $S = \{S{_1}, S{_2}, ... , S{_m}\}$으로 $M$개이고, 각 금액의 돈이 무한 개로 제공될 수 있다고 할 때, 금액 $N$을 지폐로 교환하기 위한 조합을 구해야 한다. 예를 들어 $N=4$, $M=3$, $S=\{1,2,3\}$이면 조합 가능한 수는 $\{1,1,1,1\}, \{1,1,2\}, \{2,2\}, \{1,3\}$으로 총 4개이다.

이러한 알고리즘에서 최적 부분 구조는 1) $M$번째 종류의 지폐가 포함되지 않는 경우와, 2) $M$번째 지폐가 최소 한 개 포함되는 경우로 나누어 생각할 수 있다. 이는 곧 $solution = f(S, M-1, N) + f(S, M, N-S{_m})$이라고 볼 수 있다. 단, 조합의 수를 구하는 연산의 특성 상 **중복 부분 문제**가 많이 존재한다는 것을 유념해야 한다. 따라서 이러한 중복 문제를 해결하기 위해, 마찬가지로 **행렬 메모이제이션**을 활용해야 한다. 아래와 같은 방식에 따르면 시간복잡도와 공간복잡도 모두 $O(지폐 종류 * 합계금액)$을 만족한다.

```jsx{numberLines: true}
function countCoinWaysDP(bills, outcome) {
  function helper(bills, outcome) {
    // 0번째 행의 모든 항목만 1인 행렬 메모이제이션을 생성한다
    // 이는 가지고 있는 모든 지폐 종류를 1번씩 사용한 경우를 의미한다
    let matrix = [];

    for (let i = 0; i <= outcome; i++) {
      matrix[i] = [];
      for (let j = 0; j < bills.length; j++) {
        matrix[i][j] = undefined;
      }
    }

    for (let i = 0; i < bills.length; i++) {
      matrix[0][i] = 1;
    }

    // $1부터 주어진 금액한계에 다다를 때까지,
    // 가지고 있는 지폐 종류에 대한 조합을 따져본다.
    for (let i = 1; i < outcome + 1; i++) {
      for (let j = 0; j < bills.length; j++) {
        let temp1 = 0,
          temp2 = 0;

        // highlight-start
        // $i에 다다르기 위해 j번째 종류의 지폐를 조합에 포함하는 경우
        if (i - bills[j] >= 0) temp1 = matrix[i - bills[j]][j];

        // j번째 종류의 지폐를 조합에 포함하지 않는 경우
        if (j >= 1) temp2 = matrix[i][j - 1];

        matrix[i][j] = temp1 + temp2;
        // highlight-end
      }
    }

    return matrix[outcome][bills.length - 1];
  }

  return helper(bills, outcome);
}

let bills = [1, 5, 10],
  outcome = 15;

countCoinWaysDP(bills, outcome); // 6
/*
[지폐 1, 2, 3종 조합
 $0 [1, 1, 1], -> skip
 $1 [1, 1, 1], -> $1에 다다르기 위해
 $2 [1, 1, 1],    $1 => 1가지 종류의 지폐만 사용
 $3 [1, 1, 1],
 $4 [1, 1, 1],
 $5 [1, 2, 2], -> $5에 다다르기 위해
 $6 [1, 2, 2],    $1*5, $5
 $7 [1, 2, 2],      => 2가지 종류의 지폐로 조합 가능하며,
 $8 [1, 2, 2],         경우의 수는 총 2가지
 $9 [1, 2, 2],
$10 [1, 3, 4], -> $10에 다다르기 위해
$11 [1, 3, 4],    $1*10, $1*5+$5, $5*2, $10
$12 [1, 3, 4],      => 3가지 종류의 지폐로 조합 가능하며,
$13 [1, 3, 4],         경우의 수는 총 4가지
$14 [1, 3, 4],
$15 [1, 4, 6]  -> $15에 다다르기 위해
]                 $1*15, $1*5+$5*2, ...
                    => 3가지 종류의 지폐로 조합 가능하며,
                       경우의 수는 총 6가지
*/
```

<br />

#### 편집 거리 알고리즘(Levenshtein)

레벤슈타인 거리 알고리즘이라고도 한다. 길이가 $m$인 문자열 str1과 길이가 $n$인 문자열 str2가 주어졌을 때, str1을 str2로 변환하기 위한 최소 편집 횟수를 구하는 문제이다.

최적 부분 구조는 1) 문자가 모두 동일하여 아무 연산도 하지 않는 경우와, 2) $m$과 $n-1$번째 문자의 삽입, $m-1$과 $n$번째 문자의 제거, $m-1$과 $n-1$번째 문자의 교환을 하는 경우이다.

이 문제도 위와 마찬가지로 **행렬 메모이제이션**을 활용하여 계산된 부분 문제의 결과를 저장해둠으로써 시간복잡도와 공간복잡도의 효율을 모두 $O(m * n)$으로 증대시킬 수 있다.

```jsx{numberLines: true}
function editDistanceDP(str1, str2) {
  // 헬퍼
  const helper = (str1, str2) => {
    let matrix = [];
    for (let i = 0; i < str1.length + 1; i++) {
      matrix[i] = [];
      for (let j = 0; j < str2.length + 1; j++) {
        matrix[i][j] = undefined;
      }
    }

    for (let i = 0; i < str1.length + 1; i++) {
      for (let j = 0; j < str2.length + 1; j++) {
        // str1이 빈 문자인 경우 str2의 모든 문자를 삽입
        if (i === 0) matrix[i][j] = j;
        // str2가 빈 문자인 경우 str1의 모든 문자를 삽입
        else if (j === 0) matrix[i][j] = i;
        // str1과 str2가 동일한 문자인 경우 추가 비용없다!
        else if (str1[i - 1] === str2[j - 1])
          matrix[i][j] = matrix[i - 1][j - 1];
        // str1과 str2가 다르면
        // 같아질 때까지 삽입, 제거, 교환을 재귀적으로 수행
        else {
          let insert = matrix[i][j - 1],
            remove = matrix[i - 1][j],
            replace = matrix[i - 1][j - 1];

          matrix[i][j] = 1 + Math.min(insert, remove, replace);
        }
      }
    }

    return matrix[str1.length][str2.length];
  };

  return helper(str1, str2);
}

editDistanceDP("macbookpro", "imacpro"); // 5
/*
[        i   m   a   c   p   r   o
   [ 0,  1,  2,  3,  4,  5,  6,  7],
 m [ 1,  1,  1,  2,  3,  4,  5,  6],
 a [ 2,  2,  2,  1,  2,  3,  4,  5],
 c [ 3,  3,  3,  2,  1,  2,  3,  4],
 b [ 4,  4,  4,  3,  2,  2,  3,  4],
 o [ 5,  5,  5,  4,  3,  3,  3,  3],
 o [ 6,  6,  6,  5,  4,  4,  4,  3],
 k [ 7,  7,  7,  6,  5,  5,  5,  4],
 p [ 8,  8,  8,  7,  6,  5,  6,  5],
 r [ 9,  9,  9,  8,  7,  6,  5,  6],
 o [10, 10, 10,  9,  8,  7,  6,  5]
]
*/
```

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>

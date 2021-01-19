---
title: "다양한 시간복잡도"
category: algorithm
path: /algorithm/algorithm23
date: 2021-01-14 12:34:00
---

1차원 배열에서 연속된 부분 구간 중 그 합이 최대인 구간을 찾는 문제에 대해 아래와 같이 다양한 시간복잡도의 풀이를 가질 수 있다.

#### 시간복잡도 $O(n^3)$인 알고리즘

주먹구구식 알고리즘으로 최악의 시간복잡도를 갖는다.

```jsx
function maxSum(array) {
  let N = array.length,
    result = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      // 구간 Array[i..j]의 합을 구한다
      let sum = 0;
      for (let k = i; k <= j; k++) {
        sum = sum + array[k];
      }
      // 구간 Array[i..j]의 합과 기존 result 값 중
      // 큰 값을 result에 새로 저장한다
      result = Math.max(result, sum);
    }
  }
  return result;
}
```

<br />

#### 시간복잡도 $O(n^2)$인 알고리즘

이동평균을 구하는 방식, 즉, 기존에 계산한 평균값에 최근 항목을 더하는 방식을 응용하며 전형적인 중첩 반복 루프의 시간복잡도를 갖는다.

```jsx
function maxSum(array) {
  let N = array.length,
    result = 0;
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = i; j < N; j++) {
      // 구간 Array[i..j]의 합을 구한다
      sum = sum + array[j];
      // 구간 Array[i..j]의 합과 기존 result 값 중
      // 큰 값을 result에 새로 저장한다
      result = Math.max(result, sum);
    }
  }
  return result;
}
```

<br />

#### 시간복잡도 $O(nlog{_2}{n})$인 알고리즘

재귀 호출과 탐욕법을 통해 구현한 분할 정복 알고리즘이며, 단축된 시간복잡도와 반대로 공간복잡도(콜 스택)의 증가를 막을 수 없다.

```jsx
function maxSum(array) {
  function fasterHelper(array, low, high) {
    // 기저조건 : 길이가 1인 경우
    if (low === high) return array[0];

    // 구간분할 : array[low..mid]와 array[mid+1..high]
    let mid = (low + high) / 2;

    // 각 구간별 최대 합 정의
    let leftMax = 0;
    let sum = 0;
    for (let i = mid; i >= low; i--) {
      sum = sum + array[i];
      leftMax = Math.max(leftMax, sum);
    }

    let rightMax = 0;
    sum = 0;
    for (let j = mid + 1; j <= high; j++) {
      sum = sum + array[j];
      rightMax = Math.max(rightMax, sum);
    }

    // 최대 합이 어느 한 구간에만 속한 경우,
    // 최대 합이 큰 경우를 재귀호출로 찾는다
    let singleMax = Math.max(
      fasterHelper(array, low, mid),
      fasterHelper(array, mid + 1, high)
    );

    // 최종 결과 반환
    return Math.max(leftMax, rightMax, singleMax);
  }

  return fasterHelper(array, 0, array.length - 1);
}
```

<br />

#### 시간복잡도 $O(n)$인 알고리즘

점화식 $sum(i) = $ Math.max$(0, sum(i-1)) + $ array[$i$]으로 도출되는 동적계획법을 활용하여, 시간복잡도와 공간복잡도에서의 적절한 효율을 달성한다.

```jsx
function maxSum(array) {
  let N = array.length,
    result = 0,
    sumPre = 0;
  for (let i = 0; i < N; i++) {
    // array[i]에서 끝나는 최대 합 부분 구간은
    // 항상 array[i] 하나만으로 구성되어 있거나,
    // array[i-1]를 마지막 항목으로 갖는 최대 합 부분 구간에 array[i]를 더한 것
    // highlight-start
    sumPre = Math.max(sumPre, 0) + array[i];
    result = Math.max(sumPre, result);
    // highlight-end
  }
  return result;
}
```

<br />

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "프로그래밍 대회에서 배우는 알고리즘 문제해결 전략"(구종만님, 인사이트)_</text>

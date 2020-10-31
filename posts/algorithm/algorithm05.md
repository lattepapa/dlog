---
title: "버블정렬"
category: algorithm
path: /algorithm/algorithm05
date: 2020-10-31 21:26:00
---

#### 문제

배열을 인자로 받아 그것의 엘리먼트들을 크기 순서대로 정렬한 배열을 반환하라. (
단, 자바스크립트의 내장 함수 Array.prototype.sort는 사용 금지)

<br>

#### Reference

```jsx{numberLines: true}
const bubbleSort = (array) => {
  if (typeof array !== "object" && !Array.isArray(array)) {
    throw TypeError("입력된 파라미터가 배열이 아닙니다.");
  }

  for (let i = 0; i < array.length - 1; i++) {
    // highlight-start
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
    // highlight-end
  }

  return array;
};
```

<br>

버블정렬은 시간복잡도 $O(n{^2})$를 가지며, 그 기본적인 알고리즘적 특성에도 불구하고 현실세계에서는 많이 쓰이지 않는다고 한다. 왜냐하면 시간복잡도 상, 모든 경우에 있어서 주어진 자료의 모든 길이를 동일하게 순회해야 하기 때문이다.

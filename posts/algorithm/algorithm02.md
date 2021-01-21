---
title: "행렬회전"
category: algorithm
path: /algorithm/algorithm02
date: 2020-10-25 15:07:00
---

#### 문제

주어진 행렬이 정사각형($i {=} j$) 행렬이든 직사각형($i {=}\mathllap{/\,} j$) 행렬이든지에 상관없이, $90{\degree}$의 시계방향 또는 반시계방향 회전이 가능한 함수를 작성하라.

#### Reference

```jsx{numberLines: true}
const rotateMatrix = (matrix, direction) => {
  // 기본조건 수립
  direction = direction || 1;
  let result = [];
  // highlight-start
  let m = matrix.length,
    n = matrix[0] && matrix[0].length;
  // highlight-end

  for (let i = 0; i < n; i++) {
    result[i] = [];
    for (let j = 0; j < m; j++) {
      // 시계방향 90도 회전일 경우
      if (direction > 0) {
        result[i][j] = matrix[m - j - 1][i];
      }
      // 반시계방향 90도 회전일 경우
      else if (direction < 0) {
        result[i][j] = matrix[j][n - i - 1];
      }
    }
  }

  return result;
};
```

<br>

참고로 위의 3~5번째 줄의 기본조건 수립은 문제 해결에 반드시 필요하다. 파라미터 **direction**의 정의가 없다면 행렬 회전을 규정할 수 없게 된다. 또한 5~6번째 줄과 같은 변수 **m과 n의 동시 정의**가 없다면 직사각형 행렬 및 빈 행렬($i {=} j {=} 0$)의 처리가 불가능해진다.

반면, 파라미터 **direction**을 시계방향과 반시계방향의 두가지 옵션을 다룰 수 있게 됨으로써 이 **rotateMatrix** 함수를 통해 $90{\degree}$의 시계방향 회전뿐만 아니라 $270{\degree}$의 시계방향 회전의 결과도 간단히 도출할 수 있게 된다.

<br>

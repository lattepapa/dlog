---
title: "크레인 인형뽑기"
category: algorithm
path: /algorithm/algorithm14
date: 2021-01-07 15:14:00
---

#### Programmers 문제

| 1. 제한사항                                                                          |
| ------------------------------------------------------------------------------------ |
| board 배열은 2차원 배열로, 크기는 "5 X 5" 이상 "30 X 30" 이하이다.                   |
| board 각 칸에는 정수가 있는데 0은 빈칸, 1 ~ 100은 인형, 같은 숫자는 같은 인형을 의미 |
| moves 배열의 크기는 1 이상 1,000 이하                                                |
| moves 배열의 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수        |

| 2. 입출력 예                                                  |                   |        |
| ------------------------------------------------------------- | ----------------- | ------ |
| board                                                         | moves             | result |
| [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]] | [1,5,3,5,1,2,1,4] | 4      |

```
moves = [1,5,3,5,1,2,1,4]

board = [
   1 2 3 4 5
 -------------
  [0,0,0,0,0],
  [0,0,1,0,3],
  [0,2,5,0,1],
  [4,2,4,4,2],
  [3,5,1,3,1]
]

basket = [4,3,1,1,3,2,0,4]
=> crash! (1,1,3,3)
=> basket = [4,2,4],
   result = 4
```

<br />

이 문제를 풀기 위해, 주어진 board 배열을 **시계방향으로 90도 회전**을 시켜본다. m행 n열인 이차원배열의 회전은 $O(mn)$의 시간복잡도와 $O(1)$의 공간복잡도를 만족한다. 이에 따라 입출력 예에 제시된 board 배열을 시계방향 90도 회전시키면 다음과 같다.

```jsx
// highlight-start
let L = board.length - 1;
// highlight-end
for (let x = 0; x < L; x++) {
  for (let y = 0; y < L - x; y++) {
    let temp = board[x][y];
    board[x][y] = board[L - y][x];
    board[L - y][x] = board[L - y][L - x];
    board[L - y][L - x] = board[y][L - x];
    board[y][L - x] = temp;
  }
}
```

```
board = [
  [3,4,0,0,0],
  [5,2,2,0,0],
  [1,4,5,1,0],
  [3,4,0,0,0],
  [1,2,1,3,0]
]
```

<br />

이제 이 board 배열에서 크레인이 행을 선택하면, 해당 행에서 0이 아닌 마지막 항목이 뽑히게 될 것이다. 0이 있어서 불편하므로 보다 편리하게 작업할 수 있도록 각 행들에서 0이 빠진 배열을 새롭게 도출하자.

```jsx
let newBoard = board.map((row) => row.filter((doll) => doll !== 0));
```

```
board = [
  [3,4],
  [5,2,2],
  [1,4,5,1],
  [3,4],
  [1,2,1,3]
]
```

<br />

이제 moves 배열의 항목에 따라 newBoard 배열의 해당 행에서 가장 끝 항목을 뽑으면 된다. 뽑힌 항목들이 basket에 쌓일 때, 같은 인형이면 터뜨려짐에 유의하자.

```jsx
let answer = 0,
  basket = [];

for (let i = 0; i < moves.length; i++) {
  // moves 배열의 항목에 해당하는 행의 가장 끝 인형을 집어서
  let picked = newBoard[moves[i] - 1].pop();
  // 바구니에 담는다
  picked !== undefined && basket.push(picked);

  // 이렇게 바구니에 바로 쌓이게 될텐데
  for (let j = 0; j < basket.length; j++) {
    // 바구니에 담은 인형이 바로 전 인형과 같다면 터뜨린다!
    if (basket[j - 1] === basket[j]) {
      answer += 2;
      // highlight-start
      stack.pop();
      stack.pop();
      // highlight-end
    }
  }
}
```

<br />

전체코드를 정리하면 다음과 같다.

```jsx{numberLines: true}
function solution(board, moves) {
  let L = board.length - 1;

  for (let x = 0; x < L; x++) {
    for (let y = 0; y < L - x; y++) {
      let temp = board[x][y];
      board[x][y] = board[L - y][x];
      board[L - y][x] = board[L - y][L - x];
      board[L - y][L - x] = board[y][L - x];
      board[y][L - x] = temp;
    }
  }

  let newBoard = board.map((row) => row.filter((doll) => doll !== 0));

  let answer = 0,
    basket = [];

  for (let i = 0; i < moves.length; i++) {
    let picked = newBoard[moves[i] - 1].pop();
    picked !== undefined && basket.push(picked);

    for (let j = 0; j < basket.length; j++) {
      if (basket[j - 1] === basket[j]) {
        answer += 2;
        stack.pop();
        stack.pop();
      }
    }
  }

  return answer;
}
```

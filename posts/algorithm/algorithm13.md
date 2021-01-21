---
title: "배열과 알고리즘(2)"
category: algorithm
path: /algorithm/algorithm13
date: 2021-01-06 21:46:00
---

### 배열 알고리즘

#### 합쳐서 어떤 수가 나오는 배열의 항목 쌍 찾기

예를들어 [1,2,3,4,5,6,7,8,9]와 9가 인자로 주어질 때, 합쳐서 9가 나오는 수는 2와 7, 3과 6, 4와 5의 조합이 있다. 간단히 이중 for 루프를 이용할 수 있다. 이중 for 루프는 시간복잡도에서 손해($O(n{^2})$)가 있어도, 공간복잡도에서는 유리하다($O(1)$).

이를 보완하는 방법으로는 **해시테이블**을 이용하는 것이 있다. 해시테이블에 값을 저장하기 위해서 최대 $O(n)$의 시간복잡도가 소요되며, 이 해시테이블에서 값을 검색하는데에도 $O(n)$의 공간복잡도가 소요된다.

```jsx{numberLines: true}
function findSumBetter(arr, num) {
  let hashtable = {};

  for (let i = 0; i < arr.length; i++) {
    let diff = num - arr[i];
    // highlight-start
    if (!hashtable[diff] && arr.includes(diff)) {
      hashtable[arr[i]] = diff;
    }
    // highlight-end
  }

  let result = [];
  if (hashtable) {
    for (let key in hashtable) {
      result.push([Number(key), hashtable[key]]);
    }
    return result;
  }
  return undefined;
}

findSumBetter([1, 2, 3, 4, 5, 6, 7, 8, 9], 9);
// [[1, 8], [2, 7], [3, 6], [4, 5]];
```

<br />

#### 크기가 동일한 두 배열의 중앙값 찾기

예를들어 오름차순 정렬된 [1,2,3]과 [2,3,5]이 인자로 주어질 경우, 중앙값인 2.5를 반환해야 한다. 단, 배열의 길이가 짝수일 경우를 고려해야 하는데 이 경우 중앙값은 **두 개의 중간 숫자의 평균**이 된다. 배열의 길이가 짝수일 경우를 고려해야 하는 이유는, 두 배열이 그 길이가 같다면 두 배열의 전체 길이는 반드시 짝수이기 때문이다.

물론 아래의 알고리즘은 정말 전체 길이에 다다를 때까지 모든 항목을 순회하는 것이 아니다. 1) 중앙값이 더 큰 배열을 반으로 나누어 2) 절반 중 큰쪽을 다시 재귀적으로 중앙값 계산을 한다. 따라서 시간복잡도는 $O(log{_2}{n})$이 될 것이다.

```jsx{numberLines: true}
function median(arr1, arr2, length) {
  // 중앙항목 도출 헬퍼함수
  const med = (arr) => {
    if (arr.length % 2 === 1) return arr[Math.floor(arr.length / 2)];
    return (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
  };

  // 두 배열의 길이가 2 이하일 경우
  if (length <= 0) return -1;
  if (length === 1) return (arr1[0] + arr2[0]) / 2;
  if (length === 2)
    return (Math.max(arr1[0], arr2[0]) + Math.min(arr[1], arr2[1])) / 2;

  // 두 배열의 길이가 3 이상일 경우
  let median1 = med(arr1),
    median2 = med(arr2);

  // highlight-start
  let isEven = length % 2 === 0 ? 1 : 0,
    shorten = Math.floor(length / 2) - isEven,
    newLength = length - Math.floor(length / 2) + isEven;

  if (median1 === median2) return median1;
  if (median1 < median2)
    return median(arr1.slice(shorten), arr2.slice(0, -shorten), newLength);
  if (median1 > median2)
    return median(arr2.slice(shorten), arr1.slice(0, -shorten), newLength);
  // highlight-end
}

median([1, 2, 3], [4, 5, 6], 3); // 3.5
median([1, 2, 3], [2, 3, 5], 3); // 2.5
median([11, 23, 24], [32, 33, 450], 3); // 28
```

<br />

#### k개의 정렬된 배열에서 공통항목 찾기

이차원배열이 인자로 주어질 때 각 배열에 반복 접근하되, 각 배열에서 반복된 항목이 있는 경우 해당 항목은 1개가 있는 것으로 간주한다. 이러한 조건을 바탕으로 해시테이블을 통해 어떤 항목이 공통적으로 등장하는 지 확인할 수 있다. 해시테이블을 활용하므로 공간복잡도는 $O(n)$이다. 또한 시간복잡도는 주어진 배열 중 가장 길이가 긴 것에 따라 $O(kn)$이 된다.

```jsx{numberLines: true}
function commonElements(kArray) {
  // 해시테이블, 임시변수들을 선언
  let hashmap = {},
    last = "",
    answer = [];

  // 이차원배열을 새로 접근할 때 last 변수값을 ""로 초기화
  for (let currentArray of kArray) {
    last = "";

    for (let currentElement of currentArray) {
      // highlight-start
      if (last !== currentElement) {
        !hashmap[currentElement]
          ? (hashmap[currentElement] = 1)
          : (hashmap[currentElement] += 1);
      }
      // highlight-end

      last = currentElement;
    }
  }

  // highlight-start
  // 해시테이블의 key-value가 이차원배열의 길이와 같다면
  // 이차원배열 내 모든 배열에 공통으로 존재했다는 의미
  for (let prop in hashmap) {
    if (hashmap[prop] === kArray.length) answer.push(parseInt(prop));
  }
  // highlight-end

  return answer;
}

commonElements([
  [1, 2, 3],
  [1, 2, 3, 4, 5],
  [1, 2],
]); // [1, 2]
```

<br />

#### 나선형 출력

![spiral](https://user-images.githubusercontent.com/67884699/104085622-53d46d00-5294-11eb-99e0-4910981cd0ed.jpg)  
다음과 같이 나선형 순서로 항목들을 출력하고자 한다. 이를 위해 문제를 쪼개어 생각하면, 1) 왼쪽에서 **오른쪽으로** 출력하는 것, 2) 위에서 **아래로** 출력하는 것, 3) 오른쪽에서 **왼쪽으로** 출력하는 것, 4) 아래에서 **위로** 출력하는 것, 5) 그리고 이 네가지 연산에 조건을 거는 것으로 구분할 수 있다. 따라서 이 네가지 경우에 따른 결과를 각각 저장할 변수를 설정하여 제어한다면, $O(kn)$의 시간복잡도와 $O(1)$의 공간복잡도로 알고리즘을 구현할 수 있다.

```jsx{numberLines: true}
function spiralPrint(kArr) {
  // highlight-start
  // 지붕 행, 오른쪽 열, 바닥 행, 왼쪽 열을 인덱스를 기준으로 정의한다
  let topRow = 0,
    rightCol = kArr[0].length - 1,
    bottomRow = kArr.length - 1,
    leftCol = 0;
  // highlight-end

  let result = [];
  while (topRow < bottomRow && leftCol < rightCol) {
    // 먼저 지붕 행에서, 왼쪽에서 오른쪽으로 항목들을 차례로 담는다
    for (let j = 0; j <= rightCol; j++) {
      result.push(kArr[topRow][j]);
    }
    topRow++;

    // 그 다음 오른쪽 열에서, 위에서 아래로 항목들을 차례로 담는다
    for (let i = topRow; i <= bottomRow; i++) {
      result.push(kArr[i][rightCol]);
    }
    rightCol--;

    // 나선형 접근이 안끝났다면 아래와 같이 이어서 접근을 지속한다
    // 바닥 행에서, 오른쪽에서 왼쪽으로 항목들을 역순으로 담는다
    if (topRow <= bottomRow) {
      for (let j = rightCol; j >= 0; j--) {
        result.push(kArr[bottomRow][j]);
      }
      bottomRow--;
    }

    // 나선형 접근이 안끝났다면 아래와 같이 이어서 접근을 지속한다
    // 왼쪽 열에서, 아래에서 위로 항목들을 역순으로 담는다
    if (leftCol <= rightCol) {
      for (let i = bottomRow; i > topRow; i--) {
        result.push(kArr[i][leftCol]);
      }
      leftCol++;
    }
  }

  return result;
}

spiralPrint([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
]);
// [1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12, 11];
```

<br />

#### Tic-Tac-Toe

틱택토 게임의 승패를 예측하기 위해선 $3*3$의 가변배열(jagged array)을 for 루프로 접근해야 한다. 세 행을 모두 확인한 후, 대각선을 확인한다.

```jsx{numberLines: true}
function ticTacToe(board, player) {
  // highlight-start
  // 행을 확인하는 헬퍼함수
  const checkRow = (row, player) => {
    for (let i = 0; i < 3; i++) {
      if (row[i] !== player) return false;
    }
    return true;
  };

  // 열을 확인하는 헬퍼함수
  const checkCol = (board, j, player) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][j] !== player) return false;
    }
    return true;
  };
  // highlight-end

  // 행과 열에서 이길 수 있는 경우
  let winRow =
    checkRow(board[0], player) ||
    checkRow(board[1], player) ||
    checkRow(board[2], player);

  let winCol =
    checkCol(board, 0, player) ||
    checkCol(board, 1, player) ||
    checkCol(board, 2, player);

  // 대각선에서 이길 수 있는 경우
  let diagonalWin1 =
    board[0][0] === player && board[1][1] === player && board[2][2] === player;

  let diagonalWin2 =
    board[0][2] === player && board[1][1] === player && board[2][0] === player;

  // 승패예측
  return winRow || winCol || diagonalWin1 || diagonalWin2;
}

ticTacToe(
  [
    ["o", "-", "x"],
    ["-", "o", "-"],
    ["-", "x", "o"],
  ],
  "x"
);
// false
```

<br />

#### 길 찾기

![maze](https://user-images.githubusercontent.com/67884699/104087115-c9463a80-52a0-11eb-93fa-053e2fdab7d3.jpg)  
위의 그림과 같은 형태로 배열이 인자로 주어질 때, 현재 'x'에 위치할 때 출구인 'e'로 나가는 길을 탐색한다. m행 n열인 이차원배열임을 가정한다면 시간복잡도는 $O(mn)$, 공간복잡도는 $O(1)$을 만족한다.

```jsx{numberLines: true}
// highlight-start
// 미로 배열설정(1): 행을 나누고
let arr = "%e%%%%%%%%%\n%...%.%...%\n%.%.%.%.%%%\n%.%.......%\n%%%..%%.%.%\n%.%.%%..%.%\n%%%%%%%%%x%".split(
  "\n"
);

// 미로 배열설정(2): 행(row)마다 열을 나눈다(split)
let maze = arr.map((row) => row.split(""));
// highlight-end

function pathFinder(maze) {
  // 문자 'x', 'e'를 찾아주는 헬퍼 함수
  const findStr = (str, maze) => {
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[0].length; j++) {
        if (maze[i][j] === str) return [i, j];
      }
    }
  };

  // 미로 행렬을 다시 문자로 출력해주는 헬퍼 함수
  const printMaze = (maze) => {
    let result = "";
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[0].length; j++) {
        result += maze[i][j];
      }
      result += "\n";
    }
    console.log(result);
  };

  // 결과 출력
  let start = findStr("e", maze),
    end = findStr("x", maze);
  path(start[0], start[1]);

  // 상, 하, 좌, 우를 재귀적으로 확인해주는 헬퍼 함수
  function path(i, j) {
    // 미로 범위를 벗어나는 경우
    if (i > maze.length - 1 || j > maze[0].length - 1 || i < 0 || j < 0)
      return false;

    // 올바른 길을 찾은 경우
    if (i === end[0] && j === end[1]) return true;

    // 길이 아니라 벽(%)이거나, 현재 위치(+)인 경우
    if (maze[i][j] === "%" || maze[i][j] === "+") return false;

    // 현재 위치를 표시
    maze[i][j] = "+";
    printMaze(maze);

    // 현재 위치의 상, 하, 좌, 우가 올바른 길인 경우
    if (path(i, j - 1) || path(i + 1, j) || path(i, j + 1) || path(i - 1, j))
      return true;

    maze[i][j] = ".";
    return false;
  }
}

pathFinder(maze);
/*

  %+%%%%%%%%%
  %...%.%...%
  %.%.%.%.%%%
  %.%.......%
  %%%..%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+..%.%...%
  %.%.%.%.%%%
  %.%.......%
  %%%..%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+..%.%...%
  %+%.%.%.%%%
  %.%.......%
  %%%..%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+..%.%...%
  %+%.%.%.%%%
  %+%.......%
  %%%..%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %++.%.%...%
  %.%.%.%.%%%
  %.%.......%
  %%%..%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%.%.%.%%%
  %.%.......%
  %%%..%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%.......%
  %%%..%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+......%
  %%%..%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+......%
  %%%+.%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+......%
  %%%+.%%.%.%
  %.%+%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+......%
  %%%++%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%++.....%
  %%%++%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+++....%
  %%%++%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%++++...%
  %%%++%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+++++..%
  %%%++%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+++++..%
  %%%++%%+%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+++++..%
  %%%++%%+%.%
  %.%.%%.+%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+++++..%
  %%%++%%+%.%
  %.%.%%++%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%++++++.%
  %%%++%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+++++++%
  %%%++%%.%.%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+++++++%
  %%%++%%.%+%
  %.%.%%..%.%
  %%%%%%%%%x%

  %+%%%%%%%%%
  %+++%.%...%
  %.%+%.%.%%%
  %.%+++++++%
  %%%++%%.%+%
  %.%.%%..%+%
  %%%%%%%%%x%

*/
```

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>

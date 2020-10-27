---
title: "가위바위보"
category: algorithm
path: /algorithm/algorithm04
date: 2020-10-26 21:31:00
---

#### 문제

삼세판 이상의 게임(판, round) 당 낼 수 있는 가위, 바위, 보의 경우의 수를 구하여 리턴하라.

<br>

#### Reference

```jsx{numberLines: true}
const rockScissorsPaper = (rounds) => {
  // 기본세팅
  rounds = rounds || 3;
  let result = [];
  let option = ["rock", "scissors", "paper"];

  // 판 수에 따른 공격옵션 경우의 수 도출
  let recursive = (rounds, []) => {
    if (rounds === 0) {
      result.push([]);
      return;
    } else {
      // highlight-start
      for (let i = 0; i < option.length; i++) {
        recursive(rounds - 1, [].concat(option[i]));
      }
      // highlight-end
    }
  };

  // 최종결과 리턴
  recursive(rounds, []);
  return result;
};
```

<br>

코드의 13~15번째 줄과 같이 재귀를 활용해야 가위바위보 경우의 수 나열을 완성할 수 있다. 또한, 9~10번째 줄은 이 재귀함수의 탈출조건(round = 0이면 return하고 끝)이 된다.

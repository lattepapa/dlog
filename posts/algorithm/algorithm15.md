---
title: "다리를 지나는 트럭"
category: algorithm
path: /algorithm/algorithm15
date: 2021-01-08 23:42:00
---

#### Programmers 문제

아래와 같이 길이가 bridge_length인 다리에, 길이가 1인 트럭들이 지나가려고 한다.

| 0. 문제  |                  |                         |                |
| -------- | ---------------- | ----------------------- | -------------- |
| 시간(초) | 다리를 건넌 트럭 | 다리를 건너고 있는 트럭 | 대기 중인 트럭 |
| 0        | []               | []                      | [7,4,5,6]      |
| 1~2      | []               | [7]                     | [4,5,6]        |
| 3        | [7]              | [4]                     | [5,6]          |
| 4        | [7]              | [4,5]                   | [6]            |
| 5        | [7,4]            | [5]                     | [6]            |
| 6~7      | [7,4,5]          | [6]                     | []             |
| 8        | [7,4,5,6]        | []                      | []             |

| 1. 제한사항                               |
| ----------------------------------------- |
| bridge_length는 1 이상 10,000 이하        |
| weight는 1 이상 10,000 이하               |
| truck_weights의 길이는 1 이상 10,000 이하 |
| 모든 트럭의 무게는 1 이상 weight 이하     |

| 2. 입출력 예  |        |                                 |
| ------------- | ------ | ------------------------------- |
| bridge_length | weight | truck_weights                   | return |
| 2             | 10     | [7,4,5,6]                       | 8 |
| 100           | 100    | [10]                            | 101 |
| 100           | 100    | [10,10,10,10,10,10,10,10,10,10] | 110 |

<br />

**큐**(queue)의 원리를 활용하여 풀어낸다.

```jsx{numberLines: true}
function solution(bridge_length, weight, truck_weights) {
  let answer = 0,
    bridge = [],
    weightSum = 0;

  // 대기 중인 트럭이 있거나 다리 위에 트럭이 있는 동안 반복한다
  while (truck_weights.length > 0 || bridge.length > 0) {
    answer++;
    let truck = truck_weights[0];

    // 트럭이 다리 건너기를 완료한 경우
    if (
      bridge[0] &&
      // highlight-start
      // 다리에 올라선 시점(entryTime)과 다리 길이를 더한 값은
      // 현재 시각(answer)가 된다
      bridge[0].entryTime + bridge_length === answer
      // highlight-end
    ) {
      let arrivedTruck = bridge.shift();
      weightSum -= arrivedTruck.weight;
    }

    // 트럭이 다리를 건너는 경우
    if (weightSum + truck <= weight) {
      weightSum += truck;
      // highlight-start
      // 다리를 건너는 트럭, 즉,
      // bridge의 각 항목은 { 진입시각, 무게 }의 해시정보로 구성된다
      bridge.push({ entryTime: answer, weight: truck });
      // highlight-end
      truck_weights.shift();
    }
  }
  return answer;
}
```

<br />
<img width="796" alt="kakao result" src="https://user-images.githubusercontent.com/67884699/104095592-147d3f00-52db-11eb-8854-30a77cc8928e.png">

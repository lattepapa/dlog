---
title: "프린터"
category: algorithm
path: /algorithm/algorithm16
date: 2021-01-09 23:50:00
---

#### Programmers 문제

_1) 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다._  
_2) 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다._  
_3) 그렇지 않으면 J를 인쇄합니다._

위의 규칙을 갖는 프린터를 통해, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고자 한다.

| 1. 제한사항                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------- |
| 현재 대기목록에는 1개 이상 100개 이하의 문서가 존재                                                                              |
| 인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻                                                                  |
| location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현 |

| 2. 입출력 예       |          |        |
| ------------------ | -------- | ------ |
| priorities         | location | return |
| [2, 1, 3, 2]       | 2        | 1      |
| [1, 1, 9, 1, 1, 1] | 0        | 5      |

<br />

**큐**(queue)의 원리를 활용하여 풀어낸다. 이때, 어차피 priorities 배열에서 가장 큰 항목이 아니라면 가장 앞에 있는 문서는 자동으로 프린터 출력 대기열의 가장 뒷 순서로 들어가게 된다. 이 반복이 수행된 후, isLocation 속성값이 true인 항목이 나올 때까지 answer에 1을 반복적으로 더한다. 최종 코드는 아래와 같다.

```jsx{numberLines: true}
function solution(priorities, location) {
  let answer = 0,
    hashtable = priorities.map((el, i) => ({
      value: el,
      // highlight-start
      // location과 일치하는 인덱스일 때만 true가 된다
      isLocation: i === location,
      // highlight-end
    }));

  while (true) {
    let doc = hashtable.shift();
    if (hashtable.some((prop) => prop.value > doc.value)) hashtable.push(doc);
    // highlight-start
    else {
      answer++;
      if (doc.isLocation) return answer;
    }
    // highlight-end
  }
}
```

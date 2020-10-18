---
title: "while 반복문"
category: javascript
path: /javascript/mil02
date: 2020-08-05 23:00:01
---

> _'The **while** statement creates a loop that executes a specified statement **as long as the test condition evaluates to true**.'_ - **MDN**

**반복문**(loop)은 반복의 조건(condition)이 true일 때까지만 특정명령(statement)을 반복적으로 실행한다. 반복문은 **for**, **while**라는 문법적 키워드를 사용하거나 **forEach**라고 하는 **함수형 구문**을 통해 구동한다. 특히, **while** 반복문은 2가지 이상의 변수를 고려해야 할 때 매우 심플하게 활용된다.
<br>
<br>
<br>

#### 1. 은행에서 연 고정금리로 운용하는 적금상품이 있다. 이 상품은 원금을 최초에 한 번 불입하면 추가로 적금을 넣을 수 없는 특이한 점이 있다. 이 적금상품에서 최초에 불입한 원금이 2배가 될 때까지 걸리는 시간(연)을 구하고자 한다.

```jsx{numberLines: true}
function doubledTime(rate) {
  // [더이상 쪼갤 수 없는 것] 원금을 불입한 당해년도는 원리금 계산 불가
  let account = 1;
  let duration = 0;

  // [1] 원리금이 그 초기값인 1의 2배가 되기 직전까지 원리금 계산을 반복하는데
  // [2] 원리금 계산을 마치면 다음 loop에 들어가기 전에 기간에 +1
  // highlight-start
  while (account < 2) {
    account = account * (1 + rate / 100);
    duration++;
  }
  // highlight-end

  // 최종값 리턴
  return duration;
}
```

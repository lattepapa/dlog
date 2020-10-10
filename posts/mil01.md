---
title: Pseudocoding
category: javascript
path: /mil01
date: 2020-10-10 00:00:00
---

last Month what I Learned, 그 첫번째.
<br>

### Pseudocode

> _"**Pseudocode** refers to code-like syntax that is generally used to **indicate to humans how some code syntax works**, or illustrate the design of an item of code architecture. It won't work if you try to run it as code."_ - [**MDN**](https://developer.mozilla.org/en-US/docs/Glossary/Pseudocode)

의사코드란, 프로그램이 코드로 구현될 방향을 인간의 언어로 미리 설명한 것이다. 딱 봐도 의사코드로 기초방향성을 잘 설계해두어야 하지 않을까?
<br>

#### 1. 미시경제학 교수님이 1학기 중간고사 성적을 A+(~100점), A(95점), A-(~94점), B+(~89점), B(85점),..., F(0 ~ 59점)까지 학점을 자동화하여 출력하고자 한다. 단, 100점을 초과하는 점수나 0점 미만의 점수가 입력될 경우 에러 메시지를 보여줘야 하며, 모든 점수는 정수형이다.

```js
function scoreToGrade(score) {

  // [더이상 쪼갤 수 없는 것] 점수가 100을 넘거나 0 미만일 경우 => 에러출력
  if(score > 100 || score < 0) {
    return "점수가 올바르지 않습니다. 점수(0~100)를 다시 입력하세요.";
  } else if(score === 100) {
    return 'A+';
  } else if(score >= 0 && score < 60) {
    return 'F';
  }

  // [로직1] 점수의 10의자리, 1의자리를 따로 변수로 각각 선언
  let digitTen = Math.floor(score / 10);
  let digitOne = score % 10;

  // [로직2] 10의자리에 따라 A~F 결정
  let grade;
  if(digitTen === 9) {
    grade = 'A';
  } else if(digitTen === 8) {
    grade = 'B';
  } else if(digitTen === 7) {
    grade = 'C';
  } else if(digitTen === 6) {
    grade = 'D';
  }

  // [로직3] 1의자리에 따라 +/0/- 결정
  let level;
  if(digitOne >= 7 && digitOne < 9) {
    level = '+';
  } else if(digitOne >= 4 && digitOne <== 6) {
    level = '';
  } else if(digitOne >= 0 && digitOne < 4) {
    level = '-';
  }

  // [최종값 리턴] 위의 seq#2와 #3을 종합
  return grade + level;
}
```

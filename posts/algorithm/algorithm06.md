---
title: "공통글자"
category: algorithm
path: /algorithm/algorithm06
date: 2020-10-31 21:39:00
---

#### 문제

두 개 이상의 문자열을 매개변수로 받아, 그것들이 공통으로 가지고 있는 문자를 순서대로 반환하라.(공백, 중복 제외)

<br>

#### Reference

```jsx{numberLines: true}
const commonCharacters = function (input1, input2) {
  // 0. 임의의 문자열의 각 문자를 key로 하여 객체로 만들어주는 헬퍼함수
  // { letter: true, letter: true, ... }
  let letterPicker = (str) => {
    return str.split("").reduce((outputObj, letter) => {
      if (letter.match(/[a-z]/i)) {
        outputObj[letter] = true;
      }
      return outputObj;
    }, {});
  };

  // 0. 두 객체에 대해 공통 key를 뽑아 객체로 만들어주는 헬퍼함수
  // { prop: true, prop: true, ... }
  let commonPicker = (obj1, obj2) => {
    return Object.keys(obj1).reduce((outputObj, prop) => {
      if (prop in obj2) {
        outputObj[prop] = true;
      }
      return outputObj;
    }, {});
  };

  // 1. input1, input2 외에도 문자열이 주어지는 모든 경우를 포함(arguments)하여 배열에 담기
  // highlight-start
  let allInput = Array.prototype.slice.call(arguments, 1);
  // highlight-end

  // 2. 모든 주어진 문자열들에 대한 공통 글자 추출
  // highlight-start
  let commonObj = allInput.reduce((obj, letter) => {
    obj = commonPicker(obj, letterPicker(letter));
    return obj;
  }, letterPicker(input1));
  // highlight-end

  // 3. 객체의 속성으로 쪼개졌던 공통 글자들을 다시 문자열로 완성하여 리턴
  let result = "";
  return input.split("").reduce((result, letter) => {
    if (commonObj[letter]) {
      result += letter;
      commonObj[letter] = false; // 중복된 공통글자 제거
    }
    return result;
  }, "");
};
```

<br>

25번째 줄에서 Array.prototype.slice 메소드를 사용하면서 **call**과 **arguments**를 활용한 것에 주목하자. 함수에 주어지는 인자들을 **arguments**로 묶어서 배열처럼 취급할 수 있다. 단, 그렇다고해서 배열은 아니다. 배열처럼 취급할 수 있을뿐, '.length' 메소드만 빼고는 일반적으로 배열 인스턴스에 사용할 수 있는 거의 모든 메소드는 금지된다. 다만, 말 그대로 배열처럼 취급할 수 있으므로 **call**의 인자로 채택될 수 있다.  
28~31번째 줄의 **reduce** 구문은 다소 복잡해보이지만, 차근차근 살펴본다면 구조가 보인다. 이 reduce의 목표는, 최초에 입력받은 'input1' 문자열을 객체로 변환(헬퍼함수 letterPicker)한 것과 나머지 인자들간의 공통 글자를 뽑는 것이다. 그러기 위해서 나머지 인자들 사이에서도 공통 글자들을 뽑아 객체로 저장하는 작업을 수행한다.

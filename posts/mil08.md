---
title: scope
category: javascript
path: /mil08
date: 2020-10-10 00:00:00
---

last Month what I Learned, 그 여덟번째.

### 함수의 범위(Scope)

> "_**The current context of execution**. The context in which values and expressions are "visible" or can be referenced. If a variable or other expression is not "in the current scope," then it is unavailable for use. Scopes can also be layered in a hierarchy, so that **child scopes have access to parent scopes, but not vice versa**.
> A function serves as a closure in JavaScript, and thus creates a scope, so that (for example) **a variable defined exclusively within the function cannot be accessed from outside the function** or within other functions. For instance, the following is invalid:_" - [**MDN**](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

함수는 범위를 갖는다. 특히, MDN reference에서 확인할 수 있듯이, 함수 안에 함수가 존재할 경우, **내부함수는 그것을 포함하는 부모함수로의 접근이 가능**하지만, **부모함수는 자신의 내부에 있는 함수에는 접근할 수 없음**을 알 수 있다. 그리고 더 무서운 것은, **자바스크립트는 그 자체가 이미 함수**(!!)이기 때문에 자바스크립트 작성된 모든 함수들은 자바스크립트 자체의 내부함수가 된다. 이 말인즉슨, 우리가 어떤 함수를 선언했다면, 해당 함수는 바깥에 있는 변수들을 얼마든지 가져와서 활용할 수 있다는 의미이다. 즉,

```js
let str = "hello, world";
function greeting(input) {
  console.log(input);
}
```

이라고 작성된 자바스크립트 코드가 있다면, 이 `greeting` 함수에 그것의 외부변수인 `str`을 매개변수로 대입 및 활용할 수 있다는 의미이다. 즉, `greeting(str)`의 결과 `hello, world`가 console에 출력된다. 이때 `greeting`은 **지역범위(Local scope)**를 갖는다고 하고, `str` 변수는 **전역범위(Global scope)**에 놓여있다고 한다. 그런데 자바스크립트는 그 자체로 함수라고 했으므로, 자바스크립트로 작성한 모든 함수는 자바스크립트의 지역범위(local scope)에 해당한다.
<br>

### 명령의 범위(Block)

> "_**A block statement** (or compound statement in other languages) is used to group zero or more statements. The block is delimited by a pair of braces ("curly brackets") and may optionally be labelled: ...(중략)... **It allows you to use multiple statements where JavaScript expects only one statement.** ...(중략)... Blocks are commonly used in association with if...else and for statements._" - [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)

MDN reference를 통해 알 수 있는 것은, 자바스크립트에서는 **중괄호**(curly brackets, 즉, `{}`)로 묶인 것은 마치 함수를 선언한 것과 같이 '범위'를 갖는 명령으로 간주한다는 것이다. 이것을 **블록**(block)이라고 한다. '블록' 개념을 '함수의 범위'에 종합하여 생각해본다면, 다음과 같은 규칙에 도달할 수 있다.

- 모든 함수는 범위(scope)를 갖는다.
- 내부함수는 외부함수의 변수에 접근할 수 있지만 외부함수는 내부함수에 접근할 수 없다.
- 함수의 내부에 블록이 존재한다면 해당 블록은 명령이 진술된, 일종의 내부함수이다.

이러한 규칙을 토대로 아래의 예제를 살펴보자. 첫번째 스크립트는 함수 `seqLet` 내부에 for문을 선언하되 인덱스 변수를 `let`으로 선언한 것이고, 두번째 스크립트는 함수 `seqVar` 내부에 마찬가지로 for문을 선언하되 인덱스 변수를 `var`로 선언한 것이다. 이것을 제외한 나머지 내용은 두 함수가 모두 동일하다.

```js
function seqLet() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log("final i: ", i);
}
```

```js
function seqVar() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log("final i: ", i);
}
```

```js
function seqVar2() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  if (true) {
    console.log("final i: ", i);
  }
}
```

각각의 결과는 다음과 같이 출력된다.
![](https://images.velog.io/images/lattepapa/post/512a7edb-1e99-4a6a-b6dc-6b56205cf722/seqLet.png)
![](https://images.velog.io/images/lattepapa/post/d72037dc-a205-4a41-9b0b-e74fc4a55605/seqVar.png)
![](https://images.velog.io/images/lattepapa/post/8db9ee20-e83f-486c-84e5-d2726586155a/seqVar2.png)

여기서 다음의 사실을 알 수 있다.

- 첫째, 함수 안에서도 중괄호(curly brackets)로 명령 블록을 만들 수 있다.
- 둘째, `let`으로 선언된 변수는 반드시 그것이 선언된 **블록 안에서만 유효**하다.
- 셋째, `var`로 선언된 변수는 그것이 선언된 **지역(즉, 함수) 안에서 얼마든지 유효**하다.

한편, 이러한 엄격한 `let` 선언은 필요에 의해 그 값을 얼마든지 다시 정의(대입)할 수 있다. 하지만 이러한 값 재정의조차 불가능하게 만드는 변수선언도 있다. 그것은 바로 `const` 선언이다. 축약된 선언명 그대로, `const`는 선언한 값을 절대불변의 '상수'(constant)로 만들어버린다. 반면, 위에서 살펴본 `var` 선언은 축약된 선언명 그대로, 대입 선언한 값을 언제든지 바꿀 수 있는 '가변 변수'(variable)로 만든다. 일반적으로 `var`보다 `let`을 이용한 변수 선언이 권장되는 이유는 바로 여기에 있다. 블록 단위의 명령 실행에 있어 변수의 중복과 간섭을 최소화하려는 것이다.
<br>
<br>
<br>

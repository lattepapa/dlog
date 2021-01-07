---
title: "String 객체와 문자 알고리즘"
category: algorithm
path: /algorithm/algorithm11
date: 2021-01-05 22:12:00
---

### String 객체의 활용

#### 문자열 반환

입력받은 인덱스와 일치하는 문자열을 반환하는 메소드로 **.charAt**(index)과 **.subString**(startIndex[, endIndex])이 있다.

```jsx
"YouTube".charAt(3);
// T

"YouTube".subString(3, 4);
// T

"YouTube".subString(3, 7);
// Tube

"YouTube".subString(3);
// Tube
```

<br />

#### 인덱스 반환

입력받은 문자열의 가장 첫 문자와 일치하는 인덱스를 반환하는 메소드로 **.indexOf**(searchVale[, fromIndex])가 있다.

```jsx
"YouTube and Netflix".indexOf("and");
// 8

"YouTube and Netflix".indexOf("Disney+");
// -1

"YouTube and Netflix".indexOf("and", 0);
// 8

"YouTube and Netflix".indexOf("and", 8);
// 8
```

<br />

#### 문자 'a'의 등장횟수

**indexOf** 메소드를 활용하면 간단히 작성할 수 있다. 가장 문두에 있는 인덱스부터 반환하는 성질을 이용하여, 반복문을 통해 indexOf의 결과가 -1이 나올 때까지 시작 파라미터(fromIndex) 값을 1씩 증가시킨다. 시간복잡도는 $O(n)$을 만족한다.

```jsx{numberLines: true}
function countOnString(strings, str) {
  let result = strings.indexOf(str);

  let count = 0;
  while (result !== -1) {
    count++;
    result = strings.indexOf(str, result + 1);
  }

  return count;
}
```

<br />

#### 문자열 치환

**.replace**(targetString, replaceString) 메소드는 타겟 문자열과 바꿀 문자열의 2개 파라미터를 받아 치환 작업을 수행한다.

```jsx
"I subscribe to Netflix.".replace("Netflix", "Disney+");
// I subscribe to Disney+.
```

<br />

### 정규표현식(Regular Expression)

검색 패턴을 정의한 문자열들의 집합으로, 당연히 이 RegExp 객체 형식에 맞추어 쓸 수 있는 메소드들이 존재한다.

#### 정규표현식을 활용한 메소드

일반적으로 문자열에 대한 검색은 **.search**() 또는 **.match**() 메소드를 통해 가능하다. 만약 이 문자열을 **RegExp 객체**의 인스턴스로 만든다면 **.test**()와 **.exec**() 메소드를 사용할 수 있다. 이는 **constructor** 함수로 생성하든 **리터럴**로 생성하든 동일하게 적용된다. 이때 문자열에 대한 메소드 **.match**()와 RegExp 인스턴스에 대한 메소드 **.exec**()은 타겟과 비교대상의 순서가 반대일뿐, 동일한 결과를 도출한다.

```jsx
// highlight-start
let strings = "I Love Netflix";
// highlight-end

strings.search("Love");
// 2

strings.match("Love");
// ["Love", index: 2, input: "I Love Netflix", groups: undefined]

// highlight-start
let regByCon = new RegExp("Love", "gi");
// highlight-end

regByCon.exec(strings);
// ["Love", index: 2, input: "I Love Netflix", groups: undefined]

regByCon.test(strings);
// true;

// highlight-start
let regByLit = /Love/gi;
// highlight-end

regByLit.exec(strings);
// ["Love", index: 2, input: "I Love Netflix", groups: undefined]

regByLit.test(strings);
// true;
```

<br />

#### 기본 정규표현식

| 표현식   | 의미                                    | 예시        | 해석                                    |
| -------- | --------------------------------------- | ----------- | --------------------------------------- |
| ^        | 문자열/줄이 **시작**                    | ^[0-9]      | "이 문자열은 숫자부터 시작된다."        |
| \d       | **모든 숫자**                           | \d+         | "이 문자열에는 반드시 숫자가 포함된다." |
| [xy]     | 괄호 안의 문자/숫자를 **검색**          | [a-zA-Z0-9] | "이 문자열은 숫자와 알파벳만 포함된다." |
| [\^xy]   | 괄호 안의 문자/숫자를 **제외하고 검색** | [\^xy]      | "이 문자열은 x와 y를 포함하지 않는다"   |
| (x \| y) | x 또는 y를 검색                         |             |                                         |

<br />

#### 쿼리 문자열

`/([^?=&]+)(=([^&]\*))/`로 표현되며, 웹 URL로부터 데이터베이스 쿼리들을 **파싱**(parsing)하기 위해 유용하게 사용된다.

```jsx
let queryString = {};
let uri =
  "https://your.domain/product.js?category=4&product_id=2140&query=lcd+tv";

uri.replace(
  new RegExp(
    // highlight-start
    "([^?=&]+)(=([^&]*))?",
    // highlight-end
    "g"),
  function($0, $1, $2, $3) {
    queryString[$1] = $3;
  };
);

console.log(queryString);
// { category: 4, product_id: 2140, query: lcd+tv }

```

<br />

#### 숫자를 포함하는 문자열

```jsx
// highlight-start
let includeNum = /\d+/; // 적어도 숫자를 포함한다
// highlight-end
includeNum.test("123"); // true
includeNum.test("12a3"); // true
includeNum.test("a"); // false

// highlight-start
let onlyNum = /^\d+$/; // 반드시 숫자만 포함한다
// highlight-end
onlyNum.test("123"); // true
onlyNum.test("12a3"); // false
onlyNum.test("a"); // false

// highlight-start
let floatNum = /^[0-9]*.[0-9]*[1-9]+$/; // 적어도 부동소수점을 포함한다
// highlight-end
floatNum.test("123"); // true
floatNum.test("1.23"); // true
```

<br />

#### 적어도 숫자 또는 문자를 포함하는 문자열

```jsx
// highlight-start
let reg = /[a-zA-Z0-9]/;
// highlight-end
reg.test("123"); // true
reg.test("ILoveNetflix"); // true
reg.test("I Love Netflix"); // true
reg.test("I Love 2"); // true
reg.test("I Love Netflix, Disney+"); // true
reg.test("!!!"); // false
```

<br />

### 인코딩

#### Base64 인코딩

문자열을 입력받아 Base64로 인코딩된 **ASCII** 문자열을 반환한다. 이때 문자열의 각 문자는 바이트(=8bit)로 취급된다.

```jsx
btoa("I Love Netflix");
// "SSBMb3ZlIE5ldGZsaXg="

atob("SSBMb3ZlIE5ldGZsaXg=");
// "I Love Netflix"
```

<br />

#### Bit.ly

데이터베이스에 URL에 대한 ID 정보가 있음을 기반으로, 해당 ID를 Base64 인코딩을 통해 ASCII 문자열로 변환한다. 이때 Base64 인코딩은 단순히 btoa나 atob 메소드를 사용하는 것이 아닌, 아래의 알고리즘을 이용할 수 있다. 각 함수들은 최소 $O(log{_{secretNum}}{id})$, 최대 $O(n)$의 시간복잡도를 갖는다고 추정할 수 있을 것 같다.

```jsx{numberLines: true}
// 인코딩용 DICTIONARY 설정
let DICTIONARY = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ0123456789".split(
  ""
);
let secretNum = 34;

// URL ID 인코딩 함수
function encodeId(id) {
  if (id === 0) return DICTIONARY[0];

  // 문자 역순생성 헬퍼함수
  const reverseWord = (str) => {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
      reversed = reversed + str.charAt(i);
    }
    return reversed;
  };

  // 인코딩
  let encoded = "";
  while (id > 0) {
    encoded = encoded + DICTIONARY[id % secretNum];
    id = Math.floor(id / secretNum);
  }

  return reverseWord(encoded);
}

// Bit.ly 디코딩 함수
function decodeId(encoded) {
  let decoded = "";
  for (let i = 0; i < encoded.split("").length; i++) {
    decoded = decoded * secretNum + DICTIONARY.indexOf(encoded.charAt(i));
  }

  return decoded;
}

encodeId(12345);
// DB에 저장된 https://netflix.com의 id가 12345라고 가정하면
// "kxd"

decodeId("kxd");
// 12345
```

<br />

### 암호화

암호화는 서버와 클라이언트(브라우저) 간 연결에 활용되는 표준 보안 기술이다. **TLS**가 가장 대표적인 암호화 과정이라고 할 수 있으며 아래의 흐름으로 요약된다.

1. 1\) 서버가 브라우저에게 자신의 **비대칭 공개키**를 전송하면,
2. 2\) 브라우저는 **현재 세션**에서 사용하기 위해 **대칭키**를 생성한다. 그리고 이것을 서버로부터 받은 비대칭 공개키를 활용하여 **암호화**한다.
3. 3\) 이제부터 클라이언트 세션이 생성되면 브라우저는 가지고 있는 **암호화된 대칭키**를 서버에게 보내게 된다. 서버는 이것을 자신이 가지고 있는 비대칭 공개키를 활용하여 **복호화**하여 정상 사용자임을 확인한다.

이러한 암호화를 위해 활용되는 가장 대표적인 것은 **RSA 암호화**이다.

#### RSA 암호화

RSA 암호화는 큰 정수의 인수분해를 활용한 암호화 알고리즘이다. 크기가 매우 큰 두 소수와 보조값 1개를 통해 공개키가 생성된다. 이를 가지고 누구나 암호화를 할 수 있으며, 단, 복호화를 하기 위해선 **소인수**를 보유하고 있어야 한다.

```jsx
// 크기가 큰 임의의 두 소수와 그 곱을 선언한다
// 이를 위해 지난 소수 관련 포스팅의 함수를 활용한다
function allPrimesLessThanN(n) {
  const isPrime = (n) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i < n; i = i + 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  let result = [];
  for (let i = 0; i < n; i++) {
    if (isPrime(i)) result.push(i);
  }

  return result[result.length - 1];
}

let prime1 = allPrimesLessThanN(1234567); // 1234547
let prime2 = allPrimesLessThanN(4567890); // 4567873
let pxp = prime1 * prime2; // 5639253908531

// 암호화
function modInverse(exponent, pxp) {
  let message0 = pxp,
    temp,
    prime2;
  let encoded0 = 0,
    encoded1 = 1;

  if (pxp === 1) return 0;

  while (exponent > 1) {
    prime2 = Math.floor(exponent / pxp);
    temp = pxp;
    pxp = exponent % pxp;
    exponent = temp;

    temp = encoded0;
    encoded0 = encoded1 - prime2 * encoded0;
    encoded1 = temp;
  }

  if (encoded1 < 0) encoded1 = encoded1 + message0;

  return encoded1;
}
```

<br />
<br />
<br />
<br />

<text style="color:gray">_\*참고: "자바스크립트로 하는 자료 구조와 알고리즘"(배세민님, 에이콘)_</text>

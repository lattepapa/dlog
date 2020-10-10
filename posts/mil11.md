---
title: "esLint"
category: javascript
path: /mil11
date: 2020-10-10 00:00:10
---

# esLint

### 설치

- 공홈에서 알려주는데로 차근차근 설치하면 된다.

1. `npm install eslint --save-dev` (devDependencies에 추가하는 설치)
2. `npx eslint --init` (검열 기초설정: CommonJS를 주로 볼 것인가, node 환경인가 등등)
3. 생성된 eslintrc.js 파일에서 "env"와 "rules" 객체에다가 필요한 환경이나 검열규칙 추가하면 됨
4. package.json 파일에서 "scripts" 객체에다가 검열 대상을 추가할 수도 있음

- npm 관련 몇가지 유용한 옵션
  `npm ls --depth=0` (현재 프로젝트에 설치된 모든 dependency 조회)
  `npm ls -g --depth=0` (현재 전역에 설치된 모든 dependency 조회)
  `npm run {모듈명}` (package.json의 "scripts" 객체 내 해당 모듈명 key value 내용을 실행)
  `npm install {모듈명}` (package.json의 "dependency" 객체 내 해당 모듈명 속성을 생성)
  `npm install {모듈명} --save-dev` (package.json의 "devDependency" 객체 내 해당 모듈명 속성을 생성)

### 검열

- 문서 내에서 검열 스킵이 필요할 경우 :

1. `/*eslint-env node, mocha*/` 와 같은 주석을 하단에 추가하거나,
2. eslintrc.js 파일에서 "env"에 node, mocha에 대한 'true' 속성 추가

- 일부 변수에 검열 스킵이 필요할 경우 : 윗줄에 `/*eslint-disable*/`, 아랫줄에 `/*eslint-enable*/` 주석 입력

### 생각해보기

- 왜 Global이 아닌 특정 프로젝트에 설치하는 것이 좋을까?
  → 모든 프로젝트가 동일한 esLint 버전과 동일한 테스트 기준에 적용 받는 것은 바람직하지 않음!
- "no-unused-vars"의 의미는?
  → 변수가 선언은 되었으나 사용된 적이 없는 경우를 의미
- "configuring rules" 운용 방법
  → off(=0), warn(=1), error(=2)의 ruleID로써 검열 수준을 통제할 수 있다.

# Git

- 버전관리 그래프현황 보기 : `git log --branches --decorate --graph`

# Reflection on Hiring Assessment

### 재귀문제

```jsx
funtion test(arr, id) {
	// 부모 검색
	for(let el of arr) {
		for(let key in el) {
			if(el[key] === id) {
				return el;
			}
		}
	}

	// 자식 검색
	let result;
	for(let prop of arr) {
		if(Object.keys(prop).includes('children')) {
			result = test(prop['children'], id);
			if(result) {
				return result;
			}
		}
	}

	return null;
};
```

### 피보나치수열

```jsx
function test() {
  let acc = 0;

  fibonacci = (acc) => {
    if (acc === 0) {
      return 0;
    } else if (acc === 1) {
      return 1;
    }
    return fibonacci(acc - 2) + fibonacci(acc - 1);
  };

  return () => fibonacci(acc++);
}
```

### reduce와 map

```jsx
function test() {
	let obj = arr.map(el => {
		return el.reduce((acc, cur) => {
			acc[cur[0]] = cur[1];
			return acc;
		}, {});
	});

	obj.sort((a, b) => {
		return a['age'] - b['age'];
	};

	let result = [];
	for(let prop of obj) {
		if(prop['firstName'] && prop['lastName']) {
			result.push(`${prop['firstName']} ${prop['lastName']}`);
		} else if(prop['firstName'] && !prop['lastName']) {
			result.push(prop['firstName']);
		} else if(!prop['firstName'] && prop['lastName']) {
			result.push(prop['lastName']);
		} else if(!prop['firstName'] && !prop['lastName']) {
			result.push(prop);
		}
	}

	return result;
}
```

---
title: "[Node.js] 기본구동"
category: nodejs
path: /nodejs/nodejs02
date: 2020-10-12 21:30:00
---

### Node.js 프로그램 실행

#### process 객체와 argv 속성

process 객체에는 기본적으로 node 프로그램 실행 프로세스와 관련한 내용들이 argv 속성, env 속성 등의 정보가 포함된다. 이중 argv 속성은 node 기본 실행파일 정보와, node 명령어를 통해 실행하는 파일의 경로 정보가 담겨져있다.

#### argv 속성의 모습

```jsx
console.log(process.argv.length);
// 2

console.log(process.argv);
// [
//  '/usr/local/Cellar/node/14.12.0/bin/node',
//  '/Users/siwoobaek/nodedrill/nodedrill.js'
// ]

process.argv.forEach((item, index) => {
  console.log(`${index} : ${item}`);
});
// 0 : /usr/local/Cellar/node/14.12.0/bin/node
// 1 : /Users/siwoobaek/nodedrill/nodedrill.js
```

### Node.js 모듈 활용

#### 모듈을 불러오는 전역객체

분리되어 있는 모듈 파일을 불러오기 위해, **exports 객체** 또는 **module.exports 객체**를 활용한다. 이들은 모두 **전역객체**로써, 여기에 저장된 모듈(함수)들을 말 그대로 해당 프로젝트의 전역환경에서 언제든지 활용할 수 있다. 따라서 바꿔말하자면, 모듈 파일의 내용은 반드시 이 두 객체 중 하나의 형식에 무조건 담겨있어야 모듈로써의 활용이 가능해진다. 여기서 주의할 점은, **module.exports 객체가 부모**라는 것이다. 아래의 스크립트를 보자.

#### module.exports 객체를 사용하는 경우

```jsx
// calculator.js(분리된 모듈)
const calc = {};

calc.doAddition = (a, b) => console.log(a + b);
calc.doSubtraction = (a, b) => console.log(a - b);
calc.doMultiplication = (a, b) => console.log(a * b);
calc.doDivision = (a, b) => console.log(a / b);

module.exports = calc;
```

```jsx
// main.js(calculator.js를 불러와서 사용할 메인 파일)
const calc = require("./calculator");
calc.doAddition(3, 7);
```

```
$ node main.js
10
```

#### exports 객체를 사용하는 경우

```jsx
// calculator.js(분리된 모듈)
exports.doAddition = (a, b) => console.log(a + b);
exports.doSubtraction = (a, b) => console.log(a - b);
exports.doMultiplication = (a, b) => console.log(a * b);
exports.doDivision = (a, b) => console.log(a / b);
```

```jsx
// main.js(calculator.js를 불러와서 사용할 메인 파일)
const calc = require("./nodedrill");
calc.doAddition(3, 7);
```

```
$ node main.js
10
```

만약 모듈 파일 내에서 **module.exports 객체**를 통해 모듈 파일 전체를 규정했다면, **exports 객체**를 따로 규정할 필요가 없어진다.

### 패키지 관리

#### node_module 폴더

**npm**을 통해 Node.js의 다양한 모듈 패키지들을 공유받아서 나의 프로젝트 로컬에 설치할 수 있다. 이때, 패키지는 프로젝트 경로의 **node_module**이라는 디렉터리에 설치된다. 이는 프로젝트별로 패키지 설치가 가능하다는 의미이다. 만약 프로젝트 폴더 하위에 또 다른 프로젝트 폴더가 존재한다면, 이 **node_module** 디렉터리의 위치를 필요한 뎁스로 옮기면 된다. 상위 프로젝트의 경로에 node_module 디렉터리가 존재한다면, 당연히 이 프로젝트의 하위 프로젝트도 동일한 패키지에 적용받을 수 있다. 한편, Node.js는 현재 폴더에 node_module 디렉터리가 있는 지 확인하여 만약 없으면 **상위 디렉터리**를 검색한다.

#### package.json 파일

module.exports 또는 exports 전역객체를 통해 내부 패키지를 활용하는 것을 넘어서, 만약 npm을 통한 수많은 외부 패키지를 사용해야 한다면 **package.json** 파일을 만드는 것이 매우 큰 도움이 된다. 파일형식에서 볼 수 있듯이, JSON 객체의 형식("attribute" = [ { "key" : "value" }, { "key" : "value" }, ... ])으로 그 내용이 구성된다. 구성할 내용으로는, 이 package.json 파일의 목적에 맞게 패키지의 설치정보가 필요하다. 이는 다음과 같이 명령 프롬프트에 입력하면 된다.

```
$ npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.

package name: (보통 현재 js 파일명이 default로 입력되어 있음)
version: (1.0.0)
description:
entry point: (nodedrill.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/siwoobaek/nodedrill/package.json:

{
  "name": "nodedrill",
  "version": "1.0.0",
  "description": "",
  "main": "nodedrill.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

```jsx
// package.json(위의 npm init 명령에서 단순히 엔터키만 계속 쳤을 때)
{
  "name": "nodedrill",
  "version": "1.0.0",
  "description": "",
  "main": "nodedrill.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

만약 package.json 파일이 프로젝트 디렉터리에 존재하는 가운데, 모듈을 삭제 후 재설치하기 위해선 다음과 같이 명령 프롬프트에 입력한다. 그러면...

```
$ npm uninstall 패키지명
$ npm install --save 패키지명
```

```jsx
// package.json
{
  "name": "nodedrill",
  "version": "1.0.0",
  ...
  "dependencies": {
    "패키지명": "버전정보"
  }
}
```

만약 다른 개발자가 이 프로젝트를 그대로 받아서 작업하고자 한다면, 다음의 명령을 통해 모든 모듈 패키지들을 신속하게 설치할 수 있다. 아래의 명령은 **package.json**에 작성된 모든 **의존성 정보(dependencies)**를 찾아서 자동 설치해주는 고마운 명령어이다.

```
$ npm install
```

### 간단한 내장 모듈들

#### 시스템 정보관련

[1] hostname() : 호스트 이름  
[2] totalmem() : 전체 메모리 정보  
[3] freemem() : 사용 가능한 메모리 정보  
[4] cpus() : CPU 정보  
[5] networkInterfaces() : 네트워크 인터페이스 정보

```jsx
// myinfo.js
const os = require("os");
console.log(`호스트명: ${os.hostname()[0]}`);
console.log(`사용가능 메모리: ${os.freemem()[0]}`);
console.log(`CPU: ${console.dir(os.cpus())}`);
console.log(`네트워크인터페이스: ${console.dir(os.networkInterfaces())}`);
```

```
$ node myinfo.js

호스트명: S
사용가능 메모리: 000000
[
  {
    model: 'Intel(R) Core(TM) i5-8279U CPU @ 2.40GHz',
    speed: 2400,
    times: { user: 68109210, nice: 0, sys: 41653360, idle: 274367480, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i5-8279U CPU @ 2.40GHz',
    ...


```

#### 파일경로 관련

[1] join() : 디렉터리 이름과 파일 이름을 합쳐서 하나의 경로로 만들어준다.  
[2] dirname() : 파일경로에서 디렉터리 이름만 반환한다.  
[3] basename() : 파일경로에서 확장자를 제외하여 파일 이름만 반환한다.  
[4] extname() : 파일경로에서 파일의 확장자만 반환한다.

```jsx
// filePath.js
const path = require("path");

const fName = "/Users/lattepapa/Downloads/test.md";
const dName = path.dirname(fName);
const bName = path.basename(fName);
const eName = path.extname(fName);

console.log(`
디렉터리: ${dName}
파일명: ${bName}
확장자: ${eName}
`);
```

```
$ node filePath.js

디렉터리: /Users/lattepapa/Downloads
파일명: test.md
확장자: .md
```

<br>

```jsx
// directoryPath.js
const path = require("path");

const directory = ["Users", "lattepapa", "Downloads", "test.md"];
const docsDirectory = directory.join(path.sep);

console.log(`디렉터리: /${docsDirectory}`);
```

```
$ node directoryPath.js

디렉터리: /Users/lattepapa/Downloads/test.md
```

<br>
<br>
<br>

<text style="color:gray">_\*참고: "Node.js 프로그래밍"(정재곤님, 이지스퍼블리싱)_</text>

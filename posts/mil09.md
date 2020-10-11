---
title: "Node.js 환경구축과 Git Workflow"
category: javascript
path: /mil09
date: 2020-08-31 23:00:08
---

### Immersive Course preOrientation

[1] 나는 부트캠프에 온 것(learn swiftly)이지, 대학원에 온 것(study and analysis)이 아니다.  
[2] 레퍼런스 보는 것을 주저하지 말자. 위의 말과 일맥상통하는 것!  
[3] 개발자도 노트에 펜으로 필기를 해야 한다. 무엇을? 어떤 가설과 방법으로 문제를 해결할 지를  
[4] 오직 모든 것은 어떻게 문제를 해결할 수 있을 지에 대한 고민에 집중하자.

### Runtime

어떤 프로그래밍 언어가 동작할 수 있는 프로그램을 의미한다. 쉽게 말해, javascript의 웹 런타임은 Chrome 웹 브라우저, 서버 런타임은 Node.js라고 표현할 수 있다.

### Node.js

#### NVM

Node Version Manager, 즉, Node.js의 버전관리툴을 의미한다. NVM을 설치한 후 .zshrc에 환경변수를 등록해야하며, source .zshrc(재구동)이 필요하다.

#### NPM

Node Package Manager, 즉, 다른 사람들이 만들어놓은 Node.js 모듈 모음을 다운 받을 수 있게 하는 일종의 스토어를 의미한다.

#### package.json

프로그램 실행에 필요한 모듈 리스트를 제공  
[1] dependencies : 반드시 필요한 모듈 리스트(`npm install --save {라이브러리명}`)  
[2] devDependencies : 개발환경에 필요한 모듈 리스트(`npm install --save-dev {라이브러리명}`)  
[3] scripts : 실행 명령어 안내
<br>
<br>
<br>

### Git Workflow

#### Upstream Repository

각 Pair들은 이 Upstream Repository를 Fork하여 자신의 github로 모셔옴

#### Forked Repository

```
// 각 Pair는 각자의 github에 생성된 Forked Repository의 개체들을 본인의 로컬저장소로 클론
$ git clone https://github.com/OOOO/OOOOO.git
```

#### Local Repository

```
// 각 Pair는 서로의 Forked Repository들을 각각 원격저장소로 지정
$ git remote add {pair를 지칭할 닉네임} {pair의 Forked Repository URL}
$ git remote -v

// 작업물 수정한 것은 staging area에서 확인 후, Local Repository에서 commit(=merge) 필요
$ git status
$ git add {커밋할 파일}
$ git commit -m "{메시지 내용}"

// 변경사항이 merge(=commit)된 작업물을 Forked Repository에 반영(=push) 필요
$ git push {Forked Repository의 닉네임} {Forked Repository에 접근할 계정}

// 내가 Pair의 변경된 저장물을 나의 Local Repository로 끌고와서 작업하고 싶다면
$ git pull {아까 위에서 지칭한 pair 닉네임} {master}
```

#### Branch Strategy

브랜치는 하나의 화면에 대해 여러 명이 각각 별개의 기능을 개발하려고 할 때 매우 유용하다. 이때 브랜치는 현재 작업 공간을 베이스로 만들어진다.

```
// 현재 작업 공간을 옮기고 싶을 때
$ git checkout {옮기고 싶은 브랜치이름}

// 새로운 브랜치를 만들어서 거기로 현재 작업 공간을 옮기고 싶을 때
$ git checkout -b {만들고 싶은 브랜치이름}

// 원본을 토대로 새로운 브랜치를 만들어서 거기로 옮기고 싶을 때
$ git checkout origin
$ git checkout -b newOne
```

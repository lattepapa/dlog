---
title: "Git"
category: javascript
path: /javascript/mil09
date: 2020-08-31 23:00:08
---

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

// 로컬저장소에서 새로운 브랜치를 만들어서 거기로 현재 작업 공간을 옮기고 싶을 때
$ git checkout -b {새 브랜치명}

// 로컬저장소에서, 원본을 토대로 새로운 브랜치를 만들어서 거기로 옮기고 싶을 때
$ git checkout origin
$ git checkout -b {새 브랜치명}

// 로컬저장소의 브랜치를 삭제하고 싶을 때
$ git checkout master
$ git branch -D {삭제하고 싶은 브랜치명}

// 원격저장소의 master 브랜치가 아닌 다른 브랜치를 로컬저장소로 가져오고(fetch) 싶을 때
$ git checkout -t origin/{가져오고싶은 원격저장소의 브랜치명}
```

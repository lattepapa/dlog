---
title: "ES6 vs Pseudoclassical"
category: javascript
path: /mil17
date: 2020-10-10 00:00:16
---

# Bees Bees Bees

### esLint에서 검열규칙 완화하기

- *no-unused-var*인 케이스를 잡지 않기 위해선 설정 파일에서 `rules`에 속성을 추가

```jsx
// .eslintrc.json
{
  "extends": "eslint:recommended",
  "env": {
    "es6": true,
    "node": true,
    "mocha": true,
    "browser": true
  },
  "rules": { // 검열 완화대상을 추가
    "no-unused-vars": "off"
  }
}
```

### Pair의 Remote repository와 상호작용하기

- Pair와 내가 각각 맡은 부분의 코드 작성이 완료되고 각자의 repository로 push까지 완료함을 전제한다.
- 먼저 상대방의 repository를 상대방 이름으로 별칭 삼아서 나의 원격 접근처로 등록한다.

```bash
$ git remote {pair의 이름} {pair의 repository URL}
$ git remote -v
```

- 그 다음, 상대방의 repository의 최신 내용들을 바로 나의 로컬 repository로 땡겨온다.

```bash
$ git pull {pair의 이름} {pair의 repository URL}
```

- 나의 로컬 repository에는 이제 상대방이 작성한 내용도 함께 보일 것이다.
  변경할 내용이 없다면 이 내용들을 그대로 나의 repository로 push 해주면 끝.
  → 만약 상대방이 작성한 내용 중 바꿀 것이 있어서 수정이 이뤄지면 git add → commit → push

```bash
$ git push origin master
```

### ES6 instantiation pattern

```jsx
class Grub {
  constructor() {
    this.age = 0;
    this.color = "pink";
    this.food = "jelly";
  }
  eat() {
    return "Mmmmmmmmm jelly";
  }
}

class Bee extends Grub {
  constructor() {
    super();
    this.age = 5;
    this.color = "yellow";
    this.job = "Keep on growing";
  }
}

class HoneyMakerBee extends Bee {
  constructor() {
    super();
    this.age = 10;
    this.job = "make honey";
    this.honeyPot = 0;
  }
  makeHoney() {
    this.honeyPot += 1;
  }
  giveHoney() {
    this.honeyPot -= 1;
  }
}

class ForagerBee extends Bee {
  constructor() {
    super();
    this.age = 10;
    this.job = "find pollen";
    this.canFly = true;
    this.treasureChest = [];
  }
  forage(treasure) {
    this.treasureChest.push(treasure);
  }
}
```

### Pseudoclassical instantiation pattern

```jsx
var Grub = function () {
  this.age = 0;
  this.color = "pink";
  this.food = "jelly";
};
Grub.prototype.eat = function () {
  return "Mmmmmmmmm jelly";
};

var Bee = function () {
  Grub.call(this);
  this.age = 5;
  this.color = "yellow";
  this.job = "Keep on growing";
};
Bee.prototype = Object.create(Grub.prototype);
Bee.prototype.constructor = Bee;

var HoneyMakerBee = function () {
  Bee.call(this);
  this.age = 10;
  this.job = "make honey";
  this.honeyPot = 0;
};
HoneyMakerBee.prototype = Object.create(Bee.prototype);
HoneyMakerBee.prototype.constructor = HoneyMakerBee;
HoneyMakerBee.prototype.makeHoney = function () {
  this.honeyPot += 1;
};
HoneyMakerBee.prototype.giveHoney = function () {
  this.honeyPot -= 1;
};

var ForagerBee = function () {
  Bee.call(this);
  super();
  this.age = 10;
  this.job = "find pollen";
  this.canFly = true;
  this.treasureChest = [];
};
ForagerBee.prototype = Object.create(Bee.prototype);
ForagerBee.prototype.constructor = ForagerBee;
ForagerBee.prototype.forage = function (treasure) {
  this.treasureChest.push(treasure);
};
```

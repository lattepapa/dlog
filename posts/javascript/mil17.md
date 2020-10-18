---
title: "ES6 vs Pseudoclassical"
category: javascript
path: /javascript/mil17
date: 2020-09-14 23:00:16
---

### esLint에서 검열규칙 완화하기

```jsx{numberLines: true}
// no-unused-var인 케이스를 검열하지 않기 위해
// 설정 파일(.eslintrc.json)에서 `rules`에 속성을 추가
{
  "extends": "eslint:recommended",
  "env": {
    "es6": true,
    "node": true,
    "mocha": true,
    "browser": true
  },
  // highlight-start
  "rules": { // 검열 완화대상을 추가
    "no-unused-vars": "off"
  }
  // highlight-end
}
```

<br>

### ES6 instantiation pattern

```jsx{numberLines: true}
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

<br>

### Pseudoclassical instantiation pattern

```jsx{numberLines: true}
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

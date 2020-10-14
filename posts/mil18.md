---
title: "constructor"
category: javascript
path: /mil18
date: 2020-09-14 23:30:17
---

### 클래스 constructor 함수

**constructor**란, 클래스가 자식(=인스턴스)에게 물려줄 유전형질(프로토타입)을 정의해주는 역할을 수행한다. 아래는 'Dance Party' 스프린트에서 발췌한 코드이다. 인스턴스가 사용할 수 있는 메소드를 constructor 함수에서 애초에 정의해줄 수도 있고, 클래스 수준에서 정의해줄 수도 있다는 내용이다.

```jsx
// constructor 함수 밖에 createDancerElement 함수를 선언할 경우
class DancerClass {
  constructor(top, left, timeBetweenSteps) {
    this.timeBetweenSteps = timeBetweenSteps;
    this.$node = this.createDancerElement();
    this.step();
    this.setPosition(top, left);
  }

  createDancerElement() {
    let elDancer = document.createElement("span");
    elDancer.className = "dancer";
    return elDancer;
  }

  step() {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }

  setPosition(top, left) {
    Object.assign(this.$node.style, {
      top: `${top}px`,
      left: `${left}px`,
    });
  }
}
```

```jsx
// constructor 함수 안에 createDancerElement 함수를 선언할 경우
class DancerClass {
  constructor(top, left, timeBetweenSteps) {
		createDancerElement() {
	    let elDancer = document.createElement('span');
	    elDancer.className = 'dancer';
	    return elDancer;
	  }
    this.timeBetweenSteps = timeBetweenSteps;
    this.$node = createDancerElement();
    this.step();
    this.setPosition(top, left);
  }

  step() {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }

  setPosition(top, left) {
    Object.assign(this.$node.style, {
      top: `${top}px`,
      left: `${left}px`,
    });
  }
}
```

### Class, prototype, instance의 모식도

클래스는 constructor 함수를 통해 상속내용들을 프로토타입에 이식한다. 그럼 프로토타입은 \_\_proto\_\_ 객체를 통해 인스턴스에게 상속내용들을 물려준다.  
![model](/src/images/onpost/mil18-01.png)

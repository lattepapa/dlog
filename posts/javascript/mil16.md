---
title: "[JS] Object Oriented Programming"
category: javascript
path: /javascript/mil16
date: 2020-09-10 23:00:15
---

### 객체지향 프로그래밍

사람이 세계를 보고 이해한 것을 컴퓨터 프로그래밍으로 흉내낸 것을 의미한다.  
[1] _Machinery Language_ : 0과 1로만 조합  
[2] _Assembly Language_ : 만들어진 변수(r1 ~ r10), 정해진 규칙(swperm, xor, sieve 등)으로만 조합  
[3] _High-level Language_ : 인간의 의사표현과 거의 유사  
[3-1] _Procedural Language_(절차지향언어) : C, COBOL, Fortran, LISP, Perl, HTML, VBScript 등  
[3-2] _Object Oriented Language_(객체지향언어)  
[3-2-1] class 지향언어 : JAVA, C++, C#, Python, (Perl,) PHP 등  
[3-2-2] prototype 지향언어 : javascript 등

### Class

같은 종류의 '것'들이 가져야 할 속성, 기능 등을 정의하는 일종의 범주를 의미

#### Object(객체)

클래스의 인스턴스이자, '객체다움'의 속성과 기능을 처음으로 가진 조상님을 의미하며, 속성(= property 또는 attribute)을 정하는 **constructor**와, 기능들을 정하는 메소드로 구성된다. 특히, **constructor**는 실행컨텍스트 **this**를 통해 보다 더 구체화된다.

```jsx{numberLines: true}
// Linked List와 Node, 그리고 이것들에 대한 methods를 정의하는 class 예시
class Node {
  // highlight-start
  constructor(data) {
    this.data = data;
    this.next = null;
  }
  // highlight-end
}

class LinkedList {
  // highlight-start
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }
  // highlight-end

  addToTail(data) {
    if (!this.head) {
      this.head = new Node(data);
      this.tail = new Node(data);
      this._size++;
    }
    this.tail.next = new Node(data);
    this.tail = new Node(data);
    this._size++;
  }
  // ... 다른 methods 생략
}
```

<br>

### 객체지향 프로그래밍의 4가지 특성

#### Encapsulation

속성(= data)은 constructor, 기능(= function)은 메소드로 묶여 정리되는 것을 의미하며, 이러한 특성은 프로그램의 재사용성을 높여주고(= 시간복잡도 경감), 정보를 클래스 안에 은닉을 가능케 한다.

#### Inheritance

인스턴스가 클래스의 모든 속성을 상속받는 것으로 하되, 그 key value를 달리할 수 있는 것을 의미하며, 캡슐화와 마찬가지로 재사용성을 높여주는 중요한 특성이다.

#### Abstraction

내부구조야 어떻든, 사용자 입장에서 편리하도록 메소드들이 설계되는 것을 의미하며, 이러한 추상화 특성도 마찬가지로 시간복잡도 경감시켜준다.

#### Polymorphism

인스턴스는 당연히 프로토타입의 메소드를 쓸 수 있되, 결과의 다양성을 인정하는 것을 의미한다. 이러한 다형성의 대표적인 예시로는 모든 태그들의 부모인 **HTMLElement**는 DOM에서의 인스턴스이므로, **TextBox, Select, CheckBox**와 같은 태그들은 **HTMLElement**가 쓸 수 있는 **.render() 메소드**를 똑같이 쓸 수 있는 것이 있다. 만약 이러한 객체지향 프로그래밍의 Polymorphism이 허용되지 않는다면, 저 태그들은 해당 메소드를 쓰기 위해 비효율적으로 **switch case...**구문을 정의해야 할 것이다. 다형성의 또다른 예는 각기 다른 두 클래스(Human, Student)를 통해 만든 인스턴스들에게, 각각의 프로토타입으로부터 받은 **.sleep()**이라는 임의의 메소드 실행 결과를 다르게 해주는 것 등이 있다.

### Instantiation Patterns

#### Functional Instantiation

모든 인스턴스에 클래스의 메소드가 자동으로 할당되므로 메모리효율은 낮음

```jsx{numberLines: true}
let carClass = function (num) {
  let carInstance = {};
  carInstance.position = num; // 속성
  carInstance.move = function () {
    // 메소드
    this.position++;
  };
  return carInstance;
};

let car1 = carClass(5);
let car2 = carClass(10);
```

<br>

#### Functional Shared Instantiation

사용이 필요한 메소드만 인스턴스가 가져가므로 메모리효율이 좋음

```jsx{numberLines: true}
let pickMethod = function (toInstance, methods) {
  for (let key in methods) {
    toInstance[key] = methods[key];
  }
};

let carMethods = {};
carMethods.move = function () {
  this.position++;
};

let carClass = function (num) {
  let carInstance = {
    position: num,
  };
  pickMethod(carInstance, carMethods);
  return carInstance;
};

let car1 = carClass(5);
let car2 = carClass(10);
```

<br>

#### Prototypal Instantiation

실행컨텍스트 this와 Object.create() 메소드 활용

```jsx{numberLines: true}
let carMethods = {};
carMethods.move = function () {
  this.positoin++;
};

let carClass = function (num) {
  let carInstance = Object.create(carMethods);
  carInstance.position = num;
  return carInstance;
};

let car1 = carClass(5);
let car2 = carClass(10);
```

<br>

#### Pseudoclassical Instantiation

가장 일반적인 인스턴스 생성 방법이(었)다. new 키워드를 활용한다.

```jsx{numberLines: true}
let carClass = function (num) {
  this.position = num;
};

carClass.prototype.move = function () {
  this.position++;
};

let car1 = new carClass(5);
let car2 = new carClass(10);
```

<br>
<br>
<br>

### Prototype과 Prototype Chain

#### Prototype

말 그대로 blue print, **원형 객체**를 의미한다. 자바스크립트는 프로토타입 언어이다.

#### constructor

인스턴스가 초기화될 때(=클래스로부터 만들때) 실행하는 생성자 함수를 의미

#### this

함수가 실행될 때 해당 *scope*마다 생성되는 고유한 실행컨텍스트로, new 키워드로 인스턴스를 생성했을 때는 해당 인스턴스가 바로 this 값이 된다.

#### Prototype Object(원본속성 그자체)

[1] 객체는 언제나 함수에 의해 생성된다.(엄밀히는, 'Object'는 자바스크립트가 제공하는 고유함수이다.)  
[2] 모든 함수는 **constructor** 자격을 갖는다. 그렇기 때문에 함수는 new 키워드의 활용대상이 된다.  
[3] 'Human'이라는 클래스를 만들어보자. 그러면... 'Human.prototype'이라고 하는 자동 생성된 속성에서 constructor 정보와 \_\_proto\_\_(\_Prototype Link\_) 정보를 확인할 수 있게된다. 이것이 바로 Prototype Object 인 것이다.  
[4] 여기서 'Human.prototype.eyes'라는 메소드를 만들자. 이 메소드는 항상 2를 리턴한다. 그러면 이 { eyes: 2 }라는 key-value 속성이 Prototype Object의 속성 중 하나로 삽입된다.

#### Prototype Link(물려받은 원본속성)

[5] 계속 이어서 생각해보자. 저 'Human' 클래스로부터 'smith'라는 인스턴스를 만든다.  
[6] 당연히 'smith'는 프로토타입이 아니기 때문에 _Prototype Object_ 정보가 존재하지 않는다. 그런데 'smith.eyes'로 메소드를 실행할 수도 있고, 결과값 2도 확인할 수 있다.  
[7] 왜냐하면 이 'smith' 인스턴스의 \_\_proto\_\_(\_Prototype Link\_)에 자신의 Prototype Object가 명시(link)되어 있기 때문이다.  
[8] 이와 같이, 모든 객체는 반드시 \_\_proto\_\_(\_Prototype Link\_)를 가지며, 이는 자신의 prototype 정보, 즉, **상속(유전)된 속성들을 항상 내장**하기 위함이다. 이를 **Prototype Chain**(또는 **\[\[Prototype\]\]**)이라고 부른다.

### 간단한 Prototype 탐구

#### HTML 환경에서

[1] EventTarget은 모든 HTML element들의 시조 클래스인 객체이다. 따라서 .toString() 메소드를 쓸 수 있다.  
[2] Node는 EventTarget를 통해 만들어진 인스턴스이다. 따라서 .toString() *method*를 쓸 수 있다. 여기서 새롭게 .append() 메소드를 만들었다.  
[3] Element는 Node를 통해 만들어진 인스턴스이다. 따라서 .toString(), .append() 메소드를 쓸 수 있다.  
[4] HTMLElement는 Element를 통해 만들어진 인스턴스이다. 따라서 .toString(), .append() 메소드를 쓸 수 있다.  
[5] div는 HTMLElement를 통해 만들어진 인스턴스이다. 따라서 ....

#### Pseudoclassical Legacy pattern과 ES6 pattern 사이에서

```jsx{numberLines: true}
// Human class와 method, instance 생성
let Human = function (name) {
  this.name = name;
};
Human.prototype.sleep = function () {
  console.log("zzz");
};
let steve = new Human("steve");

// Student class와 method, instance 생성
// 단, class의 prototype과 method를 Human의 것 그대로를 복사해서 가져온다.
let Student = function (name) {
  Human.call(this, name);
};

// highlight-start
// prototype 및 method 복사
Student.prototype = Object.create(Human.prototype);

// constructor 연결
Student.prototype.constructor = Student;
Student.prototype.learn = () => {
  console.log("열공!");
};

// 복사된 sleep method를 그대로 쓰지 않고 리턴값 변형!!
Student.prototype.sleep = function () {
  Human.prototype.sleep.apply(this);
  console.log("학생이 잠이나 자나?");
};
// highlight-end

// 확인
let john = new Student("john");
john.sleep(); // "학생이 잠이나 자나?"
john.learn(); // "열공!"
```

```jsx{numberLines: true}
// Human class와 method, instance 생성
class Human {
  constructor(name) {
    this.name = name;
  }
  sleep() {
    console.log("zzz");
  }
}

// Student class와 method, instance 생성
// 단, class의 prototype과 method를 Human의 것 그대로를 복사해서 가져온다.
class Student extends Human {
  constructor(name) {
    super(name); // extends 키워드를 쓴다면 반드시 super 키워드도 함께 나와야 한다!!!
  }
  sleep() {
    super.sleep(); // 특별히 새로 정의하고 싶은 경우, super 키워드 다음 문장에 정의내용 기술!!
    console.log("학생이 잠이나 자나?");
  }
  learn() {
    console.log("열공!");
  }
}

// 확인
let john = new Student("john");
john.sleep(); // "zzz"
john.learn(); // "열공!"
```

---
title: "Stack과 Queue"
category: javascript
path: /mil12
date: 2020-09-04 23:00:11
---

### 인트로

#### Data의 의미

[1] data : 문자, 숫자, 소리, 그림, 영상, 단어 등의 형태로 된 의미단위  
[2] data type : Primitive type(Numeric, String, Boolean 등), Custom type(Class, Struct;구조체 등)  
[3] data structure : 여러 data들을 어떻게 핸들링 할 것인지에 대한 방법론

### Stack

쌓여있는 접시(배열 또는 Linked list)를 상상하자. → Last In First Out

#### 예시

Call-stack 환경 등 내부함수 실행 전반, 계산기 원리(후위계산 활용)

#### 시간복잡도

추가(.push(element))와 삭제는 $O(1)$, 가져오기(.pop())는 $O(n)$의 시간복잡도를 갖는다.

#### 메소드

.push(element), .pop(), peak(), size() 등

```jsx
// 객체를 활용한 Stack 프로토타입
class Stack {
  constructor() {
    this.storage = {};
    this.top = 0;
  }

  size() {
    return this.top;
  }

  push(element) {
    this.storage[this.top] = element;
    this.top++;
  }

  pop() {
    if (this.top === 0) {
      return 0;
    }
    let result = this.storage[this.top - 1];
    delete this.storage[this.top - 1];
    this.top--;
    return result;
  }
}
```

```jsx
// 배열 속성을 활용한 Stack 프로토타입
class Stack {
  constructor() {
    this.storage = {};
    this.top = 0;
  }

  size() {
    if (this.top === 0) {
      return 0;
    }
    return this.storage.length;
  }

  push(element) {
    Array.prototype.push.call(this.storage, element);
  }

  pop() {
    return Array.prototype.pop.call(this.storage);
  }
}
```

<br>
<br>
<br>

### Queue

놀이동산 입장을 기다리는 줄을 상상하자 → First In First Out

#### 예시

운영체제의 프로세스 관리, 힙(binary heap)을 활용하여 우선순위(priority) 중심의 구조 설계

#### 시간복잡도

추가(.enqueue(element))와 삭제는 $O(1)$, 가져오기(.dequeue())는 $O(n)$의 시간복잡도를 갖는다.

#### 메소드

.enqueue(element), .dequeue(), size() 등

```jsx
// 객체를 활용한 Queue 프로토타입
class Queue {
  constructor() {
    this.storage = {};
    this.rear = 0;
    this.front = 0;
  }

  size() {
    return this.rear - this.front;
  }

  enqueue(element) {
    this.storage[this.rear] = element;
    this.rear++;
  }

  dequeue() {
    if (this.rear <= this.front) return 0;
    let result = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;
    return result;
  }
}
```

```jsx
// 배열 속성을 활용한 Queue 프로토타입
class Queue {
  constructor() {
    this.storage = {};
    this.rear = 0;
  }

  size() {
    if ((rear = 0)) {
      return 0;
    }
    return this.storage.length;
  }

  enqueue(element) {
    Array.prototype.push.call(this.storage, element);
  }

  dequeue() {
    return Array.prototype.shift.call(this.storage);
  }
}
```

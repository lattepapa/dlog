---
title: "Linked List와 Hash Table"
category: javascript
path: /javascript/mil13
date: 2020-09-07 23:00:12
---

### Linked List

data와 **pointer**로 구성된 node가 선형(linear) **연결**을 구성함으로써 데이터 구조를 만든 것

#### 장점

배열에 비해 data의 추가나 삭제가 매우 빠르고 메모리를 운용하는 방식은 상대적으로 효율적이다.

#### 단점

배열에 비해 탐색과 정렬에 매우 느리고, 기본적으로 pointer만큼의 추가 메모리 소모가 있다.

#### 예시

FAT32 파일시스템, 지하철 운행(이번역은... 다음역은 ...), Ctrl+Z의 사용(실행취소), 이미지뷰어 등

#### 시간복잡도

원하는 node를 찾으려면 앞에서부터 순차탐색 해야하기 때문에, 각 노드의 탐색 속도는 자신의 순서와 같다. 따라서 탐색 시간 복잡도는 $O(n)$이다. 한편, 첫번째 node의 추가/삭제는 $O(1)$의 시간복잡도를 갖지만, 이후의 임의 node의 추가/삭제 시간복잡도는 $O(n)$에 근접하게 된다.

#### 주요 구조

(head) → (node) → (node) → ... → (node) → (tail) → Null  
[1] head : 첫번째 node를 가리키는 순수 pointer이다. 빈 List라면 head가 바로 Null을 가리키게 된다.  
[2] node : data를 갖으면서 다음 node를 가리키는 pointer도 함께 갖는다.  
[3] tail : Time Complex를 줄여서 node별 data들을 잘 CRUD하기 위한 일종의 편의개념이다.

#### 종류

[1] Singly Linked List : 각 node에 pointer가 1개 → previous node 확인 불가  
[2] Doubly Linked List : 각 node에 pointer가 2개 → next, previous node 모두 확인 가능  
[3] Circular Linked List : 마지막 node가 Null이 아니라 첫번째 node를 가리키도록 하여 Loop 형성

#### 주요 메소드

.addToTail(data), .remove(data), .indexOf(data), .contains(data), .getNodeAt(index) 등

```jsx{numberLines: true}
// Node 생성 클래스
class Node {
  // highlight-start
  constructor(data) {
    this.data = data;
    this.next = null;
  }
  // highlight-end
}

// Linked List 생성 클래스
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }
}
```

```jsx{numberLines: true}
// AddtoTail 메소드
LinkedList.prototype.addToTail = function (data) {
  let add = new Node(data);

  // 만약 head가 가리키는 node가 없다면, 즉, Linked List가 비어있다면
  if (!this.head) {
    this.head = add;
    this.tail = add;
    this._size++;
  }

  // tail 위치에 node를 삽입할때 node 자체와 pointer에 동일하게 node를 대입
  this.tail.next = add;
  this.tail = add;
  this._size++;
};
```

```jsx{numberLines: true}
// Remove 메소드
LinkedList.prototype.remove = function (data) {
  let current = this.head;
  let pre; // current의 이전(previous) 노드

  // 만약 current node에서 바로 삭제할 data를 찾았다면
  if (current.data === data) this.head = current.next;

  // 바로 못찾았다면 next node로 계속 탐색해야 함
  while (current.data !== data) {
    pre = current;
    current = current.next;
  }
  pre.next = current.next;
  this._size--;
};
```

```jsx{numberLines: true}
// getNodeAt 메소드
LinkedList.prototype.getNodeAt = function (index) {
  let current = this.head;
  let counter = 0;

  // next node로 계속 탐색해야 함
  while (current) {
    if (counter === index) return current;
    current = current.next;
    counter++;
  }
  return undefined;
};
```

```jsx{numberLines: true}
// contains 메소드
LinkedList.prototype.contains = function (data) {
  let current = this.head;

  // next node로 계속 탐색해야 함
  while (current) {
    if (current.data === data) return true;
    current = current.next;
  }
  return false;
};
```

```jsx{numberLines: true}
// indexOf 메소드
LinkedList.prototype.indexOf = function (data) {
  let current = this.head;
  let index = 0;

  // next node로 계속 탐색해야 함
  while (current) {
    if (current.data === data) return index;
    current = current.next;
    index++;
  }
  return -1;
};
```

<br>
<br>
<br>

### Hash Table

#### Hashing

특정 data(=key)를 고정된 형식의 data(=index)로 변환하여 bucket에 연결하는 것

#### bucket

index에 연결된 일종의 객체로, { key: value(난수와 같은 주소정보) } 로 생각하면 된다.

#### tuple

배열과 동일하나, 배열과 달리 element를 수정할 수 없는 것을 의미

#### 장점

hashing된 키를 바탕으로 인덱스를 검색하기 때문에 data의 추가, 삭제 및 탐색이 아주 쉽고 빠르다. 특히, Load Factor를 통해 해시테이블 크기의 25 ~ 75%를 최적상태로 하여, 자동으로 크기가 조절되도록 할 수 있다.

#### 단점

해시함수 사용을 위한 추가 연산 필요, 해시테이블 크기 유한(공간효율성낮음), 해시충돌 리스크 상존한다. 또한, 해시 충돌에 연결 리스트를 사용하는 방식으로 대응한다면 캐시 효율이 떨어진다.

#### 예시

전화번호부, 암호화(MD5, SHA256 등), 블록체인, DNS resolution(즉, V8엔진에 URL 주소입력 시)

#### 시간복잡도

충돌이 없다면 추가/삭제의 시간복잡도는 $O(1)$이지만, 충돌이 많아질수록 $O(n)$에 수렴하게 된다.

#### 충돌(Collision)을 극복하는 방법:

[1] Open Addressing : { key: value }를 넣고자 하는 인덱스에 이미 값이 있다면 회피하는 방법

- 선형탐사 : n번 인덱스에 넣어야 하는데 이미 값이 있다면 n+1번 인덱스가 비었는지 확인
- 이중해시 : 해시함수를 2개 만들어놓고 평소에는 한개만 사용하다가, 충돌 시 남은 한개로 새 인덱스 도출

[2] Close Addressing : 인덱스에 이미 값이 있더라도 해당 인덱스에 저장하는 방법

- Bucket : 해당 인덱스가 다시 여러 인덱스를 갖는 배열이 되어(Matrix), 충돌된 것을 거기에 쌓는다.
- Chaining : 해당 인덱스에 충돌된 것들을 Linked List로 연결하여 구현한다.

#### 구조

key("Adam Smith") → (hash function) → bucket([ { "Adam Smith" : 031-2134 }, { }, ...]) → (hash table)

#### 주요 메소드

.insert(key, value), .retrieve(key), .remove(key), .resize(newLimit) 등

```jsx{numberLines: true}
// 해시값(hash value) 생성함수
// 어떠한 key를, 그것을 표징하는 인덱스(해시값)로 변환하는 역할
const hashFunction = function (str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash &= hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
```

```jsx{numberLines: true}
// 해시테이블에 값(tuple) 저장
// 해시값 생성함수를 통해 생성된 인덱스에, key-value 튜플을 연관시켜 저장하는 역할
const LimitedArray = function (limit) {
  const storage = [];

  const limitedArray = {};
  limitedArray.get = function (index) {
    checkLimit(index);
    return storage[index];
  };
  limitedArray.set = function (index, tuple) {
    checkLimit(index);
    storage[index] = tuple;
  };
  limitedArray.each = function (callback) {
    for (let i = 0; i < storage.length; i++) {
      callback(storage[i], i, storage);
    }
  };

  var checkLimit = function (index) {
    if (typeof index !== "number") {
      throw new Error("setter requires a numeric index for its first argument");
    }
    if (limit <= index) {
      throw new Error("Error trying to access an over-the-limit index");
    }
  };

  return limitedArray;
};
```

```jsx{numberLines: true}
// 해시테이블 생성 템플릿
class HashTable {
  // highlight-start
  constructor() {
    this._size = 0;
    this._limit = 8; // 정하기 나름
    this._storage = new LimitedArray(this._limit);
  }
  // highlight-end
}
```

```jsx{numberLines: true}
// 해시테이블에 key-value 튜플 추가하는 메소드
HashTable.prototype.insert = function (key, value) {
  const index = hashFunction(key, this._limit);
  let tuple = {}; // 튜플은 { key: value, 복숭아: 츄르 } 꼴이다.

  // 이미 Hash Table에 key가 존재하는 경우
  // 즉, Hash Table의 어떤 index에 해당 key-value 튜플이 이미 저장되어있는 경우
  if (this._storage.get(index)) {
    tuple = this._storage.get(index);
    tuple[key] = value;
    this._storage.set(index, tuple);
  }
  tuple[key] = value;
  this._storage.set(index, tuple);

  this._size++;

  // Hash Table size가 limit의 75%를 넘어가면, 2배의 size로 reHashing 해야한다.
  if (this._size / this._limit > 0.75) this._resize(this._limit * 2);
};
```

```jsx{numberLines: true}
// 해시테이블에서 주어진 key의 value를 조회하는 메소드
HashTable.prototype.retrieve = function (key) {
  const index = hashFunction(key, this._limit);

  // 주어진 key가 해시테이블에 존재한다면
  if (this._storage.get(index)) return this._storage.get(index)[key];
  return undefined;
};
```

```jsx{numberLines: true}
// 해시테이블 내 튜플 삭제 메소드
HashTable.prototype.remove = function (key) {
  const index = hashFunction(key, this._limit);

  // 주어진 key가 해시테이블에 존재한다면
  if (this._storage.get(index)) {
    delete this._storage.get(index)[key];
    this._size--;

    // size가 limit의 25%도 안되면 limit의 절반으로 해시테이블을 resize 해야한다
    if (this._size / this._limit < 0.25) this._resize(this._limit * 0.5);
  }

  return undefined;
};
```

```jsx{numberLines: true}
// 해시테이블에 대한 Re-Hashing 메소드
HashTable.prototype._resize = function (newLimit) {
  // HashTable 클래스의 기존 storage 정보들을 일괄적으로 따로 빼놔야 한다.
  let oldStorage = this._storage;
  let oldLimit = this._limit;

  // newLimit에 기초한 HashTable 클래스 정보 재정립
  this._size = 0;
  this._limit = newLimit;
  this._storage = new LimitedArray(this._limit);

  // 기존 storage에 포함된 튜플들을 차례대로 하나씩 새 storage에 넣는다.
  for (let index = 0; index < oldLimit; index++) {
    if (oldStorage.get(index)) {
      for (let key in oldStorage.get(index)) {
        this.insert(key, oldStorage.get(index)[key]);
      }
    }
  }
};
```

<br>
<br>
<br>

### Stack과 Linked List가 섞인 문제

#### (head) 1 → 2 → 3 → 4 → 5 → 6 (tail)과 같이 저장된 Linked List가 있다. 주어진 함수가 아래와 같을 때, `alternatePrint(head)`의 결과는?

```jsx{numberLines: true}
function alternatePrint(node) {
  if (node == null) {
    return;
  }
  console.log(node.data);
  if (node.next) {
    alternatePrint(node.next.next);
  }
  console.log(node.data);
}
```

답은 1 - 3 - 5 - 5 - 3 - 1

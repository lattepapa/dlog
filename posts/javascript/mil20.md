---
title: "promise"
category: javascript
path: /javascript/mil20
date: 2020-09-21 23:04:19
---

### Asynchronous

클라이언트의 요청을 **비동기적(asynchronously)**으로 서버가 처리해준다면, 클라이언트는 일단 작업을 요청한 이후로도 다른 작업을 진행/요청할 수 있게 된다. 만약 서버가 동기적(synchronously) 처리만 가능하다면 클라이언트는 서버의 처리가 끝날 때까지 대기해야 한다.

### callback

"김수" "안무" "거북이와" "두루미"를 차례대로 뱉어내는 함수는 다음과 같이 최초에 표현할 수 있다. 단, 함수는 비동기적이지만, 뱉어내는 동안 다른 작업이 없으므로 결과만 놓고 보면 다소 동기적인 상황이다. 그 뒷 구절이 붙을 때마다 후속 콜백함수의 호출을 위해 **curly brackets**이 뱀처럼 증가된다.

```jsx{numberLines: true}
const print = (string, callback) => {
  setTimeout(() => {
    console.log(string);
    callback();
  }, Math.floor(Math.random() * 100) + 1);
};

const printAll = () => {
  print("김수", () => {
    print("안무", () => {
      print("거북이와", () => {
        print("두루미", () => {});
      });
    });
  });
};

printAll();
```

<br>

### promise

promise 객체는 연쇄적인 비동기적 처리를 콜백지옥 없이 도와주는 클래스라고 할 수 있다. 단, **.then(callback)** 메소드 상황에서 **반드시 'return'으로 다음 callback을 호출해야 한다.** 만약 'return' 구문없이 단순히 다음 상황을 호출한다면 이는 콜백지옥과 다를 바가 없어지게 된다.

#### Pending 상태

**new Promise()**를 통해 promise 객체가 **막 선언된 상태**를 의미한다. pending 상태에서는 **resolve 메소드**와 **reject 메소드**를 콜백에 넘길 준비를 한다.

#### Fulfilled 상태

콜백에 정상적으로 **resolve 메소드**가 전달된 상태를 의미한다. 이때 반드시 **then(() => {return 비동기처리함수 리턴})** 등으로 처리결과를 받아내야 한다.

#### Reject 상태

콜백이 **reject(new Error("Request is failed"))** 등을 받을 수 있도록 한 상태를 의미한다. 위의 fulfilled 상태와 유사하게, 반드시 **then().catch(() ⇒ {new Error의 내용 리턴})** 등으로 처리결과를 받아내야 한다.

### 콜백구조를 promise 구조로 변환하기

```jsx{numberLines: true}
const print = (string, callback) => {
  // Promise 메소드를 호출한 상태에서 비동기적 처리의 내용을 실행한다!!
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(string);
      // callback()이 들어갈 자리에 resolve()를 대입한다.
      resolve();
    }, Math.floor(Math.random() * 100) + 1);
  });
};

const printAll = () => {
  print("김수") // 후속 처리될 함수는 .then 메소드를 호출하여 그 안에서 '리턴'으로 처리한다!!
    // highlight-start
    .then(() => {
      return print("안무");
    })
    // highlight-end
    .then(() => {
      return print("거북이와");
    })
    .then(() => {
      return print("두루미");
    });
};

printAll();
```

<br>

이때, 단순히 하나의 함수 안에서 setTimeout으로 비동기처리가 이뤄지는 것만 가능한 것이 아니다. 다음과 같이 **여러 함수들이 비동기적**으로 처리될 때에도 promise 구문을 사용할 수 있다.

```jsx{numberLines: true}
function wakeUp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("1.기상, 기상!");
    }, 100);
  });
}

function callRoll() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2.일조점호 인원보고");
    }, 100);
  });
}

function goJogging() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("3.구보중에 군가한다, 군가는...");
    }, 100);
  });
}

function haveBreakfast() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("4.1분대부터 식사하러 갓");
    }, 100);
  });
}

wakeUp()
  .then((data) => {
    // data는 wakeUp()의 resolve()에 담긴 것을 의미
    console.log(data); // 1.기상, 기상!
    return callRoll();
  })
  .then((data) => {
    // data는 callRoll()의 resolve()에 담긴 것을 의미
    console.log(data); // 2.일조점호 인원보고
    return goJogging();
  })
  .then((data) => {
    // data는 goJogging()의 resolve()에 담긴 것을 의미
    console.log(data); // 3.구보중에 군가한다, 군가는...
    return haveBreakfast();
  })
  .then((data) => {
    // data는 haveBreakfast()의 resolve()에 담긴 것을 의미
    console.log(data); // 4.1분대부터 식사하러 갓
  });
```

<br>

### async await

**async ~ await** 구문을 통해 **.then 메소드**를 대체할 수도 있다! 이 때 **async()**는 비동기 실행의 총 프로세스를 담는 메소드가 되며, **await**는 실행될 콜백의 **resolve 메소드**의 데이터를 변수에 담아주는 역할을 수행하게 된다.

```jsx{numberLines: true}
function wakeUp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("1.기상, 기상!");
    }, 100);
  });
}

function callRoll() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2.일조점호 인원보고");
    }, 100);
  });
}

function goJogging() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("3.구보중에 군가한다, 군가는...");
    }, 100);
  });
}

function haveBreakfast() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("4.1분대부터 식사하러 갓");
    }, 100);
  });
}

const result = async () => {
  const one = await wakeUp();
  console.log(one);

  const two = await callRoll();
  console.log(two);

  const three = await goJogging();
  console.log(three);

  const four = await haveBreakfast();
  console.log(four);
};

result();
```

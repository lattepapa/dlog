---
title: "Asynchronous"
category: javascript
path: /javascript/mil21
date: 2020-09-22 23:02:20
---

### 비동기처리가 가능한 상황

#### (시간지연 등을 활용한)애니메이션을 구현하고자 할때

setTimeout(), setInterval() 등의 메소드에 콜백을 담는 경우이다.

#### 콜백을 대체하고자 할때

```jsx{numberLines: true}
// 1. 기존 콜백상황
const getDataFromFile = function (filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    // filePath가 에러케이스일때 : 콜백은 첫번째 인자에 에러를 담는다
    if (err) callback(err, null);
    // filePath가 정상일때 : 콜백은 두번째 인자에 data를 담는다
    else callback(null, data);
  });
};

// getDataFromFile('README.md', (err, data) => console.log(data))
```

```jsx{numberLines: true}
// 2. 프로미스 객체(resolve, reject 속성)를 활용하는 경우
const getDataFromFilePromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      // filePath가 에러케이스일때 : reject에 박아놓는다
      if (err) reject(err);
      // filePath가 정상일때 : resolve에 써놓고 기다린다
      else resolve(data);
    });
  });
};

// getDataFromFilePromise('README.md').then(data => console.log(data));
```

```jsx{numberLines: true}
// 3. 프로미스 객체들의 비동기처리 체이닝(then 키워드)을 활용하는 경우
const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

const readAllUsersChaining = () => {
  const result = [];

  // user1 정보를 비동기처리하는 작업 시작!
  return getDataFromFilePromise(user1Path)
    .then((data1) => {
      // user1Path의 비동기처리결과를 변수 data1에 넣고
      result.push(JSON.parse(data1)); // JSON 파싱 처리 및 result에 삽입한다.
      return getDataFromFilePromise(user2Path); // user2 정보를 비동기처리 시작.
    })

    .then((data2) => {
      // 위에 이어서, 비동기처리결과를 then을 통해 변수 data2에 받아서
      result.push(JSON.parse(data2)); // JSON 파싱 처리 및 result에 삽입 후
      return result; // 최종값 리턴!
    });
};

// readAllUsersChaining();
```

```jsx{numberLines: true}
// 4. 프로미스 객체들의 일시 비동기처리(Promise All)을 활용하는 경우
const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

const readAllUsers = () => {
  // Promise.all에 넣을 두 인자를 미리 JSON 파싱 처리해둔다.
  const p1 = getDataFromFilePromise(user1Path).then((data1) =>
    JSON.parse(data1)
  );
  const p2 = getDataFromFilePromise(user2Path).then((data2) =>
    JSON.parse(data2)
  );

  // Promise.all을 통해 받은 프로미스 객체들을 더 가공할 것이 없으므로 객체 그대로 로드하는 콜백 사용
  return Promise.all([p1, p2]).then((values) => values);
};

// readAllUsers()
```

```jsx{numberLines: true}
// 5. 프로미스 객체들을 async 함수로 받아서 await로 처리하는 경우
const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

const readAllUsersAsyncAwait = async () => {
  // await를 사용하기 위해서는 애초에 async() 메소드가 선언(정의) 되어야 한다!!!
  const result = [];

  const p1 = await getDataFromFilePromise(user1Path);
  result.push(JSON.parse(p1));

  const p2 = await getDataFromFilePromise(user2Path);
  result.push(JSON.parse(p2));

  return result;
};

// readAllUsersAsyncAwait();
```

#### 네트워크 처리(API)를 하고자 할때

```jsx{numberLines: true}
// 1. fetch를 활용하여 브라우저 정보를 프로미스 객체로 받는 경우
var newsURL = "http://localhost:5000/data/latestNews";
var weatherURL = "http://localhost:5000/data/weather";

function getNewsAndWeather() {
  // fetch는 Node.js 환경에서 구동할 수 없다. 브라우저 환경에서 구동할 수 있다!
  // fetch는 반드시 Promise 객체를 소환한다!!!
  let result = {};

  return (
    fetch(newsURL)
      // 먼저 뉴스를 fetch하기
      // Promise 객체를 비동기 처리하여, JSON 파싱 처리된 response 객체로 소환!
      .then((response) => response.json())
      // response 객체 내용을 jsonNews 변수로 받아서, data 속성의 키값들을 result 객체로우
      .then((jsonNews) => {
        result["news"] = jsonNews.data;
        return fetch(weatherURL); // 이어서 날씨를 fetch!
      })

      .then((response) => response.json())
      .then((jsonWeather) => {
        result["weather"] = jsonWeather;
        return result;
      })

      .catch((error) => console.log(error))
  );
}
```

```jsx{numberLines: true}
// 2. fetch로 받은 브라우저 정보의 프로미스 객체를 Promise.all로 처리하는 경우
var newsURL = "http://localhost:5000/data/latestNews";
var weatherURL = "http://localhost:5000/data/weather";

function getNewsAndWeatherAll() {
  // 각각 URL로부터 fetch(= Promise객체화) 후, JSON 파싱 된 response 객체로 받아둔다.
  const p1 = fetch(newsURL).then((response) => response.json());
  const p2 = fetch(weatherURL).then((response) => response.json());

  return Promise.all([p1, p2]).then((values) => {
    // Promise.all의 콜백은 아래와 같이 구성한다!!
    // result 객체의 news 속성에는 -> p1(news)에 의한 response 객체의 data 속성을,
    // result 객체의 weather 속성에는 -> p2(weather)에 의한 response 객체 속성을 부어넣자!
    const result = {};

    result.news = values[0].data;
    result.weather = values[1];

    return result;
  });
}
```

```jsx{numberLines: true}
// 3. fetch로 받은 브라우저 정보를 async ~ await로 다룰 경우
var newsURL = "http://localhost:5000/data/latestNews";
var weatherURL = "http://localhost:5000/data/weather";

async function getNewsAndWeatherAsync() {
  // async await은 반드시 Promise 객체로 리턴한다!!!!!!
  // 만약 함수만 async로 정의하고 await을 쓰지 않으면 Promise 객체 리턴이 안된다...
  let result = {};

  result.news = (await fetch(newsURL).then((response) => response.json())).data;
  result.weather = await fetch(weatherURL).then((response) => response.json());

  return result;
}
```

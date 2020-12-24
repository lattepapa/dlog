---
title: "Final Project 회고"
category: react
path: /react/react03
date: 2020-12-20 10:13:00
---

4주간 수행한 Final 프로젝트가 12월 20일(일)에 드디어 종료되었다. 공식적으로는 12월 18일(금) 종료지만, 여러 기능 개선과 CSS 마무리 작업을 남은 이틀의 주말간 수행했다. 1st 프로젝트와 달리, 엄청난 납기 압박과 주먹구구식의 개발에서 벗어난 개발이었다는 점에서 새로운 회고거리가 생겼다. 특히, 빠른 시간 안에 개발에 필요한 지식을 습득하여 개발 실무에 적용하길 반복했다는 점에서 비로소 **Sprint 개발**을 실제로 적용한 느낌이 들었다. 아직 실제 서비스 고객으로부터의 피드백을 새로운 개발 동력으로 삼는 Axile 개발을 경험하진 못했지만 그것은 현업에서 맛볼 꺼리라고 묵혀두겠다.

### 개발스택

#### Front-end

나는 이번 프로젝트에서 풀스택 개발을 담당하였다. 이를 위해 1st 프로젝트와 동일하게 `npx create-react-app`를 통해 **react** 라이브러리 환경(17.0.1)을 구성했다. 그리고 **react-router-dom**(5.2.0), **axios**(0.21.0), node-sass(4.14.1), classnames(2.2.6), react-icons(3.11.0), styled-components(5.2.1) 등의 의존성도 1st 프로젝트와 동일하게 설치했다. 다만, 파일 업로드라는 새로운 기능을 구현하기 위해 **react-dropzone** 의존성을 추가했고 카카오 지도를 도입하고자 **Kakao Map API**를 외부에서 끌어왔다. 그밖에 O Auth 2.0을 위한 여러 작업들과 의존성 관리가 클라이언트와 서버 단 양쪽에서 거의 동일하게 수행되었다.

#### Back-end

**Node.js Express 프레임워크**(4.17.1), **MySQL**2(2.2.5), **Sequelize** ORM(6.3.5), axios(0.21.0), body-parser(1.19.0), cors(2.8.5), crypto(1.0.1), dotenv(8.2.0), express-session(1.17.1), jsonwebtoken(8.5.1), nodemon(2.0.6) 의존성이 지난 1st 프로젝트와 동일하게 설치되었다. 또한, AWS S3 파일 업로드를 구현하기 위해 **aws-sdk**와 **multer/multer-s3** 의존성을 설치하고 라우터와 컨트롤러에 개발을 진행했다.
<br>

### Weekly Reflection

#### 1주차 회고

![image](https://user-images.githubusercontent.com/67884699/103055640-2a51eb00-45de-11eb-883a-0fb0b4568b09.png)

#### 2주차 회고

![image](https://user-images.githubusercontent.com/67884699/103055752-713fe080-45de-11eb-9e1c-c13012dab8a8.png)

#### 3주차 회고

![image](https://user-images.githubusercontent.com/67884699/103055811-9d5b6180-45de-11eb-8b5f-263af5f1cbd7.png)

#### 4주차 회고

![image](https://user-images.githubusercontent.com/67884699/103055859-c11ea780-45de-11eb-8c28-4ba69e075985.png)

프로젝트를 완료한 후 이와 같이 주차별 회고 기록을 돌이켜보니 또다시 진한 아쉬움이 젖어오는 것은 어쩔 수 없는 것 같다. 따라서 디자인에 대한 허기짐과 이번 납기 안에서는 채 구현하지 못했던 typescript 리팩토링을 후속 과제로 나 스스로에게 부여했다.

<br>

### 나를 가장 괴롭힌 것들

이번 프로젝트에서 나를 가장 괴롭힌 것들은 **외부 API(카카오맵)의 도입**, **파일 업로드**이다. 반대로, 이들 덕분에 React라는 라이브러리가 얼마나 SPA를 위해 철저히 고안된 것인지 새삼 깨달을 수 있었다.

#### React에서 외부 API(카카오맵) 사용하기

> _'리액트는 인 메모리 데이터 구조 캐시를 만들고 결과 차이를 계산한 다음 브라우저에 표시되는 DOM을 효과적으로 업데이트한다. 이로써 프로그래머는 마치 모든 페이지가 변경될 때마다 렌더링되는 것처럼 코드를 작성할 수 있는데, 실제로 리액트 라이브러리는 단지 실제로 변경되는 하위 컴포넌트만을 렌더링할 뿐이다.'_ - **wikipedia**

가장 당연하게 생각했으면서 가장 간과하고 있었던 것이 바로 '리액트는 Virtual DOM을 제어한다'는 컨셉이다. 그렇기 때문에 각 컴포넌트 안에서 `<script>` 태그를 활용하기 위해서는 몇가지 특단(?)의 조치가 필요하다. 일단 다음은 주먹구구식으로 카카오맵 API를 밀어 넣었을 당시의 코드이다.

```jsx{numberLines: true}
// 문제상황의 public/index.html

<!DOCTYPE html>
<html lang="en">

<head>
  ...
  // highlight-start
  <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_KAKAO_MAP_KEY%&libraries=services&autoload=false"></script>
  // highlight-end
</head>

<body>
  ...

```

```jsx{numberLines: true}
// 문제상황의 src/KakaoMap.js

/* global kakao */
import React, { useState, useEffect } from "react";

function KakaoMap(props) {
  console.log("카카오맵API를 받아옵니다 ***", window.kakao);
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.476947, 126.822903),
      level: 5,
    };
    let map = new kakao.maps.Map(mapContainer, mapOptions);
    ...
  return (
      <div
        id="map"
        style={{ width: `25rem`, height: `20rem`}}
      ></div>
    );
  }

  export default KakaoMap;
```

<br>

카카오에서 발급받은 키는 환경변수(.env)에 저장한 후 위와 같이 index.html의 `<head>` 태그 안에 `<script>`를 선언하여 카카오맵 API를 src로 설정하였다. 이렇게 코드를 작성하니 발생한 가장 눈에 띄는 에러는 **kakao** 인스턴스를 전혀 인식하지 못한다는 것이었다! 즉, 'new kakao.maps'와 같이 카카오 API에서 제공하는 메소드를 못쓰는 상황이 연출되었다. 애초에 카카오맵을 다른 컴포넌트들에서도 손쉽게 **재사용**할 수 있도록 별도의 컴포넌트로 구획했기 때문에 이러한 문제상황을 해결하고자 여러 **console.log 테스트**를 수행했다. 더불어 클래스형 컴포넌트로의 코드 작성, 함수형 컴포넌트로의 코드 작성 등 밑바닥 리팩토링 등의 수고스러움을 수행한 결과는 다음과 같이 도출되었다.

```jsx{numberLines: true}
// 최종 public/index.html

<!DOCTYPE html>
<html lang="en">

<head>
  ...
  // highlight-start
  카카오맵 API를 호출하는 <script> 태그 제거
  // highlight-end
</head>

<body>
  ...

```

```jsx{numberLines: true}
// 최종 src/KakaoMap.js

/* global kakao */
import React, { useState, useEffect } from "react";

function KakaoMap(props) {
  console.log("카카오맵API를 받아옵니다 ***", window.kakao);
  useEffect(() => {
    // highlight-start
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);
    // highlight-end

    script.onload = () => {
      let { kakao } = window;
      let place = props.place;

      kakao.maps.load(() => {
        let mapContainer = document.getElementById("map");
        let mapOptions = {
          center: new kakao.maps.LatLng(33.476947, 126.822903),
          level: 5,
        };
        let map = new kakao.maps.Map(mapContainer, mapOptions);
        ...
  return (
      <div
        id="map"
        style={{ width: `25rem`, height: `20rem`}}
      ></div>
    );
  }

  export default KakaoMap;
```

<br>

문제를 해결해준 것은 **useEffect** 안에 **document.createElement("script")**를 작성하여 카카오맵 컴포넌트가 호출될 때 componentDidMount를 유도한 것이었다. 하지만 이러한 코드작성은 **JSX**를 활용한 작성도 아닐뿐더러, Virtual DOM을 최적으로 렌더링하는 방법은 아닐꺼란 생각이 들었다. 따라서 **return()** 이하에서 **React.createElement("script", {src: ".."})**의 형태로 리팩토링을 진행할 [**계획**](https://stackoverflow.com/questions/40989629/reactjs-create-script-element)이다.

#### 파일 업로드 기능 구현하기

두번째 케이스의 경우, 서버와의 상호작용과 결부하여 생각보다 더 많은 시간동안 로직에 대한 고민을 내게 안겨준 것이었다. 사진, 제목, 위치 정보를 필수로 입력해야 정상적인 사진 포스팅이 가능하도록 설계한 가운데, 유저가 브라우저를 통해 파일을 업로드한 것에 대해 서버에서 확인이 가능해야 했다. 따라서 이러한 로직을 위해 다음과 같이 코드를 짰다.

```jsx{numberLines: true}
// 최종 src/Addphoto.js

import React, { useEffect, useState } from "react";
import KakaoMap from "./KakaoMap";
import Axios from "axios";
...

function AddPhoto(props) {
  // Drag & Drop된 사진을 표시하고 제거도 하기 위한 state
  const [FileName, setFileName] = useState("");
  // s3 업로드를 통해 url을 따기 위한 state
  const [PhotoFormData, setPhotoFormData] = useState([]);
  ...

  // 사진업로드 Drag & Drop을 정의한다
  const onDrop = (files) => {
    // 업로드 파일을 drop하면 FormData 인스턴스 생성
    let formData = new FormData();
    formData.append("file", files[0]);
    console.log("업로드 대기열 ***", files[0]);
    setFileName(files[0].name);
    setPhotoFormData(formData);
  };

  // 사진업로드 & DB저장을 요청한다
  const onSubmit = (e) => {
    e.preventDefault();

    // 사진에 대한 S3 url 생성 요청
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    Axios.post("https://api.mystar-story.com/addphoto", PhotoFormData, config)
      .then((res) => {
        if (res.data.success) {
          console.log("사진 URL 생성 성공 ***", res.data.url);
          ...
          // 성공적으로 생성된 사진 url을 바탕으로 사진정보를 Photo 모델에 저장 요청
          const photo = {
            title: PhotoTitle,
            photoPath: res.data.url,
            location: PhotoLocation,
            hashtag: CompleteTag,
          };
          console.log("사진 업로드 최종정보 ***", photo);
          console.log("헤더의 포맷입니다 *** ", config);

          Axios.post("https://api.mystar-story.com/savephoto", photo)
            .then((res) => {
              if (res.data.success) {
                // 해시태그가 있으면 해당 정보도 HashTag 모델 및 Photo 모델에 저장 요청
                if (CompleteTag.length !== 0) {
                  const hashtag = {
                    hashtag: CompleteTag,
                    photoPath: photo.photoPath,
                  };

                  Axios.post(
                    "https://api.mystar-story.com/hashtager",
                    hashtag
                  ).then((res) => {
                    if (res.data.success) {
                      console.log("해시태그 포함 최종정보", res.data);
                    } else {
                      alert("해시태그 등록 실패");
                    }
                  });
                }

                alert("사진 업로드에 성공하였습니다");
                window.location.replace("/");
              } else {
                alert("사진 업로드 실패");
              }
            })
            .catch((err) => {
              alert("반드시 사진제목과 위치를 모두 입력해야 합니다");
              console.log("업로드 정보 ***", photo);
            });
        } else {
          alert("사진 url 생성 실패");
        }
      })
      .catch((err) => {
        alert("업로드할 사진을 선택해야 합니다");
      });
  };
  ...

  return (
    ...
  );
}

export default AddPhoto;

```

<br>
사진 포스팅 완료 조건(사진업로드, 제목작성, 위치선택)들이 만족되었다는 가정 하에, 이 로직에 의하면

> 1\. 파일 Drag & Drop을 통해 **FormData 인스턴스**가 생성되고  
> 2\. **onSubmit**을 호출하는 클릭 이벤트를 수행하면  
> 3\. 먼저 FormData 인스턴스에 담긴 file을 **AWS S3에 업로드**하여 **URL**을 생성한다.  
> 4\. 이는 서버 라우터에서 먼저 수행되며, 이 결과물(URL)이 클라이언트로 응답된다.  
> 5\. 클라이언트는 응답 데이터(URL)와 제목, 위치 정보를 모아서 서버에 최종 제출(submit)한다.  
> 6\. 만약 해시태그 입력내용이 존재한다면 해당 정보를 취급하는 별도의 API와 통신한다.

의 흐름으로 클라이언트와 서버가 통신한다.

<br>
<br>

4주라는 시간이 어떤 서비스의 기틀을 만드는 데에는 넘치지도, 부족하지도 않다는 생각이 들었다. 다만, **반응형 CSS**를 완벽하게 구현하기에는 확실히 납기가 촉박했다고 생각된다. 앞으로 리팩토링을 통해 여러 시도할 것들과 구현하고 싶은 요소들이 있는만큼, 이번 Final 프로젝트를 앞으로도 잘 어르고 키워볼 생각이다.

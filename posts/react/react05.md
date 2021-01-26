---
title: "리덕스(Redux) 라이브러리"
category: react
path: /react/react04
date: 2021-01-25 21:23:34
---

리덕스(Redux)는 자바스크립트 기반의 **상태 관리** 라이브러리이다. 여기서 **상태**(state)를 관리한다는 것은 리액트에서 매우 중요한 의미를 갖는다. 리액트는 컴포넌트 간 부모-자식 관계를 활용하여 **props 상속**을 구현한다. 이러한 props는 각 컴포넌트에서 각 상태에 반영될텐데(이는 컴포넌트 라이프사이클에서 **getDerivedStateFromProps** 과정으로 대응됨), 문제는 컴포넌트 부모-자식관계가 고도화 될 수록 자식 컴포넌트에서 상태가 변화됨을 '보고'하기 위해 상속의 최상단까지 거슬러 올라가야 하는 복잡성이 증가될 수 있다는 것이다. 이것을 훌륭하게 보완해주는 것이 바로 리덕스 라이브러리이다. 리덕스가 없는 경우와 리덕스를 사용하는 경우는 아래의 그림과 같이 비교할 수 있다.  
![redux](https://user-images.githubusercontent.com/67884699/105800203-8ba01c00-5fd9-11eb-8c1b-a1d09367542d.jpg)

<br />

### Action 객체

리덕스 라이브러리는 기존에 컴포넌트에서 state가 변경되는 '사실'을 별도의 **store**라는 공간에 저장해두는 과정을 제공한다. 이때, 컴포넌트에서 state가 변경되는 것을 **action**이라고 부른다. 말 그대로 **어떤 기능/동작이 실행(action)됨**으로써 state가 바뀌었다는 의미를 내포한다. 이 action은 리덕스 라이브러리에서 **객체**로 표현된다. 예를 들면 '좋아요' 버튼을 눌렀을 때 `{ type: "LIKE_ARTICLE", articleId: 42 }`와 같은 형식의 action 객체가 저장되게 할 수 있다. 이것은 아래에 후술할 **reducer**의 가공을 거쳐 **store**에 최종 저장된다.

이때, redux-promise와 같은 별도의 의존성을 통해 **비동기요청**(promise, fetch 등)도 action 객체에서 관리되도록 할 수 있다. 예를 들어 '좋아요' 버튼을 눌렀을 때 해당 내용을 서버에 Axios 요청하도록 하고 이러한 비동기요청 처리 결과를 받아 reducer의 가공에 활용할 수 있다.

```jsx
// 좋아요에 따른 상태변화를 전달해주는 dispatch 함수(.js)와
export function likeClick(data) {
  const request = axios
    .post(`https://..../약속된 API`, data)
    .then((response) => response.data);

  return {
    // 그 결과 도출된 action 객체(type)
    type: LIKE_ARTICLE,
    payload: request,
  };
}
```

<br />

### Dispatch 함수

컴포넌트 혼자서 상태 변화를 통제할 수는 없다. 상태 변화 내용이 action 객체로 표현되도록 도와주는 함수가 필요하다. 이때 쓰이는 것이 바로 **dispatch** 함수이다. '좋아요' 버튼 클릭에 대한 이벤트 리스너가 onSubmit을 실행시킨다고 했을 때, 아래와 같은 모습으로 dispatch 함수가 약속된 action 이름(= 여기선 likeClick 함수)을 인자에 담아 onSubmit 안에서 비동기적으로 작동한다. dispatch의 처리상황은 바로 위의 action 객체 본문 코드에서 확인할 수 있다.

```jsx
// 좋아요 버튼 UI를 렌더링하는 임의의 컴포넌트(.js)
import React from "react";
function postings (props) {
...(생략)
    return (
        <Button onSubmit={(postId) => {
            setTimeout(() => {
                let data = { id: postId };
                dispatch(likeClick(data))
        }}>
        좋아요
        ...(생략)
    )
}
```

<br />

### Reducer 함수

이전 상태(previousState)와 action 객체의 정보를 토대로 다음 상태(nextState)를 도출할 수 있어야 진정한 상태 관리라고 할 수 있을 것이다. 이러한 작업은 **reducer** 함수에 의해 수행된다.

```jsx
export default function(state={},action){
    switch(action.type){
        case LIKE_ARTICLE:
            return {...state, likeSuccess: action.payload }
        case ...
        ... (생략)
        default:
            return state;
    }
}
```

<br />

이때, reducer 함수에 의해 반환된 값들은 다시 dispatch 함수에서 비동기적으로 받아 후속 기능 수행에 활용될 수 있다. 즉, 위에서 살펴봤던 dispatch 부분을 아래와 같이 확장할 수 있다.

```jsx
// 좋아요 버튼 UI를 렌더링하는 임의의 컴포넌트(.js)
import React from "react";
function postings (props) {
...(생략)
    return (
        <Button onSubmit={(postId) => {
            setTimeout(() => {
                let data = { id: postId };
                dispatch(likeClick(data))
                // highlight-start
                .then(response => {
                    if (response.payload.likeSuccess) {
                        props.history.push("/");
                    } else {
                        alert('에러가 발생했습니다.')
                    }
                })
                .catch(err => {
                    alert('Click again')
                    setTimeout(() => {
                        alert("")
                    }, 3000);
                });
                // highlight-end
        }}>
        좋아요
        ...(생략)
    )
}
```

<br />

#### combineReducer와 rootReducer

상태 관리할 대상이 늘어나면 그만큼 action 객체도 다양해질 것이고, 이렇게 다양해진 action 객체들마다 달라붙어야 할 reducer도 많이 필요해질 것이다. **combineReducer**는 이렇게 다양한 reducer들을 **rootReducer**라는 변수로 종합해주는 함수이다. rootReducer에 담긴 reducer 현황이 **store**로 반영된다.

### 리덕스의 규칙

다음은 리덕스의 3가지 규칙이다.

- 1\. 하나의 어플리케이션에는 하나의 store가 존재한다.
- 2\. state는 읽기전용이다. 이는 **shallow equality**, 즉, 겉핥기 비교를 통해 어플리케이션의 성능을 향상시키기 위함이다.
- 3\. reducer는 순수함수이다. 따라서 Axios와 같은 비동기요청은 reducer 함수의 바깥에서 사용해야 한다.(예를 들면 action 객체)

---
title: "1st Project 회고"
category: react
path: /react/react02
date: 2020-11-21 17:13:00
---

어제까지로 첫번째 팀 프로젝트가 종료되었다. '성료'가 아닌 종료라는 점에서 매우 아쉬움이 남는 프로젝트였다. 명과 암이 동시에 보였다고 하기엔 개선해야 할 점이 너무나 많이 확인된 프로젝트였다.

### 개발스택

#### Front-end

나는 이번 프로젝트에서 프론트엔드 개발을 담당하였다. 이를 위해 `npx create-react-app`를 통해 **react** 라이브러리 환경(17.0.1)을 구성했다. SPA 구현을 위해 **react-router-dom**(5.2.0) 모듈을 추가하였고, 서버 API에의 비동기적 통신을 위한 **axios**(0.21.0) 모듈도 추가하였다. 한편, SCSS 컴포넌트 스타일링과 조건부 CSS 처리를 위해 node-sass(4.14.1), classnames(2.2.6), react-icons(3.11.0), styled-components(5.2.1) 등의 모듈을 추가하였다.

#### Back-end

백엔드의 모듈 명세는 package.json에 입력된 내용을 토대로 기술한다. **Node.js Express 프레임워크**(4.17.1)를 기반으로 **MySQL**2(2.2.5) 활용을 위해 **Sequelize** ORM(6.3.5)을 사용하였다. 이러한 환경 구성을 토대로 HTTP 비동기통신 활용을 위해 axios(0.21.0), body-parser(1.19.0), cors(2.8.5) 모듈을 추가하였고 보안 및 암호화를 위해 crypto(1.0.1), dotenv(8.2.0), express-session(1.17.1), jsonwebtoken(8.5.1)가 추가되었다. 또한 실시간 서버 테스트를 위해 nodemon(2.0.6)도 사용하였다.

### Bad 라우터 구성

#### HashRouter

네비게이션 메뉴(Nav.js)를 통해 4개 정도의 컴포넌트에 접근하고 각 컴포넌트들을 App.js로부터 data lifting을 하기 위해 처음에는 **HashRouter**를 사용하였다. HashRouter는 **Link**과 함께 **react-router-dom** 모듈에서 끄집어내어 사용할 수 있는데, 컴포넌트에 대한 가상경로를 제공하되 '#'(hash)를 경로에 삽입하는 특징을 갖는다. 이 부분에서 거대한 패착이 있었다. 무조건 SPA로 페이지를 구성한다는 1차원적인 생각 때문에, 서버 API를 통한 동적인 request & response 커뮤니케이션의 발생을 간과해버린 것이다. 또한, HashRouter는 SEO에서의 엄청난 불리함을 갖고 있다고 한다. 이는 URL에 '#' 표시가 붙기 때문에 당연한 결과이다. 여러 검색 결과, HashRouter는 이러한 특징들 때문에 특수목적의 관리자 사이트(어드민 사이트를 SPA로 구성하는 것 자체도 생각해보면 사실 엄청난 넌센스이다) 등에 한하여 사용한다는 사실을 알았다.

#### BrowserRouter

그렇다면 리액트 라우터로써 어떤 것이 가장 일반적으로 사용될 것인지 궁금했다. 정확한 표본이 없어서 이 부분은 현업에서 어떤 선택을 할지 확인해야 하겠지만, 적어도 **BrowserRouter**가 HashRouter보다 바른 선택인 것으로 보인다. 그 이유는 window 객체의 **history** API를 활용하기 때문이다. 이는 곧 URL에 '#'와 같은 SEO 방해요소가 없다는 것을 의미한다. 또한 BrowserRouter는 서버와의 request & response 커뮤니케이션에 의한 동적 변화에 적합하다.

#### Switch

이러한 라우터 선택을 토대로, 예를 들어 아래와 같은 기초공사가 필요했다.

```jsx{numberLines: true}
// Main.js(simply to-be)
import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import SignIn from "./compnents/SignIn";
import Home from "./components/Home";
import MyPage from "./components/MyPage";
import Complete from "./components/Complete";
import Important from "./components/Important";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userId: null,
    };
  }
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        // highlight-start
        <BrowserRouter>
          // highlight-end
          {/*화면에 보여줄 메뉴 및 각 Link*/}
          <ul className="Nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mypage">My Page</Link>
            </li>
            <li>
              <Link to="/complete">완료된 일정</Link>
            </li>
            <li>
              <Link to="/important">중요한 일정</Link>
            </li>
          </ul>
          {/*각 Link들에 대한 Route 명세*/}
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/complete" component={Complete} />
            <Route path="/important" component={Important} />
          </Switch>
          // highlight-start
        </BrowserRouter>
        // highlight-end
      </div>
    );
  }
}

export default Main;
```

<br>
즉, Navigation 컴포넌트를 별도로 운영하는 것이 아닌, App.js에서 BrowserRouter를 통해 각 메뉴들을 라우팅으로 분기하는 선에서 끝내야했다. 이외에 필요한 별도 정보들(예를 들면 로그인 유저의 이름과 환영문구)은 이 App.js에 별도의 컴포넌트로 삽입했으면 매우 심플하게 컴포넌트 관리가 가능했을 것이다. 하지만 결과적으로 프로젝트에서는 App.js에서 HashRouter를 사용하는 패착을 저질러버렸다. 물론 나중에 로그인 관련 컴포넌트들을 활용하기 위해 WithRouter를 사용하는 것으로 수정하긴 했지만, 이미 프로젝트 납기가 이틀 앞으로 다가온 시점이었다. 그리고 무엇보다도 App.js에서 Nav.js를 불필요하게 분리함으로써 각 컴포넌트들의 state 관리에 어마어마한 혼돈을 야기하게 되었다. 가뜩이나 서버 API 통신에 엄청난 불리함을 안고 있는 HashRouter 환경 속에서, 각 컴포넌트별로 시시각각 GET/POST/PATCH 비동기 요청의 결과가 state로 제대로 반영되지 않게 되어버린 것은 너무나 자명한 결과였다.

### Bad 테스트

라우터 설계가 이번 프로젝트의 근본적인 패착이었다면, 빠르게 컴포넌트 설계와 화면단 구성을 먼저 하고나서 서버 API 통신을 확인해나간 개발 진도는 이번 프로젝트의 최대의 실수였다. 적어도 각 컴포넌트들의 개발에 맞춰서 서버로부터 정상적으로 response가 들어오는 것을 확인했었어야 했다. 이는 싱글 컴포넌트 내에서의 state 확인에 매우 중요한 과정인데 이것을 후일로 미룬 것은 두고두고 후회되는 실수이다. 적어도 2차 프로젝트에서는 프론트엔드와 백엔드 간에 다소간의 공수와 시간이 소요되더라도, **날마다** 코드 리뷰 후에 테스트 시간을 할애해야겠다는 생각이 들었다.  
또한, 타이트한 일정을 생각해서 일단 빨리 뼈대를 잡아놓고 세부내용을 들여다보겠다는 조급증 때문에, 일일이 console.log 찍어가며 밑 공사를 단단히 하지 않은 개발을 한 것이 또다른 실수이다. 이는 총체적으로 갈아엎고 다시 코드 짜기를 반복하게 만들어버렸는데, 한번 제대로 테스트해가며 코드를 짰다면 오히려 납기를 준수할 수 있었을 것이다. 하지만 결과적으로 납기준수도, 성료도 어떤 것도 제대로 하지 못했다. **현업에서 이런 식으로 일을 한다? 정말 답이 안나오는 동료가 될 것이 분명하다.** 부끄럽지만 이런 점들을 널리 블로그로 작성하는 이유는 두고두고 이것을 보면서 절대로 같은 실수를 반복하지 않기 위함이다.

### Bad 컴포넌트 개발

#### 클래스형 컴포넌트

개발 과정 중에 클래스형 컴포넌트 환경에서 Life cycle을 구성하는 것이 state 관리나 여러 이벤트 핸들러 측면에서 old-fashioned 한 것이라고 생각했다. 그래서 hooks를 사용하기 위해 함수형 컴포넌트 환경으로 바꿔버렸다가, 시행착오를 끝으로 다시 클래스형 컴포넌트로 리팩토링하게 되었고 이 과정에서 시간자원의 대부분이 소모되었다. 이러한 '삽질'들은 이벤트 핸들러에 의한 최신 state가 제대로 서버에 POST되고 또 이것을 GET하는데 실패하는 것을 극복하기 위함이었다. 사실 이 현상들은 '동적 변화'를 state에 제대로 반영하지 못했던 라우터 구성에 기인했던 것인데, 완전히 엉뚱한 곳에서 원인을 탐색했던 것이다. 물론 하나의 컴포넌트 내에 2개 이상의 다중 input을 갖는 경우 리듀서 등의 hook은 꽤 유용했다. 아래는 **useReducer** hook을 사용한 코드이다.

```jsx{numberLines: true}
// Edit.js(as-is)
import React, { useCallback, useReducer } from "react";
import { Link } from "react-router-dom";
import Button from "../css/Button";

// reducer hook 액션 정의
// highlight-start
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}
// highlight-end

const Edit = ({ makeChange }) => {
  // reducer hook으로 한꺼번에 state 관리할 대상 정의
  // highlight-start
  const [state, dispatch] = useReducer(reducer, {
    password: "",
    name: "",
  });

  const { password, name } = state;
  // highlight-end

  // reducer hook 구동 대상("액션값")은 "이벤트 객체(e.target 값)"라고 설정
  const onChange = (e) => {
    dispatch(e.target);
  };

  // reducer hook 구동 결과(state)를 부모(MyPage.js) 컴포넌트로 끌어올리기
  const onClick = useCallback(() => {
    console.log(`제출!! =======>
    최종제출 비밀번호: ${state.password}
    최종제출 이름: ${state.name}
    `);

    makeChange(state);
  }, [makeChange, state]);

  ...이하생략
```

하지만 리팩토링'들'을 겪으면서 생각한 최종 결론은, 함수형 컴포넌트 환경 하에서 이벤트 핸들러의 결과를 컴포넌트에서 제대로 관리하기 위해서는 아예 **redux**를 써야한다는 것이다. redux로 store 관리를 해줄 것이 아니라면 차라리 클래스형 컴포넌트에서 Life cycle 함수들을 통해 state를 통제하는 것이 더 직관적일 수 있겠다는 생각이 들었다.

#### 함수형 컴포넌트와 hooks

함수형 컴포넌트로 개발하는 과정에서 나를 가장 헷갈리게 만들었던 것은 **useEffect** hook의 사용이었다. 이벤트 핸들러에 의해 바뀌어가는 state를 useEffect로 캐치하여 서버 API의 POST 또는 PATCH 메소드를 통해 state의 내용들을 서버로 전달한다는 계획이었다. 계획 자체로는 나쁘지 않았으나, useEffect hook 안에서 **clean-up**을 제대로 명시하지 않은 문제를 잊은 채 개발을 쭉 진행하다가 전체 코드가 스파게티 코드가 되어버린 후에야 어떻게든 수습이 되지 않는다는 것을 깨달았다. 결국 코드가 클래스 컴포넌트로 회귀하면서 상술한 문제들은 마치 merge가 끊겨버린 branch들마냥 VSCode 세계에서 단절이 되어버렸다. 만약 다시 useEffect hook을 적극적으로 사용할 수 있다면, 아래와 같은 형식으로 진행할 수도 있을 것 같다.

```jsx{numberLines: true}
// Todo.js(simply to-be)
import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = (props) => {
  // 필요한 state들을 차근차근 빌드업 할 준비
    // highlight-start
  const [userId, setUserId] = useState(props.userId);
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  // highlight-end

  useEffect(() => {
    let loaded = false;

    async function get() {
      const res = await axios.get(`https://서버API`, { userId: userId });
      if (!loaded) setTodos(res.todos);
    }

    get();

    // clean-up
    // highlight-start
    return () => {
      loaded = true;
    };
    // highlight-end
    //content가 변할때 useEffect를 실행해야하는 시점이다
  }, [todos]); //input에 값이 변경이 되었을때 effect를 실행한다

  ...이하생략
```

### Bad CSS

사실 어느 정도 CSS를 가볍게 생각했다. 하지만 완제품을 만들어 고객에게 공급한다는 측면에서 생각했을 때, BI 요소를 프론트엔드 개발자가 직접 디자인할 수는 없겠지만 적어도 화면에 렌더링되는 기본적인 컴포넌트 요소들에 대해서는 프론트엔드에서 수단과 방법을 가리지 않고 스타일링해야 한다는 것을 깨달았다. 너무나 공부할 여지가 많은 부분이라, 파이널 프로젝트를 수행하면서 아예 일정 시간을 할애하여 스타일링을 해야겠다고 생각이 들었다. 이번 프로젝트에서는 **SCSS**를 처음 활용해봤는데, JSX 코드와 관념적으로 연관시키기 쉬워서 러닝커브는 그렇게 크지 않을 것 같다는 생각이 들었다. 벨로퍼트 김민준님이 저술한 **리액트를 다루는 기술**이라는 책을 다시 한번 정독해야겠다.

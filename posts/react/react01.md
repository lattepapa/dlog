---
title: "[React] React란"
category: react
path: /react/react01
date: 2020-09-27 23:45:00
---

> _'사용자 인터페이스를 만들기 위한 JavaScript 라이브러리'_ - **ko.reactjs.org**

리액트는 페이스북에서 개발한 자바스크립트 라이브러리이다. 이 라이브러리는 **컴포넌트**라고 불리는 작은 파편들을 이용하여 사용자 인터페이스를 고도화하는 원리를 갖는다. 일반적으로 이 컴포넌트들은 초기에 **React.Component**의 하위 클래스로 선언하여 코드에서 활용한다. 선언된 컴포넌트들을 거느리는 메인 컴포넌트(보통 'App.js')는 **props**라고 하는 매개변수를 통해서 각 컴포넌트들에게 데이터를 전달한다. 이는 마치 부모-자식 상속관계와 같은데, 이러한 데이터플로우는 Top-down 식의 일방향성을 가질뿐만 아니라 형제 컴포넌트끼리 직접 데이터를 변경할 수 없다는 특징을 갖는다. 즉, 형제 컴포넌트끼리 서로 직접 소통이 불가능하고 반드시 부모 컴포넌트를 통해서 데이터 변경사항을 props 매개변수를 통해 전달하거나 전달받는다. 물론 이러한 구조적 한계는 **Redux**라고 하는 라이브러리(이자 일종의 형상관리)를 통해 보완될 수 있다.

#### render

컴포넌트들은 **render()** 함수를 통해 뷰 계층구조로 반환된다. 쉽게말하자면, 전체 HTML document에서 리액트로 불러오고 싶은(즉, rendering 하고싶은) 부분은 컴포넌트들의 조합을 render() 함수가 실행됨으로써 출력이 성공된다. 특히, 이 render() 함수는 자신이 렌더링하는 컴포넌트들 중 하나라도 변화가 발생하면 그 변화내용을 바로 반영해준다. 페이스북 페이지에서 보이는 무수히 많은 기능들(친구추가, 담벼락업데이트, 새쪽지 등)이 실시간으로 변화하는 모습을 생각해보자.

#### this.state

render() 함수가 컴포넌트의 변화를 인지하기 위해서는 변화되기 이전 상태에 대한 정의가 필요하다. 이때 필요한 것이 바로 기준상태, 즉, this.state의 존재이다. 이때 **this 키워드는 메인 컴포넌트(클래스)의 인스턴스 객체**이다. 따라서 메인 컴포넌트로부터 props를 통해 데이터를 내려받는 모든 자식들은 당연히 state 객체를 함께 물려받는다. 이러한 this.state 객체는 코드 상에서 아래와 같은 형식으로 보통 표현된다.

```jsx{numberLines: true}
// App.js 컴포넌트
import React from "react";
import MovieList from "./MovieList";

class App extends React.Component {
    super(props);
    // highlight-start
    this.state = {
        movieList: [],
        currentMovie: null
    };

    // highlight-end
    componentDidMount() {
        fetch(`/movies`, { method: "GET"})
        .then(res => res.json())
        .then(json => {
            // highlight-start
            this.setState({
                movieList: json,
                currentMovie: json[0]
            })
            // highlight-end
        })
    }
    ...
    render() {
        return (
        ...
        )
    }
}

export default App;
```

<br>

이때, 위의 코드 스니펫에서 15번째 줄을 보면 **this.setState()**라는 메소드의 사용을 볼 수 있다. 이와같이 메인 컴포넌트에서의 state 객체 내 속성들은 직접 다뤄질 수 없고 오직 **this.setState()** 메소드에 의해 변경될 수 있다.

#### props와 state 끌어올리기

상술했듯이, 하나의 메인 컴포넌트가 아우르는 자식 컴포넌트들은 일단은 메인 컴포넌트로부터 속성을 유전받는다. 그 방법은 **props**라고 하는 **매개변수**를 이용하는 것이다. props를 통해 유전될 수있는 속성들에는 각종 이벤트 핸들러도 당연히 포함된다. 또한 props는 자식 컴포넌트로부터 부모 컴포넌트까지, this.state에 변화가 필요한 사항을 끌어올리는데 사용된다.  
예를들어 바로 앞서 살펴봤던 코드 스니펫에서 더 세부적인 컴포넌트들을 살펴보자. 영화목록을 제공하는 MovieList.js 컴포넌트에서, 영화제목을 클릭하면 메인 컴포넌트인 App.js에 설정된 this.state 객체의 currentMovie 속성의 value로 반영되도록 state를 끌어올려볼 것이다.

```jsx{numberLines: true}
// App.js 컴포넌트
import React from "react";
import MovieList from "./MovieList";

class App extends React.Component {
    super(props);
    this.state = {
        movieList: [],
        currentMovie: null
    };
    // highlight-start
    this.clickMovieTitle = this.clickMovieTitle.bind(this);
    // highlight-end

    componentDidMount() {
        fetch(`/movies`, { method: "GET"})
        .then(res => res.json())
        .then(json => {
            this.setState({
                movieList: json,
                currentMovie: json[0]
            })
        })
    }

    // highlight-start
    clickMovieTitle(clickedOne) {
        this.setState({
            currentMovie: clickedOne
        })
    }
    // highlight-end

    render() {
        return (
            <div>
                // highlight-start
                <MovieList
                    movies={this.state.movieList}
                    clickMovieTitle={this.clickMovieTitle}
                />
                // highlight-end
            </div>
        )
    }
}

export default App;
```

<br>

먼저 메인 컴포넌트인 App.js에서 영화제목 클릭이벤트 핸들러로 사용할 **clickMovieTitle() 메소드**를 정의한다. 여기서 주의할 점은, 위의 스니펫에서 11번째 줄과 같이 반드시 해당 메소드를 **.bind(this)**라고 constructor 내에 재선언해줘야 한다는 것이다. 그렇지 않다면 이 메소드가 각 인스턴스(컴포넌트)에 정의될 수 없다. 이는 애초에 this.state 객체를 사용하기 위해 this를 클래스에 정의하면서 생기는 구조적인 특성에 기인한다. 한편, 이러한 선언 덕분에 33번째 줄에서와 같이 자식 컴포넌트에는 this.메소드명으로 내려줄 수 있다. 만약 cosntructor 내에서 this에 대한 bind 선언이 수행되지 않았다면, 33번째 줄에 bind 선언을 하면 된다.

이렇게 메인 컴포넌트에 정의된 clickMovieTitle() 메소드는, 메인 컴포넌트의 render() 함수에서 정의된 `movies={this.state.movieList}` 객체와 함께 자식 컴포넌트인 MovieList.js로 **props**라는 인스턴스의 속성으로 묶여서 내려진다. 즉, App.js에서 MovieList.js로 전달되는 props는 사실 이러한 모습일 것이다.

```jsx{numberLines: true}
props = {
  movies: this.state.movieList,
  clickMovieTitle: this.clickMovieTitle,
};
```

<br>

이러한 props 정보를 바탕으로, 자식 컴포넌트 MovieList.js는 다음과 같이 작성될 수 있다.

```jsx{numberLines: true}
// MovieList.js 컴포넌트
import React from "react";
import MovieListEntry from "./MovieListEntry"

export default function MovieList = (props) (
    // 영화목록 컴포넌트
    const renderList = () => {
        return (
            <div className="movie-list">
            // highlight-start
                {props.movies.map((el) => {
                    return (
                        <MovieListEntry
                            key={el.id}
                            eachMovie={el}
                            clickHandler={props.clickMovieTitle}
                        />
                    );
                })}
                // highlight-end
            </div>
        )
    }

    // 삼항 연산자: props.movies가 빈배열일 경우를 정의해준다.
    // highlight-start
    return props.movies.length !== 0 ? (
        renderList() : (<div className="movie-list">영화 목록이 비었습니다</div>)
    )
    // highlight-end
)
```

<br>

MovieList.js 컴포넌트에서 10번째 줄과 같이 **.map()** 메소드를 사용한 것에 주의하자. 각 영화들의 제목들에 대한 클릭이벤트를 정의하기 위해, MovieList.js가 MovieListEntry.js 컴포넌트를 자식으로 받도록 한다. 이때 MovieList.js 컴포넌트의 .map() 메소드는 미리 각 영화마다 **Primary Key**로 사용하기로 약속한 'id' 속성을 그것의 **key 속성**으로 정한다. 이를 통해 클릭이벤트 핸들러인 clickMovieTitle 메소드도 각 영화들마다 이벤트 객체로 포함될 수 있도록 정의될 수 있다. 또한, 각 영화들도 movie라는 이름의 속성으로 정의될 수 있다.

즉, 정리해서 말하자면 메인 컴포넌트인 App.js로부터 props 객체로 묶여서 전래되었던 clickMovieTitle 메소드와 movies 속성이, MovieList.js 컴포넌트를 거쳐 MovieListEntry.js 컴포넌트에까지 각각 clickHandler 메소드와 eachMovie 속성의 이름으로 전달되는 중인 것이다. 단지 App.js로부터 전달받은 props.movies가 MovieList.js에 이르러서 Array.prototype.map 메소드에 의해 개별 엘리먼트인 eachMovie로 엘리먼트화 된 것 뿐이다. 아래의 MovieListEntry.js 파일에 이러한 맥락이 이어진다.

한편, 24번째 줄의 **삼항 연산자** 선언에도 유의하도록 한다. 리액트는 두가지의 매우 중요한 리터럴 원칙이 있다. 첫째, **return문을 통해 불러오는 HTML 엘리먼트들은 반드시 하나의 태그에 모두 묶여 있어야 한다.** 이를테면 위와 같이 \<div> 태그가 렌더링에 리턴할 모든 HTML 엘리먼트들을 묶는 것이 그 예이다. 둘째, **this.state의 각 속성들이 가질 수 있는 nullable case에 대해 미리 정의되어 있어야 한다.** 즉, this.state.movieList와 this.state.currentMovie 속성들은 모두 null(또는 빈배열)인 경우 어떤 내용이 렌더링되어야 하는 지 미리 정의가 되어 있어야 한다는 것이다. 이러한 이유 때문에 삼항 연산자 선언을 통해 MovieList.js 컴포넌트에서 props.movieList 속성의 값이 빈배열인 경우, *'영화 목록이 비었습니다'*와 같은 메시지가 div 태그로 출력되도록 따로 정의한 것이다. 다음은 마지막 MovieListEntry.js 컴포넌트이다.

```js{numberLines: true}
// MovieListEntry.js 컴포넌트
import React from "react";

export default function MovieListEntry(props) => {
    return (
        <div className="movie">
            // highlight-start
            <div className="title"
                onClick={() => props.clickHandler(props.eachMovie)}
            >
            // highlight-end
                {props.eachMovie.title}
            </div>
            ...
        </div>
    )
}
```

<br>

MovieList.js 컴포넌트로부터 내려받은 props.eachMovie 속성은, 사실 개별 영화들에게 보유된 여러 속성들(id, title, runtime, description 등) 중 하나를 가지고 있다. 이때, 또다른 물려받은 속성인 props.clickHandler 메소드가 정확하게 영화 제목에 대한 클릭이벤트 객체가 될 수 있도록 MovieListEntry.js 컴포넌트에서 영화 제목과 관련된 div 태그를 찾아냈다. 그리고 해당 태그에서 onClick 속성을 익명함수의 실행 형식, 즉, **콜백**의 형식으로 값을 정의하면서 이 콜백이 props.clickHandler 메소드가 되도록 선언한 것이다. 그리고 props.clickHandler가 콜백함수이므로 그의 파라미터 정의가 필요하게 되었으며, 자연스럽게 props.eachMovie 속성을 그 자리에 넣게 되었다. 이를 정리하자면,

> [1] 영화 제목과 관련된 div 태그에 대해 클릭이벤트를 설정하였으며,  
> [2] 해당 이벤트, 즉, 제목을 클릭하는 이벤트가 발생하면  
> [3] 이벤트핸들러(props.clickHandler)에게 그 영화(props.eachMovie)가 넘겨지도록 한 것이다.

클릭이벤트에 의해 이제 MovieListEntry.js 컴포넌트에서의 클릭이벤트(clickHander)의 대상(eachMovie)이 데이터플로우의 방향을 거꾸로 거슬러 올라가게 된다.

> [4] 이 정보는 MovieList.js에서 props.clickMovieTitle로 끌어올려질 것이며,  
> [5] 이는 App.js에서 this.clickMovieTitle() 메소드의 파라미터로 넘겨지게 될 것이고,  
> [6] 그 내부의 this.setState() 콜백에 의해 this.state.currentMovie 속성의 변화로 이어지게 된다.

<br>
<br>
<br>

지금까지 리액트의 아주 기본적인 내용에 대해 써보았다. 다음 포스트는 스프린트로 진행되었던 유튜브 mockup 작성과 리액트 Hook에 대한 포스팅에 대한 내용이 될 것이다.

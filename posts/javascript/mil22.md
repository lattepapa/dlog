---
title: "HTTP"
category: javascript
path: /javascript/mil22
date: 2020-09-23 23:14:21
---

> _'an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers'_ - **MDN**

**웹 서버**로부터 **HTML 문서**를 거둬들여서(**fetch**), **웹 브라우저**로 **HTML 문서**를 전달해주기 위한(**transmit**), **어플리케이션 계층**의 통신규약을 의미한다.

#### HTTP의 2가지 특징

[1] **Stateless** : 클라이언트(browser)의 요청에 대해 서버가 응답하면 연결(=맥락)이 종료된다. 즉, 앞선 클라이언트-서버 간 교신이 GET이었는지 POST였는지, 어떤 메소드의 교신이었는지는 현재 교신에서는 전혀 알 수 없다. 단, 만약 쿠키가 있다면, 교신들 간 맥락 파악이 가능해진다.  
[2] **Connectionless** : 서버는 한번의 요청에 대해 한번의 응답만 한다. 다시말해 클라이언트의 요청에 대한 서버의 응답이 이뤄지면 해당 교신은 바로 종료된다. 한번의 교신에 다수의 요청과 응답이 이뤄질 수는 없다.

#### TLS(encrypted TCP)

HTTP 통신 상에서 단순히 텍스트 정보만 다루는 것에서 나아가, 이미지, 영상 등의 전송을 가능하게 한 통신규약

#### 브라우저(Browser)

브라우저는 HTTP 환경에서 모든 클라이언트 **요청(Request)의 시작점**이다.

#### RPC(Remote Procedure Call)

클라이언트(browser)가 서버(원격지)에 요청하는 그 자체를 의미

#### 서버(Server)

서버는 클라이언트(browser)의 요청에 따라 다시 클라이언트에 HTTP 서비스를 **제공(Response)**한다.

#### 프록시(Proxy)

클라이언트 앞단에서 Caching, Filtering, LB, Authentication, Logging의 기능을 수행

#### URL(Uniform Resource Locator)

쉽게 말해 웹 주소를 의미한다.

#### URL의 구조

예를 들어 [https://www.google.com/search?q=cats#p2](https://www.google.com/search?q=cats#p2) 라는 URL이 있다면  
[1] **scheme** : 'http', 'https', 'ssh', 'git' 등  
[2] **host** : 'google.com', 'localhost', '192.168.35.82' 등  
[3] **sub domain** : 'www', 'mail', 'blog' 등  
[4] **path** : 'search', 'about.html', 'blog/entries/2/big-day' 등  
[5] **query string** : 'q=cats&ref=mobile&page=4' 등  
[6] **hash fragment** : 'p2', 'FAQ', '/profile/edit' 등
<br>
<br>
<br>

### HTTP 흐름

#### 1. TCP 연결 활성화

클라이언트(browser)가 서버로 HTTP 서비스를 요청함으로써 TCP 연결이 활성화 된다.

#### 2. HTTP 메시지 전송

다음과 같은 헤더(header)를 필두로 하여 클라이언트(browser)가 서버로 메시지를 전송한다.

```html
GET / HTTP/1.1 Host: developer.mozilla.org Accept-Language: fr
```

#### 3. 서버로부터 회신 받은 내용 읽기

다음과 같은 HTML 문서로써 서버가 메시지를 응답한다.

```html
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html

<!DOCTYPE html... (here comes the 29769 bytes of the requested web page)
```

#### 4. 커뮤니케이션 종료

<br>
<br>
<br>

### AJAX(Asynchronous Javascript and XML)

#### API(Application Programming Interface)

클라이언트(browser)가 서버의 자원을 이용할 수 있도록 마련된 인터페이스, 즉, **메소드**를 의미한다.

#### XHR(XMLHttpRequest)

클라이언트(browser)가 서버와 상호 작용하기 위해 사용하는 **객체**를 의미한다. XHR은 웹페이지의 모든 요소를 한번에 불러오는 것이 아니라 비동기적으로 불러오는 것에 활용된다. 이 덕분에 전체 페이지 정보를 매번 한꺼번에 렌더링할 필요가 없어지게 되었다.

#### 주요 메소드(RESTful APIs)

[1] **GET** /? : 서버에 메시지(자원)을 **요청**하는 메소드 → _domain.com/api/users_  
[2] **POST** /? : 서버에 메시지(자원)을 **생성**하는 메소드 → _domain.com/api/users_  
[3] **PUT** /? : 서버의 메시지(자원)의 속성을 **대체수정**하는 메소드 → _domain.com/api/users/{username}_  
[4] **PATCH** /? : 서버의 메시지(자원)의 속성을 **일부수정**하는 메소드 → _domain.com/api/users/{username}_  
[5] **DELETE** /? : 서버의 메시지(자원)의 속성을 **삭제**하는 메소드 → _domain.com/api/users/{username}_

#### 메소드별 HTTP 응답코드

[1] **1xx** : "Hold on.."  
[2] **2xx** : "Here you go 🙂"  
[3] **3xx** : "Go away.."(병진이 형은 나가있어..)  
[3-1] 304 : "요청에 대한 응답이 아직 수정되지 않았고 caching된 내용만 있음"  
[4] **4xx** : "YOU screwed up! ☹️"  
[4-1] 403 : "컨텐츠에 접근할 권한이 없음"  
[4-2] 404 : "요청받은 리소스를 사용할 수 없음"  
[5] **5xx** : "I screwed up, sorry...."  
[5-1] 500 : "서버가 처리할 수 없는 요청임"

```jsx{numberLines: true}
// XHR API를 활용한 서버와의 통신
var xhr = new XMLHttpRequest();
xhr.open('get', 'http://52.78.213.9:3000/messages');

xhr.onreadystatechange = function(){
	if(xhr.readyState !== 4) return; // readyState 4: 완료
	if(xhr.status === 200) console.log(xhr.resonseText);
	else console.log('에러: ' + xhr.status;
}

xhr.send(); // 요청 전송
```

<br>

보다시피 XHR은 간단한 구문도 조금 복잡해보이는 경향이 있다. 그렇기 때문에 이러한 메소드를 조금 더 간소화 시킨 라이브러리가 등장하게 되었다. 바로 **jQuery**이다.

```jsx{numberLines: true}
// jQuery 라이브러리를 활용한 서버와의 통신
$.get("http://52.78.213.9:3000/messages", function (response) {
  // response: 서버로부터 온 응답
});
```

<br>

그런데 이 jQuery도 인간의 관점에서 난해하다는 의견이 나오기 시작했다. 따라서 마치 javascript를 그대로 쓰는 것 같은 API가 나오게 되었다. 바로 **가독성**의 **fetch()** 구문이다.

```jsx{numberLines: true}
// fetch API를 활용한 서버와의 통신
fetch('http://52.78.213.9:3000/messages')
	.then(response => response.json());
	.then(json => // 서버로부터 json 형태로 전달받은 응답(즉, 콜백))
	.catch(err => console.error(err));
```

<br>

#### AJAX

**XHR**을 통해 서버와 자유롭게 통신할 수 있으면서, **DOM**을 활용하여 Seamless하게 페이지의 **일부 부분만 렌더링**이 가능하도록 Dynamic Web Page(App)를 구현하기 위한 비동기 객체이다. 사실상 jQuery를 위한 라이브러리 역할을 수행한다.

```jsx{numberLines: true}
// jQuery AJAX chaining
$.ajax({
	url: 'http://52.78.213.9:3000/messages',
	method: 'GET',
	dataType: 'json'
})
	.done(json => // 서버로부터 json 형태로 전달받은 응답(즉, 콜백))
	.fail((xhr, status, errorThrown) => throw error)
	.always((xhr, status) => console.log('요청완료'));

```

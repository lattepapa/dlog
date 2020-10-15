---
title: "[JS] 브라우저 보안과 CORS"
category: javascript
path: /javascript/mil23
date: 2020-09-24 22:42:22
---

### 자바스크립트로 할 수 있는 것

[1] AJAX call을 통해 API를 호출  
[2] 다이나믹하게 DOM 제어  
[3] 인증정보를 브라우저에 저장  
[4] 인증정보를 불러오기

### 자바스크립트를 통한 공격

#### XSS(Cross-Site Scripting)

브라우저가 서버를 신뢰하기 때문에 가능한 공격이다. 단, Chrome V8 엔진 이후로는 이러한 XSS 행위는 기본적으로 차단됨

#### CSRF(Cross-Site Request Forgery)

서버가 브라우저의 인증정보를 신뢰하기 때문에 가능한 공격이다. 즉, 공격자가 인증받은 클라이언트 정보를 사전에 탈취하여, 서버에 접근하여 정보를 받아가는 방법이다.
<br>
<br>
<br>

### CORS(Cross-Origin Resource Sharing)

#### CORS의 태동

과거에 \<img> 태그로 다른 도메인의 이미지 파일을 가져오거나, \<link> 태그로 다른 도메인의 CSS를 가져오거나, \<script> 태그로 다른 도메인의 JavaScript 라이브러리를 가져오는 것이 모두 가능했었던 적이 있었다. 반면, \<script>\</script>로 둘러싸여 있는 스크립트에서 생성된 Cross-Site HTTP Requests는 **Same Origin Policy**를 적용 받기 때문에 Cross-Site HTTP Requests가 불가능 했었다.  
그러나 **AJAX**가 널리 사용되면서, 또한, 웹 서비스 상호 간의 연결이 많아지면서(예를 들면 카카오톡 채팅창에 유튜브 링크를 올리거나, 유튜브 링크를 인스타그램에 다이렉트로 공유하는 경우 등), **\<script>\</script>**로 둘러싸여 있는 스크립트에서 생성되는 XMLHttpRequest에 대해서도 Cross-Site HTTP Requests가 가능해야 한다는 요구가 늘어났다. 이러한 분위기 속에 W3C에서 **교차출처공유**(Cross-Origin Resource Sharing; 즉, **CORS**)라는 이름의 권고안이 나오게 되었다. 바꿔말하면, **CORS**가 허용하는 **option**을 가진 클라이언트 요청헤더에 한하여 서버의 응답이 허용된다. 아래는 가장 기본적인 형태의 CORS 옵션 설정이다. 보통 **Node.js** 서버환경에서 이러한 CORS Header 설정을 영위하며, Node.js의 express 라이브러리를 사용할 경우 이마저도 cors 모듈의 호출로써 과감히 생략할 수 있다.

```jsx
const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
};
```

<br>

간단히 위의 구문만으로 설명하자면,

> 첫째, 서버는 어떠한(\*) 크로스 도메인으로부터의 접속은 일단 허용한다.  
> 둘째, GET, POST, PUT, DELETE, OPTIONS(preflight)의 5가지 HTTP 메소드에 한하여 클라이언트 요청을 허용한다.  
> 셋째, 클라이언트 요청에 사용할 수 있는 헤더 목록에 content-type이 있다고 규정하며, 이는 OPTIONS(preflight) 관련 응답에 포함될 것이다.  
> 넷째, OPTIONS, 즉, preflight 요청 허용시간은 최대 10초로 제한한다.

의 내용으로 해석할 수 있다.

#### preflight request

클라이언트(브라우저)가 서버에게 메인 요청을 보내기 전에, 사전에 보내는 미니 요청을 의미한다. 클라이언트가 향후 메인 요청에 어떤 HTTP 메소드를 쓸 것인지, 또한 HTTP 메소드 이외에 요청 헤더에 추가적인 내용(예를 들면, 요청내용에 JSON 형식의 콘텐츠를 GET 또는 POST 하겠다는 등의)이 포함되어 있는지를 서버가 알 수 있게 하는 것이 목적이다. 쉽게 말하자면, 서버에게 마음의 준비를 시켜주는 것이다. 따라서 preflight 요청은, 엄밀히 말하자면 요청(request)가 아니라, 요청의 의도(metadata of request)라고 봐야 옳다.

<table style="font-size:10pt">
  <tr><th>preflight request</th><th>actual request</th></tr>
  <tr><td>OPTIONS /data HTTP/1.1 <br> User-Agent: Chrome <br> Host: localhost:10009 <br> Accept: */* <br> Origin: http://localhost:10007 <br> Access-Control-Request-Method: DELETE</td><td>DELETE /data HTTP/1.1 <br> User-Agent: Chrome <br> Host: localhost:10009 <br> Accept: */* <br> Origin: http://localhost:10007</td></tr>
</table>

---
title: "브라우저보안"
category: javascript
path: /javascript/mil23
date: 2020-09-24 22:42:22
---

### 자바스크립트로 할 수 있는 것

[1] AJAX call을 통해 API 호출 가능  
[2] 다이나믹하게 DOM 제어 가능  
[3] 인증정보를 브라우저에 저장 가능  
[4] 인증정보를 불러오기 가능

### XSS(Cross-Site Scripting)

브라우저가 서버를 신뢰하기 때문에 가능한 공격이다. 단, Chrome V8 엔진 이후로는 이러한 XSS 행위는 기본적으로 차단됨

### CSRF(Cross-Site Request Forgery)

서버가 브라우저의 인증정보를 신뢰하기 때문에 가능한 공격이다. 즉, 공격자가 인증받은 클라이언트 정보를 사전에 탈취하여, 서버에 접근하여 정보를 받아가는 방법이다.

### CORS(Cross-Origin Resource Sharing)

\<img> 태그로 다른 도메인의 이미지 파일을 가져오거나, \<link> 태그로 다른 도메인의 CSS를 가져오거나, \<script> 태그로 다른 도메인의 JavaScript 라이브러리를 가져오는 것이 모두 가능했었던 적이 있었다. 반면, \<script>\</script>로 둘러싸여 있는 스크립트에서 생성된 **Cross-Site HTTP Requests**는 **Same Origin Policy**를 적용 받기 때문에 Cross-Site HTTP Requests가 불가능 했었다. 그러나 **AJAX**가 널리 사용되면서 \<script>\</script>로 둘러싸여 있는 스크립트에서 생성되는 XMLHttpRequest에 대해서도 Cross-Site HTTP Requests가 가능해야 한다는 요구가 늘어났다. 따라서 W3C에서 교차출처공유 (Cross-Origin Resource Sharing; CORS) 라는 이름의 권고안이 나오게 되었다. 바꿔말하면, **CORS**가 허용하는 **option**을 가진 클라이언트 요청헤더에 한하여 서버의 응답이 허용된다.

```jsx
const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // OPTIONS, 즉, preflight 허용시간(sec)
};
```

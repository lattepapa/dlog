---
title: "OAuth2.0"
category: nodejs
path: /nodejs/nodejs04
date: 2020-11-04 11:30:10
---

> _'OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords. This mechanism is used by companies such as Amazon, Google, Facebook, Microsoft and Twitter to permit the users to share information about their accounts with third party applications or websites.'_ - **Wikipedia**

> _'제 3의 앱이 자원의 소유자인 서비스 이용자를 대신하여 서비스를 요청할 수 있도록 자원 접근 권한을 위임하는 방법'_ - **금융보안원**

OAuth는 간단히 말해서 '믿을만한 사이트의 계정이 있음'을 전제로 서비스 회원가입 및 로그인을 허용하는 것을 의미한다. 트위터와 구글로부터 시작된 이 방식은, 크게 보면 다음의 2가지 단계로 그 과정을 구분할 수 있다.

### Authorization(사용자 인증) 단계

#### 1. 서비스 로그인 시도

어떠한 계정도 생성한 적이 없는 서비스에 사용자가 회원가입 및 로그인을 시도한다고 가정하자. OAuth 2.0을 통해 사용자 인증 관리를 하고있는 이 서비스는 직접 회원 계정정보를 데이터베이스에 생성하지 않는다. 대신, 구글, 페이스북, 깃허브 계정 등으로 로그인하는 옵션을 제공한다. 만약 사용자가 이 서비스의 로그인 페이지에 접근하면 이 서비스는 사용자에게 **clientID**를 발급한다. 또한 구글, 페이스북, 깃허브 등의 인증 API 서버경로(**redirectURI**)를 안내한다.

#### 2. 사용자 인증

만약 사용자가 구글 계정으로 로그인하고자 한다면, 즉, 예를 들어 '구글 계정으로 로그인하기'를 클릭한다면 구글 인증 API 서버 경로(**redirectURI)**로 리디렉션된다. 이때 사용자의 **clientID**와 이 **URI**가 올바른 값인지 구글 인증 API에 의해 검증된다. 만약 검증에 통과한 경우, 구글 로그인이 요구된다.(평소에 구글 자동로그인이 설정되어있는 경우에는 생략 가능) 이에 따라 사용자가 구글에 로그인을 성공하면 구글은 이 사용자를 인증한다는 의미로 **authorization code**(인증코드)를 사용자에게 발급해주게 된다.

### Authentication(접근허가) 단계

#### 3. 토큰 발행

사용자는 구글로부터 받은 authorization code를 서비스에 알린다. 그럼 다시 서비스는 이 정보를 토대로 구글 인증 API 서버에 **access token** 발급을 요청한다. 이에 대해 구글은 일종의 그룹권한정책(ACL)이 적용된 토큰을 생성하여 서비스에 안내한다. 서비스는 이 토큰을 신뢰하여 사용자의 로그인 요청을 처리하게 된다.

#### 4. 토큰 재활용

최초에 이러한 authorization 및 authentication이 성공 및 통과되었다면 이후에 사용자가 서비스에 보내는 로그인들에 대해서는 서비스와 구글 간의 access token 검증 과정이 중요해진다. 토큰은 구글 인증 API 서버의 주요 검증 대상이 되며, 이때 토큰에 대한 권한(예를 들어 로그인만 허용하는 권한인지, 로그인 이후 추가 기능 수행도 허용하는 역할인지 등) 관리는 매우 중요해진다.

<br>

### node.js에서의 OAuth 2.0 적용

다음은 실제 node.js 환경에서 OAuth 2.0을 적용하는 모습이다. 이 작업을 위해 사전에 OAuth로 활용할 인증 서비스는 Github이다. 간단한 포트포워딩과 NAT를 적용할 수 있는 툴인 **ngrok**을 설치한다. 설치파일(이자 실행파일)은 MacOS 기준으로는 ngrok이라는 이름의 1개 파일이다. 포트포워딩하고자 하는 포트번호로 ngrok을 먼저 실행한다.

```
$ ./ngrok http 8080
ngrok by @inconshreveable

Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://92832de0.ngrok.io -> localhost:80
Forwarding                    https://92832de0.ngrok.io -> localhost:80

Connnections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

<br>

한편, https://github.com/settings/developers 경로에 접속하여 OAuth Apps 설정을 새롭게 생성한다. 여기서 **Client ID**, **Client secrets** 정보는 OAuth를 요청하는 서비스와의 상호 검증에 필요한 정보이다. 또한, **Homepage URL**과 **Authorization callback URL**에는 OAuth를 요청하는 서비스의 URI가 입력되어야 한다. 이러한 세팅을 토대로, OAuth 로그인 기능을 구현할 서비스의 node.js 코드를 살펴보면 다음과 같다.

```jsx{numberLines: true}
// index.js

const express = require('express')
const axios = require('axios')

const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

const app = express()

app.get('/callback', (req, res) => {
  const requestToken = req.query.code
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    console.dir(response.data)
    const accessToken = response.data.access_token
    res.redirect(`/welcome.html?access_token=${accessToken}`)
  })
})

...
// 기타 필요한 미들웨어 명세 추가

app.use(express.static(__dirname + '/public'))
app.listen(8080)
```

<br>

이와 같은 방식으로 access token 생성을 비동기적으로 정의할 수 있으며, 이 결과를 html 문서로 바로 출력시킬 수 있다. 6번째 줄과 같이 **dotenv**를 활용하여 민감정보인 Client ID와 Client secrets을 **.env** 환경변수 파일에 저장함으로써 노출을 회피할 수도 있다.

<br>
<br>
<br>

<text style="color:gray">_\*참고: "OAuth 2.0 대표 취약점과 보안 고려 사항 알아보기"(TOAST, [링크](https://meetup.toast.com/posts/105#:~:text=OAuth%202.0%EC%9D%80%20%EB%8B%A4%EC%96%91%ED%95%9C%20%ED%94%8C%EB%9E%AB%ED%8F%BC,%EC%9C%84%ED%95%9C%20%EC%82%B0%EC%97%85%20%ED%91%9C%EC%A4%80%20%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EC%9E%85%EB%8B%88%EB%8B%A4.&text=OAuth%202.0%EC%9D%80%20%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%B6%81,%ED%95%98%EA%B8%B0%20%EC%9C%84%ED%95%9C%20%ED%91%9C%EC%A4%80%20%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EC%9E%85%EB%8B%88%EB%8B%A4.))_</text>

---
title: "RESTful API"
category: javascript
path: /javascript/mil24
date: 2020-09-24 22:56:23
---

> _'REST is acronym for REpresentational State Transfer. It is architectural style for distributed hypermedia systems and was first presented by Roy Fielding in 2000 in his famous dissertation.'_ - **https://restfulapi.net/**

> _'RESTful Web services allow the requesting systems to access and manipulate textual representations of Web resources by using a uniform and predefined set of stateless operations.'_ - **Wikipedia**

**REST**(Representational State Transfer)**ful API**란, 서버가 웹서비스를 더욱 빠르게 제공할 수 있도록 하는 일종의 제약사항이라고 할 수 있다. 서버가 클라이언트에 제공하는 리소스는 Youtube의 동영상, SoundCloud의 움원, Instagram의 사진과 같이 그 형태가 매우 다양하다. 그렇기 때문에 API의 모습도 이러한 리소스의 성격에 맞게 제각각 달라질 수밖에 없다. 따라서, 최대한 공통적인 API 제약사항을 정하여 일종의 리소스 제공 규격을 만들 니즈가 커지게 되었다.

### RESTful API를 위한 여섯가지 원칙

#### 1. 클라이언트-서버가 분리할 것

사용자에게 제공할 클라이언트 기능(즉, 유저 인터페이스)과 데이터 스토리지 기능(즉, 서버 리소스 관리)를 서로 분리시킴으로써, 클라이언트 기능이 다양한 서비스 플랫폼에서 제 기능을 수행할 수 있도록 해야 함을 의미한다. 또한 서버 컴포넌트의 간소화에 의해서 클라이언트 기능도 충분히 다변화를 가져갈 수 있어야 한다.

#### 2. 요청의 비연속성(stateless)이 존재할 것

클라이언트가 서버로 보내는 각 요청은 반드시 요청이라고 인지될 수 있을만큼의 충분한 정보가 포함되어야 함을 의미한다. 단, 각 요청들은 서버에 저장된 이전 요청들의 맥락(context)를 이용할 수는 없어야 하며 세션 상태는 전적으로 클라이언트에 의존되어야 한다.

#### 3. 캐싱 허용여부(cacheable)를 표현할 것

요청에 대한 API의 응답 내용은 기억될 수 있는 것인지, 기억될 수 없는 것인지에 대한 캐싱 허용여부 표현이 필요함을 의미한다. 만약 기억될 수 있는 응답이라면, 클라이언트측으로 캐시(cache)가 다른 요청에 다시 사용 가능하도록 제공될 수 있어야한다.

#### 4. 통일된 인터페이스(uniform interface)를 가질 것

아키텍처의 모든 부분에 있어서 통일된 인터페이스 체계가 유지되어야 함을 의미한다. 대표적인 인터페이스 통일제약으로는 아래의 4가지가 있다.

> 1\. 취급되는 리소스가 어떤 종류의 것인지 분명히 규정될 것  
> 2\. 방법이 특정된 수단을 통해 리소스가 제공될 것  
> 3\. 그 자체로도 충분히 설명 가능한 메시지가 리소스와 함께 제공될 것  
> 4\. 소위 '클릭질' 하나만으로도 어플리케이션 수준에서 충분히 다룰 수 있는 하이퍼미디어 리소스일 것

#### 5. 계층화된 시스템(layered system)의 형태일 것

리소스는 계층화(hierarchical)로 구현해야 함을 의미한다.

#### 6. (선택사항)있어야 할 코드가 구비될 것(code on demand)

이것은 선택사항으로, 클라이언트가 어떤 요청이나 기능을 실행함에 있어서 최대한 번거로움 없이 바로 실행될 수 있는 코드가 구현되어 있어야 함을 의미한다.

### RESTful API를 실현하기 위한 리소스 모습

리소스는 'RESTful 하다'라는 개념을 가장 확실하게 증명할 수 있게 하는 수단이다. 일단 RESTful API를 작성하겠다고 마음먹은 이상, **이름을 붙일 수 있는 정보는 모두 리소스가 될 수 있다**고 생각하고 리소스를 상정해야 한다. 이때, 리소스에 대한 이름은 아래의 예시와 같은 원칙을 지키는 것이 좋다.

> 1\. document 리소스 정의 : /**user-management**  
> 2\. collection 리소스 정의 : /user-management/**users**  
> 3\. store 리소스 정의 : /user-management/users/**{id}**/**playlist**  
> 4\. controller 정의 : /user-management/users/{id}/playlist/**songplay**

또한, 이때 다음과 같은 기호 사용원칙도 준수하는 것이 좋다.

> 첫째, URI(Uniform Resource Identifier)에 있어서 리소스 계층은 **/**로 구분한다.  
> 둘째, URI의 끝에 /를 붙이지 않는다.  
> 셋째, 언더바(\_)보다 대시(**-**)를 사용한다.  
> 넷째, URI는 소문자로 작성한다.  
> 다섯째, 파일확장자를 사용하지 않는다.

### RESTful API를 실현하기 위한 리소스 메소드

GET, POST, PUT, DELETE와 같은 HTTP 메소드가 마구잡이로 쓰이면 안된다. 가령, PUT을 사용해야 더 효율적인 상황에 POST를 남발하면 안된다. 하지만 무엇보다도 **CRUD 기능이름 그대로를 URI에 사용하지 않는 것이 중요**하다. 예를들어 controller 기능을 수행하는 리소스 메소드의 이름을 단순히 'delete'라고만 정해버린다면, HTTP 메소드 DELETE와 구분되지 않게 될 것이다.

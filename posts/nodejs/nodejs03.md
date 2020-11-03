---
title: "crypto"
category: nodejs
path: /nodejs/nodejs03
date: 2020-11-03 15:15:00
---

### 단방향 암호화

암호는 보통 두가지의 취급방식을 가정한다. 하나는 암호화(encrypt), 다른 하나는 복호화(decrypt)이다. 이러한 가정은 암호를 복호화 할 수 있어야 한다는 시선에서 비롯된다. 하지만 오늘날 웹 서비스는 복호화 처리를 지양한다. 웹 서비스에서 클라이언트가 사용할 비밀번호는 암호화되어 서버로 전달될텐데, 서버는 이를 복호화하지 않는다. 이를 **단방향 암호화**라고 한다. 이와 같이 한번 암호화하면 다시 복호화할 수 없는 메커니즘을 **해시함수**라고 일컫는다. 그 이유는 단방향 암호화의 작동원리가 해시함수의 그것과 동일하기 때문이다.  
그렇다면 복호화하지 못하는 암호는 어떻게 서버가 취급할 수 있다는 것일까? 그 답은 서버도 애초에 복호화하지 못하는 암호로 클라이언트의 암호와 대조하는 것에 있다. 정확히는, 클라이언트가 가입 시 최초에 서버에 암호를 전달하면 아래와 같은 모습으로 이를 해시함수 처리한다. 그 결과를 이제 클라이언트, 서버가 서로 알아보는 것이다.

```jsx{numberLines: true}
// crypto.js

const crypto = require("crypto");
//highlight-start
const hashed = crypto.createHash("sha512").update("비밀번호486").digest("hex");
//highlight-end

console.log(hashed);
```

```
$ node crypto.js
82cf544c69fae06020e18f950f14d83c88a3e40ea5adda7ac7be740454f90c181673129d750b8abf65e7a7db4a4c1beeff183df64749de622a595e8be5299846
```

<br>

위의 코드와 같이, 단방향 암호화는 node.js의 기본내장 모듈인 **crypto**를 통해 몇가지 메소드의 조합으로 구현할 수 있다.

#### createHash 메소드

이 메소드를 통해 해시함수를 결정한다. 해시함수는 흔히 md5, sha1, sha256, **sha512**, 또는 그 이상의 복잡도를 갖는 해시알고리즘 중 하나로 선택할 수 있다. md5와 sha1은 이미 취약점이 발견된 알고리즘이므로, 오늘날 많은 웹 서비스는 고객의 비밀번호를 **sha512** 이상의 해시 알고리즘으로 처리하는 추세라고 한다.

#### update 메소드

이 메소드에 암호화할 비밀번호 문자열을 직접 입력하면 된다.

#### digest 메소드

이 메소드는 위의 createHash 메소드를 통해 해시 처리된 결과를 어떤 수준까지 인코딩할 것인지에 대해 결정한다. 이러한 별도의 인코딩이 필요한 이유는, 해시처리된 결과를 이후의 **콜백함수**에 통째로 넘기는 것이 아니라 **buffer**(버퍼)에 담아 **streaming** 방식으로 넘기기 때문이다. 즉, digest 메소드의 사용은 버퍼에 어떤 문자열 형식으로 담을 지에 대한 결정이라고 할 수 있다. 흔히 base64 또는 hex 방식의 인코딩을 선택한다.

### salt(솔트)

그러나 위의 단방향 암호화에는 몇가지 치명적인 약점이 있다. 첫째, 해시함수 방식이므로 당연히 **해시충돌**(collision)이 상존한다. 즉, 의도치 않게 전혀 다른 사용자 비밀번호가 같은 해시값으로 사용될 수 있는 것이다. 둘째, 이미 해시 알고리즘은 모두에 공개되어 있다. 특히, 사용자들이 자주 사용하는 비밀번호 패턴('1q2w3e', 'p@\$\$word!' 등)에 대한 해시값은 소위 '레인보우 테이블'이라고 하여 널리 공유되고 있다. 셋째, GPU와 CPU 신제품의 성능 강화 등, 컴퓨터 연산처리 능력이 과거에 비해 월등히 개선되었기 때문에 해시값에 대한 복호화 시도가 더욱 많이 시도된다.  
따라서 웹 서비스 환경에서는 이러한 리스크들을 극복할 또다른 보안적 요구가 커지게 되었다. 이에 나온 개념이 바로 **salt**(솔트)이다. 단방향 암호화할 비밀번호에 해시 알고리즘을 적용하는 동시에, 또다른 암호화를 적용하는 원리이다.

```jsx{numberLines: true}
// salt.js

const crypto = require("crypto");
//highlight-start
const saltyHashed = crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("hex");
  console.log(`salt값: ${salt}`);

  crypto.pbkdf2("비밀번호486", salt, 130000, 64, "sha512", (err, key) => {
    console.log(`salt처리된 최종 해시값: ${key.toString("hex")}`);
  });
});
//highlight-end
```

```
$ node salt.js
salt값: b82d2089501daed1047a8af33b70bb68b3fbf3002369276f670a08b6736f42fc7ecea42d33ff03afb6e4784f549ca6603251657e3c73d5f58429cdc6baa78398
salt처리된 최종 해시값: ca852922a83b49b552b8e1d2a19cb56e940f1cd47b0a2fb27e866252831e1b58cc65d4209ba46529bf51ec2ab5284a2cd50cff5cb5ded462efb820674a46bd14
```

<br>

#### randomBytes 메소드

이 메소드는 64바이트 길이의 salt로 쓰일 문자열을 만들어준다. 또한 이 메소드는 매 실행 떼마다 랜덤한 결과를 도출해준다.

#### pbkdf2 메소드

이 메소드는 위의 randomBytes 메소드를 통해 생성된 salt를 13만번의 횟수로 sha512 해시 알고리즘 처리를 반복시켜서 비밀번호의 64바이트 길이의 해시값을 도출한다. 참고로 10만번 정도의 해시 처리에는 약 1초가 소요된다. 물론 싱글쓰레드 환경인 node.js에서 이 1초의 블로킹에 리스크가 존재할 수도 있으나, 이러한 경우에는 런타임 내부에서 멀티태스킹이 실행되도록 약속되어 있으므로 치명적인 문제로까지 확장되진 않을 것이다. 한편, 이러한 pbkdf2보다 더 진일보한 bcrypt 또는 scrypt가 실제 회원 비밀번호 관리에 활용된다고 한다.

### Sequelize ORM에서의 salt와 해시

MySQL의 ORM(Object-Relational Mapping; _자바스크립트 객체와 데이터베이스 릴레이션을 맵핑해주는 도구_)인 **Sequelize**(시퀄라이즈)에서는 보다 더 편리한 방법으로 salt와 해시 알고리즘을 적용할 수 있다. Sequelize 및 Sequelize-cli의 활용에 대해선 이후의 포스팅을 통해 다루기로 한다.

#### Model hooks

Sequelize-cli를 통해 모델 생성(model:generate) 및 마이그레이션(db:migration)을 수행하고 나면, 본격적으로 모델 파일(.js)에 salt와 해시 알고리즘을 적용할 수 있다. 아래의 예시는 'email', 'username', 'password'의 속성을 갖는 테이블 'users'에 대한 모델 파일이다.

```jsx{numberLines: true}
"use strict";

const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        // 회원가입 시
        //highlight-start
        beforeCreate: (data, option) => {
          var hash = crypto
            .createHmac("sha512", "이것은천일염이여")
            .update(data.password);
          data.password = hash.digest("hex");
        },
        //highlight-end
        // 로그인 시
        beforeFind: (data, option) => {
          if (data.where.password) {
            var hash = crypto
              .createHmac("sha512", "이것은구운소금이여")
              .update(data.where.password);
            data.where.password = hash.digest("hex");
          }
        },
      },
    }
  );
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};
```

<br>

15번째줄부터 30번째줄 사이의 내용이 이 users 모델에 사용할 **hook**이다. 회원가입 시 활용할 **beforeCreate**, 로그인 시 활용할 **beforeFind**의 구성은 거의 동일하다. 이 둘 중 회원가입 시 활용할 **beforeCreate** hook을 살펴보자.

#### createHmac 메소드

이 메소드는 사용하고자 하는 해시 알고리즘 종류와 salt를 토대로, 주어진 인스턴스에서 단방향 암호화를 적용하길 원하는 속성에 대한 해시값을 만든다. 이 경우는 password 속성이 그 대상이 된다. '주어진 인스턴스'는 당연히 상황과 맥락에 의한 것이다. 회원가입의 상황이므로 당연히 회원가입과 관련된 컨트롤러에 의해 도출된 값일 것이며, 흔히 **findOrCreate**에 의하 그 값을 도출한다.

#### update 메소드

이 메소드는 위의 createHmac 메소드를 통해 도출한 해시값을, 그것의 적용 대상에 말 그대로 적용(update)하는 역할을 수행한다.

#### digest 메소드

이 메소드는 위에서 살펴본 crypto 모듈의 digest 메소드와 목적, 사용방법이 완전히 동일하다.

<br>
<br>
<br>

<text style="color:gray">_\*참고: "Node.js 교과서"(조현영님, 길벗)_</text>

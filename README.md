# 💡 단어를 추가하고 퀴즈를 풀며 단어를 외울 수 있는 영단어장 서비스


🗓️ **23.05.07 ~ 23. 05. 25 (3주)**

**👨‍👧‍👦 프론트엔드 & 백엔드 7명**

https://github.com/elicestudy/dev-FE

https://github.com/elicestudy/dev-BE

---


**팀 프로젝트 스터디**

- 프론트엔드 & 백엔드 개발 담당

---

**프로젝트 결과물**

- http://ppvoca.p-e.kr/

---

**테스트용 계정**

> 🔐 **ID**: signin@test.com
> **PW** : Test!@1234

---

**기술스택**


|  | 기술  |
| --- | --- |
| FE | react, typescript, recoil, scss |
| BE | nodejs, express, mongodb, mongoose, postman, JWT |
| Crawling | axios, cheerio |
| API | SpeechSynthesisUtterance |
| Deploy | gcp, centOS 8, pm2, nginx |
| 협업 | 피그마, 깃허브 기관 |
| 컨벤션 | eslint,  prettier |

---

**프로젝트 주제**

**목적**

- 사용자가 직접 영단어와 뜻을 추가하고 퀴즈, 달력기능 등을 통해 효율적인 영단어 암기를 도와주는 서비스입니다.

**목표**

- 언제 어디서나 쉽게 서비스를 사용할 수 있도록 모바일 환경에 최적화된 경험을 제공합니다.
- 비회원 유저도 서비스의 전반적인 기능을 탐색할 수 있게하여 회원 가입을 유도하며 사용자를 유치하고자 합니다.

---

**프로젝트 회고**

[[2차 스터디 프로젝트/백엔드] 깃 협업, 3계층 구조, api 명세서 작성, 데이터 크롤링](https://velog.io/@saemileee/2차-스터디-프로젝트백엔드-깃-협업-3계층-구조-api-명세서-작성-데이터-크롤링)

[[2차 스터디 프로젝트/백엔드] JWT 토큰으로 로그인 api 구현, 유효성 검사, 에처러리와 상태코드](https://velog.io/@saemileee/2차-스터디-프로젝트백엔드-JWT-토큰으로-로그인-api-구현-유효성-검사-에처러리와-상태코드)

[[2차 스터디 프로젝트/프론트엔드] 리액트로 사지선다 영어 퀴즈 구현하기](https://velog.io/@saemileee/2차-스터디-프로젝트프론트엔드-퀴즈-구현)

---

**활용 기술스택**

- `TypeScript` `React`
- `SCSS` `Axios`
- `Node.js` `Express`
- `MongoDB` `Mongoose`
- `JWT` `cheerio`

---

**프론트엔드 개인 구현 기능**

- 퀴즈 리스트 페이지
    - 퀴즈 옵션 선택 상태 관리, UI 및 기능
    - 퀴즈 컴포넌트 UI 및 기능
    - `axios` 통신으로 응답받은 사지선다 퀴즈 데이터가공, UI 및 기능
    - 퀴즈 결과 관련 상태 관리 및 기능
    - 틀린 문제 다시 풀기 로직 및 기능
    - 퀴즈 정답 리스팅 UI 및 기능

---

**백엔드 개인 구현 기능**

- `MVC` 디자인 패턴 개발
- 유저 `JWT` 토큰 인증
- 회원관련 CRUD 구현
- `cheerio` 를 활용한 단어 뜻 사전 크롤링

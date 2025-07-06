# Clog

<br>

### 목적

브라우저에서 과금 없이 글을 작성하고 관리하는 서비스

### 환경

<a href="https://vercel.com">Vercel</a>을 이용하여 코드를 호스팅 한다. 개인 도메인이 있다면 설정에서 도메인명을 변경할 수 있다.
Vercel에서 제공하는 작은 용량의 <a href="https://redis.com">Redis</a> 데이터베이스를 무료로 사용할 수 있어서 그점을 활용한다

### 동작 원리

NextJS의 <a href="https://nextjs.com">API Route 기능</a>을 사용하여 Redis에 CRUD 요청을 한다.

### 경로

/article/list: 전체 글 목록 페이지
/article/[id]: 상세 글 페이지
/dashboard: 글 작성 페이지

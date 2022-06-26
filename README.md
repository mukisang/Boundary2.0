# Boundary ver2.0 최적의 서버를 향하여
- 2022.06 ~
- Refactoring
  - 코드 리펙토링(중복 제거 및 공통 함수 분배)
  - promise.then -> async await
  - type script 변환
  - Nest.js 프레임워크 사용
    
- Development
  - 로그아웃 로직 추가
  - Pagenation 추가
  - 세션을 통한 인증 로직 변경

---
1. Prototyping
2. 비밀번호 암호화
3. multer 모듈로 파일 받기
3. 미들웨어 인증 설정 + 요청 sessionid로 email 추출
4. 방 생성 로직 및 조회 로직 MYSQL
5. PageNation

- 변경사항
  + SHA-1 -> Bcrypt (공격자가 빠른 연산으로 공격 가능)
  + 파일 이름 : 시간 -> UUID

- 추후
  + 환경변수 모으기
  + Guard, Passport
  + 없는 세션 ID 호출시 방어(jwt 이용?)
  + Geospial query -> PostGIS (PostSQL)

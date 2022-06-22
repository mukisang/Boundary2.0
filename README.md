# Boundary ver2.0 최적의 서버를 향하여
- 2022.06 ~

1. Prototyping
2. 비밀번호 암호화
3. multer 모듈로 파일 받기
3. 미들웨어 인증 설정 + 요청 sessionid로 email 추출
4. ...

- 변경사항
  + SHA-1 -> Bcrypt (공격자가 빠른 연산으로 공격 가능)
  + 파일 이름 : 시간 -> UUID

- 추후
  + controller 요청들에서 sessionid를 통한 email 추출
  + 환경변수 모으기
<p align="center">
<img src="https://user-images.githubusercontent.com/30883319/121801534-c77b0b80-cc72-11eb-8d72-193a9e24ee33.png">
</p>

#거리 기반 음성 채팅 웹앱
- 10Km 이내의 거리에서 사람들이 방을 만들면 참여하여 음성으로 채팅이 가능한 어플리케이션

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

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as sessionFileStore from 'session-file-store';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const fileStore = sessionFileStore(session);

  //set the session
  const option = {
    path: './session',
    reapInterval: 60 * 60 * 24, //쿠키 만료 시 자동으로 삭제하는 기능
  };
  app.use(
    session({
      secret: 'SeCrEtKeYfOrHaShInG',
      resave: true, //기존 세션과 변경사항 없어도 저장 여부
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60, //쿠키 유효기간ms
      },
      store: new fileStore(option),
    }),
  );

  await app.listen(3000);
}
bootstrap();

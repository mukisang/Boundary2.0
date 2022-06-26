import { UnsupportedMediaTypeException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

const uuidRandom = (file): string => {
  const uuidPath = `${uuid()}${extname(file.originalname)}`;
  return uuidPath;
};

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          '지원하지 않는 파일 형식입니다.(jpg, jpeg, png)',
        ),
      );
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'profiles';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, uuidRandom(file));
    },
  }),
};

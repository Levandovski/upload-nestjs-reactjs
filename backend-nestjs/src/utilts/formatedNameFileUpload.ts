import path from 'path';

export const formatedNameUpload = (file: Express.Multer.File) => {
  const nameFormated = file.originalname.split('.');
  nameFormated.pop();
  return `${nameFormated.join('.')}${Date.now()}${path.extname(
    file.originalname,
  )}`;
};

import React from 'react';
import { Container, CardImg, Card, CardDownload, CardNotFound } from './style';
import { BiSad, BiSolidCloudDownload } from 'react-icons/bi';

import Api from '../../../service/api';

interface ICardComponent {
  files: any[];
}

interface IFile {
  filename: string;
  name: string;
}

const CardComponentUrl: React.FC<ICardComponent> = ({
  files,
}: ICardComponent) => {
  const api = Api();

  return (
    <Container>
      {files.length > 0 ? (
        files.map((file: IFile, key: number) => {
          return (
            <Card key={key}>
              <CardImg
                title={file.filename}
                alt={file.filename}
                src={`${api.getUri()}/upload/${file.filename}`}
              />
              <CardDownload>
                <p>{file.name}</p>
                <a href={`${api.getUri()}/upload/${file.filename}`}>
                  <BiSolidCloudDownload />
                </a>
              </CardDownload>
            </Card>
          );
        })
      ) : (
        <CardNotFound>
          <p>Nenhuma imagem encontrada!</p>
          <BiSad />
        </CardNotFound>
      )}
    </Container>
  );
};

export default CardComponentUrl;

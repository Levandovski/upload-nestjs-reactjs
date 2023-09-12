import React from 'react';
import { Container, CardImg, Card, CardDownload } from './style';
import { convertImgBlobUrl, download } from './util';
import { BiSolidCloudDownload } from 'react-icons/bi';

interface ICardComponent {
  files: any[];
}

const CardComponentBuffer: React.FC<ICardComponent> = ({
  files,
}: ICardComponent) => {
  return (
    <Container>
      {files.length > 0 ? (
        files.map((file: any, key: number) => {
          return (
            <Card key={key}>
              <CardImg
                title={file.filename}
                alt={file.filename}
                src={convertImgBlobUrl(file)}
              />
              <CardDownload
                title={file.filename}
                onClick={() => download(file)}
              >
                <BiSolidCloudDownload />
              </CardDownload>
            </Card>
          );
        })
      ) : (
        <p>Nenhuma imagem encontrada!</p>
      )}
    </Container>
  );
};

export default CardComponentBuffer;

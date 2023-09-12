import React, { useEffect, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';

import {
  Container,
  ContainerSearch,
  Content,
  ContentIconUpload,
  ContentRenderLayoutSearch,
} from './styles';
import Api from '../../service/api';
import { TextField } from '@mui/material';
import CardComponentUrl from '../../components/upload/cardUrl';
import { toast } from 'react-toastify';

import { AiOutlineSearch } from 'react-icons/ai';
import PaginationComponent from '../../components/pagination';
const uploadsAccept: string[] = [
  '.jpg',
  '.jpeg',
  '.png',
  '.heic',
  '.JPG',
  '.JPEG',
  '.PNG',
  '.HEIC',
];

const MAX_SIZE_FILE = 3; //3mb
const promiseAll: any[] = [];

interface IFilesSelecteAllFiles {
  filename: string;
  name: string;
}

const Upload: React.FC = () => {
  const api = Api();

  const [filesSelectAllFiles, setFilesSelectAllFiles] = useState<
    IFilesSelecteAllFiles[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [searchFind, setSearchFind] = useState<string>('');

  useEffect(() => {
    handleFindAllFiles({ nextPage: page, search: searchFind });
  }, [page]);

  const handleFiles = async (files: FileList) => {
    Array.from(files).map(async (fs: File) => {
      if (convertFromByteToMb(fs.size)) {
        const filesToSend: FormData = new FormData();
        filesToSend.append('file', fs);
        promiseAll.push(sendFile(filesToSend));
      } else {
        toast.error(`A imagem ${fs.name} é maior que 3mb!`);
      }
    });

    Promise.allSettled(promiseAll);
  };

  const convertFromByteToMb = (size: number) => {
    const sizeValue = size / 1024 / 1024; //Convert from Byte to MB

    if (sizeValue <= MAX_SIZE_FILE) return true;

    return false;
  };

  const sendFile = (files: FormData) => {
    const { name } = files.get('file') as File;

    toast.promise(
      () => {
        return api
          .post('/upload', files, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({ data }) => {
            handleFindAllFiles({});
            return Promise.resolve(data);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      },
      {
        pending: `Carregando - ${name}`,
        success: {
          render({ data }) {
            return data.toString();
          },
        },
        error: {
          render(error) {
            const { data } = error as any;
            let errorMessage = `A imagem ${name} teve um erro ao ser processada!`;
            if (data.response.data.statusCode === 422)
              errorMessage = `${data.response.data.message}`;

            return errorMessage;
          },
        },
      },
    );
  };

  interface IPagination {
    nextPage?: number;
    search?: string;
    order?: 'asc' | 'desc';
    take?: number;
    sort?: string;
    fields?: string;
  }

  const handleFindAllFiles = ({
    nextPage = 1,
    search = '',
    order = 'asc',
    take = 8,
    sort = 'name',
    fields = 'name,filename',
  }: IPagination) => {
    return api
      .get(
        `/upload?search=${search}&order=${order}&take=${take}&page=${nextPage}&sort=${sort}&fields=${fields}`,
      )
      .then(({ data }) => {
        setCount(data.pagination.lastPage);
        setFilesSelectAllFiles(data.results);
      })
      .catch((error) => console.log(error));
  };

  const findImage = (search: string) => {
    if (search === '') {
      setSearchFind('');
      return handleFindAllFiles({});
    }

    setSearchFind(search);

    return handleFindAllFiles({ nextPage: 1, search });
  };

  const renderSearchLayout = () => {
    return (
      <ContentRenderLayoutSearch>
        <h2>Image Search</h2>
        <AiOutlineSearch />
        <p>{`: ${searchFind}`}</p>
      </ContentRenderLayoutSearch>
    );
  };

  const renderAllImagesLayout = () => {
    return (
      <ContentRenderLayoutSearch>
        <h2>All Images</h2>
      </ContentRenderLayoutSearch>
    );
  };

  return (
    <Container>
      <Content>
        {searchFind !== '' ? renderSearchLayout() : renderAllImagesLayout()}
        <ContainerSearch>
          <div style={{ width: '100%' }}>
            <TextField
              onChange={(e) => {
                findImage(e.target.value);
              }}
              value={searchFind}
              style={{ width: '100%' }}
              id='outlined-basic'
              label='Search images'
              variant='outlined'
            />
          </div>
          <ContentIconUpload title='Upload File' htmlFor='file'>
            <MdCloudUpload />
            <input
              type='file'
              id='file'
              style={{ display: 'none' }}
              multiple
              name='arquivo'
              accept={uploadsAccept.join(',')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) handleFiles(e.target.files);
              }}
            />
          </ContentIconUpload>
        </ContainerSearch>
        <CardComponentUrl files={filesSelectAllFiles} />
        <PaginationComponent
          color='primary'
          count={count}
          page={page}
          enabled={filesSelectAllFiles.length === 0}
          onChange={(_, value) => {
            setPage(Number(value));
          }}
        />
      </Content>
    </Container>
  );
};

export default Upload;

import React from 'react';
import { ContainerPagination } from './styles';
import { Pagination } from '@mui/material';

interface IPagination {
  color: 'primary' | 'secondary' | 'standard';
  count: number;
  page: number;
  onChange: (_: any, value: number) => void;
  enabled: boolean;
}

const PaginationComponent: React.FC<IPagination> = ({
  color,
  count,
  page,
  onChange,
  enabled,
}: IPagination) => {
  return (
    <ContainerPagination>
      {!enabled && (
        <Pagination
          color={color}
          count={count}
          page={page}
          onChange={onChange}
        />
      )}
    </ContainerPagination>
  );
};

export default PaginationComponent;

import { IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import type { FC, ReactElement } from 'react';
import type { Sort } from 'domain/enums';

export interface OrderTableFilterProps {
  title: string;
  filterName: string;
  sort?: Sort;
  sortBy?: string | null;
  onChangeSort?: (sort: Sort) => void;
  notSorted?: boolean;
}

export const OrderTableFilter: FC<OrderTableFilterProps> = ({
  title,
  onChangeSort,
  filterName,
  sortBy,
  sort,
  notSorted
}) => {
  const handleOrder = (): ReactElement => {
    if (sort === 'desc' && sortBy === filterName)
      return (
        <IconButton
          onClick={(): void => {
            if (onChangeSort) onChangeSort(null);
          }}
          title={'Alterar ordem'}
        >
          <ArrowUpwardIcon className={'text-white hover:cursor-pointer'} />
        </IconButton>
      );
    if (sort === 'asc' && sortBy === filterName)
      return (
        <IconButton
          onClick={(): void => {
            if (onChangeSort) onChangeSort('desc');
          }}
          title={'Alterar ordem'}
        >
          <ArrowDownwardIcon className={'text-white hover:cursor-pointer'} />
        </IconButton>
      );

    return (
      <IconButton
        onClick={(): void => {
          if (onChangeSort) onChangeSort('asc');
        }}
        title={'Alterar ordem'}
      >
        <SwapVertIcon className={'text-primary hover:cursor-pointer'} />
      </IconButton>
    );
  };

  return (
    <div className={'flex items-center text-white w-full -ml-2'}>
      <span>ﾠ{title}</span>
      {notSorted ? null : handleOrder()}
    </div>
  );
};

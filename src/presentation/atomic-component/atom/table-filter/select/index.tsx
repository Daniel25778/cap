import { FilterAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Menu } from 'presentation/atomic-component/atom/menu';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import type { FC, ReactElement } from 'react';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import type { Sort } from 'domain/enums';

export interface SelectTableFilterProps {
  title: string;
  onChange: (value: SelectValues | SelectValues[] | null) => void;
  onSearch?: (value: string) => void;
  sort?: Sort;
  sortBy?: string | null;
  isMultiple?: boolean;
  filterName: string;
  filterValue: SelectValues | SelectValues[] | null;
  options: SelectValues[];
  onChangeSort?: (sort: Sort) => void;
  notSorted?: boolean;
  query?: {
    fetchNextPage: (
      options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult>;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
  };
}

export const SelectTableFilter: FC<SelectTableFilterProps> = ({
  title,
  onChangeSort,
  onChange,
  options,
  filterName,
  onSearch,
  sortBy,
  isMultiple,
  sort,
  query,
  filterValue,
  notSorted
}) => {
  const [open, setOpen] = useState(false);

  const handleOrder = (): ReactElement => {
    if (sort === 'desc' && sortBy === filterName)
      return (
        <IconButton
          onClick={(): void => {
            if (onChangeSort) onChangeSort(null);
          }}
          title={'Alterar ordem'}
        >
          <ArrowDownwardIcon className={'text-gray-500 hover:cursor-pointer'} />
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
          <ArrowUpwardIcon className={'text-gray-500 hover:cursor-pointer'} />
        </IconButton>
      );

    return (
      <IconButton
        onClick={(): void => {
          if (onChangeSort) onChangeSort('asc');
        }}
        title={'Alterar ordem'}
      >
        <SwapVertIcon className={'text-gray-500 hover:cursor-pointer'} />
      </IconButton>
    );
  };

  return (
    <div className={'flex gap-2 items-center w-full'}>
      <span>{title}</span>

      <div>
        <Menu
          isDown
          isOpen={open}
          openElement={
            <div className={'max-w-[40px] relative'}>
              <IconButton>
                <FilterAlt />
              </IconButton>

              {Array.isArray(filterValue) &&
              (filterValue as unknown as SelectValues[])?.length > 0 ? (
                <div
                  className={
                    'bg-primary p-1 w-5 h-5 flex justify-center items-center rounded-full text-white absolute right-[-3px] top-[-3px] z-10'
                  }
                >
                  {Array.isArray(filterValue) ? filterValue.length : '1'}
                </div>
              ) : null}
            </div>
          }
          setIsOpen={setOpen}
        >
          <div
            className={
              'bg-white flex flex-col gap-3 p-4 py-6 min-h-max laptop:min-w-[350px] laptop:max-w-[350px] border-2 shadow-md'
            }
          >
            <div className={'flex items-center justify-between w-full'}>
              <div className={'flex gap-3 items-center text-gray-500 font-bold'}>
                <span className={'text-base'}>ﾠ{title}</span>
                {notSorted ? null : handleOrder()}
              </div>

              <IconButton title={'Fechar'}>
                <CloseIcon
                  className={'hover:cursor-pointer text-gray-500'}
                  onClick={(): void => {
                    setOpen(false);
                  }}
                />
              </IconButton>
            </div>

            <Select
              id={title}
              isMultiple={isMultiple}
              label={'Pesquisar'}
              onChange={(value) => {
                onChange(value || (isMultiple ? [] : null));
                if (!isMultiple) setOpen(false);
              }}
              onSearch={onSearch}
              options={options}
              query={query}
              value={filterValue}
            />
          </div>
        </Menu>
      </div>
    </div>
  );
};

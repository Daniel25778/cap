import { DateRangeInput } from 'presentation/atomic-component/atom/date-range-input';
import { FilterAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SimpleMenu } from 'presentation/atomic-component/atom/simple-menu';
import { useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import type { FC, ReactElement } from 'react';
import type { InputDateProps } from 'presentation/atomic-component/atom/date-range-input';
import type { Sort } from 'domain/enums';

export interface DateTableFilterProps {
  title: string;
  onChange: (value: InputDateProps | null) => void;
  filterName: string;
  filterValue: InputDateProps | null;
  sort?: Sort;
  sortBy?: string | null;
  side?: 'bottom' | 'left' | 'right' | 'top';
  onChangeSort?: (sort: Sort) => void;
  notSorted?: boolean;
}

export const DateTableFilter: FC<DateTableFilterProps> = ({
  title,
  onChangeSort,
  onChange,
  filterName,
  sortBy,
  sort,
  side,
  filterValue,
  notSorted
}) => {
  const [open, setOpen] = useState(false);

  const handleOrder = (): ReactElement => {
    if (sort === 'DESC' && sortBy === filterName)
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
    if (sort === 'ASC' && sortBy === filterName)
      return (
        <IconButton
          onClick={(): void => {
            if (onChangeSort) onChangeSort('DESC');
          }}
          title={'Alterar ordem'}
        >
          <ArrowUpwardIcon className={'text-gray-500 hover:cursor-pointer'} />
        </IconButton>
      );

    return (
      <IconButton
        onClick={(): void => {
          if (onChangeSort) onChangeSort('ASC');
        }}
        title={'Alterar ordem'}
      >
        <SwapVertIcon className={'text-gray-500 hover:cursor-pointer'} />
      </IconButton>
    );
  };

  return (
    <div className={'flex justify-center gap-2 items-center w-full'}>
      <span>{title}</span>

      <div>
        <SimpleMenu
          isOpen={open}
          openElement={
            <div className={'max-w-[40px] relative'}>
              <IconButton>
                <FilterAlt />
              </IconButton>

              {filterValue && (filterValue?.endDate !== null || filterValue?.startDate !== null) ? (
                <div
                  className={
                    'bg-primary p-1 w-5 h-5 flex justify-center items-center rounded-full text-white absolute right-[-3px] top-[-3px] z-10'
                  }
                >
                  1
                </div>
              ) : null}
            </div>
          }
          setIsOpen={setOpen}
          side={side ?? 'bottom'}
        >
          <div className={'bg-white flex flex-col gap-6 p-4 py-6 min-h-max laptop:min-w-[300px]'}>
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

            <DateRangeInput
              label={'Data'}
              maxDate={new Date()}
              onChange={onChange}
              value={filterValue ? [filterValue] : []}
            />
          </div>
        </SimpleMenu>
      </div>
    </div>
  );
};

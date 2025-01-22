import { DateTableFilter, TableFilter } from 'presentation/atomic-component/atom/table-filter';
import { HeaderCell } from 'presentation/atomic-component/atom';
import { OrderTableFilter } from 'presentation/atomic-component/atom/table-filter/order';
import { TableHead, TableRow } from '@mui/material';
import { setMatchFilter } from 'store/filters/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import type { FC } from 'react';

export const MatchTableHeader: FC = () => {
  const { matchFilter } = useAppSelector((state) => state.filter);

  const dispatch = useDispatch();

  const updateValue = (name: 'date' | 'name', value: unknown): void => {
    dispatch(setMatchFilter({ [name]: value }));
  };

  return (
    <TableHead>
      <TableRow>
        <HeaderCell
          align={'left'}
          minWidth={200}
          title={
            <TableFilter
              filterName={'name'}
              filterValue={matchFilter.name as string}
              onChange={(value): void => {
                updateValue('name', value);
              }}
              onChangeSort={(sort): void => {
                dispatch(setMatchFilter({ sort, sortBy: sort ? 'name' : null }));
              }}
              sort={matchFilter.sort}
              sortBy={matchFilter.sortBy}
              title={'Nome'}
            />
          }
        />

        <HeaderCell align={'left'} minWidth={200} title={'Descrição'} />

        <HeaderCell
          align={'left'}
          minWidth={200}
          title={
            <OrderTableFilter
              filterName={'type'}
              onChangeSort={(sort): void => {
                dispatch(setMatchFilter({ sort, sortBy: sort ? 'type' : null }));
              }}
              sort={matchFilter.sort}
              sortBy={matchFilter.sortBy}
              title={'Membro'}
            />
          }
        />

        <HeaderCell
          align={'right'}
          minWidth={200}
          title={
            <DateTableFilter
              filterName={'createdAt'}
              filterValue={matchFilter.date}
              onChange={(value): void => {
                updateValue('date', value);
              }}
              onChangeSort={(sort): void => {
                dispatch(setMatchFilter({ sort, sortBy: sort ? 'createdAt' : null }));
              }}
              sort={matchFilter.sort}
              sortBy={matchFilter.sortBy}
              title={'Data'}
            />
          }
        />

        <HeaderCell align={'center'} minWidth={150} title={'Ações'} />
      </TableRow>
    </TableHead>
  );
};

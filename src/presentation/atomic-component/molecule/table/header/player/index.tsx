import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableFilter } from 'presentation/atomic-component/atom/table-filter';
import { TableHead, TableRow } from '@mui/material';
import { setPlayerFilter } from 'store/filters/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import type { FC } from 'react';

export const PlayerTableHeader: FC = () => {
  const { playerFilter } = useAppSelector((state) => state.filter);

  const dispatch = useDispatch();

  const updateValue = (name: 'instagram' | 'name' | 'totalKills', value: unknown): void => {
    dispatch(setPlayerFilter({ [name]: value }));
  };

  return (
    <TableHead>
      <TableRow>
        <HeaderCell
          align={'center'}
          minWidth={100}
          title={
            <TableFilter
              filterName={'name'}
              filterValue={playerFilter.name as string}
              onChange={(value): void => {
                updateValue('name', value);
              }}
              title={'Nome'}
            />
          }
        />

        <HeaderCell align={'center'} minWidth={200} title={'Apelido'} />
        <HeaderCell align={'center'} minWidth={200} title={'Membro'} />
        <HeaderCell align={'center'} minWidth={200} title={'Guilda'} />
        <HeaderCell align={'center'} minWidth={200} title={'Instagram'} />
        <HeaderCell align={'center'} minWidth={200} title={'Kills'} />
        <HeaderCell align={'center'} minWidth={200} title={'Ações'} />
      </TableRow>
    </TableHead>
  );
};

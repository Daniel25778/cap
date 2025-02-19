import { Checkbox, TableHead, TableRow } from '@mui/material';
import { HeaderCell } from 'presentation/atomic-component/atom';
import { OrderTableFilter } from 'presentation/atomic-component/atom/table-filter/order';
import { TableFilter } from 'presentation/atomic-component/atom/table-filter';
import { addPlayer, removePlayer } from 'store/player/slice';
import { setPlayerFilter } from 'store/filters/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import type { FC } from 'react';
import type { Player } from 'domain/models';

interface PlayerTableHeaderProps {
  headerCellWithCheckbox?: boolean;
  items?: Player[];
}

export const PlayerTableHeader: FC<PlayerTableHeaderProps> = ({
  headerCellWithCheckbox,
  items
}) => {
  const { playerFilter } = useAppSelector((state) => state.filter);
  const { playerSelected } = useAppSelector((state) => state.player);

  const dispatch = useDispatch();

  const updateValue = (name: 'instagram' | 'name' | 'nickname', value: unknown): void => {
    dispatch(setPlayerFilter({ [name]: value }));
  };

  return (
    <TableHead>
      <TableRow>
        {headerCellWithCheckbox ? (
          <HeaderCell
            align={'left'}
            title={
              <Checkbox
                checked={items?.every((player) => {
                  return playerSelected[player.id];
                })}
                onChange={(event): void => {
                  if (event.target.checked) dispatch(addPlayer(items ?? []));
                  else dispatch(removePlayer(items?.map((item) => item.id) ?? []));
                }}
              />
            }
          />
        ) : null}

        <HeaderCell
          align={'left'}
          minWidth={200}
          title={
            <TableFilter
              filterName={'name'}
              filterValue={playerFilter.name as string}
              onChange={(value): void => {
                updateValue('name', value);
              }}
              onChangeSort={(sort): void => {
                dispatch(setPlayerFilter({ sort, sortBy: sort ? 'name' : null }));
              }}
              sort={playerFilter.sort}
              sortBy={playerFilter.sortBy}
              title={'Nome'}
            />
          }
        />

        <HeaderCell
          align={'left'}
          minWidth={200}
          title={
            <TableFilter
              filterName={'nickname'}
              filterValue={playerFilter.nickname as string}
              onChange={(value): void => {
                updateValue('nickname', value);
              }}
              onChangeSort={(sort): void => {
                dispatch(setPlayerFilter({ sort, sortBy: sort ? 'nickname' : null }));
              }}
              sort={playerFilter.sort}
              sortBy={playerFilter.sortBy}
              title={'Apelido'}
            />
          }
        />

        <HeaderCell
          align={'left'}
          minWidth={200}
          title={
            <OrderTableFilter
              filterName={'isMember'}
              onChangeSort={(sort): void => {
                dispatch(setPlayerFilter({ sort, sortBy: sort ? 'isMember' : null }));
              }}
              sort={playerFilter.sort}
              sortBy={playerFilter.sortBy}
              title={'Membro'}
            />
          }
        />

        <HeaderCell
          align={'left'}
          minWidth={200}
          title={
            <OrderTableFilter
              filterName={'isOnGuild'}
              onChangeSort={(sort): void => {
                dispatch(setPlayerFilter({ sort, sortBy: sort ? 'isOnGuild' : null }));
              }}
              sort={playerFilter.sort}
              sortBy={playerFilter.sortBy}
              title={'Guilda'}
            />
          }
        />

        <HeaderCell
          align={'left'}
          minWidth={200}
          title={
            <TableFilter
              filterName={'instagram'}
              filterValue={playerFilter.instagram as string}
              onChange={(value): void => {
                updateValue('instagram', value);
              }}
              onChangeSort={(sort): void => {
                dispatch(setPlayerFilter({ sort, sortBy: sort ? 'instagram' : null }));
              }}
              sort={playerFilter.sort}
              sortBy={playerFilter.sortBy}
              title={'Instagram'}
            />
          }
        />

        <HeaderCell
          align={'left'}
          minWidth={100}
          title={
            <OrderTableFilter
              filterName={'totalKills'}
              onChangeSort={(sort): void => {
                dispatch(setPlayerFilter({ sort, sortBy: sort ? 'totalKills' : null }));
              }}
              sort={playerFilter.sort}
              sortBy={playerFilter.sortBy}
              title={'Kills'}
            />
          }
        />

        <HeaderCell align={'center'} minWidth={150} title={'Ações'} />
      </TableRow>
    </TableHead>
  );
};

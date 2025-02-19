import { BodyCell } from 'presentation/atomic-component/atom';
import { Collapse, TableRow } from '@mui/material';
import { type FC, useState } from 'react';
import { PlayerActivedTableBody } from '../active-row/body';
import { useDebounce } from 'data/hooks';
import type { MatchTeam } from 'domain/models/match';

interface TeamRowProps {
  item: MatchTeam;
}

export const TeamRow: FC<TeamRowProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [openDebounce, setOpenDebounce] = useState(false);

  useDebounce(() => setOpenDebounce(open), [open], 0);
  return (
    <>
      <TableRow
        className={`w-full cursor-pointer ${open ? 'bg-gray-250' : ''}`}
        hover
        onClick={(): void => setOpen((old) => !old)}
      >
        <BodyCell align={'center'} className={'font-medium line-clamp-2'} title={'Time'} />

        <BodyCell
          align={'center'}
          className={'font-medium line-clamp-2'}
          lastRow={open}
          title={item.position}
        />
      </TableRow>

      {open
        ? item.playerTeams.map((player) => (
            <TableRow key={player.id}>
              <BodyCell
                colSpan={6}
                title={
                  <Collapse in={openDebounce}>
                    <PlayerActivedTableBody query={item} />
                  </Collapse>
                }
              />
            </TableRow>
          ))
        : null}
    </>
  );
};

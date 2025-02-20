import { BodyCell, TableTemplate } from 'presentation/atomic-component/atom';
import { Collapse, TableRow } from '@mui/material';
import { type FC, useState } from 'react';
import { PlayerActivedTableBody } from 'presentation/atomic-component/molecule/table/body/team/active-row/body';
import { PlayerTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { colors } from 'presentation/style';
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
        className={`w-full  cursor-pointer ${open ? 'bg-gray-250' : ''}`}
        hover
        onClick={(): void => setOpen((old) => !old)}
      >
        <BodyCell align={'center'} className={'font-medium line-clamp-2'} title={'Time'} />
        <BodyCell align={'center'} className={'font-medium line-clamp-2'} title={item.position} />
      </TableRow>

      <TableRow className={'flex bg-success w-[10px]'}>
        <BodyCell
          colSpan={6}
          title={
            <Collapse in={openDebounce}>
              <TableTemplate
                height={'100%'}
                sx={{ border: `1px solid ${colors.gray[200]}`, margin: 'auto', maxWidth: '95%' }}
                tableBody={<PlayerActivedTableBody playerTeam={item.playerTeam} />}
                tableHeader={<PlayerTableHeader />}
              />
            </Collapse>
          }
        />
      </TableRow>
    </>
  );
};

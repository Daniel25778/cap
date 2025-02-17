import { BodyCell } from 'presentation/atomic-component/atom';
import { TableBody, TableRow } from '@mui/material';
import type { FC } from 'react';
import type { MatchTeam } from 'domain/models/match';

interface TeamTableProps {
  items: MatchTeam[];
}

export const TeamTableBody: FC<TeamTableProps> = ({ items }) => {
  return (
    <TableBody className={'relative'}>
      {items?.length === 0 ? (
        <TableRow>
          <BodyCell
            align={'center'}
            colSpan={7}
            title={<div className={' p-4 font-semibold text-xl'}>Nenhum time encontrado</div>}
          />
        </TableRow>
      ) : null}

      {items?.map((item) => (
        <TableRow key={item.id}>
          <BodyCell align={'left'} title={item.position} />

          {item.playerTeams.map((playerTeam) => (
            <>
              <BodyCell key={playerTeam.id} align={'left'} title={playerTeam.player.name} />
              <BodyCell key={playerTeam.id} align={'left'} title={playerTeam.kills} />
            </>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

import { TableBody } from '@mui/material';
import { TeamRow } from './row';
import type { FC } from 'react';
import type { MatchTeam } from 'domain/models/match';

interface TeamTableProps {
  items: MatchTeam[];
}

export const TeamTableBody: FC<TeamTableProps> = ({ items }) => {
  return (
    <TableBody className={'relative'}>
      {items?.map((item) => <TeamRow key={item.id} item={item} />)}
    </TableBody>
  );
};

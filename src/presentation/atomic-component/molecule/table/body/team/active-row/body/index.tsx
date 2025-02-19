import { BodyCell } from 'presentation/atomic-component/atom';
import { TableBody, TableRow } from '@mui/material';
import { TranslateAction } from 'domain/enums/actionScheduler';
import { formatDate } from 'main/utils';
import type { FC } from 'react';
import type { MatchOne } from 'domain/models/match';
import type { UseQueryResult } from 'react-query';

interface PlayerActivedTableBodyProps {
  query: UseQueryResult<MatchOne>;
}

export const PlayerActivedTableBody: FC<PlayerActivedTableBodyProps> = ({ query }) => {
  return (
    <TableBody className={'relative'}>
      {query?.data?.matchTeam.map((item) => (
        <TableRow key={item.id} className={'cursor-pointer'} hover>
          <BodyCell className={'font-medium line-clamp-2'} title={item.user.name} />
          <BodyCell className={'font-medium line-clamp-2'} title={TranslateAction[item.action]} />

          <BodyCell
            className={'font-medium line-clamp-2 capitalize'}
            title={formatDate(item.createdAt, 'EEEE - dd/MM/yyyy HH:mm')}
          />
        </TableRow>
      ))}
    </TableBody>
  );
};

import { HeaderCell } from 'presentation/atomic-component/atom';
import { TableHead, TableRow } from '@mui/material';
import type { FC } from 'react';

export const TeamTableHeader: FC = () => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell align={'center'} minWidth={200} title={'Nome do time'} />
        <HeaderCell align={'center'} minWidth={200} title={'Posição do time'} />
      </TableRow>
    </TableHead>
  );
};

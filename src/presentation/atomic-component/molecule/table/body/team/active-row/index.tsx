import { PlayerActivedTableBody } from './body';
import { PlayerTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { colors } from 'presentation/style';
import { useFindOneMatchQuery } from 'infra/cache';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

export const ActiveRow: FC = () => {
  const matchId = useParams();
  const matchTeam = useFindOneMatchQuery({ id: matchId.id || '' });

  return (
    <TableTemplate
      height={'100%'}
      sx={{ border: `1px solid ${colors.gray[200]}`, margin: 'auto', maxWidth: '95%' }}
      tableBody={<PlayerActivedTableBody query={matchTeam.data?.matchTeam} />}
      tableHeader={<PlayerTableHeader />}
    />
  );
};

import { BodyCell } from 'presentation/atomic-component/atom';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { EmojiEvents, SportsEsports } from '@mui/icons-material';
import { MatchModal } from 'presentation/atomic-component/molecule/modal/match';
import { QueryName, apiPaths } from 'main/config';
import { TableBody, TableRow } from '@mui/material';
import { formatDate } from 'main/utils';
import type { FC } from 'react';
import type { Match } from 'domain/models/match';

interface MatchTableProps {
  items: Match[];
}

export const MatchTableBody: FC<MatchTableProps> = ({ items }) => {
  return (
    <TableBody className={'relative'}>
      {items?.length === 0 ? (
        <TableRow>
          <BodyCell
            align={'center'}
            colSpan={7}
            title={<div className={' p-4 font-semibold text-xl'}>Nenhuma partida encontrado</div>}
          />
        </TableRow>
      ) : null}

      {items?.map((item) => (
        <TableRow key={item.id}>
          <BodyCell align={'left'} title={item.name} />
          <BodyCell align={'left'} title={item.description ? item.description : 'Não possui'} />

          <BodyCell
            align={'left'}
            title={item.type === 'TOURNAMENT' ? <EmojiEvents /> : <SportsEsports />}
          />

          <BodyCell align={'left'} title={formatDate(item.createdAt, 'dd/MM/yyyy - HH:mm')} />

          <BodyCell
            align={'left'}
            title={
              <div className={'flex justify-center gap-3'}>
                <MatchModal match={item} />

                <DeleteConfirmationModal
                  id={item.id}
                  queryName={QueryName.match}
                  route={apiPaths.match}
                  successMessage={'Jogador deletado com sucesso'}
                  text={'Tem certeza que deseja deletar esse jogador?'}
                  title={'Deletar jogador'}
                />
              </div>
            }
          />
        </TableRow>
      ))}
    </TableBody>
  );
};

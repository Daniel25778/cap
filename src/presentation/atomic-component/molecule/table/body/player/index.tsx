import { BodyCell } from 'presentation/atomic-component/atom';
import { Checkbox, TableBody, TableRow } from '@mui/material';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { PlayerModal } from 'presentation/atomic-component/molecule/modal';
import { QueryName, apiPaths } from 'main/config';
import { ThumbDownAlt, ThumbUp } from '@mui/icons-material';
import type { FC } from 'react';
import type { Player } from 'domain/models';

interface PlayerTableProps {
  items: Player[];
  rowWithCheckbox?: boolean;
}

export const PlayerTableBody: FC<PlayerTableProps> = ({ items, rowWithCheckbox }) => {
  return (
    <TableBody className={'relative'}>
      {items?.length === 0 ? (
        <TableRow>
          <BodyCell
            align={'center'}
            colSpan={7}
            title={<div className={' p-4 font-semibold text-xl'}>Nenhum jogador encontrado</div>}
          />
        </TableRow>
      ) : null}

      {items?.map((item) => (
        <TableRow key={item.id}>
          {rowWithCheckbox ? <BodyCell align={'left'} title={<Checkbox />} /> : null}
          <BodyCell align={'left'} title={item.name} />
          <BodyCell align={'left'} title={item.instagram ? item.instagram : 'Não possui'} />

          <BodyCell
            align={'left'}
            title={
              item.isMember ? (
                <ThumbUp className={'text-[#4eff37a8]'} />
              ) : (
                <ThumbDownAlt className={'text-[#ff0404e0]'} />
              )
            }
          />

          <BodyCell
            align={'left'}
            title={
              item.isOnGuild ? (
                <ThumbUp className={'text-[#4eff37a8]'} />
              ) : (
                <ThumbDownAlt className={'text-[#ff0404e0]'} />
              )
            }
          />

          <BodyCell align={'left'} title={item.instagram ? item.instagram : 'Não possui'} />
          <BodyCell align={'left'} title={item.totalKills} />

          <BodyCell
            align={'left'}
            title={
              <div className={'flex justify-center gap-3'}>
                <PlayerModal player={item} />

                <DeleteConfirmationModal
                  id={item.id}
                  queryName={QueryName.player}
                  route={apiPaths.player}
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

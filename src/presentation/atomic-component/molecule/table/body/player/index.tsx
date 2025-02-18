import { BodyCell } from 'presentation/atomic-component/atom';
import { CheckCircle, ThumbDownAlt, ThumbUp } from '@mui/icons-material';
import { Checkbox, TableBody, TableRow } from '@mui/material';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { PlayerModal, TeamModal } from 'presentation/atomic-component/molecule/modal';
import { QueryName, apiPaths } from 'main/config';
import { addPlayer, removePlayer } from 'store/player/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import type { FC } from 'react';
import type { Player } from 'domain/models';

interface PlayerTableProps {
  items: Player[];
  rowWithCheckbox?: boolean;
}

export const PlayerTableBody: FC<PlayerTableProps> = ({ items, rowWithCheckbox }) => {
  const { playerSelected } = useAppSelector((state) => state.player);

  const dispatch = useDispatch();

  return (
    <>
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
            {rowWithCheckbox ? (
              <BodyCell
                align={'left'}
                title={
                  <Checkbox
                    checked={!!playerSelected[item.id]}
                    onChange={(event): void => {
                      if (event.target.checked) dispatch(addPlayer([item]));
                      else dispatch(removePlayer([item.id]));
                    }}
                  />
                }
              />
            ) : null}

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

      <div
        className={`z-10 ${
          Object.entries(playerSelected).length > 0
            ? 'fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[800px]'
            : 'hidden'
        }`}
      >
        <div className={' bg-white rounded-t-2xl'}>
          <div className={'flex w-full p-5 justify-center items-center gap-5'}>
            <CheckCircle className={' text-black'} />
            <h2 className={'text-black'}>{Object.entries(playerSelected).length} selecionado(s)</h2>
            <TeamModal />
          </div>
        </div>
      </div>
    </>
  );
};

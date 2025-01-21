import { Add, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { PlayerForm } from 'presentation/atomic-component/molecule/form';
import { useModal } from 'data/hooks';
import type { FC } from 'react';
import type { Player } from 'domain/models';

interface PlayerModalProps {
  player?: Player;
}

export const PlayerModal: FC<PlayerModalProps> = ({ player }) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        player ? (
          <div
            className={
              'bg-gray-700 hover:bg-gray-550 border border-gray-500 rounded-md p-2 cursor-pointer'
            }
            onClick={openModal}
          >
            <Edit />
          </div>
        ) : (
          <Button
            className={'w-full tablet:max-w-[315px]'}
            color={'secondary'}
            onClick={(): void => openModal()}
            startIcon={<Add />}
          >
            Criar jogador
          </Button>
        )
      }
      size={'medium'}
      title={`${player ? 'Ediçao' : 'Cadastro'} de jogador`}
    >
      <PlayerForm closeModal={closeModal} player={player} />
    </Modal>
  );
};

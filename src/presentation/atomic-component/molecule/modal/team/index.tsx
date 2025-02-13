import { Add, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { MatchForm } from 'presentation/atomic-component/molecule/form';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { useModal } from 'data/hooks';
import type { FC } from 'react';
import type { Match } from 'domain/models/match';

interface TeamModalProps {
  match?: Match;
}

export const TeamModal: FC<TeamModalProps> = ({ match }) => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        match ? (
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
            Cadastrar time
          </Button>
        )
      }
      size={'medium'}
      title={`${match ? 'Edição' : 'Cadastro'} de time`}
    >
      <MatchForm closeModal={closeModal} match={match} />
    </Modal>
  );
};

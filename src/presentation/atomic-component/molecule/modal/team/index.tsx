import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { TeamForm } from 'presentation/atomic-component/molecule/form';
import { useModal } from 'data/hooks';
import type { FC } from 'react';

export const TeamModal: FC = () => {
  const { closeModal, isOpen, openModal } = useModal();

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        <Button
          className={'w-full tablet:max-w-[50px]'}
          color={'secondary'}
          onClick={(): void => openModal()}
        >
          <Add />
        </Button>
      }
      size={'medium'}
      title={'Cadastro de time'}
    >
      <TeamForm closeModal={closeModal} />
    </Modal>
  );
};

import { DraggableContainer } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import { ShowNewFunctionalityModal } from 'presentation/atomic-component/molecule/modal';
import { dimensions } from 'main/config';
import { useModal, useWindowDimensions } from 'data/hooks';
import type { NewFunctionality } from 'domain/models';

export const DraggableNewFunctionality: FC = () => {
  const [newFunctionalitySelected, setNewFunctionalitySelected] = useState<NewFunctionality | null>(
    null
  );

  const { width } = useWindowDimensions();

  const modal = useModal();

  const break2 = width < dimensions.tablet ? 3 : 8;

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex gap-2 flex-col tablet:flex-row items-center justify-between'}>
        <h2 className={'font-semibold text-xl'}>Novas funcionalidades solicitadas</h2>
        {/* <NewFunctionalityModal /> */}
      </div>

      <DraggableContainer break2={break2} height={150}>
        <div />
      </DraggableContainer>

      {newFunctionalitySelected ? (
        <ShowNewFunctionalityModal
          modal={{
            ...modal,
            closeModal() {
              setNewFunctionalitySelected(null);
              modal.closeModal();
            }
          }}
          newFunctionality={newFunctionalitySelected}
        />
      ) : null}
    </div>
  );
};

import { DraggableContainer } from 'presentation/atomic-component/atom';
import { dimensions } from 'main/config';
import { useWindowDimensions } from 'data/hooks';
import type { FC } from 'react';

export const DraggableFavoriteFunctionality: FC = () => {
  const { width } = useWindowDimensions();

  const break2 = width < dimensions.tablet ? 3 : 8;

  // if (!functionalityQuery.data || functionalityQuery.data?.content.length === 0) return null;

  return (
    <div className={'flex flex-col gap-2'}>
      <h2 className={'font-semibold text-xl'}>Destaques</h2>

      <DraggableContainer break2={break2} height={150}>
        <div />
      </DraggableContainer>
    </div>
  );
};

import { Pagination } from 'presentation/atomic-component/molecule';
import { PlayerModal } from 'presentation/atomic-component/molecule/modal';
import { PlayerTableBody } from 'presentation/atomic-component/molecule/table/body';
import { PlayerTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { useAppSelector } from 'store';
import { useFindPlayerQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';

export const HomeContent: FC = () => {
  const { handleChangePage, page } = usePagination();

  const { playerFilter } = useAppSelector((state) => state.filter);

  const playerQuery = useFindPlayerQuery({
    limit: 5,
    page,
    params: { name: playerFilter.name }
  });

  return (
    <div className={'flex flex-col gap-8 tablet:gap-10'}>
      <div className={'flex flex-col gap-12'}>
        {playerQuery.data ? (
          <div className={'flex flex-col gap-6 max-w-[1500px] w-full mx-auto'}>
            <div className={'flex justify-between'}>
              <h2 className={'font-semibold text-2xl'}>Jogadores</h2>
              <PlayerModal />
            </div>

            <TableTemplate
              tableBody={<PlayerTableBody items={playerQuery.data.content} />}
              tableHeader={<PlayerTableHeader />}
            />

            <Pagination
              handleChangePage={handleChangePage}
              page={page}
              totalPages={playerQuery.data.totalPages}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

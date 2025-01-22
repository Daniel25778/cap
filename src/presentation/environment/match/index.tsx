import { MatchModal } from 'presentation/atomic-component/molecule/modal/match';
import { MatchTableBody } from 'presentation/atomic-component/molecule/table/body';
import { MatchTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { Pagination } from 'presentation/atomic-component/molecule';
import { TableTemplate } from 'presentation/atomic-component/atom';
import { useAppSelector } from 'store';
import { useFindMatchQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';

export const MatchContent: FC = () => {
  const { handleChangePage, page } = usePagination();

  const { matchFilter } = useAppSelector((state) => state.filter);

  const matchQuery = useFindMatchQuery({
    limit: 9,
    page,
    params: {
      endDate: matchFilter.date?.endDate,
      name: matchFilter.name,
      sort: matchFilter.sort,
      sortBy: matchFilter.sortBy,
      startDate: matchFilter.date?.startDate
    }
  });

  return (
    <div className={'flex flex-col gap-8 tablet:gap-10'}>
      <div className={'flex flex-col gap-12'}>
        {matchQuery.data ? (
          <div className={'flex flex-col gap-6 max-w-[1500px] w-full mx-auto'}>
            <div className={'flex justify-between'}>
              <h2 className={'font-semibold text-2xl'}>Partidas</h2>
              <MatchModal />
            </div>

            <TableTemplate
              tableBody={<MatchTableBody items={matchQuery.data.content} />}
              tableHeader={<MatchTableHeader />}
            />

            <Pagination
              handleChangePage={handleChangePage}
              page={page}
              totalPages={matchQuery.data.totalPages}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

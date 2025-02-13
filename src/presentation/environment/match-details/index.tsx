import { GoBack, TableTemplate } from 'presentation/atomic-component/atom';
import { Pagination } from 'presentation/atomic-component/molecule';
import { TeamModal } from 'presentation/atomic-component/molecule/modal';
import { TeamTableBody } from 'presentation/atomic-component/molecule/table/body/team';
import { TeamTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { useAppSelector } from 'store';
import { useFindOneMatchQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

export const MatchDetailsContent: FC = () => {
  const { handleChangePage, page } = usePagination();

  const { matchId } = useParams();

  const { matchFilter } = useAppSelector((state) => state.filter);

  const matchQuery = useFindOneMatchQuery({
    id: matchId || '',
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
      <div className={'flex'}>
        <GoBack />
      </div>

      <div className={'flex flex-col gap-12'}>
        {matchQuery.data ? (
          <div className={'flex flex-col gap-6 max-w-[1500px] w-full mx-auto'}>
            <div className={'flex justify-between'}>
              <h2 className={'font-semibold text-2xl'}>Times</h2>
              <TeamModal />
            </div>

            <TableTemplate
              tableBody={<TeamTableBody items={matchQuery.data.content} />}
              tableHeader={<TeamTableHeader />}
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

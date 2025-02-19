import { GoBack, TableTemplate } from 'presentation/atomic-component/atom';
import { Link, useParams } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';
import { TeamTableBody } from 'presentation/atomic-component/molecule/table/body/team';
import { TeamTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { paths } from 'main/config';
import { useAppSelector } from 'store';
import { useFindOneMatchQuery } from 'infra/cache';
import type { FC } from 'react';

export const MatchDetailsContent: FC = () => {
  const { matchId } = useParams();

  const { matchFilter } = useAppSelector((state) => state.filter);

  const matchQuery = useFindOneMatchQuery({
    id: matchId || '',
    limit: 9,
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

              <Link to={paths.teamRegister(matchId || '')}>
                <div />

                <div
                  className={
                    'bg-gray-700 flex hover:bg-gray-550 border border-gray-500 rounded-md p-2 cursor-pointer'
                  }
                >
                  <p>Cadastrar time</p>
                  <NavigateNext />
                </div>
              </Link>
            </div>

            <TableTemplate
              tableBody={<TeamTableBody items={matchQuery.data?.matchTeam || []} />}
              tableHeader={<TeamTableHeader />}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

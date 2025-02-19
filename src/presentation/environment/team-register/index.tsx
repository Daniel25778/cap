/* eslint-disable import/no-unresolved */
import { GoBack, TableTemplate } from 'presentation/atomic-component/atom';
import { Pagination } from 'presentation/atomic-component/molecule';
import { PlayerModal } from 'presentation/atomic-component/molecule/modal';
import { PlayerTableBody } from 'presentation/atomic-component/molecule/table/body';
import { PlayerTableHeader } from 'presentation/atomic-component/molecule/table/header';
import { useAppSelector } from 'store';
import { useFindPlayerQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import { useParams } from 'react-router-dom';
import ImagePasteProcessor from 'presentation/atomic-component/molecule/image-paste';
import type { FC } from 'react';

export const TeamRegisterContent: FC = () => {
  const { handleChangePage, page } = usePagination();

  const { matchId } = useParams();

  const { playerFilter } = useAppSelector((state) => state.filter);
  const playerQuery = useFindPlayerQuery({
    limit: 9,
    page,
    params: {
      name: playerFilter.name,
      nickname: playerFilter.nickname,
      sort: playerFilter.sort,
      sortBy: playerFilter.sortBy
    }
  });

  return (
    <div className={'flex flex-col gap-8 tablet:gap-10'}>
      <div className={'flex'}>
        <GoBack />
      </div>

      <div className={'flex flex-col gap-12'}>
        <div className={'flex flex-col gap-6 max-w-[1500px] w-full mx-auto'}>
          <h2 className={'font-semibold text-2xl'}>Cadastro de time</h2>
          <ImagePasteProcessor />

          {playerQuery.data ? (
            <div className={'flex flex-col gap-6 max-w-[1500px] w-full mx-auto'}>
              <div className={'flex justify-between'}>
                <h2 className={'font-semibold text-2xl'}>Jogadores time 1</h2>
                <PlayerModal />
              </div>

              <TableTemplate
                tableBody={
                  <PlayerTableBody
                    items={playerQuery.data.content}
                    matchId={matchId ?? ''}
                    rowWithCheckbox
                  />
                }
                tableHeader={
                  <PlayerTableHeader headerCellWithCheckbox items={playerQuery.data.content} />
                }
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
    </div>
  );
};

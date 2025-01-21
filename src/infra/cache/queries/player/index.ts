import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseFindPlayerQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindPlayerQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindPlayerQuery> =>
  useFindQuery<UseFindPlayerQuery>({ ...props, route: 'player' });

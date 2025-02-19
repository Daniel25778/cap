import { useFindQuery } from 'infra/cache/queries/default-query';
import type { MatchOne, UseFindMatchQuery } from 'domain/models/match';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindMatchQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindMatchQuery> =>
  useFindQuery<UseFindMatchQuery>({ ...props, route: 'match' });

export const useFindOneMatchQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<MatchOne> =>
  useFindQuery<MatchOne>({ ...props, route: 'match' });

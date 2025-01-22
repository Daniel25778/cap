import type { DateFilter, Pagination, Sort } from 'domain/protocol';
import type { MatchType } from 'domain/enums';

export interface Match {
  id: string;
  name: string;
  description: string;
  type: MatchType;
  createdAt: Date;
}

export interface MatchFilter {
  name: string;
  type: MatchType | null;
  date: DateFilter;
  sort: Sort;
  sortBy: 'createdAt' | 'name' | 'type' | null;
}

export interface UseFindMatchQuery extends Pagination {
  content: Match[];
}

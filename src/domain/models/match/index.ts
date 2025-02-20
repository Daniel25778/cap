import type { DateFilter, Pagination, Sort } from 'domain/protocol';
import type { MatchType } from 'domain/enums';
import type { Player } from 'domain/models/player';

export interface PlayerTeam {
  id: string;
  kills: number;
  player: Player;
}

export interface MatchTeam {
  id: string;
  position: number;
  playerTeam: PlayerTeam[];
}

export interface Match {
  id: string;
  name: string;
  description: string;
  type: MatchType;
  createdAt: Date;
}

export interface MatchOne {
  id: string;
  matchTeam: MatchTeam[];
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

import type { Pagination, Sort } from 'domain/protocol';

export interface Player {
  id: string;
  name: string;
  nickname: string;
  instagram: string;
  isOnGuild: true;
  isMember: true;
  finishedAt: string;
  createdAt: string;
  updatedAt: string;
  totalKills: number;
}

export interface PlayerFilter {
  name: string;
  nickname: string;
  instagram: string;
  sort: Sort;
  sortBy: 'instagram' | 'isMember' | 'isOnGuild' | 'name' | 'nickname' | 'totalKills' | null;
}

export interface UseFindPlayerQuery extends Pagination {
  content: Player[];
}

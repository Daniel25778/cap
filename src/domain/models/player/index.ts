import type { Pagination } from 'domain/protocol';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

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
  name: SelectValues | '';
  instagram: SelectValues | '';
  totalKills: SelectValues | '';
}

export interface UseFindPlayerQuery extends Pagination {
  content: Player[];
}

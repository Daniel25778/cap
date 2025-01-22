import type { SelectValues } from 'presentation/atomic-component/atom/select';

export type MatchType = 'NORMAL' | 'TOURNAMENT';

export const MatchTypeList: SelectValues[] = [
  {
    label: 'Partida Normal',
    value: 'NORMAL'
  },
  {
    label: 'Partida de Torneio',
    value: 'TOURNAMENT'
  }
];

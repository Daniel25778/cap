import type { SelectValues } from 'presentation/atomic-component/atom/select';

export const translateMatchType = (selected: SelectValues | null): SelectValues | null => {
  console.log(selected);
  if (selected?.label === 'NORMAL') return { label: 'Partida Normal', value: 'NORMAL' };

  if (selected?.label === 'TOURNAMENT') return { label: 'Partida de Torneio', value: 'TOURNAMENT' };

  return selected;
};

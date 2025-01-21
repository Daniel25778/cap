import { Clear, Search } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { LabelInput } from 'presentation/atomic-component/atom/label-input';
import { useDebounce } from 'data/hooks';
import { useState } from 'react';
import type { Dispatch, FC, SetStateAction } from 'react';

interface GenericFilterProps {
  filterValue?: string | null;
  mask?: string;
  onChange: (value: string) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const GenericFilter: FC<GenericFilterProps> = ({ filterValue, mask, onChange, setOpen }) => {
  const [search, setSearch] = useState(filterValue || '');

  useDebounce(() => onChange(search), [search], 300);

  return (
    <LabelInput
      EndIcon={
        <InputAdornment position={'end'} title={'Limpar'}>
          <IconButton onClick={(): void => setSearch('')} tabIndex={-1}>
            <Clear />
          </IconButton>
        </InputAdornment>
      }
      StartIcon={
        <InputAdornment position={'start'}>
          <Search />
        </InputAdornment>
      }
      autoFocus
      mask={mask}
      onChange={(event): void => {
        setSearch(event.target.value);
      }}
      onKeyUp={(event): void => {
        if (event.key === 'Enter') setOpen(false);
      }}
      placeholder={'Pesquisar'}
      value={search}
      variant={'standard'}
    />
  );
};

import { type FC, useEffect, useState } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { MatchTypeList } from 'domain/enums';
import { Select } from 'presentation/atomic-component/atom/select';
import { useMatch } from 'data/use-case';
import { validate } from 'main/utils';
import type { Match } from 'domain/models/match';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

interface MatchFormProps {
  match?: Match;
  closeModal: () => void;
}

export const MatchForm: FC<MatchFormProps> = ({ closeModal, match }) => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting, setValue } = useMatch({
    closeModal,
    match
  });

  const [typeSelected, setTypeSelected] = useState<SelectValues | null>(
    match?.type
      ? {
          label: match.type,
          value: match.id
        }
      : null
  );

  useEffect(() => {
    if (match) setValue('name', match.name, validate);
  }, [match]);

  return (
    <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
      <LabelInput
        error={!!errors.name}
        label={'Nome da partida'}
        placeholder={'Digite o nome da partida'}
        register={register('name')}
        required
      />

      <Select
        error={!!errors.type}
        id={'typeSelectedId'}
        label={'Tipo de partida'}
        onChange={(event): void => {
          const newValue = event as SelectValues | null;

          setValue('type', newValue?.value ?? '', validate);

          setTypeSelected(newValue);
        }}
        options={MatchTypeList}
        register={register('type')}
        required
        value={typeSelected}
      />

      <LabelInput
        error={!!errors.description}
        label={'Descrição da partida'}
        maxRows={4}
        minRows={4}
        multiline
        placeholder={'Digite a descrição da partida'}
        register={register('description')}
      />

      <FormButton disableRipple isSubmitting={isSubmitting} label={'Enviar'} />
    </form>
  );
};

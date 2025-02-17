import { type FC, useEffect } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { useMatch } from 'data/use-case';
import { validate } from 'main/utils';
import type { Match } from 'domain/models/match';

interface TeamFormProps {
  match?: Match;
  closeModal: () => void;
}

export const TeamForm: FC<TeamFormProps> = ({ closeModal, match }) => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting, setValue } = useMatch({
    closeModal,
    match
  });

  // const playerQuery = useFindPlayerQuery({});

  // const { handleChangePage, page } = usePagination();

  // const [playerSelected, setPlayerSelected] = useState<SelectValues | null>(
  //   match?.type
  //     ? {
  //         label: match.type,
  //         value: match.id
  //       }
  //     : null
  // );

  useEffect(() => {
    if (match) setValue('name', match.name, validate);
  }, [match]);

  return (
    <>
      <h2 className={'font-semibold text-white text-base'}>Cadastrar manualmente</h2>

      <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          error={!!errors.name}
          label={'Posição'}
          placeholder={'Digite a posição do time'}
          register={register('name')}
          required
        />

        <FormButton disableRipple isSubmitting={isSubmitting} label={'Enviar'} />
      </form>
    </>
  );
};

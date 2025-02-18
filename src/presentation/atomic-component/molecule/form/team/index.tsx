import { type FC, useEffect } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { validate } from 'main/utils';
import type { MatchOne } from 'domain/models/match';

interface TeamFormProps {
  match?: MatchOne;
  closeModal: () => void;
}

export const TeamForm: FC<TeamFormProps> = ({ closeModal, match }) => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting, setValue } = useMatchOne({
    closeModal,
    match
  });

  // const playerQuery = useFindPlayerQuery({});

  // const { handleChangePage, page } = usePagination();

  // const [playerSelected, setPlayerSelected] = useState<SelectValues | null>(
  //   team?.type
  //     ? {
  //         label: team.type,
  //         value: team.id
  //       }
  //     : null
  // );

  useEffect(() => {
    if (match) setValue('name', team.name, validate);
  }, [team]);

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

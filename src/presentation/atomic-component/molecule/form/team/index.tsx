import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { useAppSelector } from 'store';
import { useMatchTeam } from 'data/use-case';
import type { FC } from 'react';

interface TeamFormProps {
  closeModal: () => void;
  matchId: string;
}

export const TeamForm: FC<TeamFormProps> = ({ closeModal, matchId }) => {
  const { playerSelected } = useAppSelector((state) => state.player);
  const { handleSubmit, onSubmit, register, errors, isSubmitting } = useMatchTeam({
    closeModal
  });

  register('matchId', { value: matchId });

  return (
    <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
      <LabelInput
        error={!!errors.teams?.[0]?.position}
        label={'Posição'}
        placeholder={'Digite a posição do time'}
        register={register('teams.0.position', { valueAsNumber: true })}
        required
        type={'number'}
      />

      {Object.entries(playerSelected).map(([key, value], index) => (
        <div key={key} className={'flex items-center gap-6'}>
          <h2
            className={
              'font-semibold w-[150px] text-white overflow-hidden text-ellipsis whitespace-nowrap'
            }
          >
            {value.name}
          </h2>

          <input
            type={'hidden'}
            {...register(`teams.0.players.${index}.name`)}
            value={value.name}
          />

          <LabelInput
            error={!!errors?.teams?.[0]?.players?.[index]?.kill}
            label={'Total de kills'}
            placeholder={'Digite o total de kills do jogador'}
            register={register(`teams.0.players.${index}.kill`)}
            required
            type={'number'}
          />
        </div>
      ))}

      <FormButton disableRipple isSubmitting={isSubmitting} label={'Enviar'} />
    </form>
  );
};

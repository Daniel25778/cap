import { Checkbox, FormControlLabel } from '@mui/material';
import { type FC, useEffect } from 'react';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { usePlayer } from 'data/use-case';
import { validate } from 'main/utils';
import type { Player } from 'domain/models';

interface PlayerFormProps {
  player?: Player;
  closeModal: () => void;
}

export const PlayerForm: FC<PlayerFormProps> = ({ closeModal, player }) => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting, setValue, getValues } = usePlayer(
    {
      closeModal,
      player
    }
  );

  useEffect(() => {
    if (player) {
      setValue('name', player.name, validate);
      setValue('instagram', player.instagram, validate);
      setValue('isOnGuild', player.isOnGuild, validate);
      setValue('isMember', player.isMember, validate);
      setValue('totalKills', player.totalKills, validate);
    }
  }, [player]);

  return (
    <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
      <LabelInput
        error={!!errors.name}
        label={'Nome do jogador'}
        placeholder={'Digite o nome do jogador'}
        register={register('name')}
        required
      />

      <LabelInput
        error={!!errors.instagram}
        label={'Instagram do jogador'}
        placeholder={'Digite o instagram do jogador'}
        register={register('instagram')}
        required
      />

      <LabelInput
        error={!!errors.nickname}
        label={'Apelido do jogador'}
        placeholder={'Digite o Apelido do jogador'}
        register={register('nickname')}
        required
      />

      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={getValues('isMember')}
              defaultChecked={player?.isMember}
              onChange={(event): void => setValue('isMember', event.target.checked, validate)}
            />
          }
          label={'É membro?'}
          labelPlacement={'end'}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={getValues('isOnGuild')}
              defaultChecked={player?.isOnGuild}
              onChange={(event): void => setValue('isOnGuild', event.target.checked, validate)}
            />
          }
          label={'É da guilda?'}
          labelPlacement={'end'}
        />
      </div>

      <FormButton disableRipple isSubmitting={isSubmitting} label={'Enviar'} />
    </form>
  );
};

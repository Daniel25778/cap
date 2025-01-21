import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
import { playerSchema } from 'validation/schema';
import { queryClient } from 'infra/lib';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import type { Player } from 'domain/models';
import type { PlayerRequest } from 'validation/schema';

interface usePlayerProps {
  closeModal: () => void;
  player?: Player;
}
export const usePlayer = ({
  closeModal,
  player
}: usePlayerProps): {
  errors: FieldErrors<PlayerRequest>;
  register: UseFormRegister<PlayerRequest>;
  onSubmit: SubmitHandler<PlayerRequest>;
  handleSubmit: UseFormHandleSubmit<PlayerRequest>;
  getValues: UseFormGetValues<PlayerRequest>;
  setValue: UseFormSetValue<PlayerRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<PlayerRequest>({
    resolver: yupResolver(playerSchema)
  });

  const onSubmit: SubmitHandler<PlayerRequest> = async (data) => {
    try {
      if (player)
        await api.put({
          body: data,
          id: player.id,
          route: apiPaths.player
        });
      else
        await api.post({
          body: data,
          route: apiPaths.player
        });

      closeModal();

      callToast.success('Jogador salvo com sucesso!');
      queryClient.invalidateQueries(QueryName.player);
    } catch (error) {
      resolverError(error);
    }
  };

  return {
    errors,
    getValues,
    handleSubmit,
    isSubmitting,
    onSubmit,
    register,
    setValue
  };
};

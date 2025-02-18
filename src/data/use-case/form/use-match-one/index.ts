import { type MatchRequest, matchSchema } from 'validation/schema';
import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
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
import type { MatchOne } from 'domain/models/match';

interface useMatchOneProps {
  closeModal: () => void;
  matchOne?: MatchOne;
}
export const useMatch = ({
  closeModal,
  match
}: useMatchOneProps): {
  errors: FieldErrors<MatchRequest>;
  register: UseFormRegister<MatchRequest>;
  onSubmit: SubmitHandler<MatchRequest>;
  handleSubmit: UseFormHandleSubmit<MatchRequest>;
  getValues: UseFormGetValues<MatchRequest>;
  setValue: UseFormSetValue<MatchRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<MatchRequest>({
    resolver: yupResolver(matchSchema)
  });

  const onSubmit: SubmitHandler<MatchRequest> = async (data) => {
    try {
      if (match)
        await api.put({
          body: data,
          id: match.id,
          route: apiPaths.match
        });
      else
        await api.post({
          body: data,
          route: apiPaths.match
        });

      closeModal();

      callToast.success('Partida salva com sucesso!');
      queryClient.invalidateQueries(QueryName.match);
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

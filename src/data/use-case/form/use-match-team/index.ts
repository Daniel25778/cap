import { type MatchTeamRequest, matchTeamSchema } from 'validation/schema/team';
import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
import { queryClient } from 'infra/lib';
import { resetPlayer } from 'store/player/slice';
import { useDispatch } from 'react-redux';
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

interface useMatchTeamProps {
  closeModal: () => void;
}
export const useMatchTeam = ({
  closeModal
}: useMatchTeamProps): {
  errors: FieldErrors<MatchTeamRequest>;
  register: UseFormRegister<MatchTeamRequest>;
  onSubmit: SubmitHandler<MatchTeamRequest>;
  handleSubmit: UseFormHandleSubmit<MatchTeamRequest>;
  getValues: UseFormGetValues<MatchTeamRequest>;
  setValue: UseFormSetValue<MatchTeamRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<MatchTeamRequest>({
    resolver: yupResolver(matchTeamSchema)
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<MatchTeamRequest> = async (data) => {
    try {
      await api.post({
        body: data,
        route: apiPaths.matchTeam
      });

      closeModal();

      dispatch(resetPlayer());

      callToast.success('Time salvo com sucesso!');
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

import { boolean, number, object, string } from 'yup';
import type { InferType } from 'yup';

export const playerSchema = object().shape({
  instagram: string(),
  isMember: boolean(),
  isOnGuild: boolean(),
  name: string().required(),
  nickname: string(),
  totalKills: number()
});

export type PlayerRequest = InferType<typeof playerSchema>;

import { object, string } from 'yup';
import type { InferType } from 'yup';

export const matchSchema = object().shape({
  description: string().required(),
  name: string().required(),
  type: string().required()
});

export type MatchRequest = InferType<typeof matchSchema>;

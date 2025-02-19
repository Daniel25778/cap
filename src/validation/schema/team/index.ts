import { array, number, object, string } from 'yup';
import type { InferType } from 'yup';

export const playerSchema = object({
  kill: number().required(),
  name: string().required()
});

export const teamSchema = object({
  players: array().of(playerSchema).required(),
  position: number().required()
});

export const matchTeamSchema = object({
  matchId: string().required(),
  teams: array().of(teamSchema).required()
});

export type MatchTeamRequest = InferType<typeof matchTeamSchema>;

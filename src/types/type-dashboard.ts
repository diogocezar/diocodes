import { Document } from "mongodb";

export type TypeDashboard = {
  mentoringDone: number;
  mentoringToBe: number;
  mentoring: number;
  avaliation: number;
  avaliationAvarage: number;
  invite: number;
  tag: number;
  person: number;
  graph: Document[];
};

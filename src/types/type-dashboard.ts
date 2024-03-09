import { Document } from "mongodb";
import { Mentoring } from "@prisma/client";
import { TypeMentoring } from "./type-mentoring";

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
  recentMentoring: {
    attendee: { name: string; email: string };
    id: string;
    startTime: Date;
  }[];
};

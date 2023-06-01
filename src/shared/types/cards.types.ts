import { TID } from "./shared.types";

export interface IStage {
  id: TID;
  sort: number;
  name: string;
  code: string;
}

export interface ICard {
  id: TID;
  title: string;
  stage: string;
  project: boolean | string;
  score: number;
}


export interface IProject {
  id: TID;
  code: string;
  name: string;
  sort: number;
}

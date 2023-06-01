import { cards } from "@/shared/constants/cards";
import { stages } from "@/shared/constants/stages";
import { projects } from "@/shared/constants/projects";
import { sleep } from "@/shared/utils/sleep";

const timeout = 2000;

export async function getStages() {
  await sleep(timeout);
  return stages;
}

export async function getCards() {
  await sleep(timeout);
  return cards;
}

export async function getProjects() {
  await sleep(timeout);
  return projects;
}

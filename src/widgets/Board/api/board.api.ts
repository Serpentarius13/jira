import { cards } from "@/shared/constants/cards";
import { columns } from "@/shared/constants/columns";
import { projects } from "@/shared/constants/projects";
import { sleep } from "@/shared/utils/sleep";

const timeout = 2000;

export async function getColumns() {
  await sleep(timeout);
  return columns;
}

export async function getCards() {
  await sleep(timeout);
  return cards;
}

export async function getProjects() {
  await sleep(timeout);
  return projects;
}

import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/shared/utils/localStorage.service";
import { ICard, IColumn, IProject } from "@/shared/types/cards.types";
import { defineStore } from "pinia";
import { getCards, getColumns, getProjects } from "../api/board.api";

interface IBoardData {
  cards: ICard[];
  columns: IColumn[];
  projects: IProject[];
}

const dataKeys: (keyof IBoardData)[] = ["cards", "columns", "projects"];

const fetchMap: Record<
  (typeof dataKeys)[number],
  () => Promise<IBoardData[keyof IBoardData]>
> = {
  cards: getCards,
  columns: getColumns,
  projects: getProjects,
};

interface IBoardStore extends IBoardData {}

export const useBoardStore = defineStore("board-store", {
  state: (): IBoardStore => ({
    cards: [],
    columns: [],
    projects: [],
  }),
  actions: {
    async initialize() {
      await Promise.all(
        dataKeys.map(async (key) => {
          const curValues = getFromLocalStorage(key);

          let data;

          if (!curValues) {
            const fn = fetchMap[key];
            data = await fn();
            //@ts-expect-error
            acc[cur] = data;
          } else {
            data = JSON.parse(curValues);
            //@ts-expect-error
            acc[cur] = data;
          }

          this[key] = data;
        })
      );

      this.updateLocalStorage();
    },

    updateLocalStorage() {
      setToLocalStorage("cards", this.cards);
      setToLocalStorage("projects", this.projects);
      setToLocalStorage("columns", this.columns);
    },

    addCard(card: ICard) {
      this.cards.push(card);
      this.updateLocalStorage();
    },

    removeCard(cardId: ICard["id"]) {
      this.cards = this.cards.filter((c) => c.id !== cardId);
      this.updateLocalStorage();
    },

    updateCard(cardData: ICard) {
      this.cards = this.cards.map((c) => {
        if (c.id === cardData.id) return cardData;
        else return c;
      });
      this.updateLocalStorage();
    },
  },
  getters: {},
});

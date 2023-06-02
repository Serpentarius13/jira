import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/shared/utils/services/localStorage.service";
import { ICard, IStage, IProject } from "@/shared/types/cards.types";
import { defineStore } from "pinia";
import { getCards, getProjects, getStages } from "../api/board.api";
import { findAll } from "@/shared/utils/findAll";
import useModalStore from "@/shared/stores/useModalStore";
import CardModalVue from "@/features/CardModal/CardModal.vue";

interface IBoardData {
  cards: ICard[];
  stages: IStage[];
  projects: IProject[];
}

type TBoardKey = keyof IBoardData;
type TBoardValues = IBoardData[TBoardKey];

import { sleep } from "@/shared/utils/sleep";

const dataKeys: (keyof IBoardData)[] = ["cards", "stages", "projects"];

const fetchMap: Record<
  (typeof dataKeys)[number],
  () => Promise<IBoardData[keyof IBoardData]>
> = {
  cards: getCards,
  stages: getStages,
  projects: getProjects,
};

interface IBoardStore {
  boardStructure: Record<string, ICard[]>;
  data: IBoardData;
  currentProject: IProject["code"] | null;
  isInitialized: boolean;
}

export const useBoardStore = defineStore("board-store", {
  state: (): IBoardStore => ({
    data: {
      cards: [],
      stages: [],
      projects: [],
    },
    boardStructure: {},
    currentProject: null,
    isInitialized: false,
  }),
  actions: {
    async initializeStore() {
      await Promise.all(
        dataKeys.map(async (key) => {
          let curValues = getFromLocalStorage(key);

          let data: TBoardValues;

          if (!curValues || curValues.length < 3) {
            const fn = fetchMap[key];

            data = await fn();
          } else {
            data = JSON.parse(curValues);
          }

          //@ts-expect-error
          this.data[key] = data;
        })
      );

      this.updateLocalStorage();
      this.isInitialized = true;
    },

    updateLocalStorage() {
      this.updateBoardStructure();
      Object.keys(this.data).forEach((k) => {
        //@ts-expect-error
        setToLocalStorage(k, this.data[k]);
      });
    },

    updateBoardStructure() {
      this.boardStructure = this.data.stages.reduce((acc, cur) => {
        const cards = findAll(this.data.cards, (c) => c.stage === cur.code);

        acc[cur.code] = cards;

        return acc;
      }, {} as Record<string, ICard[]>);
    },

    async addCard(card: ICard) {
      await sleep(1000);
      const id = Date.now() + Math.random();

      this.data.cards.push({ ...card, id });

      this.updateLocalStorage();
    },

    async removeCard(cardId: ICard["id"]) {
      await sleep(1000);

      this.data.cards = this.data.cards.filter((c) => c.id !== cardId);
      this.updateLocalStorage();
    },

    async updateCard(cardData: ICard, id: ICard["id"]) {
      await sleep(1000);
      this.data.cards = this.data.cards.map((c) => {
        if (c.id === id) {
          return cardData;
        }

        return c;
      });
      this.updateLocalStorage();
    },

    moveCard(id: ICard["id"], stage: IStage["code"]) {
      this.data.cards = this.data.cards.map((c) => {
        if (c.id == id) {
          return { ...c, stage };
        } else return c;
      });

      this.updateLocalStorage();
    },

    setCurrentProject(code: IProject["code"]) {
      this.currentProject = code;
    },

    getCardByStage(stage: IStage["name"]) {
      return this.data.cards.find((c) => c.stage === stage);
    },

    getStageByCode(code: IStage["code"]) {
      return this.data.stages.find((s) => s.code === code);
    },

    getProjectByCode(code: IProject["code"]) {
      return this.data.projects.find((p) => p.code === code);
    },
    openAddCardModal(stage: IStage["code"]) {
      const foundStage = this.getStageByCode(stage);

      this.openCardModal(this.addCard, "Добавление", foundStage);
    },

    openEditCardModal(card: ICard, stage: IStage["code"]) {
      const foundStage = this.getStageByCode(stage);

      this.openCardModal(this.updateCard, "Изменение", foundStage, card);
    },

    openCardModal(
      cb: (...args: any[]) => any,

      title: string,
      stage?: IStage,
      card?: Partial<ICard>
    ) {
      const modalStore = useModalStore();

      modalStore.openModal({
        component: CardModalVue,
        props: { callback: cb, card, stage, title },
      });
    },
  },
  getters: {},
});

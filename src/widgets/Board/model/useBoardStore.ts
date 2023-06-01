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
}

export const useBoardStore = defineStore("board-store", {
  state: (): IBoardStore => ({
    data: {
      cards: [],
      stages: [],
      projects: [],
    },
    boardStructure: {},
  }),
  actions: {
    async initializeStore() {
      await Promise.all(
        dataKeys.map(async (key) => {
          let curValues = getFromLocalStorage(key);

          let data: IBoardData[TBoardKey];

          if (!curValues || curValues.length < 3) {
            const fn = fetchMap[key];

            data = await fn();
          } else {
            data = JSON.parse(curValues);
          }

          this.data[key] = data;
        })
      );

      this.boardStructure = this.data.stages.reduce((acc, cur) => {
        const cards = findAll(this.data.cards, (c) => c.stage === cur.code);

        console.log(cur.code);

        acc[cur.code] = cards;

        return acc;
      }, {} as Record<string, ICard[]>);

      this.updateLocalStorage();

      console.log(this.boardStructure);
    },

    updateLocalStorage() {
      Object.keys(this.data).forEach((k) => {
        setToLocalStorage(k, this.data[k]);
      });
    },

    addCard(card: ICard) {
      this.data.cards.push(card);
      this.updateLocalStorage();
    },

    removeCard(cardId: ICard["id"]) {
      this.data.cards = this.data.cards.filter((c) => c.id !== cardId);
      this.updateLocalStorage();
    },

    getCardByStage(stage: IStage["name"]) {
      return this.data.cards.find((c) => c.stage === stage);
    },

    getStageByCode(code: IStage["code"]) {
      this.data.stages.find((s) => s.code === code);
    },

    updateCard(cardData: ICard) {
      this.data.cards = this.data.cards.map((c) => {
        if (c.id === cardData.id) return cardData;
        else return c;
      });
      this.updateLocalStorage();
    },

    openEditCardModal(card?: Omit<ICard, "id">) {
      const modalStore = useModalStore();
      modalStore.openModal({
        component: CardModalVue,
        props: card ? { ...card } : {},
      });
    },
  },
  getters: {
    stagesGetter(state) {
      return Object.keys(state.boardStructure);
    },
  },
});

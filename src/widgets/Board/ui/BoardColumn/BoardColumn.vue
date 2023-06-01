<template>
  <section
    class="flex flex-col justify-between p-[1.2rem] rounded-smallest bg-lightgray gap-[1.2rem]"
  >
    <div class="flex flex-col gap-[1.2rem]">
      <ColumnHeader :stage="stage" @sort-asc="sort(false)" @sort-desc="sort" />

      <ul class="flex flex-col gap-[0.8rem]">
        <li v-for="card in cards" :key="card.id">
          <BoardCard :card="card" />
        </li>
      </ul>
    </div>
    <BaseButton
      :variant="ButtonVariants.outline"
      class="!w-full"
      @click="handleOpenCreateModal"
    >
      Добавить
    </BaseButton>
  </section>
</template>

<script setup lang="ts">
import { IStage } from "@/shared/types/cards.types";

import { useSorting } from "@/shared/utils/hooks/useSorting";
import { useBoardStore } from "../../model/useBoardStore.js";
import ColumnHeader from "./ColumnHeader.vue";
import BoardCard from "@/entities/BoardCard.vue";
import BaseButton from "@/shared/ui/Button/BaseButton.vue";

import { ButtonVariants } from "@/shared/ui/Button/buttonThemes";

interface IBoardColumn {
  stage: IStage["code"];
}

const store = useBoardStore();

const { stage } = defineProps<IBoardColumn>();

const { sortBy, sortedData: cards } = useSorting(
  store.boardStructure[stage],
  "score"
);

function handleOpenCreateModal(stage: IStage["code"]) {
  store.openEditCardModal({ stage, title: "", score: 0, project: "" });
}

const sort = (desc: boolean = true) => sortBy("score", desc);
</script>

<style scoped lang="scss"></style>

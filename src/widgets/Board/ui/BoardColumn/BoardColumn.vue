<template>
  <section
    class="flex flex-col justify-between p-[1.2rem] rounded-smallest bg-lightgray gap-[1.2rem] overflow-x-hidden"
    @drop="handleDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div>
      <ColumnHeader
        :stage="
          store.getStageByCode(stage)?.name ?? 'Название стадии не найдено'
        "
        @sort-asc="sort(false)"
        @sort-desc="sort"
      />

      <div class="flex flex-col gap-[1.2rem] mt-[1.2rem] relative">
        <TransitionGroup
          name="slide"
          tag="ul"
          class="flex flex-col gap-[0.8rem] max-h-[50.4rem] overflow-y-auto"
          v-if="
            sortedCards.length &&
            (!store.currentProject ||
              sortedCards[0].project === store.currentProject)
          "
        >
          <li
            v-for="card in sortedCards"
            :key="card.id"
            @dragstart="handleDragStart($event, card)"
            :draggable="true"
          >
            <BoardCard :card="card" />
          </li>
        </TransitionGroup>

        <ColumnEmpty v-else />
      </div>
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
import { ICard, IStage } from "@/shared/types/cards.types";

import { useSorting } from "@/shared/utils/hooks/useSorting";
import { useBoardStore } from "../../model/useBoardStore.js";
import ColumnHeader from "./ColumnHeader.vue";
import BoardCard from "@/entities/BoardCard.vue";
import BaseButton from "@/shared/ui/Button/BaseButton.vue";

import { ButtonVariants } from "@/shared/ui/Button/buttonThemes";
import { computed } from "vue";
import ColumnEmpty from "./ColumnEmpty.vue";

interface IBoardColumn {
  stage: IStage["code"];
}

const { stage } = defineProps<IBoardColumn>();

const store = useBoardStore();

const computedCards = computed(() => store.boardStructure[stage]);

const { sortBy, sortedData: sortedCards } = useSorting(computedCards, "score");

const sort = (desc: boolean = true) => sortBy("score", desc);

function handleOpenCreateModal() {
  store.openAddCardModal(stage);
}

function handleDragStart(event: DragEvent, card: ICard) {
  if (!event.dataTransfer) return;
  event.dataTransfer.setData("id", card.id.toString());
  event.dataTransfer.dropEffect = "move";
}

function handleDrop(event: DragEvent) {
  if (!event.dataTransfer) return;

  const cardId = event.dataTransfer.getData("id");

  if (!cardId) return;

  console.log("drop");

  const parsedId = parseFloat(cardId);

  store.moveCard(parsedId, stage);
}
</script>

<style scoped lang="scss">
.slide-enter-from,
.slide-leave-to {
  @apply opacity-0 -translate-y-1/4;
}

.slide-enter-active,
.slide-leave-active {
  @apply transition-all;
}

#drop:is(:not(a)) {
  pointer-events: none;
}
</style>

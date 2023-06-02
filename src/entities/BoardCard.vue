<template>
  <div
    class="p-[1.2rem] rounded-smallest flex flex-col justify-between min-w-[29.6rem] max-w-screen min-h-[12rem] bg-white"
  >
    <div class="flex flex-col gap-[0.8rem]">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-[0.8rem]">
          <h5 class="text-small">
            {{ card.title }}
          </h5>

          <button @click="store.openEditCardModal(card, card.stage)">
            <BaseIcon name="edit" />
          </button>

          <AsyncButton :on-click="async () => await store.removeCard(card.id)">
            <BaseIcon name="trashcan" />
          </AsyncButton>
        </div>

        <button class="handle">
          <BaseIcon name="dots" />
        </button>
      </div>

      <div class="text-smallest">
        <span class="text-medium-gray"> Балл:&nbsp; </span>

        <span> {{ card.score }} </span>
      </div>
    </div>

    <span
      class="py-[0.4rem] px-[0.8rem] rounded-smallest border-[1px] border-medium-light-gray text-gray bg-grayish-white w-fit"
      v-if="typeof card.project === 'string'"
    >
      {{ store.getProjectByCode(card.project)?.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ICard } from "@/shared/types/cards.types";
import AsyncButton from "@/shared/ui/AsyncButton/AsyncButton.vue";
import BaseIcon from "@/shared/ui/Icon/BaseIcon.vue";
import { useBoardStore } from "@/widgets/Board/model/useBoardStore";

interface IBoardCard {
  card: ICard;
}

const store = useBoardStore();

defineProps<IBoardCard>();
</script>

<style scoped lang="scss"></style>

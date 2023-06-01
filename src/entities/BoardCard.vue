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

          <AsyncButton>
            <BaseIcon name="edit" />
          </AsyncButton>

          <AsyncButton>
            <BaseIcon name="trashcan" />
          </AsyncButton>
        </div>

        <button>
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
      {{ card.project }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ICard } from "@/shared/types/cards.types";
import AsyncButton from "@/shared/ui/AsyncButton/AsyncButton.vue";
import BaseIcon from "@/shared/ui/Icon/BaseIcon.vue";

interface IBoardCard {
  card: ICard;
}

defineProps<IBoardCard>();
</script>

<style scoped lang="scss"></style>

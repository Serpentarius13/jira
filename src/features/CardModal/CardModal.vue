<template>
  <div
    class="p-[3rem] flex flex-col gap-[2rem] rounded-smallest bg-white relative min-w-[38rem] max-w-[95vw] min-h-[38.8rem]"
  >
    <header class="flex flex-col gap-[0.4rem]">
      <h3 class="text-big font-bold">{{ title ?? "Добавление" }}</h3>
      <h5 class="text-small text-medium-gray">{{ stage?.name ?? "xx" }}</h5>
    </header>

    <CardForm
      :is-from-modal="true"
      :default-values="card"
      :stage="stage?.code"
      :callback="callback"
    />

    <button
      class="absolute right-[3.1rem] top-[3.3rem] opacity-70 hover:opacity-100"
      @click="store.closeModal"
    >
      <BaseIcon name="cross" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ICard, IStage } from "@/shared/types/cards.types";

import CardForm from "../CardForm/CardForm.vue";
import BaseIcon from "@/shared/ui/Icon/BaseIcon.vue";
import useModalStore from "@/shared/stores/useModalStore";
interface ICardModal {
  card?: ICard;
  callback: (card: ICard) => any;
  stage?: IStage;
  title: string;
}

defineProps<ICardModal>();

const store = useModalStore();
</script>

<style scoped lang="scss"></style>

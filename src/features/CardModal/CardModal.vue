<template>
  <div
    class="p-[3rem] flex flex-col gap-[2rem] rounded-smallest bg-white relative"
  >
    <header class="flex flex-col gap-[0.4rem]">
      <h3 class="text-medium">Добавление</h3>
      <h5 class="text-small text-medium-gray">Стадия 1</h5>

      <CardForm :is-from-modal="true" :default-values="card" />
    </header>

    <button
      class="absolute right-[3.1rem] top-[3.3rem] opacity-70 hover:opacity-100"
      @click="store.closeModal"
    >
      <BaseIcon name="cross" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ICard } from "@/shared/types/cards.types";

import CardForm from "../CardForm/CardForm.vue";
import BaseIcon from "@/shared/ui/Icon/BaseIcon.vue";
import useModalStore from "@/shared/stores/useModalStore";
interface ICardModal {
  card?: ICard;
}

defineProps<ICardModal>();

const store = useModalStore();
</script>

<style scoped lang="scss"></style>

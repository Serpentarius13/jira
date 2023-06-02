<template>
  <section
    class="bg-white p-[3rem] rounded-smallest flex flex-col gap-[2rem] w-full min-h-[45.9rem]"
  >
    <header>
      <h2 class="pb-[0.4rem] text-big font-bold">Основные данные</h2>

      <h3 class="text-smallest text-gray">
        Чтобы добавить карточку, нужно заполнить данные
      </h3>
    </header>

    <CardForm :is-from-modal="false"  :callback="store.addCard" />
  </section>
</template>

<script setup lang="ts">
import CardForm from "@/features/CardForm/CardForm.vue";
import { useBoardStore } from "../Board/model/useBoardStore";

const store = useBoardStore();
</script>

<style scoped lang="scss"></style>

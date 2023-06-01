<template>
  <main class="container">
    <section class="grid grid-cols-4 gap-[2rem]">
      <BoardColumn v-for="stage in store.stagesGetter" :key="stage" :stage="stage" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useBoardStore } from "../model/useBoardStore";
import BoardColumn from "./BoardColumn/BoardColumn.vue";

const store = useBoardStore();

onMounted(() => {
  store.initializeStore();
});
</script>

<style scoped lang="scss"></style>

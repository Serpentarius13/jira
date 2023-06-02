<template>
  <main class="container min-h-[66rem]" v-if="store.isInitialized">
    <BoardHeader class="pb-[2rem]" />
    <section class="grid grid-cols-4 gap-[2rem] items-start">
      <BoardColumn
        v-for="(_, stage) in boardStructure"
        :key="stage"
        :stage="stage"
      />
    </section>
  </main>

  <LoadingScreen v-else />
</template>

<script setup lang="ts">
import { useBoardStore } from "../model/useBoardStore";
import BoardColumn from "./BoardColumn/BoardColumn.vue";
import { storeToRefs } from "pinia";
import BoardHeader from "./BoardHeader/BoardHeader.vue";
import LoadingScreen from "@/widgets/LoadingScreen/LoadingScreen.vue";

const store = useBoardStore();

const { boardStructure } = storeToRefs(store);
</script>

<style scoped lang="scss"></style>

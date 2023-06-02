<template>
  <section v-if="store.isInitialized">
    <BoardHeader class="pb-[2rem]" />
    <section class="griddy gap-[2rem] items-start">
      <BoardColumn
        v-for="(_, stage) in boardStructure"
        :key="stage"
        :stage="stage"
      />
    </section>
  </section>

  <BaseLoadingScreen v-else />
</template>

<script setup lang="ts">
import { useBoardStore } from "../model/useBoardStore";
import BoardColumn from "./BoardColumn/BoardColumn.vue";
import { storeToRefs } from "pinia";
import BoardHeader from "./BoardHeader/BoardHeader.vue";
import BaseLoadingScreen from "@/shared/ui/Loading/BaseLoadingScreen.vue";

const store = useBoardStore();

const { boardStructure } = storeToRefs(store);
</script>

<style scoped lang="scss">
.griddy {
  @apply grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
}
</style>

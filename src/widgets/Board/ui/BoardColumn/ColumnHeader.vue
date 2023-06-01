<template>
  <header class="w-full flex justify-between items-center">
    <div class="flex items-center gap-[0.8rem]">
      <div class="w-[4px] aspect-square rounded-full bg-gray" />

      <h2 class="text-medium">
        {{ stage }}
      </h2>
    </div>

    <div class="flex sorting">
      <button @click="emit('sortDesc')">
        <BaseIcon name="arrow-down" />
      </button>

      <button @click="emit('sortAsc')">
        <BaseIcon name="arrow-down" class="rotate-180" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { IStage } from "@/shared/types/cards.types";
import BaseIcon from "@/shared/ui/Icon/BaseIcon.vue";

defineProps<{ stage: IStage["name"] }>();

const emit = defineEmits<{ sortAsc: []; sortDesc: [] }>();
</script>

<style scoped lang="scss">
.sorting {
  button {
    @apply w-[1.8rem] aspect-square opacity-70 hover:opacity-100;
  }
}
</style>

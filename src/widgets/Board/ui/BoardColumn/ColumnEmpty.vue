<template>
  <div
    class="w-full min-h-[12rem] bg-transparent grid place-items-center rounded-smallest border-dashed border-bgray border-[1px] opacity-80 hover:opacity-100"
  >
    <strong class="text-smaller text-gray">
      {{ text ?? "Список пуст" }}
    </strong>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text?: string }>();
</script>

<style scoped lang="scss"></style>

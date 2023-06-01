<template>
  <label class="flex flex-col gap-[0.4rem] w-full">
    <span class="text-smallest text-medium-gray">
      {{ label }}
    </span>

    <slot />
  </label>
</template>

<script setup lang="ts">
interface ILabelProps {
  label?: string;
}

defineProps<ILabelProps>();
</script>

<style scoped lang="scss"></style>

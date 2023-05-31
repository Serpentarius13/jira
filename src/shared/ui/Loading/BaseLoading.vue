<template>
  <ClientOnly>
    <span
      class="rotated block aspect-square rounded-[50%] border-black border-transparent border-b-red"
      :style="{ width: `${size}px`, borderWidth: `${Math.round(+size / 8)}px` }"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number | string;
    duration?: number | string;
  }>(),
  { duration: 1000, size: "24" }
);
</script>

<style scoped lang="scss">
.rotated {
  --duration: v-bind(props.duration);
  animation: rotate linear infinite;
  animation-duration: calc(var(--duration) * 1ms);
}

@keyframes rotate {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>

<template>
  <button
    :disabled="isLoading"
    class="disabled:opacity-50 disabled:cursor-default"
    @click="handleClick"
  >
    <slot v-if="!isLoading" />

    <BaseLoading v-else />
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseLoading from "../Loading/BaseLoading.vue";

interface IAsyncButton {
  onClick: () => Promise<any>;
  onSuccess?: () => any;
  onError?: () => any;
}

const { onClick, onSuccess, onError } = defineProps<IAsyncButton>();

const isLoading = ref<boolean>(false);

const load = () => (isLoading.value = true);
const unload = () => (isLoading.value = false);

async function handleClick() {
  try {
    load();
    await onClick();
    onSuccess?.();
  } catch (error) {
    onError?.();
  } finally {
    unload();
  }
}
</script>

<style scoped lang="scss"></style>

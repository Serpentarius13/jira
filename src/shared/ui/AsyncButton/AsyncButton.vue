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
import BaseLoading from "../Loading/BaseLoading.vue";
import { useLoading } from "@/shared/utils/hooks/useLoading";

interface IAsyncButton {
  onClick: () => Promise<any> | any;
  onSuccess?: () => any;
  onError?: () => any;
}

const { onClick, onSuccess, onError } = defineProps<IAsyncButton>();

const { isLoading, handleClick } = useLoading(onClick, onSuccess, onError);
</script>

<style scoped lang="scss"></style>

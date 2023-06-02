<template>
  <BaseButton
    @click="handleClick"
    :class="[
      isLoading && '!bg-green-400 child:!border-b-blue-600 !text-blue-600',
      'flex items-center gap-[1.4rem]',
    ]"
    :disabled="isLoading"
  >
    <BaseLoading size="18" v-if="isLoading" />
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from "../Button/BaseButton.vue";

import BaseLoading from "../Loading/BaseLoading.vue";
import { useLoading } from "@/shared/utils/hooks/useLoading";

interface ILoadingButton {
  onClick: () => Promise<any> | any;
  onSuccess?: () => any;
  onError?: () => any;
}

const { onClick, onSuccess, onError } = defineProps<ILoadingButton>();

const { isLoading, handleClick } = useLoading(onClick, onSuccess, onError);
</script>

<style scoped lang="scss"></style>

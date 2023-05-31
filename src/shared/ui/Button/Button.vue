<template>
  <button :class="buttonVariants({ size, variant })">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./buttonVariants";

interface IButton extends VariantProps<typeof buttonVariants> {}

defineProps<IButton>();
</script>

<style scoped lang="scss"></style>

<template>
  <RouterLink
    :class="['btn', ButtonVariants[variant], ButtonSizes[size]]"
    v-if="link"
    :to="link.to"
  >
  </RouterLink>

  <button
    :class="['btn', ButtonVariants[variant], ButtonSizes[size]]"
    type="button"
    v-else
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ButtonSizes, ButtonVariants } from "./buttonThemes";

withDefaults(
  defineProps<{
    link?: { to: string };
    size?: ButtonSizes;
    variant?: ButtonVariants;
  }>(),
  { size: ButtonSizes.small, variant: ButtonVariants.filled }
);
</script>

<style scoped lang="scss">
.btn {
  @apply transition-all focus:ring-2 ring-black w-fit border-[1px] border-solid;

  // Variants
  &.filled {
    @apply bg-lightblue text-white hover:bg-white hover:text-gray border-lightblue;
  }
  &.outline {
    @apply bg-transparent  text-gray border-transparent hover:text-white hover:bg-lightblue;
  }

  // Sizes
  &.small {
    @apply text-smaller rounded-smallest py-[0.8rem] px-[2rem];
  }
}
</style>

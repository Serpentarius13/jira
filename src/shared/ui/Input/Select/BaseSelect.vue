<template>
  <div
    class="relative inline-block text-left w-full"
    @keyup.down.stop.passive.capture="handleGoDown"
    @keyup.up.stop.passive.capture="handleGoUp"
    ref="selectRef"
    v-click-away="closeSelect"
  >
    <button
      type="button"
      :class="[
        'flex items-center w-full justify-between gap-[0.8rem] rounded-smallest  px-[1.6rem] py-[0.8rem] text-[1.3rem] ',
      ]"
      :aria-expanded="isSelectOpened"
      aria-haspopup="true"
      @click="toggleSelect"
    >
      <slot name="button" :currentOption="{ currentOption }" />

      <BaseIcon
        name="chevron-down"
        :class="[' transition-all', isSelectOpened && 'rotate-180']"
      />
    </button>

    <Transition name="menu">
      <ul
        class="w-full max-h-[20vh] overflow-auto absolute left-0 z-10 mt-2 origin-top-right rounded-md border-[1px] border-black bg-white shadow-lg ring-white ring-opacity-5 focus:ring-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
        v-if="isSelectOpened"
      >
        <slot :options="{ options, selectOption }" name="options" />
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
import { onMounted, onUnmounted, ref } from "vue";
import BaseIcon from "../../Icon/BaseIcon.vue";

interface ISelectProps<T> {
  placeholder?: string;
  options: T[];
  currentOption: T;
}

//@ts-expect-error
const props = defineProps<ISelectProps<T>>();
const emit = defineEmits<{ select: [option: string] }>();

const isSelectOpened = ref<boolean>(false);
const selectRef = ref<HTMLDivElement | null>(null);



function selectOption(option: string) {
  emit("select", option);
  closeSelect();
}

function toggleSelect() {
  isSelectOpened.value = !isSelectOpened.value;
}

function closeSelect() {
  isSelectOpened.value = false;
}

function handleGoDown() {
  const currentOptionIndex = props.options.findIndex(
    (el) => el === props.currentOption
  );

  if (currentOptionIndex + 1 >= props.options.length) {
    emit("select", props.options[0]);
  } else {
    emit("select", props.options[currentOptionIndex + 1]);
  }
}

function keydownHandler(event: KeyboardEvent) {
  if (
    selectRef.value == document.activeElement ||
    selectRef.value?.contains(document.activeElement)
  ) {
    event.preventDefault();
  }
}

onMounted(() => {
  document.addEventListener("keydown", keydownHandler);
});

onUnmounted(() => {
  document.removeEventListener("keydown", keydownHandler);
});

function handleGoUp() {
  const currentOptionIndex = props.options.findIndex(
    (el) => el === props.currentOption
  );

  if (currentOptionIndex - 1 <= 0) {
    emit("select", props.options.at(-1) as string);
  } else {
    emit("select", props.options[currentOptionIndex - 1]);
  }
}
</script>

<style scoped lang="scss">
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition: 0.25s ease all;
}
</style>

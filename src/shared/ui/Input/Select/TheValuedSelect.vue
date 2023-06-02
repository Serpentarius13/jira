<template>
  <BaseSelect
    :options="options.map((o) => o.name)"
    :current-option="name"
    @select="(v) => (model = v)"
  >
    <template #button>
      {{ name || placeholder }}
    </template>

    <template #options="{ options: { selectOption } }">
      <li v-for="o in options" :key="o.value" class="w-full">
        <button
          class="w-full text-small p-[0.8rem] hover:bg-lightblue text-left"
          @click="
            () => {
              selectOption(o.value);
              name = o.name;
            }
          "
          type="button"
        >
          {{ o.name }}
        </button>
      </li>
    </template>
  </BaseSelect>
</template>

<script setup lang="ts">
import { IValuedSelect } from "@/shared/types/shared.types";
import BaseSelect from "./BaseSelect.vue";
import { ref } from "vue";

defineProps<IValuedSelect & { placeholder?: string }>();

const name = ref<string>("");

const model = defineModel<string>({ required: true });
</script>

<style scoped lang="scss"></style>

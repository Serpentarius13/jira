<template>
  <InputLabel label="Проект:">
    <TheValuedSelect
      :options="valuedProjects"
      placeholder="Не выбрано"
      v-model="model"
    />
  </InputLabel>
</template>

<script setup lang="ts">
import { IValuedSelect } from "@/shared/types/shared.types";
import TheValuedSelect from "@/shared/ui/Input/Select/TheValuedSelect.vue";
import InputLabel from "@/shared/ui/Input/Label/InputLabel.vue";
import { useBoardStore } from "@/widgets/Board/model/useBoardStore";
import { computed } from "vue";

const props = defineProps<{ hasShutdown?: boolean }>();

const store = useBoardStore();

const model = defineModel<string>({ required: true });

const valuedProjects = computed<IValuedSelect["options"]>(() => {
  let arr: IValuedSelect["options"] = [];
  if (props.hasShutdown) arr = [{ name: "Не выбрано", value: null }];

  return store.data.projects
    .map((p) => ({ value: p.code, name: p.name }))
    .concat(arr);
});
</script>

<style scoped lang="scss"></style>

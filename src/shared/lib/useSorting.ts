import { computed, ref } from "vue";

export function useSorting<
  T extends Record<string | number | symbol, number | string>
>(data: T[], defaultSort?: keyof T) {
  const sortConfig = ref<{
    key: string | number | symbol;
    descending?: boolean;
  } | null>(null);

  function sortBy(key?: keyof T, descending: boolean = false): void {
    key = key ?? defaultSort ?? Object.keys(data[0])[0];
    sortConfig.value = { key, descending };
  }

  const sortedData = computed<T[]>(() => {
    const config = sortConfig.value;
    if (!config) {
      return data;
    }

    const { key, descending } = config;
    const sorted = data.slice().sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA === valueB) {
        return 0;
      }

      return descending ? (valueA > valueB ? -1 : 1) : valueA > valueB ? 1 : -1;
    });

    return sorted;
  });

  return { sortedData, sortBy };
}

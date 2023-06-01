import { Ref, computed, ref } from "vue";

interface ISortConfig<T> {
  key: keyof T;
  descending?: boolean;
}

export function useSorting<T extends Record<any, any>>(
  data: T[],
  defaultSort?: keyof T,
  defaultConfig?: ISortConfig<T>
): { sortedData: Ref<T[]>; sortBy: typeof sortBy; sortOrder: "desc" | "asc" } {
  const sortConfig = ref<ISortConfig<T> | null>(
    defaultConfig ?? defaultSort ? { key: defaultSort as any } : null
  );

  function sortBy(key?: keyof T, descending: boolean = false): void {
    key = key ?? defaultSort ?? Object.keys(data[0])[0];
    sortConfig.value = { key: key as any, descending };
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

  return {
    sortedData,
    sortBy,
    sortOrder: sortConfig.value?.descending ? "desc" : "asc",
  };
}

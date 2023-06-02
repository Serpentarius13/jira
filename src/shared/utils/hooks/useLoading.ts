import { ref } from "vue";

export function useLoading(
  onClick: () => Promise<any>,
  onSuccess?: () => any,
  onError?: () => any
) {
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

  return { isLoading, handleClick };
}

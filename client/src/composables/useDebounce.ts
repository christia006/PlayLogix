import { ref } from "vue";

export function useDebounce(
  callback: (value: string) => void,
  delay = 500
) {
  const timeout = ref<number | null>(null);

  function handleSearch(value: string) {
    if (timeout.value) clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      callback(value);
    }, delay);
  }

  return {
    handleSearch,
  };
}


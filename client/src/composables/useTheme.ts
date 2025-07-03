import { storeToRefs } from "pinia";
import { useThemeStore } from "src/stores/themeStore";

export default function useTheme() {
  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const { setTheme } = useThemeStore();

  return {
    theme,
    setTheme,
  };
}

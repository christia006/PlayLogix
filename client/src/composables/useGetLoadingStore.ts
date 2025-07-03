import { storeToRefs } from "pinia";
import { useLoadingStore } from "src/stores/loadingStore";

export default function useGetLoadingStore() {
  const loadingStore = useLoadingStore();
  const { loading } = storeToRefs(loadingStore);
  const { setLoading } = useLoadingStore();

  return { loading, setLoading };
}

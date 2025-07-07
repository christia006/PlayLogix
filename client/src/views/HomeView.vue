<template>
  <LoadingSpinner v-if="loading" />
  <AllGames v-else :games="games" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getAllGames } from "src/api/games";
import { GameType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import AllGames from "src/components/ui/game/AllGames.vue";
import LoadingSpinner from "src/components/ui/others/LoadingSpinner.vue";
import useGetLoadingStore from "src/composables/useGetLoadingStore";

const games = ref<GameType[]>([]);
const { loading, setLoading } = useGetLoadingStore();

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { data, message } = await getAllGames();
    if (message) {
      showToast(message, "error");
    } else {
      games.value = data;
    }
  } catch (error) {
    console.error("Unexpected erorr occured");
    showToast("Unexpected error occured", "error");
  } finally {
    setLoading(false);
  }
});
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <MyReviews :reviews="myReviews" v-else />
</template>

<script setup lang="ts">
import LoadingSpinner from "src/components/ui/others/LoadingSpinner.vue";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import MyReviews from "src/components/ui/review/MyReviews.vue";
import useGetUserStore from "src/composables/useGetUserStore";
import { getUserReviews } from "src/api/users";

import { onBeforeMount, ref } from "vue";
import { MyReviewType } from "src/utils/types";
import { showToast } from "src/utils/toast";

const myReviews = ref<MyReviewType[]>([]);

const { loading, setLoading } = useGetLoadingStore();
const { user } = useGetUserStore();

onBeforeMount(async () => {
  try {
    setLoading(true);
    if (user.value.id) {
      const { data, message } = await getUserReviews(user.value.id);
      if (data) {
        myReviews.value = data;
      } else {
        showToast(message, "error");
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
});
</script>

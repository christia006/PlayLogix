<template>
  <LoadingSpinner v-if="loading" />
  <SingleGame
    v-else
    :single-game="singleGame"
    @create-review-event="createHandler"
  />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getSingleGame } from "src/api/games";
import { onBeforeMount, ref, provide } from "vue";
import { GameType, NewReviewResponseType, ReviewType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import SingleGame from "src/components/ui/game/SingleGame.vue";
import LoadingSpinner from "src/components/ui/others/LoadingSpinner.vue";

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { message, data } = await getSingleGame(Number(route.params.id));

    if (message) {
      showToast(message, "error");
    } else {
      singleGame.value = data;
    }
  } catch (error) {
    showToast("Unexpected error occured", "error");
    console.error(error);
  } finally {
    setLoading(false);
  }
});

const { loading, setLoading } = useGetLoadingStore();

const route = useRoute();

const singleGame = ref<GameType>({} as GameType);

const createHandler = (response: NewReviewResponseType) => {
  singleGame.value.reviews.push(response.review);
  singleGame.value.rating = Number(response.avgRating);
};

const deleteHandler = (reviewId: number, avgRating: string) => {
  const index = singleGame.value.reviews.findIndex(
    (review) => review.id === reviewId
  );
  if (index !== -1) {
    singleGame.value.reviews.splice(index, 1);
    singleGame.value.rating = Number(avgRating);
  }
};

const editHandler = (
  reviewId: number,
  updatedReview: ReviewType,
  avgRating: number
) => {
  const index = singleGame.value.reviews.findIndex(
    (review) => review.id === reviewId
  );
  if (index !== -1) {
    singleGame.value.reviews[index] = {
      ...singleGame.value.reviews[index],
      ...updatedReview,
    };
    singleGame.value.rating = Number(avgRating);
  }
};

provide("editReview", editHandler);
provide("deleteReview", deleteHandler);
</script>

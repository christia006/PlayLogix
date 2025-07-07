<template>
  <FormReview
    v-if="userReview?.id"
    :name="name"
    :user-id="userReview.user.id"
    @close-modal-event="emits('close-modal-event')"
  >
    <ExistingReview
      :review="userReview"
      @edit-event="emits('close-modal-event')"
      @delete-event="emits('delete-event')"
    />
  </FormReview>

  <FormReview
    v-else
    :name="name"
    @close-modal-event="emits('close-modal-event')"
    @submit.prevent="submitNewReviewHandler"
  >
    <CreateReview
      :all-fields-completed="allFieldsCompleted"
      :stars-array="starsArray"
      @click-event="ratingClickHandler"
      @mouse-enter-event="mouseEnterHandler"
      @mouse-leave-event="mouseLeaveHandler"
      v-model:content="gameReview.content"
      v-model:rating="gameReview.rating"
    />
  </FormReview>
</template>

<script setup lang="ts">
import useGetUserStore from "src/composables/useGetUserStore";
import ExistingReview from "src/components/ui/review/ExistingReview.vue";
import CreateReview from "src/components/ui/review/CreateReview.vue";
import FormReview from "src/components/form/FormReview.vue";
import { ref, computed, PropType } from "vue";
import { emptyStarsArray, guestMessage } from "src/utils/constants";
import { fillStars } from "src/utils/helpers";
import { GameReviewType, ReviewType } from "src/utils/types";
import { gameReviewSchema } from "src/schemas/gameReview";
import { createReview } from "src/api/reviews";
import { showToast } from "src/utils/toast";
import { useRouter } from "vue-router";

const props = defineProps({
  content: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
  userReview: {
    type: Object as PropType<ReviewType | undefined>,
    required: true,
  },
});
const router = useRouter()

const { user } = useGetUserStore();

const starsArray = ref<string[]>(
  props.userReview?.rating
    ? fillStars(props.userReview.rating - 1)
    : [...emptyStarsArray]
);

const gameReview = ref<GameReviewType>({
  rating: props.userReview?.rating ?? null,
  content: props.userReview?.content ?? "",
});

const allFieldsCompleted = computed(() => {
  return gameReviewSchema.safeParse(gameReview.value).success;
});

const emits = defineEmits([
  "close-modal-event",
  "submit-event",
  "delete-event",
]);

const ratingClickHandler = (rating: number) => {
  starsArray.value = fillStars(rating);
  gameReview.value.rating = rating + 1;
};

const mouseEnterHandler = (rating: number) => {
  starsArray.value = fillStars(rating);
};

const mouseLeaveHandler = () => {
  if (!gameReview.value.rating) {
    starsArray.value = [...emptyStarsArray];
  } else {
    starsArray.value = fillStars(gameReview.value.rating - 1);
  }
};

const submitNewReviewHandler = async () => {
  try {
    if (user.value.id) {
      const review = {
        userId: user.value.id,
        gameId: props.gameId,
        rating: gameReview.value.rating,
        content: gameReview.value.content,
      };
      const { data, message } = await createReview(review as ReviewType);
      if (data) {
        emits("submit-event", data);
        showToast("Review successfully created");
      } else {
        showToast(message, "error");
        emits("close-modal-event");
      }
    } else {
      router.push('/login')
      setTimeout(() => {
        showToast(guestMessage, "error");
      }, 500);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

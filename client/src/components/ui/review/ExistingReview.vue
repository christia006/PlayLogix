<template>
  <EditReview
    v-if="isEditing"
    :content="review.content"
    :rating="review.rating"
    :reviewId="review.id"
    @mouse-enter-event="mouseEnterEvent"
    @mouse-leave-event="mouseLeaveEvent"
    @click-event="clickEvent"
    @cancel-event="isEditing = false"
    @edit-event="emits('edit-event')"
  />

  <PreviewReview
    v-else
    @edit-event="isEditing = true"
    @delete-event="isDeleteOpen = true"
    :rating="review.rating"
    :content="review.content"
    :created-at="review.createdAt"
  />
  <DeleteModal
    :is-delete-open="isDeleteOpen"
    @delete-event="deleteReviewHandler"
    @close-modal-event="isDeleteOpen = false"
  />
</template>

<script setup lang="ts">
import PreviewReview from "src/components/ui/review/PreviewReview.vue";
import EditReview from "src/components/ui/review/EditReview.vue";
import DeleteModal from "src/components/ui/others/DeleteModal.vue";
import { deleteReview } from "src/api/reviews";
import { showToast } from "src/utils/toast";
import { ReviewType } from "src/utils/types";
import { PropType, ref, inject } from "vue";
import { fillStars } from "src/utils/helpers";

const isEditing = ref<boolean>(false);

const isDeleteOpen = ref<boolean>(false);

const props = defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
});

const { review } = props;

const emits = defineEmits(["delete-event", "edit-event"]);

const deleteReviewUI =
  inject<(reviewId: number, avgRating: string) => void>("deleteReview");

const editingStarsArray = ref(fillStars((props.review.rating ?? 0) - 1));
const editRating = ref<number>(props.review.rating ?? 0);

const mouseEnterEvent = (rating: number) => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(rating);
  }
};

const mouseLeaveEvent = () => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(editRating.value - 1);
  }
};
const clickEvent = (rating: number) => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(rating);
    editRating.value = rating + 1;
  }
};

const deleteReviewHandler = async () => {
  try {
    const { data, message } = await deleteReview(review.id as number);
    if (data) {
      if (deleteReviewUI) {
        deleteReviewUI(review.id as number, data.avgRating);
      }
      showToast("Review deleted");
      emits("delete-event");
      isDeleteOpen.value = false;
    } else {
      showToast(message, "error");
    }
  } catch (error) {
    console.error(error);
    showToast("Unexpected error occured", "error");
  }
};
</script>

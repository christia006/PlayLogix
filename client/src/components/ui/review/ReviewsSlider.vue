<template>
  <article
    class="relative px-4 flex flex-col justify-between overflow-x-hidden h-[320px] sm:h-[330px]"
  >
    <SubtitleComponent justify="center"> Reviews </SubtitleComponent>
    <ReviewComponent
      v-for="(review, index) in props.reviews"
      :key="review.id"
      :review="review"
      :style="{ transform: translateElement(index, selectedReviewIndex) }"
    />
    <LeaveReview
      @open-modal-event="emits('open-modal-event')"
      :user-review="userReview"
    />
    <SliderButton class="-left-0 sm:-left-0" @click="emits('previous-review-event')">
      <template #icon>
        <BaseIcon>
          <LeftIcon />
        </BaseIcon>
      </template>
    </SliderButton>

    <SliderButton class="-right-0 sm:right-0" @click="emits('next-review-event')">
      <template #icon>
        <BaseIcon>
          <RightIcon />
        </BaseIcon>
      </template>
    </SliderButton>
  </article>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import LeftIcon from "src/icons/LeftIcon.vue";
import RightIcon from "src/icons/RightIcon.vue";
import SliderButton from "src/components/ui/buttons/SliderButton.vue";
import ReviewComponent from "src/components/ui/review/ReviewComponent.vue";
import LeaveReview from "src/components/ui/review/LeaveReview.vue";
import SubtitleComponent from "src/components/ui/others/SubtitleComponent.vue";
import { PropType } from "vue";
import { ReviewType } from "src/utils/types";
import { translateElement } from "src/utils/helpers";

const props = defineProps({
  reviews: {
    type: Array as PropType<ReviewType[]>,
    required: true,
  },
  selectedReviewIndex: {
    type: Number,
    required: true,
  },
  userReview: {
    type: Object as PropType<ReviewType | undefined>,
    required: false,
  },
});

const emits = defineEmits([
  "open-modal-event",
  "next-review-event",
  "previous-review-event",
]);
</script>

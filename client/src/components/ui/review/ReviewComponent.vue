<template>
  <div
    class="flex flex-col sm:pl-12 pl-6 gap-2 absolute top-10 right-1/2 translate-x-1/2 w-full transition-all duration-300"
  >
    <div class="flex items-end gap-2">
      <fieldset class="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]">
        <img :src="renderUserImage(props.review.user.image)" class="h-full w-full object-cover rounded-xl" />
      </fieldset>
      <h2>{{ props.review.user.fullName }}</h2>
      <p class="text-sm sm:text-base">Joined on {{ formattedDate(props.review.user.createdDate) }}</p>
    </div>

    <div class="flex items-center gap-2">
      <div class="flex items-center">
        <v-icon
          v-for="(star, index) in createStarsArray(props.review.rating as number)"
          :key="index"
          animation="pulse"
          :fill="theme === 'light' ? 'blue' : 'red'"
          :name="
            star === 'full'
              ? 'bi-star-fill'
              : star === 'half'
              ? 'bi-star-half'
              : 'bi-star'
          "
        />
      </div>
      <p class="text-sm sm:text-base">
        <span class="font-semibold"> {{ props.review.rating }}/10 </span>
        - Reviewed on {{ formattedDate(props.review.createdAt as string) }}
      </p>
    </div>
    <p class="pl-3 pr-3 sm:pr-0 sm:pl-2 w-[90%] text-justify text-sm sm:text-base">{{ props.review.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { ReviewType } from "src/utils/types";
import { PropType } from "vue";
import { formattedDate, renderUserImage } from "src/utils/helpers";
import useTheme from "src/composables/useTheme";

const props = defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
});

const { theme } = useTheme();

const createStarsArray = (rating: number) => {
  const starsArray = [];
  const scaledRating = (rating / 10) * 5;
  let remainingRating = scaledRating;
  for (let i = 0; i < 5; i++) {
    if (remainingRating >= 1) {
      starsArray.push("full");
    } else if (remainingRating >= 0.5) {
      starsArray.push("half");
    } else {
      starsArray.push("empty");
    }
    remainingRating--;
  }
  return starsArray;
};
</script>

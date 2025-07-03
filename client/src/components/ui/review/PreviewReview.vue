<template>
  <MainRatingStar :rating="props.rating" />
  <RatingStars :stars-array="starsArray" :cursor-pointer="false" />
  <p class="text-justify border p-4 rounded-xl w-full">{{ content }}</p>
  <p class="pl-4 self-start text-sm ">
    Reviewed on {{ formattedDate(createdAt as string) }}
  </p>

  <div class="flex w-full justify-between">
    <ActionButton color="green" @click="emits('edit-event')"
      >Edit Review</ActionButton
    >
    <ActionButton @click="emits('delete-event')">Delete Review</ActionButton>
  </div>
</template>

<script setup lang="ts">
import RatingStars from "src/components/ui/review/RatingStars.vue";
import MainRatingStar from "src/components/ui/review/MainRatingStar.vue";
import ActionButton from "src/components/ui/buttons/ActionButton.vue";
import { fillStars, formattedDate } from "src/utils/helpers";
import { computed } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
  rating: {
    type: [Number, null],
    required: true,
  },
});

const emits = defineEmits(["edit-event", "delete-event"]);

const starsArray = computed(() => fillStars((props.rating ?? 0) - 1));
</script>

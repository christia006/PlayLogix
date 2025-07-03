<template>
  <MainRatingStar :rating="rating" />
  <RatingStars
    :stars-array="starsArray"
    @mouse-enter-event="mouseEnterEvent"
    @mouse-leave-event="mouseLeaveEvent"
    @click-event="clickEvent"
  />
  <FormTextarea v-model="content" />
  <ActionButton type="submit" class="self-end" :disabled="!allFieldsCompleted">
    SEND REVIEW
  </ActionButton>
</template>

<script setup lang="ts">
import RatingStars from "src/components/ui/review/RatingStars.vue";
import FormTextarea from "src/components/form/FormTextarea.vue";
import ActionButton from "src/components/ui/buttons/ActionButton.vue";
import MainRatingStar from "src/components/ui/review/MainRatingStar.vue";
import { PropType, computed } from "vue";

const props = defineProps({
  allFieldsCompleted: {
    type: Boolean,
    required: true,
  },
  starsArray: {
    type: Array as PropType<String[]>,
    required: true,
  },
  rating: {
    type: [Number, null],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const content = computed({
  get: () => props.content,
  set: (value) => emits("update:content", value),
});

const rating = computed({
  get: () => props.rating,
  set: (value) => emits("update:rating", value),
});

const emits = defineEmits([
  "mouse-leave-event",
  "mouse-enter-event",
  "click-event",
  "update:content",
  "update:rating",
]);

const clickEvent = (index: number) => {
  emits("click-event", index);
};
const mouseEnterEvent = (index: number) => {
  emits("mouse-enter-event", index);
};
const mouseLeaveEvent = () => {
  emits("mouse-leave-event");
};
</script>

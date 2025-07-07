<template>
  <div
    class="border border-sky-500 dark:border-dark-dark-red flex gap-2 sm:gap-0 items-center justify-between px-2 py-2 sm:px-5 sm:py-3 sm:w-[90%] mx-auto rounded-xl"
  >
    <p class="text-sm sm:text-lg">Want to {{ hasReview }} review ?</p>
    <ActionButton @click="emits('open-modal-event')"> Click here </ActionButton>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "src/components/ui/buttons/ActionButton.vue";
import { ReviewType } from "src/utils/types";
import { PropType, computed } from "vue";

const emits = defineEmits(["open-modal-event"]);

const props = defineProps({
  userReview: {
    type: Object as PropType<ReviewType | undefined>,
    required: false,
  },
});

const hasReview = computed(() => {
  return props.userReview?.id ? "edit your " : "leave a ";
});
</script>

<template>
  <div class="flex items-center justify-between mt-4 rounded-xl sm:w-full w-[90%] mx-auto">
    <p v-if="users > 0" class="text-sm sm:text-lg">
      Showing {{ showResultsFrom }} to {{ showResultsTo }} out of
      {{ props.users }}
    </p>
    <p v-else class="text-xs sm:text-base">No users found</p>
    <div class="flex gap-4">
      <ActionButton
        :disabled="props.currentPage === 1"
        @click="emits('previous-event')"
        >Previous</ActionButton
      >
      <ActionButton
        :disabled="!(props.currentPage < users / usersPerPage)"
        @click="emits('next-event')"
        >Next</ActionButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "src/components/ui/buttons/ActionButton.vue";
import { computed } from "vue";
import { usersPerPage } from "src/utils/constants";

const props = defineProps({
  users: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const showResultsFrom = computed(() => {
  return (props.currentPage - 1) * usersPerPage + 1;
});

const showResultsTo = computed(() => {
  const to = showResultsFrom.value + usersPerPage - 1;
  return to > props.users ? props.users : to;
});

const emits = defineEmits(["previous-event", "next-event"]);
</script>

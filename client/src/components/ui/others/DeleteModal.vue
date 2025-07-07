<template>
  <Teleport to="body" v-if="isDeleteOpen">
    <OverlayComponent>
      <ModalComponent
        class="bg-slate-200 dark:bg-slate-900 flex flex-col items-center pb-10 justify-end rounded-xl"
      >
        <BaseIcon
          :style="{ width: '5rem', height: '5rem' }"
          class="absolute top-[1%] right-1/2 translate-x-1/2"
        >
          <XCircle />
        </BaseIcon>
        <div
          class="flex flex-col gap-4 sm:gap-8 items-center pt-24 px-8 w-[350px]"
        >
          <h1 class="text-2xl sm:text-4xl text-justify">Are you sure ?</h1>
          <p class="text-base sm:text-lg">
            Do you really want to delete {{ content }}? This action cannot be
            undone
          </p>
          <div class="flex justify-between w-full">
            <ActionButton color="green" @click="emits('close-modal-event')"
              >Cancel</ActionButton
            >
            <ActionButton @click="emits('delete-event', user?.id)"
              >Confirm</ActionButton
            >
          </div>
        </div>
      </ModalComponent>
    </OverlayComponent>
  </Teleport>
</template>

<script setup lang="ts">
import OverlayComponent from "src/components/ui/others/OverlayComponent.vue";
import ModalComponent from "src/components/ui/others/ModalComponent.vue";
import ActionButton from "src/components/ui/buttons/ActionButton.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import XCircle from "src/icons/XCircle.vue";
import { PropType, computed } from "vue";
import { UserType } from "src/utils/types";

const props = defineProps({
  isDeleteOpen: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object as PropType<UserType | null>,
    required: false,
    default: null,
  },
});

const emits = defineEmits(["close-modal-event", "delete-event"]);

const content = computed(() => {
  return props.user?.fullName ?? "your review";
});
</script>

<template>
  <tr
    class="sm:grid flex flex-col gap-1 items-start sm:grid-cols-12 text-center sm:items-center border-b pb-2 relative"
  >
    <td
      data-cell="Full Name"
      class="before:content-[attr(data-cell)':_'] before:font-semibold sm:before:content-none col-start-1 col-end-3 flex sm:gap-4 gap-1 sm:h-[50px] items-center"
    >
      <img
        :src="renderUserImage(user.image)"
        :alt="user.image"
        class="sm:h-full w-[50px] rounded-xl object-cover sm:static absolute top-0 right-0 h-[50px]"
      />
      <p>{{ user.fullName }}</p>
    </td>
    <td
      data-cell="Email"
      class="before:content-[attr(data-cell)':_'] before:font-semibold sm:before:content-none col-start-3 col-end-6"
    >
      {{ user.email }}
    </td>
    <td
      data-cell="Created Date"
      class="before:content-[attr(data-cell)':_'] before:font-semibold sm:before:content-none col-start-6 col-end-8"
    >
      {{ formattedDate(user.createdDate) }}
    </td>
    <td
      data-cell="Role"
      class="before:content-[attr(data-cell)':'] sm:before:content-none col-start-8 col-end-10"
    >
      {{ user.role }}
    </td>
    <td
      data-cell="Active"
      class="col-start-10 col-end-11 before:content-[attr(data-cell)':_'] before:font-semibold sm:before:content-none"
    >
      <v-icon
        data-cell="Active"
        name="fc-checkmark"
        fill="green"
        v-if="user.active"
      />
      <v-icon name="io-close-sharp" fill="red" v-else />
    </td>
    <v-icon
      name="fa-edit"
      fill="green"
      class="absolute bottom-4 right-12 sm:static sm:col-start-11 sm:col-end-12 cursor-pointer sm:justify-self-center"
      @click="emits('edit-event', user)"
    />
    <v-icon
      name="fa-regular-trash-alt"
      fill="red"
      class="absolute bottom-4 right-4 sm:static sm:col-start-12 sm:col-end-13 cursor-pointer sm:justify-self-center"
      @click="emits('delete-event', user)"
    />
  </tr>
</template>

<script lang="ts" setup>
import { UserType } from "src/utils/types";
import { PropType } from "vue";
import { formattedDate, renderUserImage } from "src/utils/helpers";

defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
});

const emits = defineEmits(["delete-event", "edit-event"]);
</script>

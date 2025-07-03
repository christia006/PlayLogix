<template>
  <ul
    class="flex flex-col sm:gap-2 list-none bg-slate-300 dark:bg-slate-900 z-20 w-full rounded-b-xl text-xs sm:text-base first:rounded-t-none first:rounded-b-xl"
  >
    <NavigationLink
      v-if="user.role === 'ADMIN'"
      @click="emits('dashboard-event')"
    >
      <template #default>
        <v-icon name="md-dashboardcustomize" />
      </template>
      <template #text> Dashboard </template>
    </NavigationLink>

    <NavigationLink @click="emits('account-event')">
      <template #default>
        <v-icon name="md-accountbox" />
      </template>
      <template #text> Account </template>
    </NavigationLink>

    <NavigationLink @click="emits('my-reviews-event')">
      <template #default>
        <v-icon name="md-ratereview" />
      </template>
      <template #text> My reviews </template>
    </NavigationLink>

    <NavigationLink @click="emits('sign-out-event')" class="hover:rounded-b-xl">
      <template #default>
        <v-icon name="gi-exit-door" />
      </template>

      <template #text> Log out </template>
    </NavigationLink>
  </ul>
</template>

<script setup lang="ts">
import NavigationLink from "src/components/ui/navigation/NavigationLink.vue";
import useGetUserStore from "src/composables/useGetUserStore";

const emits = defineEmits([
  "sign-out-event",
  "toggle-theme-event",
  "my-reviews-event",
  "account-event",
  "dashboard-event",
]);

const { user } = useGetUserStore();
</script>

<template>
  <main class="max-w-[1280px] mx-auto mt-8 sm:mt-12">
    <UsersTable>
      <template #title>
        <SubtitleComponent> Dashboard </SubtitleComponent>
      </template>
      <template #header>
        <SearchHeader
          :sort="sort"
          :search="search"
          :users-obj="usersObj"
          @search-event="searchHandler"
          @sort-value-event="sortHandler"
        />
      </template>
      <template #head>
        <UserHeading />
      </template>

      <template #data>
        <UserData
          v-if="usersObj.users.length > 0"
          v-for="user in usersObj.users"
          :key="user.id"
          :user="user"
          @delete-event="openDeleteModalHandler"
          @edit-event="editUserHandler"
        />
        <NotFound v-else />
      </template>
    </UsersTable>

    <UserModal
      v-if="isUserModalOpen"
      :user="user"
      @close-modal-event="isUserModalOpen = false"
      @submit-event="submitHandler"
    />

    <DeleteModal
      :is-delete-open="isDeleteOpen"
      :user="user"
      @delete-event="deleteUserHandler"
      @close-modal-event="isDeleteOpen = false"
    />
    <PaginationComponent
      :users="usersObj.count"
      :current-page="page"
      @previous-event="emits('previous-event')"
      @next-event="emits('next-event')"
    />
  </main>
</template>

<script setup lang="ts">
import SubtitleComponent from "src/components/ui/others/SubtitleComponent.vue";
import UserData from "./UserData.vue";
import UsersTable from "src/components/ui/dashboard/UsersTable.vue";
import UserHeading from "src/components/ui/dashboard/UserHeading.vue";
import UserModal from "src/components/ui/dashboard/UserModal.vue";
import DeleteModal from "src/components/ui/others/DeleteModal.vue";
import NotFound from "src/components/ui/others/NotFound.vue";
import SearchHeader from "src/components/ui/dashboard/SearchHeader.vue";
import PaginationComponent from "src/components/ui/dashboard/PaginationComponent.vue";
import { UsersResponseType, UserType } from "src/utils/types";
import { PropType, ref } from "vue";
import { emptyUser } from "src/utils/constants";
import { deleteUser } from "src/api/users";
import { showToast } from "src/utils/toast";

defineProps({
  usersObj: {
    type: Object as PropType<UsersResponseType>,
    required: true,
  },
  sort: {
    type: String,
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
});

const isUserModalOpen = ref<boolean>(false);
const isDeleteOpen = ref<boolean>(false);
const user = ref<UserType>(emptyUser);

const emits = defineEmits([
  "edit-user-event",
  "delete-user-event",
  "sort-value-event",
  "search-event",
  "previous-event",
  "next-event",
]);

const deleteUserHandler = async (id: number) => {
  const response = await deleteUser(id);
  if (response?.ok) {
    emits("delete-user-event", id);
    showToast("User sucessfully deleted");
    isDeleteOpen.value = false;
  } else {
    const { message } = await response?.json();
    showToast(message, "error");
  }
};

const openDeleteModalHandler = (deleteUser: UserType) => {
  isDeleteOpen.value = true;
  user.value = deleteUser;
};

const editUserHandler = (selectedUser: UserType) => {
  isUserModalOpen.value = true;
  user.value = selectedUser;
};

const submitHandler = (updatedUser: UserType) => {
  emits("edit-user-event", updatedUser);
  isUserModalOpen.value = false;
};

const sortHandler = (value: string) => emits("sort-value-event", value);

const searchHandler = (value: string) =>
  emits("search-event", value.toLowerCase());
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <AdminDashboard
    v-else
    :users-obj="usersObj"
    :sort="paginationOptions.sort"
    :search="paginationOptions.search"
    :page="paginationOptions.currentPage"
    @edit-user-event="editUserHandler"
    @delete-user-event="deleteUserHandler"
    @sort-value-event="sortHandler"
    @search-event="searchHandler"
    @previous-event="previousPage"
    @next-event="nextPage"
  />
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { getUsers } from "src/api/users";
import { showToast } from "src/utils/toast";
import { useDebounce } from "src/composables/useDebounce";
import { UsersResponseType, UserType } from "src/utils/types";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import LoadingSpinner from "src/components/ui/others/LoadingSpinner.vue";
import AdminDashboard from "src/components/ui/dashboard/AdminDashboard.vue";
import { usersPerPage } from "src/utils/constants";
const { loading, setLoading } = useGetLoadingStore();

const { handleSearch } = useDebounce((value: string) => {
  paginationOptions.value.search = value;
  paginationOptions.value.currentPage = 1;
}, 500);

const usersObj = ref<UsersResponseType>({
  count: 0,
  users: [],
});

const paginationOptions = ref<{
  currentPage: number;
  sort: string;
  search: string;
}>({
  currentPage: 1,
  sort: "A-Z",
  search: "",
});

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { currentPage, sort, search } = paginationOptions.value;
    const { data, message } = await getUsers(currentPage, sort, search);
    if (data) {
      const { allUsers, count } = data;
      usersObj.value.users = allUsers;
      usersObj.value.count = count;
    } else {
      showToast(message, "error");
    }
  } catch (error) {
    showToast("Unable to fetch data", "error");
    console.error(error);
  } finally {
    setLoading(false);
  }
});

const editUserHandler = (editedUser: UserType) => {
  const index = usersObj.value.users.findIndex(
    (user) => user.id === editedUser.id
  );
  if (index !== -1) {
    usersObj.value.users[index] = editedUser;
  }
};

const deleteUserHandler = (id: number) => {
  const index = usersObj.value.users.findIndex((user) => user.id === id);
  if (index !== -1) {
    usersObj.value.users.splice(index, 1);
    usersObj.value.count -= 1;
  }
};

const sortHandler = (value: string) => {
  paginationOptions.value.sort = value;
  paginationOptions.value.currentPage = 1
};

const searchHandler = (value: string) => {
  handleSearch(value);
};

const previousPage = () => {
  if (paginationOptions.value.currentPage > 1) {
    paginationOptions.value.currentPage -= 1;
  }
};
const nextPage = () => {
  if (
    paginationOptions.value.currentPage <
    usersObj.value.count / usersPerPage
  ) {
    paginationOptions.value.currentPage += 1;
  }
};

watch(
  [() => paginationOptions.value.sort, () => paginationOptions.value.search, () => paginationOptions.value.currentPage],
  async ([newSort, newSearch, newPage]) => {
    try {
      const { data, message } = await getUsers(
        newPage,
        newSort,
        newSearch
      );
      if (data) {
        const { allUsers, count } = data;
        usersObj.value.users = allUsers;
        usersObj.value.count = count;
      } else {
        showToast(message, "error");
      }
    } catch (error) {
      console.error(error);
    }
  }
);
</script>

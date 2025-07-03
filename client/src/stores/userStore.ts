import { defineStore } from "pinia";
import { ref } from "vue";
import { UserType } from "src/utils/types";

const emptyUser: UserType = {
  id: 0,
  fullName: "",
  image: "",
  active:true,
  createdDate:"",
  role: "USER",
  email: "",
};


export const useUserStore = defineStore("userStore", () => {
  const user = ref<UserType>({ ...emptyUser });

  function setUser(newUser: UserType) {
    user.value = newUser;
  }

  function resetUser() {
    user.value = emptyUser
  }

  return {
    user,
    setUser,
    resetUser
  };
});

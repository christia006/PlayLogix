import {
  AccountSettingsType,
  LoginCredentialsType,
  SignUpCredentialsType,
  UserType,
} from "src/utils/types";
import { baseUrl } from "src/utils/constants";
import { showToast } from "src/utils/toast";

const fetchAuth = async <T>(endpoint: string, data: T) => {
  try {
    const response = await fetch(`${baseUrl}/users/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (newUser: SignUpCredentialsType) =>
  fetchAuth("sign-up", newUser);

export const loginUser = (user: LoginCredentialsType) =>
  fetchAuth("login", user);


export const signOut = (user: UserType, message?: string) => {
  localStorage.removeItem("gameVerse-token");
  const firstName = user.fullName.split(" ")[0];
  setTimeout(() => {
    if (!message) {
      showToast(`${firstName} signed out`);
    } else {
      showToast(message);
    }
  }, 500);
};

export const getUserData = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/users/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUserReviews = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/users/reviews/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const editUserNameAndEmail = async (
  id: number,
  data: AccountSettingsType
) => {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (page: number, sort: string, search: string) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      sort,
      search,
    });
    const response = await fetch(`${baseUrl}/users?${params.toString()}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const editUserProfile = async (editedUser: UserType) => {
  try {
    const response = await fetch(
      `${baseUrl}/users/dashboard/${editedUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/users/dashboard/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const disableUserAccount = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/users/disable/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateUserImage = async (id: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`${baseUrl}/users/image/${id}`, {
      method: "PATCH",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

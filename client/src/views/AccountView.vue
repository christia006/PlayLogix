<template>
  <main
    class="max-w-[1280px] py-8 sm:px-8 sm:py-8 mx-auto sm:mt-8 flex sm:flex-row flex-col sm:gap-4 gap-8 bg-slate-100 dark:bg-slate-800 rounded-xl"
  >
    <section class="sm:w-1/3 flex flex-col gap-4 px-4 sm:px-0 sm:gap-8">
      <img
        :src="renderUserImage(user.image)"
        :alt="user.fullName + 'image'"
        class="object-cover rounded-xl h-full"
      />

      <article class="flex flex-col gap-2">
        <SubtitleComponent justify="start">About You</SubtitleComponent>
        <p class="sm:text-base text-sm font-semibold">
          Full Name: <span class="font-normal">{{ user.fullName }}</span>
        </p>
        <p class="sm:text-base text-sm font-semibold">
          Email: <span class="font-normal">{{ user.email }}</span>
        </p>
        <p class="sm:text-base text-sm font-semibold">
          Member since:
          <span class="font-normal">{{ formattedDate(user.createdDate) }}</span>
        </p>
      </article>
    </section>

    <section class="sm:w-2/3 flex flex-col gap-4 w-full">
      <FormComponent
        id="editAccountForm"
        class="gap-6 px-4"
        type="regular"
        @submit.prevent="accountHandler"
      >
        <template #title>
          <SubtitleComponent justify="start">
            Update account settings
          </SubtitleComponent>
        </template>
        <template #inputs>
          <RenderlessComponent>
            <template v-for="input in accountInputs" :key="input.name">
              <FormBlock>
                <template #label>
                  <FormLabel :id="input.name">
                    {{ input.label }}
                  </FormLabel>
                </template>
                <template #input>
                  <FormInput
                    @blur-event="blurHandler(input.name as AccountFields)"
                    v-bind="input"
                    v-model="accountSettings[input.name as keyof typeof accountSettings]"
                  />
                </template>
                <template #line>
                  <FormLine />
                </template>
                <template #error>
                  <FormError>
                    {{ accountFormErrors[input.name as AccountFields] }}
                  </FormError>
                </template>
              </FormBlock>
            </template>
          </RenderlessComponent>
        </template>
        <template #submit>
          <div class="flex gap-4">
            <ActionButton
              :disabled="!accountSettingsFieldsCompleted"
              type="submit"
              >Change Settings</ActionButton
            >
            <ActionButton @click="disableAccount">Disable Account</ActionButton>
          </div>
        </template>
      </FormComponent>

      <FormComponent
        type="regular"
        @submit.prevent="imageHandler"
        id="photoForm"
        class="px-4"
        enctype="multipart/form-data"
      >
        <template #title>
          <SubtitleComponent justify="start"> Update photo </SubtitleComponent>
        </template>

        <template #inputs>
          <FormBlock class="items-start">
            <template #label>
              <FormLabel id="file" class="pl-1"> Upload File </FormLabel>
            </template>
            <template #input>
              <FormFile @file-event="photoHandler" name="image" />
              <p class="pl-1 text-sm text-slate-500 dark:text-slate-300">
                SVG, PNG, JPG or GIF
              </p>
            </template>
            <template #error>
              <FormError> </FormError>
            </template>
          </FormBlock>
        </template>
        <template #submit>
          <ActionButton
            type="submit"
            :style="{ alignSelf: 'start', marginTop: '0.5rem' }"
            >Change Photo</ActionButton
          >
        </template>
      </FormComponent>
    </section>
  </main>
  <FooterComponent/>
</template>

<script setup lang="ts">
import useGetUserStore from "src/composables/useGetUserStore";
import SubtitleComponent from "src/components/ui/others/SubtitleComponent.vue";
import RenderlessComponent from "src/components/ui/others/RenderlessComponent.vue";
import FormComponent from "src/components/form/FormComponent.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormFile from "src/components/form/FormFile.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormLine from "src/components/form/FormLine.vue";
import FormError from "src/components/form/FormError.vue";
import FooterComponent from "src/components/ui/others/FooterComponent.vue";
import ActionButton from "src/components/ui/buttons/ActionButton.vue";
import { useRouter } from "vue-router";
import { AccountSettingsType } from "src/utils/types";
import { formattedDate, renderUserImage } from "src/utils/helpers";
import {
  accountInputs,
  emptyAccountSettings,
  guestMessage,
} from "src/utils/constants";
import { ref, computed } from "vue";
import {
  accountSchema,
  AccountFieldErrors,
  getAccountFieldError,
  AccountFields,
  AccountTouchedFields,
} from "src/schemas/accountPage";
import {
  disableUserAccount,
  editUserNameAndEmail,
  signOut,
  updateUserImage,
} from "src/api/users";
import { showToast } from "src/utils/toast";

const { user, setUser, resetUser } = useGetUserStore();
const router = useRouter();

const accountSettings = ref<AccountSettingsType>({ ...emptyAccountSettings });

const touchedFields = ref<AccountTouchedFields>({});
const accountFormErrors = ref<AccountFieldErrors>({});

const accountPhoto = ref<File | null>(null);

const accountSettingsFieldsCompleted = computed(() => {
  return accountSchema.safeParse(accountSettings.value).success;
});

const blurHandler = (property: AccountFields) => {
  const message = getAccountFieldError(
    property,
    accountSettings.value[property]
  );
  accountFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const accountHandler = async () => {
  try {
    if (user.value.id) {
      const { data, message } = await editUserNameAndEmail(
        user.value.id,
        accountSettings.value
      );
      if (data) {
        setUser(data);
        showToast("Settings updated sucessfully");
        accountSettings.value = {
          fullName: "",
          email: "",
        };
      } else {
        showToast(message, "error");
      }
    } else {
      router.push("/login");
      setTimeout(() => {
        showToast(guestMessage, "error");
      }, 500);
    }
  } catch (error) {
    console.error(error);
  }
};

const disableAccount = async () => {
  try {
    if (user.value.id) {
      const { data, message } = await disableUserAccount(user.value.id);
      if (data) {
        signOut(user.value, "See you soon! Login in anytime.");
        router.push("/");
        resetUser();
      } else {
        showToast(message, "error");
      }
    } else {
      router.push("/login");
      setTimeout(() => {
        showToast(guestMessage, "error");
      }, 500);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

const photoHandler = (file: File) => {
  accountPhoto.value = file;
};

const imageHandler = async () => {
  try {
    if (!user.value.id) {
      router.push("/login");
      setTimeout(() => {
        showToast(guestMessage, "error");
      }, 500);
      return;
    }

    if (accountPhoto.value) {
      const { data, message } = await updateUserImage(
        user.value.id,
        accountPhoto.value as File
      );
      if (data) {
        setUser(data);
        showToast("Image updated");
        accountPhoto.value = null;
      } else {
        showToast(message, "error");
      }
    } else {
      showToast("Please provide image", "error");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

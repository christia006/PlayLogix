<template>
  <OverlayComponent>
    <ModalComponent>
      <FormComponent
        id="editUserForm"
        class="bg-slate-200 dark:bg-slate-700 w-full h-full sm:p-6 relative"
        @submit.prevent="submitHandler"
      >
        <template #title>
          <h1 class="text-2xl text-center uppercase">Edit User</h1>
        </template>
        <BaseIcon
          size="very-big"
          class="absolute top-3 right-2 cursor-pointer"
          @click="emits('close-modal-event')"
        >
          <XIcon />
        </BaseIcon>

        <template #inputs>
          <RenderlessComponent>
            <template v-for="input in userInputs">
              <FormBlock>
                <template #label>
                  <FormLabel :id="input.name">{{ input.label }}</FormLabel>
                </template>
                <template #input>
                  <FormInput
                    v-bind="input"
                    v-model="user[input.name as 'email' | 'fullName']"
                  />
                </template>
              </FormBlock>
            </template>
          </RenderlessComponent>
          <FormBlock>
            <template #label>
              <FormLabel id="role">Role</FormLabel>
            </template>
            <template #input>
              <FormSelect
                v-model="user.role"
                id="role"
                :options="dashboardOptions"
                :selected="user.role"
              />
            </template>
          </FormBlock>
        </template>
        <template #submit>
          <div class="flex items-center justify-between">
            <FormBlock position="row">
              <template #input>
                <FormLabel id="checkbox">Active</FormLabel>
              </template>
              <template #label>
                <FormCheckbox id="checkbox" v-model="user.active" />
              </template>
            </FormBlock>
            <ActionButton type="submit">Submit</ActionButton>
          </div>
        </template>
      </FormComponent>
    </ModalComponent>
  </OverlayComponent>
</template>

<script setup lang="ts">
import OverlayComponent from "src/components/ui/others/OverlayComponent.vue";
import ModalComponent from "src/components/ui/others/ModalComponent.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormSelect from "src/components/form/FormSelect.vue";
import FormCheckbox from "src/components/form/FormCheckbox.vue";
import FormComponent from "src/components/form/FormComponent.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";
import RenderlessComponent from "src/components/ui/others/RenderlessComponent.vue";
import ActionButton from "src/components/ui/buttons/ActionButton.vue";
import { userInputs, dashboardOptions } from "src/utils/constants";
import { PropType, ref } from "vue";
import { UserType } from "src/utils/types";
import { editUserProfile } from "src/api/users";
import { showToast } from "src/utils/toast";

const emits = defineEmits(["close-modal-event", 'submit-event']);
const props = defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
});

const user = ref<UserType>({ ...props.user });

const submitHandler = async () => {
  try {
    const { data, message } = await editUserProfile(user.value);
    if (data) {
      emits('submit-event', data)
    } else {
      showToast(message, "error");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

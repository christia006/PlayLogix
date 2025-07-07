<template>
  <form
    :id="id"
    ref="formRef"
    :class="[
      'rounded-xl py-6 mx-auto flex flex-col w-[90%] sm:w-full gap-5 transition-all duration-700 origin-top',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
      formOptions[props.type],
    ]"
  >
    <slot name="title" />
    <slot name="inputs" />
    <slot />
    <slot name="submit" />
    <slot name="text" />
  </form>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref } from "vue";

const isVisible = ref(false);
const formRef = ref<HTMLElement | null>(null);

const props = defineProps({
  type: {
    type: String as PropType<FormType>,
    default: "auth",
  },
  id: {
    type: String,
    required: true,
  },
});

const formOptions = {
  auth: "max-w-[400px] bg-slate-400 dark:bg-slate-800 mt-12",
  regular: "bg-slate-200 dark:bg-slate-950",
};

type FormType = keyof typeof formOptions;

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  if (formRef.value) {
    observer.observe(formRef.value);
  }
});
</script>

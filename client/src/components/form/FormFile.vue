<template>
  <input
    class="border border-slate-300 rounded-xl py-1 pl-2 cursor-pointer bg-slate-50 text-slate-500 focus:outline-none dark:bg-slate-200 dark:border-slate-200 dark:placeholde:text-slate-950"
    id="file_input"
    type="file"
    :name="name"
    @change="onFileChange"
  />
</template>


<script setup lang="ts">
const emits = defineEmits(["file-event"]);

defineProps({
  name: {
    type: String,
    required:true
  }
})

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target?.files?.[0];
  if (file) emits("file-event", file);
};
</script>

<template>
   <div class="flex flex-col items-center gap-2">
     <p>
       {{ accountText }} have an account?
       <router-link
         :to="{ name: text }"
         class="no-underline cursor-pointer text-sky-100 dark:text-red-600"
       >
         {{ text }}
       </router-link>
     </p>
   </div>
 </template>
 
 <script setup lang="ts">
 import { computed } from "vue";
 
 const props = defineProps({
   text: {
     type: String,
     required: true,
   },
 });
 
 
 const accountText = computed(() => {
   return props.text === "Login" ? "Already" : "Don't";
 });
 </script>
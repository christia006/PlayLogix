<template>
  <div class="flex items-center border-b border-b-sky-300 dark:border-b-dark-dark-red pb-2">
    <h3 class="w-full max-w-[75px] text-slate-900 dark:text-slate-50">
      <slot name="title" />
    </h3>
    <p class="text-sm sm:text-base text-slate-700 dark:text-slate-300">
      <slot name="content" />
    </p>
  </div>
</template>

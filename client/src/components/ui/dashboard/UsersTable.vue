<template>
  <table class="bg-slate-100 dark:bg-slate-800 flex flex-col gap-4 p-4 sm:p-8 min-h-[50vh] rounded-xl sm:w-full w-[90%] mx-auto">
    <slot name="title" />
    <slot name="header"/>
    <slot name="head" />
    <slot name="data" />
  </table>
</template>

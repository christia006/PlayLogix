<template>
  <section class="max-w-[1280px] w-full mx-auto py-8 px-4 sm:px-0 sm:py-16 flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-y-16 sm:gap-x-12">
    <h1 class="text-xl sm:text-5xl text-center sm:col-start-1 sm:col-end-3" v-if="$slots.title">
      <slot name="title" />
    </h1>
    <slot name="main" />
    <slot name="submain" v-if="$slots.submain"/>
  </section>
</template>

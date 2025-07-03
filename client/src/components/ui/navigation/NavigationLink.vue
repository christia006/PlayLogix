<template>
  <li class="cursor-pointer p-1 sm:p-2 hover:bg-slate-400 flex items-center gap-2">
    <a>
      <slot />
    </a>
    <slot name="text"/>
  </li>
</template>

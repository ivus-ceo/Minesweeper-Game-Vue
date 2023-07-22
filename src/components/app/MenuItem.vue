<template>
  <li class="menu-item">
    <div class="menu-item__icon">
      {{ icon }}
    </div>

    <div class="menu-item__text">
      <slot/>
    </div>
  </li>
</template>

<script setup lang="ts">
  import type { MenuItem } from "@/ts/types";

  const props = defineProps<MenuItem>()
</script>

<style scoped lang="scss">
  .menu-item {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &__icon {

    }

    &__text {

    }
  }
</style>
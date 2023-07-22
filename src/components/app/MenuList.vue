<template>
  <menu class="menu-list">
    <MenuItem class="menu-list__item" icon="💣">
      {{ store.$state.bombsCount }}
    </MenuItem>

    <MenuItem class="menu-list__item">
      <MenuTimer />
    </MenuItem>

    <MenuItem class="menu-list__item" icon="🚩">
      {{ store.$state.flagsCount }}
    </MenuItem>
  </menu>
</template>

<script setup lang="ts">
  import { useStore } from "@/stores/store";
  import MenuItem from "@/components/app/MenuItem.vue"
  import MenuTimer from "@/components/app/MenuTimer.vue";

  const store = useStore()
</script>

<style scoped lang="scss">
  .menu-list {
    gap: 2rem;
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: center;

    &__item {

    }
  }
</style>
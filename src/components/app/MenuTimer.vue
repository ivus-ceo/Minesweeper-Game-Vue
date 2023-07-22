<template>
  <span>{{ timer }}</span>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue'
  import { ref, onMounted } from 'vue'
  import {useStore} from "@/stores/store";

  const store = useStore()
  const timer: Ref<string> = ref('00:00:00')

  const handleTimerStart = (): void => {
    let seconds: number = 0

    const interval = setInterval(() => {
      seconds++
      const date = new Date(0)
      date.setSeconds(seconds)
      timer.value = date.toISOString().substring(11, 19) as string
      if (store.$state.gameStatus === 'loose' || store.$state.gameStatus === 'victory') clearInterval(interval)
    }, 1000)
  }

  onMounted(() => {
    handleTimerStart()
  })
</script>

<style scoped lang="scss">

</style>
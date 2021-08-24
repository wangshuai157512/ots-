<template>
  <div class="home">
    <layout></layout>
  </div>
</template>

<script>
import layout from '@/components/layout.vue'

export default {
  name: 'Home',
  components: {
    layout
  }
}
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
    background: #fff;
  }
</style>

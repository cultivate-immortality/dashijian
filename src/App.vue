<template>
  <div class="app">
    <!-- 一级路由会挂载到App.vue组件 -->
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
.app {
  height: 100vh;
}
</style>

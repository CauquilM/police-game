<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from './views/DashboardView.vue'

export default {
  name: 'App',
  components: {
    Dashboard
  }
}
</script>
<style>
  body{
    background-color: #1e2a38;
    display: flex;
    justify-content: center;
  }
</style>

<template>
  <div id="app" class="bar">
    <h1 @click="onHandleClick">Bar</h1>
    <p>Component</p>
    <h2>异步Ajax数据：</h2>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
  export default {
    methods: {
      onHandleClick() {
        alert('bar');
      }
    },

    computed: {
      msg() {
        return this.$store.state.msg;
      }
    }
  }
</script>

<style>
.bar {
  background: bisque;
}
</style>

<template>
  <div>
    foo
    <button @click="toBar">to page bar</button>
  </div>
</template>
<script>
export default {
  methods: {
    toBar() {
      this.$router.push({
        path: '/bar'
      })
    }
  }
}
</script>

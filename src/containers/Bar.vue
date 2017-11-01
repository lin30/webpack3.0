<template>
  <div>
    bar
    <button @click="toFoo">to page foo</button>
  </div>
</template>
<script>
export default {
  methods: {
    toFoo() {
      this.$router.push({
        path: '/foo'
      })
    }
  }
}
</script>

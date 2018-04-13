<template>
  <div>{{ text }}</div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      text: 'index page'
    }
  },
  created () {
    console.log('2434')
  }
}
</script>

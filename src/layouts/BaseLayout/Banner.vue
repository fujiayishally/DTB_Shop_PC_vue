<template>
  <div class="banner" :style="{ backgroundImage: 'url(' + src + ')' }"></div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.banner {
  width: 100%;
  min-height: 100px;
  background-size: cover;
  background-position: center;
}
</style>

<template>
  <div
    class="base-layout-banner"
    :style="{ backgroundImage: 'url(' + src + ')' }"
  ></div>
</template>
<script>
export default {
  name: 'BaseLayoutBanner',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="scss">
.base-layout-banner {
  width: 100%;
  min-height: 100px;
  background-size: cover;
  background-position: center;
}
</style>

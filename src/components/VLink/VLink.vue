<template>
  <router-link :to="to" class="v-link" :style="{ color: color }">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '#',
      require: true,
    },
    color: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.v-link {
  text-decoration: none;
  color: $Dark;
}
</style>

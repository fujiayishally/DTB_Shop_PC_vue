<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CountItem',
  props: {
    value: {
      type: [String, Number],
      default: 0,
      validator(value) {
        return `${value}`.trim().length === 1
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
}
</script>

<style lang="scss"></style>

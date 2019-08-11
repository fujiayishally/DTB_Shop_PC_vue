<template>
  <span :style="styles">
    <span :class="classes" @click="handleClick"></span>
  </span>
</template>

<script>
const prefixCls = 'icon-png'

export default {
  name: 'IconPNG',
  props: {
    type: {
      type: String,
      required: true,
    },
    size: [Number, String],
  },
  computed: {
    iconName() {
      return `${prefixCls}-${this.type}`
    },
    classes() {
      const { iconName } = this
      return [`${prefixCls}`, `${iconName}`]
    },
    styles() {
      return {
        width: this.size,
        height: this.size,
        display: 'inline-block',
      }
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style lang="scss">
.icon-png {
  display: inline-block;
  vertical-align: top;
}
</style>

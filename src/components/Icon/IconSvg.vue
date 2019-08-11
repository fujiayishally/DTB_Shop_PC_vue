<template>
  <span :class="classes" :style="styles" @click="handleClick">
    <svg aria-hidden="true" :fill="color">
      <use :xlink:href="iconName" />
    </svg>
  </span>
</template>
<script>
const prefixCls = 'icon-svg'

export default {
  name: 'IconSVG',
  props: {
    type: {
      type: String,
      required: true,
    },
    size: String,
    color: {
      type: String,
      default: 'currentColor',
    },
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    styles() {
      return {
        width: this.size,
        height: this.size,
        color: this.color,
      }
    },
    iconName() {
      return `#${prefixCls}-${this.type}`
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
.icon-svg {
  display: inline-block;
  vertical-align: middle;
  width: $font-size-base;
  height: $font-size-base;

  svg {
    width: 100%;
    height: 100%;
    vertical-align: top;
    overflow: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
}
</style>

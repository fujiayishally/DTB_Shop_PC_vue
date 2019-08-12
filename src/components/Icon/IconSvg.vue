<template>
  <span :class="classes" :style="styles" @click="handleClick">
    <svg aria-hidden="true" fill="currentColor">
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
    size: {
      type: String,
      default: 'inherit',
    },
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
      const { size, color } = this
      return {
        fontSize: size,
        color,
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
  line-height: 1;

  svg {
    width: 1em;
    height: 1em;
    color: currentColor;
    font-size: inherit;
    vertical-align: top;
    overflow: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
}
</style>

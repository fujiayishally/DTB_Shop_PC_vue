<template>
  <span :class="className" v-on="$listeners">
    <svg
      class="icon-svg"
      aria-hidden="true"
      :width="size"
      :height="size"
      :fill="color"
    >
      <use :xlink:href="iconName" />
    </svg>
  </span>
</template>
<script>
export default {
  name: 'IconSvg',
  props: {
    type: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    size: {
      type: String,
      default: '1em',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.type}`
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.icon-svg {
  vertical-align: middle;
  transform: translateY(-0.15em);
  overflow: hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
</style>

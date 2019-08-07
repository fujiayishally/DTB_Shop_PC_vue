<template>
  <div>
    <svg class="icon-svg" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'IconSvg',
  props: {
    type: {
      type: String,
      required: true,
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

<style>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

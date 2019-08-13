<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'vu-dropdown-menu'
export default {
  name: 'DropdownMenu',
  data() {
    return {}
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
  },
}
</script>

<style lang="" scoped></style>

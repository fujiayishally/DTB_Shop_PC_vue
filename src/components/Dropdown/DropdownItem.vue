<template>
  <div :class="classes" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'vu-dropdown-item'
import { findComponentUpward } from '@/utils/assist'
export default {
  name: 'DropdownItem',
  props: {
    name: {
      // 用来标识这一项
      type: [String, Number],
    },
    disabled: {
      // 禁用该项
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    divided: {
      // 显示分割线
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-divided`]: this.divided,
          [`${prefixCls}-selected`]: this.selected,
        },
      ]
    },
  },
  methods: {
    handleClick() {
      const dropdown = findComponentUpward(this, 'Dropdown')

      if (this.disabled) {
        this.$nextTick(() => {
          dropdown.currentVisible = true
        })
      } else if (dropdown === this.$parent) {
        dropdown.$emit('on-haschild-click')
      } else {
        if (dropdown) dropdown.$emit('on-hover-click')
      }
      dropdown.$emit('on-click', this.name)
    },
  },
}
</script>

<style lang="" scoped></style>

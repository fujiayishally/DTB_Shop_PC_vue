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
    divided: {
      // 显示分割线
      type: Boolean,
      default: false,
    },
    selected: {
      // 标记该项为选中状态
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
        },
      ]
    },
  },
  methods: {
    handleClick() {
      // const { disabled, divided, selected } = this
      const dropdown = findComponentUpward(this, 'Dropdown')
      // const hasChildren = this.$parent &&
      if (!dropdown) return

      // if (disabled) {
      //   console.log('item disabled')
      // } else {
      //   this.$emit('on-update-poper')
      // }
      dropdown.$emit('on-click', this.name)
    },
  },
}
</script>

<style lang="" scoped></style>

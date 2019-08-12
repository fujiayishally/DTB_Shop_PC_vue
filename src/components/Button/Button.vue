<template>
  <component
    :is="tagName"
    :class="classes"
    :disabled="disabled"
    v-bind="tagProps"
    @click="handleClick"
  >
    <Icon v-if="loading" class="vu-load-loop" type="loading" />
    <Icon v-if="icon" :type="icon" />
    <span v-if="showSlot">
      <slot></slot>
    </span>
  </component>
</template>

<script>
import Link from '@/mixins/Link'
const prefixCls = 'vu-btn'

export default {
  name: 'Button',
  mixins: [Link],
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'default',
          'primary',
          'info',
          'success',
          'warning',
          'error',
          'text',
        ].includes(value)
      },
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    long: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return ['large', 'default', 'small'].includes(value)
      },
    },
    shape: {
      type: String,
      default: 'default',
      validator(value) {
        return ['square', 'default', 'circle'].includes(value)
      },
    },
    icon: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    htmlType: {
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset'].includes(value)
      },
    },
  },
  computed: {
    isLinkPattern() {
      const { to } = this
      return !!to
    },
    tagName() {
      const { isLinkPattern } = this
      return isLinkPattern ? 'a' : 'button'
    },
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-ghost`]: this.ghost,
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-icon-only`]: !this.showSlot,
          [`${prefixCls}-loading`]: !this.loading,
          [`${prefixCls}-${this.size}`]: this.size !== 'default',
          [`${prefixCls}-${this.shape}`]: this.shape !== 'default',
        },
      ]
    },
    tagProps() {
      const { htmlType, isLinkPattern } = this
      if (isLinkPattern) {
        const { href, target } = this
        return { href, target }
      } else {
        return { htmlType }
      }
    },
  },
  data() {
    return {
      showSlot: true,
    }
  },
  mounted() {
    this.showSlot = !!this.$slots.default
  },
}
</script>

<style lang="scss">
@import '@/styles/mixins/Button.scss';
@import '@/styles/components/Button.scss';
</style>

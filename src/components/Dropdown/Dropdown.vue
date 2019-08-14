<template>
  <div
    :class="classes"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    v-click-outside="handleClickOutside"
  >
    <div
      ref="reference"
      :class="refClasses"
      @click="handleClick"
      @contextmenu.prevent="handleRightClick"
    >
      <slot></slot>
    </div>
    <transition name="transition-drop">
      <Drop
        ref="drop"
        :class="dropClasses"
        v-show="currentVisible"
        :placement="placement"
        :transfer="transfer"
        :data-transfer="transfer"
        v-transfer-dom
        @mouseenter.native="handleMouseenter"
        @mouseleave.native="handleMouseleave"
      >
        <slot name="list"></slot>
      </Drop>
    </transition>
  </div>
</template>

<script>
import Drop from './Drop'
import { findComponentUpward } from '@/utils/assist'
import TransferDom from '@/directives/TransferDom'
import ClickOutside from '@/directives/ClickOutside'
import { setTimeout, clearTimeout } from 'timers'
const prefixCls = 'vu-dropdown'

export default {
  name: 'Dropdown',
  components: { Drop },
  directives: { TransferDom, ClickOutside },
  props: {
    placement: {
      // 下拉菜单出现的位置
      type: String,
      default: 'bottom',
      validator(value) {
        return [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end',
        ].includes(value)
      },
    },
    trigger: {
      type: String,
      default: 'hover',
      validator(value) {
        // contextMenu（右键）,custom (需配合 visible 使用)
        return ['hover', 'click', 'contextMenu', 'custom'].includes(value)
      },
    },
    visible: {
      // 手动控制下拉框的显示，在 trigger = 'custom' 时使用
      type: Boolean,
      default: false,
    },
    stopPropagation: {
      type: Boolean,
      default: false,
    },
    transfer: {
      type: Boolean,
      default: false,
    },
    transferClassName: {
      // 开启 transfer 时，给浮层添加额外的 class 名称
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentVisible: this.visible,
    }
  },
  watch: {
    visible(value) {
      this.currentVisible = value
    },
    currentVisible(value) {
      const drop = this.$refs.drop
      value ? drop.update() : drop.destroy()
      this.$emit('on-visible-change', value)
    },
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    refClasses() {
      return [`${prefixCls}-rel`]
    },
    dropClasses() {
      return {
        [`${prefixCls}-transfer`]: this.transfer,
        [this.transferClassName]: this.transferClassName,
      }
    },
    transition() {
      return ['bottom-start', 'bottom', 'bottom-end'].includes(this.placement)
        ? 'slide-up'
        : 'fade'
    },
  },
  methods: {
    handleClick() {
      const { trigger } = this
      if (trigger !== 'click') return false

      this.currentVisible = !this.currentVisible
    },
    handleMouseenter() {
      const { trigger } = this
      if (trigger !== 'hover') return false

      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.currentVisible = true
      }, 250)
    },
    handleMouseleave() {
      const { trigger } = this
      if (trigger !== 'hover') return false

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.currentVisible = false
        }, 150)
      }
    },
    handleRightClick() {
      const { trigger } = this
      if (trigger !== 'contextMenu') return false

      this.currentVisible = !this.currentVisible
    },
    handleClickOutside(event) {
      const { trigger } = this

      if (trigger === 'custom' && this.currentVisible)
        this.$emit('on-click-outside', event)
      else this.currentVisible = false
    },
    hasParent() {
      return findComponentUpward(this, 'Dropdown')
    },
  },
  mounted() {
    this.$on('on-click', name => {
      if (this.stopPropagation) return false
      const $parent = this.hasParent()
      if ($parent) $parent.$emit('on-cllick', name)
    })

    this.$on('on-haschild-click', () => {
      this.$nextTick(() => {
        if (this.trigger === 'custom') return false
        this.currentVisible = true
      })

      const $parent = this.hasParent()
      if ($parent) $parent.$emit('on-haschild-click')
    })

    this.$on('on-hover-click', () => {
      this.$nextTick(() => {
        if (this.trigger === 'custom') return false
        this.currentVisible = false
      })

      const $parent = this.hasParent()
      if ($parent) $parent.$emit('on-hover-click')
    })
  },
}
</script>

<style lang="scss">
@import '@/styles/mixins/Dropdown.scss';
@import '@/styles/components/Dropdown.scss';
</style>

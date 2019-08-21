<template>
  <div :class="classes" :style="styles">
    <slot></slot>
    <span :class="arrowClasses" ref="arrow"></span>
  </div>
</template>

<script>
import { transferIncrease } from '@/utils/transfer-queue'
const Popper = require('popper.js/dist/umd/popper.js')
const prefixCls = 'vu-drop'

export default {
  name: 'Drop',
  props: {
    placement: {
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
    transfer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const transferIndex = this.getTransferIndex()
    return {
      transferIndex,
      popperStatus: false,
      width: '',
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    arrowClasses() {
      return [`${prefixCls}-arrow`]
    },
    styles() {
      const { transfer, transferIndex, width } = this
      let styles = {}
      if (width) styles['min-width'] = `${width}px`
      if (transfer) styles['z-index'] = 1060 + transferIndex
      return styles
    },
  },
  methods: {
    update() {
      if (this.popper) {
        this.$nextTick(() => {
          this.popper.update()
          this.popperStatus = true
        })
      } else {
        this.$nextTick(() => {
          console.log(this.$refs.arrow)
          this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
            placement: this.placement,
            modifiers: {
              computeStyle: {
                gpuAcceleration: false, //如果为true，则使用CSS 3D转换来定位popper
              },
              preventOverflow: {
                boundariesElement: 'window', //定义popper位置边界的元素
              },
              arrow: {
                element: this.$refs.arrow,
              },
            },
            onCreate: data => {
              this.resetTransformOrigin(data)
              this.$nextTick(this.popper.update())
            },
            onUpdate: data => {
              this.resetTransformOrigin(data)
            },
          })
        })
      }
      this.transferIndex = this.getTransferIndex
    },
    destroy() {
      if (this.popper) {
        if (this.popper && this.popperStatus) {
          this.popperStatus = false
          setTimeout(() => {
            this.popper.destroy()
            this.popper = null
          }, 300)
        }
      }
    },
    resetTransformOrigin({ attributes }) {
      const placement = attributes['x-placement']

      if (placement === 'left' || placement === 'right') return
      let transformOrigin = ''
      switch (placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
        case 'left-end':
        case 'right-end':
          transformOrigin = 'center bottom'
          break
        default:
          transformOrigin = 'center top'
      }
      this.popper.popper.style.transformOrigin = transformOrigin
    },
    getTransferIndex() {
      return transferIncrease()
    },
  },
  created() {
    this.$on('on-update-popper', this.update)
    this.$on('on-destroy-popper', this.destroy)
  },

  beforDestroy() {
    if (this.popper) this.popper.destroy()
  },
}
</script>

<style lang="scss">
@import '@/styles/mixins/Drop.scss';
@import '@/styles/components/Drop.scss';
</style>

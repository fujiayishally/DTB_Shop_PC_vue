<template>
  <div :class="classes" :style="styles">
    <slot></slot>
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
      default: 'bottom-start',
      validator(value) {
        return ['bottom-start'].includes(value)
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
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    styles() {
      return {}
    },
  },
  methods: {
    update() {
      if (this.popper) {
        this.$nextTick(() => {
          this.popper.update()
        })
      } else {
        this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
          placement: this.placement,
          modfiers: {
            // computeStyle: { gpuAcceleration: true }, //如果为true，则使用CSS 3D转换来定位popper
            // preventOverflow: {
            //   boundariesElement: 'window', //定义popper位置边界的元素
            // },
          },
          onCreate: data => {
            console.log('onCreate', data)
            this.resetTransformOrigin(data)
            this.$nextTick(this.popper.update())
          },
          onUpdate: data => {
            console.log('onUpdated', data)
            this.resetTransformOrigin(data)
          },
        })
      }
      this.popperStatus = true
      this.transferIndex = this.getTransferIndex
    },
    destroy() {
      if (this.popper) {
        if (this.popper && this.popperStatus) {
          this.popperStatus = false
          setTimeout(() => {
            this.popper.destroy()
            // this.popper = null
          }, 300)
        }
      }
    },
    resetTransformOrigin() {
      // placement = placement.match(/(\w*)-(\w*)/)
      // let start = placement[1]
      // let end = placement[2]
      // styles.resetTransformOrigin =
      // console.log(start, end)
      // let x_placement = this.popper.
    },
    getTransferIndex() {
      return transferIncrease()
    },
  },
  created() {
    // this.update()
    // this.$on('on-update-popper', this.update)
  },
  mounted() {
    // this.update()
  },
  beforDestroy() {},
}
</script>

<style lang="scss">
@import '@/styles/components/Drop.scss';
</style>

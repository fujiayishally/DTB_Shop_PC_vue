<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'vu-carousel-item'
import { findComponentUpward } from '@/utils/assist'

export default {
  name: 'CarouselItem',
  data() {
    const parent = findComponentUpward(this, 'Carousel')
    return {
      prefixCls,
      width: 0,
      height: 'auto',
      left: 0,
      parent: parent,
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    styles() {
      return {
        width: `${this.width}px`,
        height: `${this.height}`,
        left: `${this.left}px`,
      }
    },
  },
  watch: {
    width() {
      const { parent } = this
      if (parent.loop)
        this.$nextTick(() => {
          parent.initCloneTrackDom()
        })
    },
    height() {
      const { parent } = this
      if (parent.loop)
        this.$nextTick(() => {
          parent.initCloneTrackDom()
        })
    },
  },
  mounted() {
    this.$parent.slotChange()
  },
}
</script>

<style lang="scss" scoped></style>

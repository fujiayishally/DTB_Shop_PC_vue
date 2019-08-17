<template>
  <div :class="classes">
    <div :class="[prefixCls + '-list']">
      <div
        ref="track"
        :class="[prefixCls + '-track', { heigher: !showCloneTrack }]"
        :style="trackStyles"
      >
        <slot></slot>
      </div>
      <div
        v-if="loop"
        ref="cloneTrack"
        :class="[prefixCls + '-track', { heigher: showCloneTrack }]"
        :style="cloneTrackStyles"
      ></div>
    </div>

    <ul :class="dotsClasses">
      <li
        v-for="slide in slideInstances"
        :key="slide.index"
        :class="{
          [prefixCls + '-dots-active']: slide.index === currentValue,
        }"
        @click="dotsEvent('click', slide.index)"
        @mouseover="dotsEvent('hover', slide.index)"
        @mouseleave="dotsEvent('hover')"
      >
        <button type="button" :class="{ radius: radiusDot }"></button>
      </li>
    </ul>

    <button
      type="button"
      :class="arrowClasses"
      class="left"
      @click="arrowEvent(-1)"
    >
      <Icon type="left" />
    </button>
    <button
      type="button"
      :class="arrowClasses"
      class="right"
      @click="arrowEvent(1)"
    >
      <Icon type="right" />
    </button>
  </div>
</template>

<script>
import { findComponentsDownward, getStyle } from '@/utils/assist'
import { setTimeout, clearTimeout } from 'timers'
const prefixCls = 'vu-carousel'

export default {
  name: 'Carousel',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    height: {
      type: [String, Number],
      default: 'auto',
      validator(value) {
        return (
          value === 'auto' ||
          Object.prototype.toString.call(value) === '[object Number]'
        )
      },
    },
    loop: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 2000,
    },
    dots: {
      // 指示器的位置
      type: String,
      default: 'inside',
      validator(value) {
        return ['inside', 'outside', 'none'].includes(value)
      },
    },
    radiusDot: {
      type: Boolean,
      default: false,
    },
    trigger: {
      // 指示器的触发方式
      type: String,
      default: 'hover',
      validator(value) {
        return ['click', 'hover'].includes(value)
      },
    },
    arrow: {
      // 切换箭头的触发方式
      type: String,
      default: 'hover',
      validator(value) {
        return ['hover', 'always', 'never'].includes(value)
      },
    },
    easing: {
      // 动画效果
      type: String,
      default: 'ease',
    },
  },
  data() {
    return {
      prefixCls,
      slides: [],
      slideInstances: [],
      currentValue: this.value,
      timer: null,
      dotsTimer: null,
      listWidth: 0,
      trackWidth: 0,
      trackValue: this.value,
      trackOffset: 0,
      cloneTrackValue: 0,
      cloneTrackOffset: 0,
      showCloneTrack: false,
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`]
    },
    dotsClasses() {
      const { dots } = this
      return [`${prefixCls}-dots`, `${prefixCls}-dots-${dots}`]
    },
    arrowClasses() {
      return [`${prefixCls}-arrow`, `${prefixCls}-arrow-${this.arrow}`]
    },
    trackStyles() {
      return {
        width: `${this.trackWidth}px`,
        transform: `translate3d(${-this.trackOffset}px,0px,0px)`,
        transition: `transform 500ms ${this.easing}`,
      }
    },
    cloneTrackStyles() {
      return {
        width: `${this.trackWidth}px`,
        transform: `translate3d(${-this.cloneTrackOffset}px,0px,0px)`,
        transition: `transform 500ms ${this.easing}`,
        position: 'absolute',
        left: '0px',
        top: '0px',
      }
    },
  },
  watch: {
    currentValue(value, oldValue) {
      this.$emit('on-change', value, oldValue)
      this.$emit('input', value)
    },
    autoplay() {
      this.setAutoPlay()
    },
    value(value) {
      this.dotsEvent(this.trigger, value)
    },
  },
  mounted() {
    this.updateSlides(true)
    this.initCloneTrackValue()
    this.handleResize()
    this.setAutoPlay()
    window.addEventListener('resize', this.handleResize, false)
  },
  methods: {
    slotChange() {
      this.$nextTick(() => {
        this.updateSlides(true)
        this.initCloneTrackValue()
        this.updateTrackSize()
        this.updateTrackOffset
      })
    },
    initCloneTrackDom() {
      this.$nextTick(() => {
        this.$refs.cloneTrack.innerHTML = this.$refs.track.innerHTML
      })
    },
    initCloneTrackValue() {
      if (this.loop) {
        if (this.currentValue === 0) this.cloneTrackValue = this.slides.length
        else this.cloneTrackValue = -1
      }
    },
    findChild(cb) {
      let children = findComponentsDownward(this, 'CarouselItem')
      children.forEach(child => {
        cb(child)
      })
    },
    updateSlides(init) {
      let index = 0
      const slides = []
      const slideInstances = []

      this.findChild(child => {
        child.index = index++
        slides.push({ $el: child.$el })

        if (init) slideInstances.push(child)
      })

      this.slides = slides
      if (init) this.slideInstances = slideInstances
      this.updateTrackSize()
    },
    updateTrackSize() {
      const { height, slideInstances } = this
      slideInstances.forEach(child => {
        child.width = this.listWidth
        child.height = typeof height === 'number' ? `${height}px` : height
      })
      this.trackWidth = slideInstances.length * this.listWidth
    },
    handleResize() {
      this.listWidth = parseInt(getStyle(this.$el, 'width'))
      this.updateTrackSize()
      this.updateTrackOffset()
    },
    updateTrackOffset() {
      this.$nextTick(() => {
        this.trackOffset = this.trackValue * this.listWidth
        if (this.loop) {
          this.cloneTrackOffset = this.cloneTrackValue * this.listWidth
        }
      })
    },
    move(offset) {
      const { loop, slides, currentValue } = this
      const len = slides.length
      let heigherIndex = this.currentValue
      let lowerIndex = offset > 0 ? -1 : len

      heigherIndex += offset
      while (heigherIndex < 0) heigherIndex += len
      while (heigherIndex >= len) heigherIndex -= len

      if (
        loop &&
        ((currentValue === 0 && offset < 0) ||
          (currentValue === len - 1 && offset > 0))
      ) {
        // 边缘情况
        this.showCloneTrack = !this.showCloneTrack
        lowerIndex = offset > 0 ? len : -1
      }

      if (this.showCloneTrack) {
        this.trackValue = lowerIndex
        this.cloneTrackValue = heigherIndex
      } else {
        this.trackValue = heigherIndex
        this.cloneTrackValue = lowerIndex
      }

      this.currentValue = heigherIndex
      this.updateTrackOffset()
      this.setAutoPlay()
    },
    arrowEvent(offset) {
      this.move(offset)
    },
    dotsEvent(type, index) {
      if (index === void 0 && type === 'hover')
        return clearTimeout(this.dotsTimer)

      if (this.trigger === type && this.currentValue !== index) {
        if (type === 'click') {
          this.move(index - this.currentValue)
        }

        if (type === 'hover') {
          clearTimeout(this.dotsTimer)
          this.dotsTimer = setTimeout(() => {
            this.move(index - this.currentValue)
          }, 250)
        }
      }
    },
    setAutoPlay() {
      clearInterval(this.timer)
      if (this.autoplay) {
        this.timer = setInterval(() => this.move(1), this.duration)
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/mixins/Carousel.scss';
@import '@/styles/components/Carousel.scss';
</style>

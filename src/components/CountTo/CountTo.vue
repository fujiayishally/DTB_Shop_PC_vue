<template>
  <div :class="prefixCls">
    <slot name="prefix"></slot>
    <keep-alive>
      <component :is="comp" ref="reference" />
    </keep-alive>
    <slot name="suffix"></slot>
  </div>
</template>

<script>
import CountByIncrease from './CountByIncrease'
import CountByScroll from './CountByScroll'
import { isNumber } from '@/utils/assist'

const prefixCls = 'vu-count-to'
export default {
  name: 'CountTo',
  components: { CountByIncrease, CountByScroll },
  provide() {
    return { CountTo: this }
  },
  props: {
    startVal: {
      type: Number,
      default: 0,
    },
    endVal: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 1000,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    decimals: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0
      },
    },
    decimal: {
      type: String,
      default: '.',
    },
    separator: {
      type: String,
      default: ',',
    },
    useGrouping: {
      // example: 1,000 vs 1000 (true)
      type: Boolean,
      default: true,
    },
    useEasing: {
      type: Boolean,
      default: true,
    },
    easingFn: {
      type: Function,
      default(t, b, c, d) {
        //t: current time,当前时间
        //b: begInnIng value,开始值
        //c: change In value,结束值-开始值
        //d: duration 总消耗时间
        return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
      },
    },
    mode: {
      // 数值变化方式
      type: String,
      default: 'increase',
      validator(value) {
        return ['increase', 'scrollUp', 'scrollDown'].includes(value)
      },
    },
  },
  data() {
    return {
      prefixCls,
      startTimeStamp: null,
      cacheProcess: 0,
      process: 0,
      pausing: false,
      rAFID: null,
    }
  },
  computed: {
    comp() {
      return this.mode === 'increase' ? 'CountByIncrease' : 'CountByScroll'
    },
    countDowm() {
      let value
      if (this.mode === 'increase') value = this.startVal > this.endVal
      else value = this.mode === 'scrollDown'
      return value
    },
    calculator() {
      const { useEasing, countDowm, easingFn, duration } = this

      let fn = function() {}

      if (useEasing && countDowm) {
        fn = ({ startVal, endVal, process }) => {
          return startVal - easingFn(process, 0, startVal - endVal, duration)
        }
      }

      if (useEasing && !countDowm) {
        fn = ({ startVal, endVal, process }) => {
          return easingFn(process, startVal, endVal - startVal, duration)
        }
      }

      if (!useEasing && countDowm) {
        fn = ({ startVal, endVal, process }) => {
          return startVal - ((startVal - endVal) * process) / duration
        }
      }

      if (!useEasing && !countDowm) {
        fn = ({ startVal, endVal, process }) => {
          return startVal + ((endVal - startVal) * process) / duration
        }
      }

      return fn
    },
  },
  watch: {
    startVal() {
      if (this.autoPlay) this.start()
    },
    endVal() {
      if (this.autoPlay) this.start()
    },
  },
  methods: {
    formatNumber(number) {
      const { decimals, useGrouping, decimal, separator } = this
      if (!isNumber(number)) return

      number = number.toFixed(decimals).split('.')

      if (useGrouping) number[0] = parseFloat(number[0]).toLocaleString()

      number = number.join(decimal).replace(/,/g, separator)

      return number
    },
    frame(timeStamp) {
      if (!this.startTimeStamp) this.startTimeStamp = timeStamp

      let process = (timeStamp - this.startTimeStamp).toFixed(3)

      if (this.pausing) {
        if (!this.cacheProcess) this.cacheProcess = process
        return
      }
      this.process = this.cacheProcess ? this.cacheProcess : process
      this.cacheProcess = 0
      this.$refs.reference.updateFrame()

      cancelAnimationFrame(this.rAFID)
      if (this.process < this.duration) {
        this.rAFID = requestAnimationFrame(this.frame)
      } else {
        this.$emit('on-counted')
      }
    },
    reset() {
      cancelAnimationFrame(this.rAFID)
      this.startTimeStamp = null
      this.process = 0
      this.cacheProcess = 0
      this.pausing = false
      this.rAFID = null
    },
    start() {
      this.reset()
      this.rAFID = requestAnimationFrame(this.frame)
      this.$emit('on-start')
    },
    pause() {
      this.pausing = true
    },
    resume() {
      this.pausing = false
      this.rAFID = requestAnimationFrame(this.frame)
    },
  },
  mounted() {
    if (this.autoPlay) this.start()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.tagID)
  },
}
</script>

<style lang="scss">
.vu-count-to {
  display: inline-block;
  position: relative;
}
</style>

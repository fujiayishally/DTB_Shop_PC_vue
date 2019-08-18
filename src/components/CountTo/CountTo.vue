<template>
  <div>{{ displayVal }}</div>
</template>

<script>
// import CountItem from './CountItem'
import {
  requestAnimationFrame,
  cancelAnimationFrame,
} from '@/utils/animationFrame'
export default {
  name: 'CountTo',
  // components: { CountItem },
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
    easing: {
      type: String,
      default: 'ease',
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
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      startTime: null,
      process: 0,
      rAFID: null,
      currentVal: this.startVal,
      pausing: false,
    }
  },
  computed: {
    countDowm() {
      return this.startVal > this.endVal
    },
    displayVal() {
      return this.formatNumber(this.currentVal)
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
    isNumber(val) {
      return !isNaN(parseFloat(val))
    },
    formatNumber(number) {
      if (!this.isNumber(number)) return

      number = number.toFixed(this.decimals).split('.')

      if (this.useGrouping) number[0] = parseFloat(number[0]).toLocaleString()

      number = number.join(this.decimal).replace(/,/g, this.separator)

      return this.prefix + number + this.suffix
    },
    frame(timeStamp) {
      let {
        startTimeStamp,
        startVal,
        endVal,
        duration,
        rAFID,
        useEasing,
        countDowm,
        easingFn,
        process,
      } = this
      let currentVal

      if (!startTimeStamp) startTimeStamp = this.startTimeStamp = timeStamp
      process = timeStamp - startTimeStamp

      if (this.pausing) {
        if (!this.process) this.process = process
        return
      } else {
        if (!this.process) this.process = process
      }

      if (useEasing && countDowm)
        currentVal =
          startVal - easingFn(this.process, 0, startVal - endVal, duration)

      if (useEasing && !countDowm)
        currentVal = easingFn(
          this.process,
          startVal,
          endVal - startVal,
          duration,
        )
      if (!useEasing && countDowm)
        currentVal = startVal - ((startVal - endVal) * this.process) / duration

      if (!useEasing && !countDowm)
        currentVal = startVal + ((endVal - startVal) * this.process) / duration

      if (countDowm) currentVal = currentVal < endVal ? endVal : currentVal
      else currentVal = currentVal > endVal ? endVal : currentVal
      this.currentVal = currentVal

      cancelAnimationFrame(rAFID)
      if (this.process < duration) {
        this.rAFID = requestAnimationFrame(this.frame)
      } else {
        this.$emit('on-counted', this.currentVal, this.displayVal)
      }

      this.process = null
    },
    start() {
      this.reset()
      this.rAFID = requestAnimationFrame(this.frame)
      this.$emit('on-start')
    },
    pause() {
      this.pausing = true
      this.$emit('on-pause')
    },
    resume() {
      this.pausing = false
      this.rAFID = requestAnimationFrame(this.frame)
      this.$emit('on-resume')
    },
    reset() {
      this.currentVal = this.startVal
      this.startTimeStamp = null
      this.pausing = false
      this.process = 0
      cancelAnimationFrame(this.rAFID)
    },
  },
  mounted() {
    if (this.autoPlay) this.start()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.rAFID)
  },
}
</script>

<style lang="scss"></style>

<template>
  <span :class="prefixCls">{{ displayVal }}</span>
</template>

<script>
const prefixCls = 'count-by-increase'
export default {
  name: 'CountByIncrease',
  inject: ['CountTo'],
  data() {
    return {
      prefixCls,
      currValue: this.CountTo.startVal,
    }
  },
  computed: {
    displayVal() {
      return this.CountTo.formatNumber(this.currValue)
    },
  },
  methods: {
    updateFrame() {
      const { startVal, endVal, process, countDowm, calculator } = this.CountTo

      let result = calculator({ startVal, endVal, process })
      if (countDowm && result < endVal) result = Math.max(endVal, result)
      if (!countDowm && result > endVal) result = Math.min(endVal, result)

      this.currValue = result
    },
  },
}
</script>

<style lang="scss"></style>

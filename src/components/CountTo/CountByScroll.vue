<template>
  <div :class="prefixCls">
    <div
      v-for="(item, index) in scrollers"
      :key="index"
      :class="[prefixCls + '-item']"
    >
      <div
        v-if="item.isNum"
        :class="[prefixCls + '-list']"
        :style="{ transform: item.translateY }"
      >
        <div v-for="num in 10" :key="num">
          {{ CountTo.countDowm ? 10 - num : num - 1 }}
        </div>
      </div>

      <template v-else>{{ item.value }}</template>
    </div>
  </div>
</template>

<script>
import { isNumber, getStyle } from '@/utils/assist'

const prefixCls = 'count-by-scroll'
export default {
  name: 'CountByScroll',
  inject: ['CountTo'],
  data() {
    return {
      prefixCls,
      listHeight: '0px',
      scrollers: [],
    }
  },
  watch: {
    listHeight() {
      this.scrollers = this.getScrollers()
    },
  },
  methods: {
    getScrollers() {
      const { formatNumber, endVal } = this.CountTo
      let listHeight = parseInt(this.listHeight)
      let result = []

      formatNumber(endVal)
        .split('')
        .forEach(item => {
          let isNum = isNumber(item)
          let value = item
          let endVal, startVal, translateY
          let countDown = this.CountTo.countDowm

          if (isNum) {
            value = parseInt(item)
            startVal = countDown ? 9 * listHeight : 0
            endVal = countDown ? (9 - value) * listHeight : value * listHeight
            translateY = `translateY(${startVal}px)`
          }

          result.push({
            value,
            isNum,
            startVal,
            endVal,
            translateY,
          })
        })

      return result
    },
    updateFrame() {
      const { process, calculator, countDowm } = this.CountTo

      this.scrollers.forEach(item => {
        const { startVal, endVal } = item
        let result = calculator({ startVal, endVal, process })

        if (countDowm) result = Math.max(Math.floor(result), endVal)
        else result = Math.min(Math.ceil(result), endVal)

        item.translateY = `translateY(-${parseInt(result)}px)`
      })
    },
  },
  mounted() {
    this.scrollers = this.getScrollers()
    this.$nextTick(() => {
      this.listHeight = getStyle(this.$el, 'height')
    })
  },
}
</script>

<style lang="scss">
.count-by-scroll {
  display: inline-block;

  &-item {
    position: relative;
    display: inline-block;
    height: 1.5em;
    line-height: 1.5em;
    text-align: center;
    vertical-align: top;
    overflow: hidden;
  }
  &-list {
  }
}
</style>

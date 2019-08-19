<template>
  <div>
    <div class="demo">
      <p>递增递减式改变</p>
      <CountTo
        ref="countTo"
        :start-val="1000"
        :end-val="2019"
        :decimals="2"
        decimal="."
        :duration="3000"
      >
        <span slot="prefix">$</span>
        <span slot="suffix">rmb</span>
      </CountTo>
      <div>
        <button @click="start">开始</button>
        <button @click="pause">{{ pausing ? '继续' : '暂停' }}</button>
        <button @click="reset">重置</button>
      </div>
    </div>

    <div class="demo">
      <p>同时滚动改变</p>
      <CountTo
        ref="countToScroll"
        mode="scrollDown"
        :end-val="25678"
        :decimals="2"
        decimal="."
        :duration="3000"
      >
        <span slot="prefix">$</span>
        <span slot="suffix">rmb</span>
      </CountTo>
      <div>
        <button @click="startScroll">开始</button>
        <button @click="pauseScroll">
          {{ pausingScroll ? '继续' : '暂停' }}
        </button>
        <button @click="resetScroll">重置</button>
      </div>
    </div>

    <div class="demo">
      <p>同时滚动改变</p>
      <CountTo
        ref="countToScroll"
        mode="scrollUp"
        :end-val="25678"
        :decimals="2"
        decimal="."
        :duration="3000"
      >
        <span slot="prefix">$</span>
        <span slot="suffix">rmb</span>
      </CountTo>
    </div>
  </div>
</template>

<script>
import CountTo from '@/components/CountTo'
export default {
  components: { CountTo },
  data() {
    return {
      pausing: false,
      pausingScroll: false,
    }
  },
  methods: {
    start() {
      this.pausing = false
      this.$refs.countTo.start()
    },
    pause() {
      if (this.pausing) this.$refs.countTo.resume()
      else this.$refs.countTo.pause()
      this.pausing = !this.pausing
    },
    reset() {
      this.pausing = false
      this.$refs.countTo.reset()
    },
    startScroll() {
      this.pausingScroll = false
      this.$refs.countToScroll.start()
    },
    pauseScroll() {
      if (this.pausingScroll) this.$refs.countToScroll.resume()
      else this.$refs.countToScroll.pause()
      this.pausingScroll = !this.pausingScroll
    },
    resetScroll() {
      this.pausingScroll = false
      this.$refs.countToScroll.reset()
    },
  },
}
</script>

<style lang="scss" scoped>
.demo {
  margin: 20px;
  padding: 20px 20px 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
</style>

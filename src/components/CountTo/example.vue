<template>
  <div class="demo">
    <CountTo
      ref="countTo"
      :start-val="1000"
      :end-val="2019"
      :decimals="2"
      decimal="."
      :duration="5000"
      prefix="$"
      suffix="rmb"
    />
    <button @click="start">开始</button>
    <button @click="pause">{{ pausing ? '继续' : '暂停' }}</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script>
import CountTo from '@/components/CountTo'
export default {
  components: { CountTo },
  data() {
    return {
      pausing: false,
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

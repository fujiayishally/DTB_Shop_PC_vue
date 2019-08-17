<template>
  <div class="home-menu" :style="{ background: bgColor }">
    <div v-for="(item, index) in data" :key="index">
      <router-link :to="item.href">{{ item.text }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      bgColor: '#ffeccb',
    }
  },
  mounted() {
    this.$el.parentNode.style.background = this.bgColor
  },
}
</script>

<style lang="scss" scoped>
.home-menu {
  display: flex;
  height: 45px;
  line-height: 45px;
  text-align: center;

  & > div {
    flex: 1;
  }
  a:hover {
    color: inherit;
  }
}
</style>

<template>
  <div class="base-layout">
    <BannerVue :src="bannerImg" />
    <HeaderVue />
    <!-- <router-view></router-view> -->
    <FooterVue />
  </div>
</template>

<script>
import BannerVue from './Banner'
import HeaderVue from './Header'
import FooterVue from './Footer'

export default {
  name: 'BaseLayout',
  components: { BannerVue, HeaderVue, FooterVue },
  data() {
    return {
      bannerImg: '',
    }
  },
  mounted() {
    this.getHomeData()
  },
  methods: {
    getHomeData() {
      this.$http({
        url: '/api/home',
        method: 'GET',
      }).then(res => {
        const resData = res.data
        this.bannerImg = resData.bannerImg
      })
    },
  },
}
</script>

<style lang="scss">
.base-layout {
  min-width: $screen-xl;
}
</style>

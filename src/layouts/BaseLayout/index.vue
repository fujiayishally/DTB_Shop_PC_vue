<template>
  <div>
    <BannerVue :src="bannerImg" />
    <HeaderVue></HeaderVue>
    <router-view />
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import BannerVue from './Banner'
import HeaderVue from './Header'
import FooterVue from './Footer'

export default {
  data() {
    return {
      bannerImg: '',
    }
  },
  components: { BannerVue, HeaderVue, FooterVue },
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

<style></style>

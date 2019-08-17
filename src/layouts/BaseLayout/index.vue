<template>
  <div class="base-layout">
    <BannerVue v-if="bannerImg" :src="bannerImg" />
    <HeaderVue />
    <router-view></router-view>
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
}
</script>

<style lang="scss">
.base-layout {
  min-width: $screen-xl;
}
</style>

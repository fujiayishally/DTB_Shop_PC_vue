<template>
  <div class="home">
    <div class="menu-floor">
      <div>
        <MenuBar :data="menuLinks" class="inner" />
      </div>
      <div class="inner">
        <Category class="category" />
        <UserBox class="user-box" />
      </div>
      <SwiperBox class="swiper-box inner" />
    </div>
  </div>
</template>

<script>
import MenuBar from './MenuBar'
import Category from './Category'
import SwiperBox from './SwiperBox'
import UserBox from './UserBox'
import { findComponentUpward } from '@/utils/assist.js'

export default {
  name: 'Home',
  components: { MenuBar, Category, SwiperBox, UserBox },
  provide() {
    return {
      HomeVue: this,
    }
  },
  data() {
    return {
      menuLinks: [],
      menuTree: [],
      allUserCount: 0,
      carousels: [],
      zones: [],
    }
  },
  created() {
    this.getHomaData()
  },
  methods: {
    getHomaData() {
      this.$http({
        method: 'GET',
        url: 'api/homedata',
      }).then(({ data }) => {
        const BaseLayout = findComponentUpward(this, 'BaseLayout')
        BaseLayout.bannerImg = data.bannerImg
        this.menuLinks = data.menuLinks
        this.menuTree = data.menuTree
        this.carousels = data.carousels
        this.zones = data.zones
        this.allUserCount = data.allUserCount
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  .inner {
    position: relative;
    width: 740px;
    margin: 0 auto;
  }
  .menu-floor {
    transition: background $transition-time linear;
    overflow: hidden;
    .category,
    .user-box {
      display: block;
      position: absolute;
      top: -45px;
      width: 230px;
    }
    .category {
      left: -230px;
    }
    .user-box {
      right: -230px;
    }
  }
}
</style>

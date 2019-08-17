<template>
  <div class="home">
    <div>
      <MenuBar :data="menuLinks" class="inner" />
    </div>
    <div class="inner">
      <Category :data="menuTree" class="category" />
      <Swiper class="swiper" />
      <UserBox class="user-box" />
    </div>
  </div>
</template>

<script>
import MenuBar from './MenuBar'
import Category from './Category'
import Swiper from './Swiper'
import UserBox from './UserBox'
import { findComponentUpward } from '@/utils/assist.js'

export default {
  name: 'Home',
  components: { MenuBar, Category, Swiper, UserBox },
  data() {
    return {
      menuLinks: null,
      menuTree: null,
      allUserCount: null,
      swipers: null,
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
        this.swipers = data.swipers
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
  .swiper {
  }
}
</style>

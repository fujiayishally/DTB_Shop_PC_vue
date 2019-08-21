<template>
  <div class="carousel-box-container">
    <Carousel class="carousel" loop autoplay @on-change="handleCarouselChange">
      <CarouselItem v-for="(item, index) in carousels" :key="index">
        <div>
          <img :src="item.img" />
        </div>
      </CarouselItem>
      <Icon slot="left-arrow" type="left" size="50px" />
      <Icon slot="right-arrow" type="right" size="50px" />
    </Carousel>

    <div class="zones">
      <router-link
        v-for="link in zones"
        :key="link.id"
        :to="'/zone/' + link.id"
      >
        <img :src="link.img" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel/index.js'

export default {
  name: 'HomeSwiper',
  inject: ['HomeVue'],
  components: { Carousel, CarouselItem: Carousel.CarouselItem },
  computed: {
    carousels() {
      return this.HomeVue.carousels
    },
    zones() {
      return this.HomeVue.zones
    },
  },
  methods: {
    handleCarouselChange(index) {
      this.$el.parentNode.style.background = this.carousels[index].bg
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel-box-container {
  position: relative;

  .carousel {
    img {
      display: block;
      width: 100%;
    }
  }
  .zones {
    position: absolute;
    left: 0;
    bottom: 0px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 10px;
    z-index: $zindex-affix;

    img {
      display: block;
      height: 100px;
      width: auto;
    }
  }
}
</style>

<style scoped>
.carousel >>> .vu-carousel-arrow {
  top: 40%;
  width: 50px;
  height: 50px;
  font-size: 30px;
  background-color: rgba(220, 180, 110, 0.6);
}
.carousel >>> .vu-carousel-arrow:hover {
  background-color: rgba(220, 180, 110, 0.8);
}
.carousel >>> .vu-carousel-dots {
  bottom: 25%;
}
.carousel >>> .vu-carousel-dots button {
  background: #dcb46e;
  height: 5px;
}
</style>

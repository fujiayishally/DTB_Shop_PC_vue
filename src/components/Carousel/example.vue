<template>
  <div>
    <div class="demo">
      <p>基础使用</p>
      <div>
        <Carousel v-model="value1" loop autoplay>
          <CarouselItem>
            <div class="demo-carousel">1</div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">2</div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">3</div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">4</div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel/index.js'

export default {
  components: { Carousel, CarouselItem: Carousel.CarouselItem },
  data() {
    return { value1: 0 }
  },
}
</script>

<style lang="scss" scoped>
.demo {
  margin: 20px;
  padding: 20px 20px 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  & > p {
    font-weight: bold;
    margin: 10px 0;
  }
  .demo-carousel {
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
  }
}
</style>

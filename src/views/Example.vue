<template>
  <div class="example">
    <div v-if="componentName"></div>
    <h1>{{ componentName }}</h1>
    <component :is="componentName"></component>
  </div>
</template>
<script>
export default {
  components: {
    buttonExample: () => import(`../components/Button/example.vue`),
    carouselExample: () => import(`../components/Carousel/example.vue`),
  },
  data() {
    return {
      componentName: '',
    }
  },
  watch: {
    $route: {
      handler({ params }) {
        this.componentName = `${params.component}Example`
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.example {
  width: $screen-xl;
  margin: auto;

  h1 {
    margin: 20px;
  }
}
</style>

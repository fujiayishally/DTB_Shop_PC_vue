<template>
  <div>
    <div class="category-title">商品分类</div>
    <div class="category-menu">分类模块</div>
  </div>
</template>

<script>
export default {
  name: 'HomeCategory',
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.category-title {
  height: 45px;
  line-height: 45px;
  font-weight: bold;
  text-align: center;
  background: #f8cb7c;
}

.category-menu {
  background-color: #251d1d;
}
</style>

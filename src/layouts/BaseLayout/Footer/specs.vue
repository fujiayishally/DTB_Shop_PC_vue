<template>
  <div class="specs">
    <div class="spec" v-for="(spec, index) in specs" :key="index">
      <Icon :type="spec.icon" png size="44px" />
      <div>
        <div class="spec-title">{{ spec.title }}</div>
        <div class="spec-des">{{ spec.des }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterSpecs',
  props: {
    specs: {
      type: Array,
      default() {
        return []
      },
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.specs {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: solid 1px $border-color-base;
  .spec {
    flex: 1;
    display: flex;
    align-items: center;
    // border: solid 1px black;
    & > * {
      float: left;
    }
    &-title {
      margin: 4px 8px;
      font-size: 18px;
      font-weight: bold;
    }
    &-des {
      margin: 4px 8px;
      color: $text-color-secondary;
    }
  }
}
</style>

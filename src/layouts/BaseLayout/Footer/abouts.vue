<template>
  <div class="abouts">
    <div class="about-links">
      <router-link
        v-for="(link, index) in aboutLinks"
        :key="index"
        :to="link.href"
        >{{ link.text }}</router-link
      >
    </div>
    <div class="search"></div>
  </div>
</template>

<script>
export default {
  name: 'FooterAbouts',
  props: {
    aboutLinks: {
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
.abouts {
  display: flex;
  margin: 15px 0;
  .about-links {
    display: flex;
    justify-content: space-between;
    flex: 7;
  }
  .search {
    flex: 3;
  }
}
</style>

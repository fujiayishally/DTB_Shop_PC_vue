<template>
  <div class="category">
    <div class="category-title">商品分类</div>
    <div class="category-menu-container" @mouseleave="currIndex = void 0">
      <ul class="category-menu">
        <li
          v-for="(menu, index) in menuTree"
          :key="menu.pid"
          class="category-menu-item"
          @mouseover="handleMenuHover(index)"
          :data-pid="menu.pid"
        >
          <router-link :to="menu | filterLink">{{ menu.text }}</router-link>
          <span>/</span>
          <router-link :to="menu.children[0] | filterLink">{{
            menu.children[0].text
          }}</router-link>
          <router-link :to="menu.children[1] | filterLink">{{
            menu.children[1].text
          }}</router-link>
        </li>
      </ul>
      <div class="category-float" v-show="currIndex !== void 0">
        <div
          v-for="flot in menuFlots"
          :key="flot.index"
          v-show="currIndex === flot.index"
          :data-index="flot.index"
        >
          <div v-for="subMenu in flot.children" class="float-item">
            <h5>
              <router-link :to="subMenu | filterLink">{{
                subMenu.text
              }}</router-link>
              <Icon type="right" />
            </h5>
            <div
              v-for="item in subMenu.children"
              :key="item.cid"
              class="float-item-link"
            >
              <router-link :to="item | filterLink">{{ item.text }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCategory',
  inject: ['HomeVue'],
  computed: {
    menuTree() {
      return this.HomeVue.menuTree
    },
  },
  data() {
    return {
      currIndex: null,
      menuFlots: [],
    }
  },
  filters: {
    filterLink(menu) {
      return `/products/${menu.pid}/${menu.cid}`
    },
  },
  methods: {
    handleMenuHover(index) {
      const { menuFlots, menuTree } = this
      this.currIndex = index

      for (let i = 0; i < menuFlots.length; i++) {
        if (menuFlots[i].index === index) return
      }

      let subMenu = {
        index: index,
        children: menuTree[index].children,
      }
      menuFlots.push(subMenu)
    },
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
.category-menu-container {
  position: relative;

  .category-menu {
    color: #fff;
    background-color: #251d1d;
    overflow: hidden;

    .category-menu-item {
      margin: 25px 0 30px 0;
      padding-left: 18px;
      line-height: 32px;
      transition: background $transition-time linear;

      &:hover {
        background: hsla(0, 0, 100%, 0.3);
      }
      span {
        margin: 0 6px 0 10px;
      }
      a:not(:first-child) {
        font-size: 12px;
        color: #ccc;
        font-weight: normal;
        margin-right: 4px;
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
  .category-float {
    position: absolute;
    top: 0;
    left: 100%;
    width: 740px;
    height: 100%;
    padding: 15px 20px;
    background-color: #fff;
    z-index: $zindex-select;
    .float-item {
      padding: 10px 0;
      display: flex;
      color: #666;

      h5 {
        font-size: 13px;
        a {
          display: inline-block;
          width: 5em;
          text-align: justify;
          text-align-last: justify;
        }
        span {
          margin: 0 5px 0 3px;
        }
      }

      .float-item-link {
        padding: 0 8px;
        border-left: 1px solid $border-color-split;
      }
    }
  }
}
</style>

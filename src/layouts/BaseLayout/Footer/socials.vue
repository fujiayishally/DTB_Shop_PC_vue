<template>
  <div class="socials">
    <div class="title-tags">
      <div v-for="(tag, index) in socialTags" :key="index" class="tag">
        <div class="tag-content">
          <Icon v-if="tag.icon" png :type="tag.icon" size="20px" />
          <span>{{ tag.text }}</span>
        </div>
      </div>
    </div>
    <div class="social-tags">
      <div v-for="(tag, index) in socialLinks" :key="index" class="tag">
        <router-link :to="tag.href" class="tag-content">
          <Icon png :type="tag.icon" size="30px" />
          <span>{{ tag.text }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterSocials',
  props: {
    socialLinks: {
      type: Array,
      default() {
        return []
      },
      require: true,
    },
    socialTags: {
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
.socials {
  position: relative;
  margin-bottom: 20px;
  line-height: 30px;
  border: solid 1px $border-color-base;

  .title-tags,
  .social-tags {
    display: flex;
    justify-content: space-between;
    .tag {
      flex: 1;
      display: inline-block;
      text-align: center;
      .tag-content {
        display: inline-block;
        background: #fff;
      }
    }
  }

  .title-tags {
    position: absolute;
    width: 100%;
    top: -25%;
    left: 0;

    .tag-content:before,
    .tag-content:after {
      content: '';
      display: inline-block;
      @include square(5px);
      border-radius: 50%;
      background-color: $border-color-base;
      vertical-align: 3px;
    }
    .tag-content:before {
      margin-right: 5px;
    }
    .tag-content:after {
      margin-left: 5px;
    }
  }
  .social-tags {
    padding: 15px;
    .tag:not(:first-child) {
      border-left: solid 1px $border-color-split;
    }
  }
}
</style>

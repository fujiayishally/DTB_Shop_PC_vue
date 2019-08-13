<template>
  <div class="features">
    <div class="feature-links">
      <div v-for="(item, indexO) in featureLinks" :key="indexO" class="feature">
        <dt>{{ item.title }}</dt>
        <dd v-for="(link, indexI) in item.links" :key="indexI">
          <router-link :to="link.href">{{ link.text }}</router-link>
        </dd>
      </div>
    </div>
    <div class="qrcode-links">
      <div v-for="(qrCode, index) in qrCodes" :key="index" class="qrCode">
        <img :src="qrCode.src" :alt="qrCode.text" />
        <p>{{ qrCode.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterFeatures',
  props: {
    featureLinks: {
      type: Array,
      default() {
        return []
      },
      require: true,
    },
    qrCodes: {
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
.features {
  padding-top: 25px;
  padding-bottom: 10px;
  display: flex;
  align-items: space-between;

  .feature-links {
    flex: 6;
    display: flex;
    .feature {
      flex: 1;
      dt {
        font-size: #666;
        font-weight: bold;
      }
      dd {
        font-size: $font-size-small;
        color: $text-color;
        margin: 8px 0;
      }
    }
  }
  .qrcode-links {
    flex: 4;

    .qrCode {
      float: right;
      margin: 0 15px;
      width: 90px;
      text-align: center;
      img {
        @include square(90px);
      }
    }
  }
}
</style>

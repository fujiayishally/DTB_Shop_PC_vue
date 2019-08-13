<template>
  <div class="shop-header">
    <div class="logo">
      <router-link to="/home">
        <img
          src="https://dtb315.com/Static//pc/home/images/logo.png?v=1pclfhm"
        />
      </router-link>
    </div>
    <div class="search">aa</div>
    <dir class="qrcode">
      <img
        src="https://dtb315.com/Static//public/images/dtb_home_page.png?v=182xir9"
      />
      <div>点击下载二维码</div>
    </dir>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.shop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: $screen-xl;
  margin: 20px auto;
  text-align: center;
  .logo {
    flex: 2;
    display: inline-block;
    img {
      display: inline-block;
      width: 130px;
    }
  }
  .search {
    flex: 6;
    display: inline-block;
  }
  .qrcode {
    flex: 2;
    display: inline-block;

    img {
      display: inline-block;
      width: 80px;
    }
  }
}
</style>

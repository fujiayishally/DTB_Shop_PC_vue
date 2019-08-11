<template>
  <div class="base-layout-header">
    <UserInfoBar />
    <ShopHeaderBar />
  </div>
</template>

<script>
import UserInfoBar from './UserInfoBar'
import ShopHeaderBar from './ShopHeaderBar'
export default {
  name: 'BaseLayoutHeader',
  components: { UserInfoBar, ShopHeaderBar },
}
</script>

<style lang="scss">
.base-layout-header {
  box-shadow: $shadow-down;
}
</style>

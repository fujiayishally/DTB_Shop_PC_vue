<template>
  <div class="user-info-bar">
    <div class="inner">
      <div>
        <router-link to="#" class="primary">首页</router-link>
        <router-link to="#" class="primary">登陆</router-link>
        <router-link to="#">注册</router-link>
        <router-link to="#">消息</router-link>
      </div>
      <div>
        <router-link to="#">我的购物车(0)</router-link>
        <router-link to="#">
          我的订单
          <Icon type="down" />
        </router-link>
        <router-link to="#">
          客服中心
          <Icon type="down" />
        </router-link>
        <router-link to="#"> <Icon type="mobile" />手机版 </router-link>
        <!-- <router-link to="#">
          <Button
            type="primary"
            size="mini"
            right-icon="circle-o-right"
            icon-size="15"
            round
            >综合办公室</Button
          >
        </router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLayoutHeaderUserInfoBar',
}
</script>

<style lang="scss">
.user-info-bar {
  height: 36px;
  line-height: 36px;
  background: #333;

  .inner {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: $screen-xl;
    a {
      color: $normal-color;
      &.primary {
        color: $primary-color;
      }
      &:not(:first-child):before {
        content: '|';
        margin: 0 8px;
      }
    }

    //     .icon-svg {
    //       margin-top: 0.15em;
    //     }
  }
}
</style>

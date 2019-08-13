<template>
  <div class="user-info-bar">
    <div class="inner">
      <div class="link-list">
        <div class="link-item">
          <router-link to="#" class="primary">首页</router-link>
        </div>
        <div class="link-item">
          <router-link to="#" class="primary">登陆</router-link>
        </div>
        <div class="link-item">
          <router-link to="#">注册</router-link>
        </div>
        <div class="link-item">
          <router-link to="#">消息</router-link>
        </div>
      </div>
      <div class="link-list">
        <div class="link-item">
          <router-link to="#">我的购物车(0)</router-link>
        </div>
        <div class="link-item">
          <router-link to="#">
            我的订单
            <Icon type="down" />
          </router-link>
        </div>
        <div class="link-item">
          <router-link to="#">
            客服中心
            <Icon type="down" />
          </router-link>
        </div>
        <div class="link-item">
          <router-link to="#"> <Icon type="mobile" />手机版 </router-link>
        </div>
        <div class="link-item">
          <Button to="#" type="primary" size="small" shape="circle">
            <span>综合办公室</span>
            <Icon type="circle-o-right" size="14px" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLayoutHeaderUserInfoBar',
}
</script>

<style lang="scss" scoped>
.user-info-bar {
  height: 36px;
  line-height: 36px;
  background: #333;

  .inner {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: $screen-xl;

    .link-list {
      .link-item {
        display: inline-block;
        &:not(:first-child):before {
          content: '|';
          color: $border-color-split;
          margin: 0 8px;
        }

        a {
          color: $normal-color;
        }
        .primary {
          color: $primary-color;
        }
        .vu-btn {
          color: #fff;
          vertical-align: 0.05em;
        }
      }
    }
  }
}
</style>

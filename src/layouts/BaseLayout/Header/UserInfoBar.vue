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
          <Dropdown class="dropdown">
            <router-link to="#">
              我的订单
              <Icon type="down" />
            </router-link>
            <DropdownMenu slot="list">
              <DropdownItem>
                <router-link to="#">待付款</router-link>
              </DropdownItem>
              <DropdownItem divided>
                <router-link to="#">待发货</router-link>
              </DropdownItem>
              <DropdownItem divided>
                <router-link to="#">待收货</router-link>
              </DropdownItem>
              <DropdownItem divided>
                <router-link to="#">已收货</router-link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="link-item">
          <Dropdown class="dropdown">
            <router-link to="#">
              客服中心
              <Icon type="down" />
            </router-link>
            <DropdownMenu slot="list">
              <DropdownItem>
                <router-link to="#">在线客服</router-link>
              </DropdownItem>
              <DropdownItem divided>
                <router-link to="#">电话客服</router-link>
              </DropdownItem>
              <DropdownItem divided>
                <router-link to="#">微信客服</router-link>
              </DropdownItem>
              <DropdownItem divided>
                <router-link to="#">帮助中心</router-link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
    color: $normal-color;

    .link-list {
      .link-item {
        display: inline-block;
        &:not(:first-child):before {
          content: '|';
          color: $border-color-split;
          margin: 0 8px;
        }
        .primary {
          color: $primary-color;
        }
        .vu-btn {
          color: #fff;
          vertical-align: 0.05em;
        }
        .dropdown {
          line-height: 1.5;
          text-align: center;

          .vu-drop {
            color: #666;
          }
          .vu-dropdown-menu {
            min-width: 90px;
          }
          .vu-dropdown-item:hover {
            background: #fff;
            color: $primary-color;
          }
        }
      }
    }
  }
}
</style>

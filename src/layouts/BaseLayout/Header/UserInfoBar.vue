<template>
  <div class="userInfoBar">
    <div class="innerWrapper">
      <div>
        <VLink to="#" :color="BaseColor">首页</VLink>
        <VLink to="#" :color="BaseColor">登陆</VLink>
        <VLink to="#">注册</VLink>
        <VLink to="#">消息</VLink>
      </div>
      <div>
        <VLink to="#">我的购物车(0)</VLink>
        <VLink to="#">
          我的订单
          <IconSvg type="down" />
        </VLink>
        <VLink to="#">
          客服中心
          <IconSvg type="down" />
        </VLink>
        <VLink to="#"> <IconSvg type="mobile" />手机版 </VLink>
        <VLink to="#">
          <Button
            type="primary"
            size="mini"
            right-icon="circle-o-right"
            icon-size="15"
            round
            >综合办公室</Button
          >
        </VLink>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseColor } from '@/assets/styles/color.scss'

export default {
  data() {
    return { BaseColor }
  },
}
</script>

<style lang="scss" scoped>
.userInfoBar {
  height: 36px;
  line-height: 36px;
  background: $Dark;

  .innerWrapper {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: $viewportWidth;
  }
  a {
    color: $LightWhite;
    &:not(:first-child):before {
      content: '|';
      margin: 0 8px;
      color: $LightWhite;
    }

    .icon-svg {
      margin-top: 0.15em;
    }
  }
}
</style>

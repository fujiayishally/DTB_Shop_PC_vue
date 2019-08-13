<template>
  <div class="base-layout-footer">
    <div class="inner">
      <Specs :specs="specs" />
      <Features :feature-links="featureLinks" :qr-codes="qrCodes" />
      <Socials :social-links="socialLinks" :social-tags="socialTags" />
      <Abouts :about-links="aboutLinks" />
      <CopyRight />
    </div>
  </div>
</template>

<script>
const specs = [
  { icon: 'spec1', title: '正品保障', des: '平台甄选 严格把关' },
  { icon: 'spec2', title: '会员特权', des: '点评消费 消费特权' },
  { icon: 'spec3', title: '特色服务', des: '购物智慧导航' },
  { icon: 'spec4', title: '售后服务', des: '正品保证 7天无理由退换货' },
]
const featureLinks = [
  {
    title: '使用帮助',
    links: [
      {
        text: '常见问题',
        href: '#',
      },
      {
        text: '手机端问题',
        href: '#',
      },
      {
        text: '电脑端问题',
        href: '#',
      },
      {
        text: '新手指南',
        href: '#',
      },
      {
        text: '购物流程',
        href: '#',
      },
    ],
  },
  {
    title: '厂家帮助',
    links: [
      {
        text: '商家入驻规则',
        href: '#',
      },
      {
        text: '后台功能介绍',
        href: '#',
      },
      {
        text: '常见问题',
        href: '#',
      },
      {
        text: '服务商入驻',
        href: '#',
      },
    ],
  },
  {
    title: '售后服务',
    links: [
      {
        text: '售后服务总则',
        href: '#',
      },
      {
        text: '退换货运费',
        href: '#',
      },
      {
        text: '争议处理规则',
        href: '#',
      },
    ],
  },
  {
    title: '生命驾校',
    links: [
      {
        text: '分校答疑解惑',
        href: '#',
      },
      {
        text: '分校常识、规则',
        href: '#',
      },
      {
        text: '公益分校',
        href: '#',
      },
    ],
  },
]
const qrCodes = [
  {
    text: '扫码关注点通宝官方公众号',
    src:
      'https://dtb315.com/Static//public/images/attention_WeChat.png?v=6dkcpn',
  },
  {
    text: '扫码下载点通宝APP',
    src: 'https://dtb315.com/Static//public/images/download_app.png?v=pngz2c',
  },
]
const socialLinks = [
  { icon: 'bottom-1', text: '首页', href: '#' },
  { icon: 'bottom-2', text: '购物宝', href: '#' },
  { icon: 'bottom-3', text: '智慧通', href: '#' },
  { icon: 'bottom-4', text: '孝悌通', href: '#' },
  { icon: 'bottom-5', text: '资讯通', href: '#' },
  { icon: 'bottom-6', text: '服务通', href: '#' },
  { icon: 'bottom-7', text: '积福宝', href: '#' },
  { icon: 'bottom-8', text: '财富宝', href: '#' },
  { icon: 'bottom-9', text: '我的办公室', href: '#' },
]
const socialTags = [
  { text: '健康人类' },
  { text: '和谐社会' },
  { icon: 'dtb-logo', text: '点通宝' },
  { text: '关爱生命' },
  { text: '呵护地球' },
]
const aboutLinks = [
  { text: '走进大健', href: '#' },
  { text: '康关于我们', href: '#' },
  { text: '平台简介', href: '#' },
  { text: '平台体系', href: '#' },
  { text: '运营架构', href: '#' },
  { text: '合作方式', href: '#' },
  { text: '服务流程', href: '#' },
  { text: '帮助中心', href: '#' },
  { text: '波罗密音', href: '#' },
  { text: '消费创富', href: '#' },
]

import Specs from './specs'
import Features from './features'
import Socials from './socials'
import Abouts from './abouts'
import CopyRight from './copyright'
export default {
  components: { Specs, Features, Socials, Abouts, CopyRight },
  data() {
    return {
      specs,
      featureLinks,
      qrCodes,
      socialLinks,
      socialTags,
      aboutLinks,
    }
  },
}
</script>

<style lang="scss">
.base-layout-footer {
  clear: both;
  overflow: hidden;
  box-shadow: $shadow-up;
  background: #fff;
  padding-bottom: 50px;

  .inner {
    width: $screen-xl;
    margin: auto;
    a {
      color: $text-color;
      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>

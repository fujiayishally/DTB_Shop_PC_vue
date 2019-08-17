<template>
  <div>
    <div class="user-box-title">
      <span>放松生活</span>
      <span>来点零食</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeUserBox',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.user-box-title {
  height: 45px;
  line-height: 45px;
  font-weight: bold;
  text-align: center;
  background: #fff5e5;
  font-size: 16px;

  & > span:first-child {
    color: #4f4e4c;
    margin-right: 10px;
  }
  & > span:last-child {
    color: #84cf83;
  }
}
</style>

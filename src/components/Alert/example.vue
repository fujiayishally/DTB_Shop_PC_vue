<template>
  <div>
    <Button type="save" @click="handleAlert1">打开提示1</Button>
    <Button type="info" @click="handleAlert2">打开提示1</Button>
  </div>
</template>

<script>
export default {
  methods: {
    handleAlert1() {
      this.$Alert.info({
        content: "I'm message 1",
      })
    },
    handleAlert2() {
      this.$Alert.info({
        content: "I'm message 2",
      })
    },
  },
}
</script>

<style></style>

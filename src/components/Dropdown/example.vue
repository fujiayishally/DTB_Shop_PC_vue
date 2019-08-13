<template>
  <div>
    <div class="demo">
      <Dropdown trigger="click" @on-click="handleClick">
        <Button type="info">
          <span>按钮</span>
          <Icon type="down" />
        </Button>

        <DropdownMenu slot="list">
          <DropdownItem name="驴打滚">驴打滚</DropdownItem>
          <DropdownItem name="炸酱面">炸酱面</DropdownItem>
          <DropdownItem name="豆汁儿" disabled>豆汁儿</DropdownItem>
          <DropdownItem name="冰糖葫芦">冰糖葫芦</DropdownItem>
          <DropdownItem name="北京烤鸭" divided>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    handleClick(key) {
      console.log(key)
    },
  },
}
</script>

<style lang="scss" scoped>
.demo {
  margin: 10px;
  padding: 10px;
  border: solid 1px #ccc;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
}
</style>

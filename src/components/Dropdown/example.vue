<template>
  <div>
    <div class="demo">
      <p>基础用法</p>
      <Dropdown @on-click="handleClick">
        <Button type="info">
          <span>下拉菜单</span>
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

      <Dropdown
        @on-click="handleClick"
        :transfer="true"
        transfer-class-name="customClass"
      >
        <Button type="info">
          <span>transfer 下拉菜单</span>
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
    <div class="demo">
      <p>触发方式</p>
      <Dropdown>
        <Button type="info">
          hover 触发
          <Icon type="down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click">
        <Button type="info">
          click 触发
          <Icon type="down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="contextMenu">
        <Button type="info">
          right click 触发
          <Icon type="down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>返回</DropdownItem>
          <DropdownItem style="color: #ed4014">删除</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="custom" :visible="visible">
        <Button type="info" @click="handleOpen">
          custom 触发
          <Icon type="down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <p>常用于各种自定义下拉内容的场景。</p>
          <div style="text-align: right;margin:10px;">
            <Button type="info" @click="handleClose">关闭</Button>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleClick(key) {
      console.log(key)
    },
    handleOpen() {
      this.visible = true
    },
    handleClose() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss">
.demo {
  margin: 10px;
  padding: 10px;
  border: solid 1px #ccc;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;

  .vu-dropdown {
    margin-right: 10px;
  }
}
</style>

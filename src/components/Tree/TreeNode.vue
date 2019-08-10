<template>
  <ul class="tree-ul">
    <li class="tree-li">
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand"
          >+</span
        >
        <span v-if="data.children && data.children.length && data.expand"
          >-</span
        >
      </span>
      <CheckBox
        v-if="showCheckBox"
        :value="data.checked"
        @input="handleCheck"
      ></CheckBox>
      <span>{{ data.title }}</span>
      <template v-if="data.expand">
        <TreeNode
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :show-check-box="showCheckBox"
        ></TreeNode>
      </template>
    </li>
  </ul>
</template>

<script>
import CheckBox from '@/components/CheckBox'
import { findComponentUpward } from '@/utils/assist'
export default {
  name: 'TreeNode',
  components: { CheckBox },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    showCheckBox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tree: findComponentUpward(this, 'Tree'),
    }
  },
  watch: {
    'data.children': {
      handler(data) {
        if (data) {
          const checkAll = !data.some(item => !item.checked)
          this.$set(this.data, 'checked', checkAll)
        }
      },
      deep: true,
    },
  },
  methods: {
    handleExpand() {
      this.$set(this.data, 'expand', !this.data.expand)
      if (this.tree) {
        this.tree.emitEvent('on-toggle-expand', this.data)
      }
    },
    handleCheck(checked) {
      this.updateTreeDown(this.data, checked)
      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.data)
      }
    },
    // 父节点选中，子节点也全选中，反之亦然
    updateTreeDown(data, checked) {
      this.$set(data, 'checked', checked)

      if (data.children && data.children.length) {
        data.children.forEach(child => {
          this.updateTreeDown(child, checked)
        })
      }
    },
  },
}
</script>

<style lang="scss">
.tree-ul {
  .tree-li {
    list-style: none;
    padding-left: 10px;
  }
  .tree-expand {
    cursor: pointer;
  }
}
</style>

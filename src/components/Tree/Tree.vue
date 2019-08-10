<template>
  <dir>
    <TreeNode
      v-for="(item, index) in cloneData"
      :key="index"
      :data="item"
      :show-check-box="showCheckBox"
    ></TreeNode>
  </dir>
</template>

<script>
import TreeNode from './TreeNode'
import { deepCopy } from '@/utils/assist.js'
export default {
  name: 'Tree',
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    showCheckBox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cloneData: [],
    }
  },
  created() {
    this.rebuildData()
  },
  watch: {
    data() {
      this.rebuildData()
    },
  },
  methods: {
    rebuildData() {
      this.cloneData = deepCopy(this.data)
    },
    emitEvent(eventName, data) {
      this.$emit(eventName, data, this.cloneData)
    },
  },
}
</script>

<style></style>

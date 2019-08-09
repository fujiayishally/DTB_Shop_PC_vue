<template>
  <div>
    <h3>单独使用 checkbox</h3>
    <CheckBox v-model="single">单选框</CheckBox>

    <h3>组合使用 checkbox group</h3>
    <CheckBoxGroup v-model="multiple">
      <CheckBox label="options1">选项 1</CheckBox>
      <CheckBox label="options2">选项 2</CheckBox>
      <CheckBox label="options3">选项 3</CheckBox>
      <CheckBox label="options4">选项 4</CheckBox>
    </CheckBoxGroup>
  </div>
</template>

<script>
import CheckBoxGroup from '@/components/CheckBox/CheckBoxGroup'
import CheckBox from '@/components/CheckBox/CheckBox'

export default {
  components: { CheckBoxGroup, CheckBox },
  data() {
    return {
      single: false,
      multiple: ['options1', 'options3'],
    }
  },
}
</script>

<style></style>

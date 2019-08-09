<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '@/utils/assist'
import Emitter from '@/mixins/Emitter'
export default {
  name: 'CheckBoxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.value,
      children: [],
    }
  },
  watch: {
    value() {
      this.updateModel(true)
    },
  },
  mounted() {
    this.updateModel(true)
  },
  methods: {
    updateModel(update) {
      this.children = findComponentsDownward(this, 'CheckBox')
      if (this.children) {
        const value = this.value
        this.children.forEach(child => {
          child.model = value

          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0
            child.group = true
          }
        })
      }
    },
    handleChange(model) {
      this.currentValue = model
      this.$emit('input', model)
      this.$emit('on-change', model)
      this.dispatch('FormItem', 'on-form-change', model)
    },
  },
}
</script>

<style></style>

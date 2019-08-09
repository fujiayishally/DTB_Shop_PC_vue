<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="handleChange"
      />
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="handleChange"
      />
    </span>
    <slot></slot>
  </label>
</template>

<script>
import Emitter from '@/mixins/Emitter'
import { findComponentUpward } from '@/utils/assist'
export default {
  name: 'CheckBox',
  mixins: [Emitter],
  props: {
    label: {
      type: [String, Number, Boolean],
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.value,
      parent: null,
      group: false,
      model: [],
    }
  },
  watch: {
    value(val) {
      console.log('watch val')
      if (val === this.trueValue || val === this.falseValue) this.updateModel()
      else throw 'Value should be trueValue of falseValue'
    },
  },
  mounted() {
    this.parent = findComponentUpward(this, 'CheckBoxGroup')

    if (this.parent) this.group = true

    if (this.group) this.parent.updateModel(true)
    else this.updateModel()
  },
  methods: {
    updateModel() {
      this.currentValue = this.value === this.trueValue
    },
    handleChange(event) {
      if (this.disabled) return false

      const checked = event.target.checked
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)

      if (this.group) {
        this.parent.handleChange(this.model)
      } else {
        this.$emit('on-change', value)
        this.disabled('FormItem', 'on-form-change', value)
      }
    },
  },
}
</script>

<style></style>

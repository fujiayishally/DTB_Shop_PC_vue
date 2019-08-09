<template>
  <div>
    <label v-if="label" :class="{ 'form-item-label-required': isRequired }">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '@/mixins/Emitter'
import AsyncValidator from 'async-validator'

export default {
  name: 'FormItem',
  inject: ['form'],
  mixins: [Emitter],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      validateState: '', //校验状态
      validateMessage: '', //校验不通过时的提示信息
      isRequired: false, //是否必填
    }
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop]
    },
  },
  mounted() {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    if (this.prop) {
      // 组件渲染时通知父组件Form缓存实例
      this.dispatch('Form', 'on-form-item-add', this)

      // 监听子组件事件，以便在更改时进行验证
      this.$on('on-form-change', this.onFieldChange)
      this.$on('on-form-blur', this.onFieldBlur)

      // 设置初始值，以便在重置时回复默认值
      this.initialValue = this.fieldValue

      this.setRules()
    }
  },
  beforeDestroy() {
    if (this.prop) {
      this.dispatch('Form', 'on-form-item-remove', this)
    }
  },
  methods: {
    // 从Form 的 rules 属性中，获取当前FormItem 的校验规则
    getRules() {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || [])
    },
    setRules() {
      let rules = this.getRules()
      if (rules.length) {
        rules.every(rule => {
          this.isRequired = rule.required
        })
      }
    },
    // 只支持blur 和 change， 过滤出符合要求的rule规则
    getFilteredRule(trigger) {
      let rules = this.getRules()
      return rules.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1,
      )
    },
    // 校验数据
    validate(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) return true

      // 设置状态为校验中
      this.validateState = 'validating'

      // 调用方法库
      let descriptor = {}
      descriptor[this.prop] = rules

      let model = {}
      model[this.prop] = this.fieldValue

      const validator = new AsyncValidator(descriptor)
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = errors ? 'error' : 'success'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage)
      })
    },
    // 重置数据
    resetField() {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
    },
    onFieldChange() {
      this.validate('change')
    },
    onFieldBlur() {
      this.validate('blur')
    },
  },
}
</script>

<style>
.form-item-label-required:before {
  content: '*';
  color: red;
}
.form-item-message {
  color: red;
}
</style>

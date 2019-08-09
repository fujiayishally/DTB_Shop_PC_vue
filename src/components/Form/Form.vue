<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Form',
  provide() {
    return { form: this }
  },
  props: {
    model: {
      type: Object,
      default() {
        return {}
      },
    },
    rules: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      fields: [],
    }
  },
  created() {
    this.$on('on-form-item-add', field => {
      if (field) this.fields.push(field)
    })
    this.$on('on-form-item-remove', field => {
      if (field && field.prop) this.fields.splice(this.fields.indexOf(field), 1)
    })
  },
  methods: {
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    // 公开方法：全部校验数据，支持promise
    validate(callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0

        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              resolve(valid)

              if (typeof callback === 'function') callback(valid)
            }
          })
        })
      })
    },
  },
}
</script>

<style></style>

<template>
  <div>
    <h3>具有数据校验功能的表单组件——Form</h3>
    <Form ref="form" :model="formValidate" :rules="ruleValidate">
      <FormItem label="用户名" prop="name">
        <Input v-model="formValidate.name" />
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="formValidate.email" />
      </FormItem>
    </Form>

    <Button type="save" @click="handleSubmit">提交</Button>
    <Button type="save" @click="handleReset">重置</Button>
  </div>
</template>

<script>
import Form from '@/components/Form/Form'
import FormItem from '@/components/Form/FormItem'
import Input from '@/components/Input/Input'
export default {
  components: { Form, FormItem, Input },
  data() {
    return {
      formValidate: {
        name: 'shally',
        email: '',
      },
      ruleValidate: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleSubmit() {
      // 使用方法一：普通回调
      // this.$refs.form.validate(valid => {
      //   if (valid) console.log('提交成功')
      //   else console.log('提交失败')
      // })

      // 使用方法二：Promise
      const validate = this.$refs.form.validate()
      validate.then(valid => {
        if (valid) console.log('提交成功')
        else console.log('提交失败')
      })
    },
    handleReset() {
      this.$refs.form.resetFields()
    },
  },
}
</script>

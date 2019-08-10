<template>
  <div>
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import Table from './Table'

export default {
  components: { Table },
  data() {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
          render: (h, { row, index }) => {
            let edit
            // 当前为正在编辑行
            if (this.editIndex === index) {
              edit = [
                h('input', {
                  domProps: {
                    value: this.editName,
                  },
                  on: {
                    input: event => {
                      this.editName = event.target.value
                    },
                  },
                }),
              ]
            } else {
              edit = row.name
            }
            return h('div', [edit])
          },
        },
        {
          title: '年龄',
          key: 'age',
          render: (h, { row, index }) => {
            let edit
            // 当前为正在编辑行
            if (this.editIndex === index) {
              edit = [
                h('input', {
                  domProps: {
                    value: this.editAge,
                  },
                  on: {
                    input: event => {
                      this.editAge = event.target.value
                    },
                  },
                }),
              ]
            } else {
              edit = row.age
            }
            return h('div', [edit])
          },
        },
        {
          title: '出生日期',
          key: 'birthday',
          render: (h, { row, index }) => {
            let edit
            // 当前为正在编辑行
            if (this.editIndex === index) {
              edit = [
                h('input', {
                  domProps: {
                    value: this.editBirthday,
                  },
                  on: {
                    input: event => {
                      this.editBirthday = event.target.value
                    },
                  },
                }),
              ]
            } else {
              let birthday = new Date(parseInt(row.birthday))
              birthday = birthday.toISOString().substr(0, 10)
              return h('span', birthday)
            }
            return h('div', [edit])
          },
        },
        {
          title: '地址',
          key: 'address',
          render: (h, { row, index }) => {
            let edit
            // 当前为正在编辑行
            if (this.editIndex === index) {
              edit = [
                h('input', {
                  domProps: {
                    value: this.editAddress,
                  },
                  on: {
                    input: event => {
                      this.editAddress = event.target.value
                    },
                  },
                }),
              ]
            } else {
              edit = row.address
            }
            return h('div', [edit])
          },
        },
        {
          title: '操作',
          render: (h, { row, index }) => {
            // 如果当前行是编辑状态，则渲染两个按钮
            if (this.editIndex === index) {
              return [
                h(
                  'button',
                  {
                    on: {
                      click: () => {
                        this.data[index].name = this.editName
                        this.data[index].age = this.editAge
                        this.data[index].birthday = this.editBirthday
                        this.data[index].address = this.editAddress
                        this.editIndex = -1
                      },
                    },
                  },
                  '保存',
                ),
                h(
                  'button',
                  {
                    style: {
                      marginLeft: '6px',
                    },
                    on: {
                      click: () => {
                        this.editIndex = -1
                      },
                    },
                  },
                  '取消',
                ),
              ]
            } else {
              return h(
                'button',
                {
                  on: {
                    click: () => {
                      this.editName = row.name
                      this.editAge = row.age
                      this.editBirthday = row.birthday
                      this.editAddress = row.address
                      this.editIndex = index
                    },
                  },
                },
                '修改',
              )
            }
          },
        },
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居',
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道',
        },
      ],
      editName: '',
      editAge: '',
      editBirthday: '',
      editAddress: '',
      editIndex: -1, //当前正在修改的行数，从0开始，点击修改按钮时改为正确
    }
  },
}
</script>

<style></style>

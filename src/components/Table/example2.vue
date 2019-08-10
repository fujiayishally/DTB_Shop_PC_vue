<template>
  <div>
    <Table :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="name">
        <input v-if="editIndex === index" type="text" v-model="editName" />
        <span v-else>{{ row.name }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="age">
        <input v-if="editIndex === index" type="text" v-model="editAge" />
        <span v-else>{{ row.age }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="birthday">
        <input v-if="editIndex === index" type="text" v-model="editBirthday" />
        <span v-else>{{ getBirthday(row.birthday) }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="address">
        <input v-if="editIndex === index" type="text" v-model="editAddress" />
        <span v-else>{{ row.address }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <button @click="handleSave(index)">保存</button>
          <button @click="editIndex = -1">取消</button>
        </div>
        <div v-else>
          <button @click="handleEdit(row, index)">修改</button>
        </div>
      </template>
    </Table>
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
          slot: 'name',
        },
        {
          title: '年龄',
          key: 'name',
          slot: 'age',
        },
        {
          title: '出生日期',
          key: 'birthday',
          slot: 'birthday',
        },
        {
          title: '地址',
          key: 'address',
          slot: 'address',
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action',
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
  methods: {
    getBirthday(date) {
      return new Date(parseInt(date)).toISOString().substr(0, 10)
    },
    handleSave(index) {
      this.data[index].name = this.editName
      this.data[index].age = this.editAge
      this.data[index].birthday = this.editBirthday
      this.data[index].address = this.editAddress
      this.editIndex = -1
    },
    handleEdit(row, index) {
      this.editName = row.name
      this.editAge = row.age
      this.editBirthday = row.birthday
      this.editAddress = row.address
      this.editIndex = index
    },
  },
}
</script>

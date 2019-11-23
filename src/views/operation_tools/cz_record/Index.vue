<template>
  <div>
    <h3>操作记录</h3>
    <a-input-search placeholder="请输入用户账号" style="width: 200px" @search="onSearch" />
    <br />
    <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination" @change="TableChange">
      <template slot="name" slot-scope="text">
        {{ text }}
      </template>

    </a-table>
  </div>

</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID'
  },
  {
    title: '账号',
    dataIndex: 'number',
    key: 'number'

  },
  {
    title: 'IP',
    dataIndex: 'IP',
    key: 'IP'
  },
  {
    title: '事件',
    dataIndex: 'fun1',
    key: 'fun1'
  },
  {
    title: '结果',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '事件',
    dataIndex: 'fun2',
    key: 'fun2'
  }
]

const data = [
  {
    key: '1',
    ID: '1',
    number: '张三',
    IP: '192.168.1.001',
    fun1: '东北',
    time: '2019/12/23',
    fun2: '2019/12/23'
  },
  {
    key: '2',
    ID: '2',
    number: '张三',
    IP: '192.168.1.001',
    fun1: '东北',
    time: '2019/12/23',
    fun2: '2019/12/23'
  },
  {
    key: '3',
    ID: '3',
    number: '张三',
    IP: '192.168.1.001',
    fun1: '东北',
    time: '2019/12/23',
    fun2: '2019/12/23'
  },

  {
    key: '4',
    ID: '4',
    number: '张三',
    IP: '192.168.1.001',
    fun1: '东北',
    time: '2019/12/23',
    fun2: '2019/12/23'
  },

  {
    key: '5',
    ID: '5',
    number: '张三',
    IP: '192.168.1.001',
    fun1: '东北',
    time: '2019/12/23',
    fun2: '2019/12/23'
  },
  {
    key: '6',
    ID: '6',
    number: '张三',
    IP: '192.168.1.001',
    fun1: '东北',
    time: '2019/12/23',
    fun2: '2019/12/23'
  }
]
const pagination = {
  defaultPageSize: 5,
  showTotal: total => `共 ${total} 条数据`,
  showSizeChanger: true,
  pageSizeOptions: ['5', '15', '20']
  // onShowSizeChange: (current, pageSize) => this.pageSize = pageSize
}
export default {
  data () {
    return {
      data,
      columns,
      pagination
    }
  },
  methods: {
    onSearch (value) {
      this.$notification.open({
        message: '平台提示',
        description:
            '你输入了' + value + '进行搜索',
        onClick: () => {
          console.log('Notification Clicked!')
        }
      })
      console.log(value)
    },
    TableChange (pagination, filters, sorter) {
      console.log(pagination)// 显示分页的数据信息
      console.log(filters)
      console.log(sorter)
    }
  }
}
</script>
<style>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
</style>

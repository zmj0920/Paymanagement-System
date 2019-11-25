<template>
  <div>
    <h3>接口白名单</h3>
    <a-button
      type="primary"
      @click="showModal"
    >
      添加IP
    </a-button>
    <br>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      :pagination="pagination"
      @change="TableChange"
    >
      <template
        slot="time"
        slot-scope="text, record"
      >
        <a-button
          type="primary"
          @click="() => Delete(record)"
        >
          删除
        </a-button>
        <a-button
          type="primary"
          @click="() => Update(record)"
        >
          编辑
        </a-button>
      </template>
    </a-table>
    <a-modal
      title="添加IP"
      v-model="visible"
      @ok="handleOk"
    >
      <p>
        <label>账号:</label>   <a-input
          placeholder="请输入账号"
          style="width: 200px"
        />
      </p>
      <p>
        <label>IP&nbsp;&nbsp;&nbsp;&nbsp;:</label>  <a-input
          placeholder="请输入IP"
          style="width: 200px"
        />
      </p>
      <p>
        <label>允许接口:</label>  <a-radio-group
          :options="options"
          @change="onChange2"
          v-model="value2"
        />
      </p>
      <template slot="footer">
        <a-button
          key="back"
          @click="handleCancel"
        >
          取消
        </a-button>
        <a-button
          key="submit"
          type="primary"
          @click="handleOk"
        >
          确认
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          key: '1',
          ID: '1',
          number: '张三',
          IP: '192.168.1.001',
          address: '东北'

        },
        {
          key: '2',
          ID: '2',
          number: '张三',
          IP: '192.168.1.001',
          address: '东北'

        },
        {
          key: '3',
          ID: '3',
          number: '张三',
          IP: '192.168.1.001',
          address: '东北'

        },

        {
          key: '4',
          ID: '4',
          number: '张三',
          IP: '192.168.1.001',
          address: '东北'

        },

        {
          key: '5',
          ID: '5',
          number: '张三',
          IP: '192.168.1.001',
          address: '东北'

        },
        {
          key: '6',
          ID: '6',
          number: '张三',
          IP: '192.168.1.001',
          address: '东北'

        }
      ],
      columns: [
        {
          title: '添加IP',
          dataIndex: 'ID',

          scopedSlots: { customRender: 'ID' }
        },
        {
          title: '用户账号',
          dataIndex: 'number',

          scopedSlots: { customRender: 'number' }

        },
        {
          title: 'IP',
          dataIndex: 'IP',

          scopedSlots: { customRender: 'IP' }
        },
        {
          title: '允许接口',
          dataIndex: 'address',

          scopedSlots: { customRender: 'address' }
        },
        {
          title: '操作',
          dataIndex: 'time',

          scopedSlots: { customRender: 'time' }
        }
      ],
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '15', '20']
        // onShowSizeChange: (current, pageSize) => this.pageSize = pageSize
      },
      options: [
        { label: '下单', value: '下单' },
        { label: '退款', value: '退款' },
        { label: '代付', value: '代付' }
      ],
      value2: '下单',
      visible: false
    }
  },
  methods: {
    Delete (e) {
      console.log(e)
    },
    showModal () { // 显示对话框
      this.visible = true
    },
    handleCancel () { // 关闭对话框
      this.visible = true
    },
    handleOk (e) { // 确认提交
      console.log(e)
      this.visible = false
    },
    TableChange (pagination, filters, sorter) {
      console.log(pagination)// 显示分页的数据信息
      console.log(filters)
      console.log(sorter)
    },
    onChange2 (e) { // 单选按钮回调
      console.log('radio2 checked', e.target.value)
    },
    Update (e) {
      console.log(e)
      this.visible = true
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

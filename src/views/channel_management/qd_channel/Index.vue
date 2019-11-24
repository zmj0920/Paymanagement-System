<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="7" :sm="24">
            <a-form-item label="ID名称">
              <a-input placeholder="ID名称" />
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="分组">
              <a-select placeholder="请选择分组" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">分组111</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择状态" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="2">关闭</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="渠道类型">
              <a-select placeholder="请选择渠道类型" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">支付宝</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="交易类型">
              <a-select placeholder="请选择交易类型" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">H5</a-select-option>
                <a-select-option value="2">f2f</a-select-option>
                <a-select-option value="2">ws设备</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="7" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">新增</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <vxe-grid
      border
      resizable
      :columns="tableColumn"
      :data="tableData"
      height="800"
      :toolbar="tableToolbar"
      :loading="loading"
      :start-index="(tablePage.currentPage - 1) * tablePage.pageSize"
      :pager-config="tablePage"
      @page-change="handlePageChange"
    >
    </vxe-grid>
  </div>
</template>
<script>
import axios from 'axios'
import servicePath from '@/api'
export default {
  components: {},
  data () {
    return {
      loading: false,
      tableToolbar: {
        id: 'treeEdit_demo1',
        buttons: [
          // { code: 'reload', name: 'app.body.button.refresh' },
          // { code: 'mark_cancel', name: 'app.body.button.markCancel' },
          // { code: 'save', name: 'app.body.button.save' }
        ],
        export: true,
        zoom: true,
        setting: true
      },
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: 'left',
        pageSizes: [10, 20, 50, 100, 200, 500]
      },
      tableColumn: [
        { type: 'checkbox', remoteSort: true },
        { field: 'id', title: '通道ID', remoteSort: true },
        { field: 'name', title: '通道名称' },
        { field: 'channelType', title: '渠道类型' },
        { field: 'transactionType', title: '交易类型' },
        { field: 'limitedAcmoutOfDay', title: '当天限额' },
        { field: 'limitedNumberOfDay', title: '当天限笔' },
        { field: 'isRepeatedArrange', title: '是否重新分配' },
        { field: 'isAvailable', title: '是否可用' },
        { field: 'channelAccount', title: '渠道的账号' },
        { field: 'isOnline', title: '是否在线' },
        { field: 'channelgroup.name', title: '通道组名称' },
        {
          field: 'cz',
          title: '操作',
          fixed: 'right',
          width: 150,
          showOverflow: true,
          slots: {
            default: ({ row, column }) => {
              console.log(row)
              return [
                <a-button type="primary" size="small" cell-click="channelsDelete()" class="table-btn">
                  编辑
                </a-button>,
                <a-button type="primary" size="small" class="table-btn">
                  删除
                </a-button>
              ]
            }
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.init()
    },
    init () {
      axios({
        url: `${servicePath.channels}?_start=${(this.tablePage.currentPage - 1) * this.tablePage.pageSize}&_limit=${this.tablePage.pageSize}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => console.log(err))
      // 查询条数
      axios({
        url: servicePath.channelsCount,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })
        .then(res => {
          console.log(res)
          this.tablePage.total = res.data
        })
        .catch(err => console.log(err))
    },
    channelsDelete () {
      alert(111)
      axios({
        url: servicePath.channelsCount,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })
        .then(res => {
          console.log(res)
          this.tablePage.total = res.data
        })
        .catch(err => console.log(err))
    }
  },
  created () {
    this.init()
    // this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    // this.init()
  }
}
</script>
<style lang="less">
.table-btn {
  margin-left: 5px;
}
</style>

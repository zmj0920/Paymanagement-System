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
    <vxe-toolbar
      setting
      export
      :buttons="toolbarButtons"
      :refresh="{query: findList}"
    >
      <template v-slot:buttons>
        <vxe-button @click="channelsDelete">删除</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="400"
      row-id="id"
      :loading="loading"
      :start-index="(tablePage.currentPage - 1) * tablePage.pageSize"
      :checkbox-config="{reserve: true}"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="id" title="通道ID"></vxe-table-column>
      <vxe-table-column field="name" title="通道名称" sortable></vxe-table-column>
      <vxe-table-column field="channelType" title="渠道类型"></vxe-table-column>
      <vxe-table-column field="transactionType" title="交易类型"></vxe-table-column>
      <vxe-table-column field="limitedAcmoutOfDay" title="当天限额"></vxe-table-column>
      <vxe-table-column field="limitedNumberOfDay" title="当天限笔"></vxe-table-column>
      <vxe-table-column field="isRepeatedArrange" title="是否重新分配"></vxe-table-column>
      <vxe-table-column field="isAvailable" title="是否可用"></vxe-table-column>
      <vxe-table-column field="channelAccount" title="渠道的账号"></vxe-table-column>
      <vxe-table-column field="isOnline" title="是否在线"></vxe-table-column>
      <vxe-table-column field="channelgroup.name" title="通道组名称"></vxe-table-column>
    </vxe-table>
    <vxe-pager
      perfect
      :loading="loading"
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.total"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>
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
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: 'left',
        pageSizes: [10, 20, 50, 100, 200, 500]
      },
      tableData: []
    }
  },
  methods: {
    channelsDelete () {
      const removeRecords = this.$refs.xTable.getSelectRecords()
      // this.$XModal.alert(JSON.stringify(removeRecords[0].id))
      axios({
        url: `${servicePath.channelsDelete}/${removeRecords[0].id}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.$refs.xTable.removeSelecteds()
            setTimeout(() => {
              this.$notification.success({
                message: '删除成功'
              })
            }, 1000)
          }
        })
        .catch(err => console.log(err))
    },
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

<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="7" :sm="24">
            <a-form-item label="ID名称">
              <a-input placeholder="ID名称" v-model="sousuo.name" />
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
              <a-button type="primary" @click="selectChannels()">查询</a-button>
              <a-button style="margin-left: 8px" @click="()=>visible1 = true">新增</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <vxe-toolbar
      setting
      export
      :buttons="toolbarButtons"
      :refresh="{query: init}"
    >
      <template v-slot:buttons>
        <vxe-button @click="channelsDelete">删除</vxe-button>
        <vxe-button @click="handleEdit">编辑</vxe-button>
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
      <vxe-table-column type="checkbox" width="30"></vxe-table-column>
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
    <a-modal
      title="编辑"
      v-model="visible"
      @ok="handleOk"
      class="model-item"
    >
      <p><label>通道名称:</label> <a-input placeholder="通道名称" v-model="mdl.name" style="width: 200px"/></p>
      <p><label>渠道类型:</label><a-input placeholder="渠道类型" style="width: 200px" v-model="mdl.channelType" /></p>
      <p><label>交易类型:</label><a-input placeholder="交易类型" style="width: 200px" v-model="mdl.transactionType" /></p>
      <p><label>当天限额:</label><a-input placeholder="当天限额" style="width: 200px" v-model="mdl.limitedAcmoutOfDay" /></p>
      <p><label>当天限笔:</label><a-input placeholder="当天限笔" style="width: 200px" v-model="mdl.limitedNumberOfDay" /></p>
      <p><label>渠道的账号:</label><a-input placeholder="渠道的账号" style="width: 200px" v-model="mdl.channelAccount" /></p>
      <p><a-checkbox v-model="mdl.isRepeatedArrange">是否重新分配</a-checkbox></p>
      <p><a-checkbox v-model="mdl.isAvailable">是否可用</a-checkbox></p>
      </a-form>
    </a-modal>

    <a-modal
      title="添加"
      v-model="visible1"
      @ok="handleOk"
      class="model-item"
    >
      <p><label>通道名称:</label> <a-input placeholder="通道名称" v-model="mdl1.name" style="width: 200px"/></p>
      <p><label>渠道类型:</label><a-input placeholder="渠道类型" style="width: 200px" v-model="mdl1.channelType" /></p>
      <p><label>交易类型:</label><a-input placeholder="交易类型" style="width: 200px" v-model="mdl1.transactionType" /></p>
      <p><label>当天限额:</label><a-input placeholder="当天限额" style="width: 200px" v-model="mdl1.limitedAcmoutOfDay" /></p>
      <p><label>当天限笔:</label><a-input placeholder="当天限笔" style="width: 200px" v-model="mdl1.limitedNumberOfDay" /></p>
      <p><label>渠道的账号:</label><a-input placeholder="渠道的账号" style="width: 200px" v-model="mdl1.channelAccount" /></p>
      <p><a-checkbox v-model="mdl1.isRepeatedArrange">是否重新分配</a-checkbox></p>
      <p><a-checkbox v-model="mdl1.isAvailable">是否可用</a-checkbox></p>
      <a-button type="primary" @click="addChannels()">保存</a-button>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import axios from 'axios'
import servicePath from '@/api'
export default {
  components: {},
  data () {
    return {
      mdl: {},
      visible: false,
      visible1: false,
      sousuo: {
        name: ''
      },
      mdl1: {
        'name': '通道1frompost',
        'channelType': 'alipay',
        'transactionType': 'h51',
        'limitedAcmoutOfDay': 1,
        'limitedNumberOfDay': 1,
        'isRepeatedArrange': true,
        'isAvailable': true,
        'channelgroup': 1,
        'channelAccount': 'test' },
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

    selectChannels () {
      alert(123)
      // eslint-disable-next-line no-unused-vars
      var urls = `${servicePath.channels}?`

      if (this.sousuo.name !== '') {
        // eslint-disable-next-line no-const-assign
        urls += `name=${this.sousuo.name}`
      }
      axios({
        url: urls,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data
          }
        })
        .catch(err => console.log(err))
    },
    addChannels () {
      axios({
        url: servicePath.addChannel,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        data: {
          'name': this.mdl1.name,
          'channelType': this.mdl1.channelType,
          'transactionType': this.mdl1.transactionType,
          'limitedAcmoutOfDay': this.mdl1.limitedAcmoutOfDay,
          'limitedNumberOfDay': this.mdl1.limitedNumberOfDay,
          'isRepeatedArrange': this.mdl1.isRepeatedArrange,
          'isAvailable': this.mdl1.isAvailable,
          'channelgroup': 1,
          'channelAccount': this.mdl1.channelAccount
        }
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.init()
            this.visible1 = false
            setTimeout(() => {
              this.$notification.success({
                message: '添加成功'
              })
            }, 1000)
          }
        })
        .catch(err => console.log(err))
    },
    handleEdit () {
      const removeRecords = this.$refs.xTable.getSelectRecords()
      this.mdl = Object.assign({}, removeRecords[0])
      console.log(this.mdl)
      this.visible = true
    },
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
          if (res.status === 200) {
            this.tableData = res.data
          }
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
          if (res.status === 200) {
            this.tablePage.total = res.data
          }
        })
        .catch(err => console.log(err))
    }
  },
  created () {
    this.init()
  },
  mounted () {

  }
}
</script>
<style lang="less">
.table-btn {
  margin-left: 5px;
}
.model-item{
  text-align: center;
}
</style>

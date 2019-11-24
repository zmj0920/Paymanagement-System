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
            <a-form-item label="商户订单号">
              <a-input placeholder="商户订单号" v-model="sousuo.name" />
            </a-form-item>
          </a-col>

          <a-col :md="7" :sm="24">
            <a-form-item label="选择订单状态">
              <a-select placeholder="选择订单状态" >
                <a-select-option value="pay_wating">pay_wating</a-select-option>
                <a-select-option value="pay_success">pay_success</a-select-option>
                <a-select-option value="pay_fail">pay_fail</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="渠道类型">
              <a-select placeholder="请选择渠道类型" >
                <a-select-option value="alipay">alipay</a-select-option>
                <a-select-option value="wechat">wechat</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="交易类型">
              <a-select placeholder="请选择交易类型">
                <a-select-option value="h5">h5</a-select-option>
                <a-select-option value="pc">pc</a-select-option>
                <a-select-option value="app">app</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="24">
            <a-form-item label="">
              <a-range-picker />
            </a-form-item>
          </a-col>

          <a-col :md="7" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="selectChannels()">查询</a-button>
              <!-- <a-button style="margin-left: 8px" @click="()=>visible1 = true">新增</a-button> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <vxe-toolbar
      setting
      export
      :refresh="{query: init}"
    >
      <!-- <template v-slot:buttons>
        <vxe-button @click="channelsDelete">删除</vxe-button>
        <vxe-button @click="handleEdit">编辑</vxe-button>
      </template> -->
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
      <vxe-table-column field="id" width="80" title="订单ID"></vxe-table-column>
      <vxe-table-column field="merchantOrderId" width="250" title="商户订单号"></vxe-table-column>
      <vxe-table-column field="user.username" width="150" title="所属用户" sortable></vxe-table-column>
      <vxe-table-column field="channelType" width="150" title="渠道类型"></vxe-table-column>
      <vxe-table-column field="transactionType" width="150" title="交易类型"></vxe-table-column>
      <vxe-table-column field="amount" width="150" title="交易金额(单位 分)"></vxe-table-column>
      <vxe-table-column field="fee" width="150" title="交易手续费"></vxe-table-column>
      <vxe-table-column field="status" width="150" title="订单状态"></vxe-table-column>
      <vxe-table-column field="notifyStatus" width="150" title="推送订单状态"></vxe-table-column>
      <vxe-table-column field="created_at" width="200" :formatter="formatterDate" title="订单时间"></vxe-table-column>
      <vxe-table-column title="操作" width="200" fixed="right">
        <template v-slot="{ row }">
          <vxe-button @click="channelsDelete(row)">验证</vxe-button>
          <vxe-button @click="handleEdit(row)">补单</vxe-button>
        </template>
      </vxe-table-column>
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
      class="model-item"
    >

      <p><label>渠道类型:</label>
        <a-select placeholder="请选择渠道类型" style="width: 200px" v-model="mdl.channelType" >
          <a-select-option value="apilay">apilay</a-select-option>
          <a-select-option value="wechat">wechat</a-select-option>
        </a-select>
      </p>
      <p><label>交易类型:</label>
        <a-select placeholder="请选择交易类型" style="width: 200px" v-model="mdl.transactionType" >
          <a-select-option value="h5">h5</a-select-option>
          <a-select-option value="pc">pc</a-select-option>
          <a-select-option value="app">app</a-select-option>
        </a-select>
      </p>
      <p><label>交易金额(单位 分):</label> <a-input placeholder="交易金额(单位 分)" v-model="mdl.amount" style="width: 200px"/></p>
      <p><label>交易手续费:</label><a-input placeholder="交易手续费" style="width: 200px" v-model="mdl.fee" /></p>
      <p><label>订单状态:</label>
        <a-select placeholder="请选择订单状态" style="width: 200px" v-model="mdl.status" >
          <a-select-option value="pay_wating">pay_wating</a-select-option>
          <a-select-option value="pay_success">pay_success</a-select-option>
          <a-select-option value="pay_fail">pay_fail</a-select-option>
        </a-select>
      </p>

      <p><label>推送订单状态:</label>
        <a-select placeholder="推送订单状态" style="width: 200px" v-model="mdl.notifyStatus" >
          <a-select-option value="pay_wating">notbegin</a-select-option>
          <a-select-option value="pay_success">waiting</a-select-option>
          <a-select-option value="pay_fail">success</a-select-option>
          <a-select-option value="pay_fail">fail</a-select-option>
        </a-select>
      </p>
      <a-button type="primary" @click="updateChannel()">保存</a-button>
      </a-form>
    </a-modal>

    <a-modal
      title="添加"
      v-model="visible1"
      class="model-item"
    >
      <p><label>通道名称:</label> <a-input placeholder="通道名称" v-model="mdl1.name" style="width: 200px"/></p>
      <p><label>渠道类型:</label>
        <a-select placeholder="请选择渠道类型" style="width: 200px" v-model="mdl1.channelType" >
          <a-select-option value="apilay">apilay</a-select-option>
          <a-select-option value="wechat">wechat</a-select-option>
        </a-select>
      </p>
      <p><label>交易类型:</label>
        <a-select placeholder="请选择交易类型" style="width: 200px" v-model="mdl1.transactionType" >
          <a-select-option value="h5">h5</a-select-option>
          <a-select-option value="pc">pc</a-select-option>
          <a-select-option value="app">app</a-select-option>
        </a-select>
      </p>
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
    formatterDate ({ cellValue }) {
      var d = new Date(cellValue)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    },
    selectChannels () {
      // eslint-disable-next-line no-unused-vars
      var urls = `${servicePath.orders}?`

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
    updateChannel () {
      axios({
        url: `${servicePath.updateOrders}/${this.mdl.id}`,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        data: {
          'channelType': this.mdl.channelType,
          'transactionType': this.mdl.transactionType,
          'amount': this.mdl.amount,
          'fee': this.mdl.fee,
          'status': this.mdl.status,
          'notifyStatus': this.mdl.notifyStatus
        }
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.init()
            this.visible = false
            setTimeout(() => {
              this.$notification.success({
                message: '修改成功'
              })
            }, 1000)
          }
        })
        .catch(err => console.log(err))
    },
    addChannels () {
      axios({
        url: servicePath.addOrders,
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
    handleEdit (row) {
      this.mdl = Object.assign({}, row)
      this.visible = true
    },
    channelsDelete (row) {
      axios({
        url: `${servicePath.ordersDelete}/${row.id}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.init()
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
        url: `${servicePath.orders}?_start=${(this.tablePage.currentPage - 1) * this.tablePage.pageSize}&_limit=${this.tablePage.pageSize}`,
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
        url: servicePath.ordersCount,
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

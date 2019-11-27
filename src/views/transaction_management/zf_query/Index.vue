<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="7"
            :sm="24"
          >
            <a-form-item label="ID名称">
              <a-input
                placeholder="ID名称"
                v-model="sousuo.id"
              />
            </a-form-item>
          </a-col>
          <a-col
            :md="7"
            :sm="24"
          >
            <a-form-item label="商户订单号">
              <a-input
                placeholder="商户订单号"
                v-model="sousuo.merchantOrderId"
              />
            </a-form-item>
          </a-col>

          <a-col
            :md="7"
            :sm="24"
          >
            <a-form-item label="选择订单状态">
              <a-select placeholder="选择订单状态" v-model="sousuo.orderstatus">
                <a-select-option value="pay_wating">
                  pay_wating
                </a-select-option>
                <a-select-option value="pay_success">
                  pay_success
                </a-select-option>
                <a-select-option value="pay_fail">
                  pay_fail
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="7"
            :sm="24"
          >
            <a-form-item label="渠道类型" v-model="sousuo.channelType">
              <a-select placeholder="请选择渠道类型">
                <a-select-option value="alipay">
                  alipay
                </a-select-option>
                <a-select-option value="wechat">
                  wechat
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="7"
            :sm="24"
          >
            <a-form-item label="交易类型" v-model="sousuo.transactionType">
              <a-select placeholder="请选择交易类型">
                <a-select-option value="h5">
                  h5
                </a-select-option>
                <a-select-option value="pc">
                  pc
                </a-select-option>
                <a-select-option value="app">
                  app
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="7"
            :sm="24"
          >
            <a-form-item label="">
              <a-range-picker />
            </a-form-item>
          </a-col>

          <a-col
            :md="7"
            :sm="24"
          >
            <span class="table-page-search-submitButtons">
              <a-button
                type="primary"
                @click="selectChannels()"
              >查询</a-button>
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
      :data="tableData"
    >
      <vxe-table-column
        type="checkbox"
        width="40"
        align="center"
      />
      <vxe-table-column
        field="id"
        width="80"
        title="订单ID"
        sortable
        align="center"
      />
      <!-- <vxe-table-column
        field="xtsw"
        width="150"
        title="系统商务号"
        sortable
        align="center"
      />
      <vxe-table-column
        field="zffs"
        width="150"
        title="支付方式ID"
        sortable
        align="center"
      /> -->
      <vxe-table-column
        field="merchantOrderId"
        width="320"
        title="商户订单号"
        sortable
        align="center"
      >
        <template v-slot="{ row }">
          <div>{{ row.merchantOrderId }}</div>
          <div>{{ row.userOrderId }}</div>
        </template>
      </vxe-table-column>
      <!-- <vxe-table-column
        field="pt"
        width="180"
        title="平台订单号"
        align="center"
      />
      <vxe-table-column
        field="sy"
        width="180"
        title="上游订单号"
        align="center"
      /> -->
      <vxe-table-column
        field="user.username"
        width="150"
        title="所属用户"
        sortable
        align="center"
      />
      <vxe-table-column
        field="channelType"
        width="150"
        title="渠道类型/交易类型"
        align="center"
      >
        <template v-slot="{ row }">
          <div>{{ row.channelType }}&nbsp;&nbsp;/&nbsp;&nbsp;{{ row.transactionType }}</div>
        </template>
      </vxe-table-column>
      <!-- <vxe-table-column
        field="transactionType"
        width="150"
        title="交易类型"
        align="center"
      /> -->
      <!-- <vxe-table-column
        field="xd"
        width="150"
        title="下单金额(单位 分)"
        :formatter="formatterNumberOfDay"
        align="center"
      /> -->
      <vxe-table-column
        field="amount"
        width="150"
        title="交易金额/元"
        :formatter="formatterNumberOfDay"
        align="center"
      />
      <vxe-table-column
        field="fee"
        width="150"
        title="交易手续费/元"
        :formatter="formatterNumberOfDay"
        align="center"
      />
      <vxe-table-column
        field="status"
        width="150"
        title="订单状态"
        align="center"
      >
        <template v-slot="{ row }">
          <a-badge status="warning" text="下单中" v-show="row.status=='pay_wating'" />
          <a-badge status="success" text="下单成功" v-show="row.status=='pay_success'" />
          <a-badge status="error" text="下单失败" v-show="row.status=='pay_fail'" />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="notifyStatus"
        width="150"
        title="推送订单状态"
        align="center"
      >
        <template v-slot="{ row }">
          <a-badge status="warning" text="推送中" v-show="row.notifyStatus=='pay_wating'" />
          <a-badge status="success" text="推送成功" v-show="row.notifyStatus=='pay_success'" />
          <a-badge status="default" text="未推送" v-show="row.notifyStatus=='notbegin'" />
          <a-badge status="error" text="推送失败" v-show="row.notifyStatus=='fail'" />
        </template>
      </vxe-table-column>

      <vxe-table-column
        field="td"
        width="320"
        title="通道"
        align="center"
      >
        <template v-slot="{ row }">
          <div>{{ row.channel.name }}</div>
          <div>{{ row.channel.channelAccount }}</div>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="created_at"
        width="300"
        :formatter="formatterDate"
        title="订单时间"
        align="center"
      >
        <template v-slot="{ row }">
          <div>{{ row.created_at | formatterDates }}</div>
          <div>{{ row.updated_at | formatterDates }}</div>
        </template>
      </vxe-table-column>
      <vxe-table-column
        title="操作"
        width="300"
        fixed="right"
        align="center"
      >
        <template v-slot="{ row }">
          <!-- <vxe-button >
            查看
          </vxe-button> -->
          <vxe-button @click="verifyOrder(row)" v-show="row.status=='pay_wating'">
            验单
          </vxe-button>
          <vxe-button @click="fixOrder(row)" v-show="row.status=='pay_wating'">
            补单
          </vxe-button>
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
      @page-change="handlePageChange"
    />
    <a-modal
      title="编辑"
      v-model="visible"
      class="model-item"
    >
      <p>
        <label>渠道类型:</label>
        <a-select
          placeholder="请选择渠道类型"
          style="width: 200px"
          v-model="mdl.channelType"
        >
          <a-select-option value="alipay">
            alipay
          </a-select-option>
          <a-select-option value="wechat">
            wechat
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label>交易类型:</label>
        <a-select
          placeholder="请选择交易类型"
          style="width: 200px"
          v-model="mdl.transactionType"
        >
          <a-select-option value="h5">
            h5
          </a-select-option>
          <a-select-option value="pc">
            pc
          </a-select-option>
          <a-select-option value="app">
            app
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label>交易金额/元:</label> <a-input
          placeholder="交易金额/元"
          v-model="mdl.amount"
          style="width: 200px"
        />
      </p>
      <p>
        <label>交易手续费:</label><a-input
          placeholder="交易手续费"
          style="width: 200px"
          v-model="mdl.fee"
        />
      </p>
      <p>
        <label>订单状态:</label>
        <a-select
          placeholder="请选择订单状态"
          style="width: 200px"
          v-model="mdl.status"
        >
          <a-select-option value="pay_wating">
            pay_wating
          </a-select-option>
          <a-select-option value="pay_success">
            pay_success
          </a-select-option>
          <a-select-option value="pay_fail">
            pay_fail
          </a-select-option>
        </a-select>
      </p>

      <p>
        <label>推送订单状态:</label>
        <a-select
          placeholder="推送订单状态"
          style="width: 200px"
          v-model="mdl.notifyStatus"
        >
          <a-select-option value="pay_wating">
            notbegin
          </a-select-option>
          <a-select-option value="pay_success">
            waiting
          </a-select-option>
          <a-select-option value="pay_fail">
            success
          </a-select-option>
          <a-select-option value="pay_fail">
            fail
          </a-select-option>
        </a-select>
      </p>
      <a-button
        type="primary"
        @click="updateChannel()"
      >
        保存
      </a-button>
      </a-form>
    </a-modal>

    <a-modal
      title="添加"
      v-model="visible1"
      class="model-item"
    >
      <p>
        <label>通道名称:</label> <a-input
          placeholder="通道名称"
          v-model="mdl1.name"
          style="width: 200px"
        />
      </p>
      <p>
        <label>渠道类型:</label>
        <a-select
          placeholder="请选择渠道类型"
          style="width: 200px"
          v-model="mdl1.channelType"
        >
          <a-select-option value="alipay">
            alipay
          </a-select-option>
          <a-select-option value="wechat">
            wechat
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label>交易类型:</label>
        <a-select
          placeholder="请选择交易类型"
          style="width: 200px"
          v-model="mdl1.transactionType"
        >
          <a-select-option value="h5">
            h5
          </a-select-option>
          <a-select-option value="pc">
            pc
          </a-select-option>
          <a-select-option value="app">
            app
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label>当天限额/元:</label><a-input
          placeholder="当天限额/元"
          style="width: 200px"
          v-model="mdl1.limitedAcmoutOfDay"
        />
      </p>
      <p>
        <label>当天限笔/元:</label><a-input
          placeholder="当天限笔/元"
          style="width: 200px"
          v-model="mdl1.limitedNumberOfDay"
        />
      </p>
      <p>
        <label>渠道的账号:</label><a-input
          placeholder="渠道的账号"
          style="width: 200px"
          v-model="mdl1.channelAccount"
        />
      </p>
      <p>
        <a-checkbox v-model="mdl1.isRepeatedArrange">
          是否重新分配
        </a-checkbox>
      </p>
      <p>
        <a-checkbox v-model="mdl1.isAvailable">
          是否可用
        </a-checkbox>
      </p>
      <a-button
        type="primary"
        @click="addChannels()"
      >
        保存
      </a-button>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import axios from 'axios'
import servicePath from '@/api'
import moment from 'moment'
export default {
  components: {},
  data () {
    return {
      mdl: {},
      visible: false,
      visible1: false,
      sousuo: {
        id: '',
        merchantOrderId: '',
        orderstatus: '',
        channelType: '',
        transactionType: ''
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
  filters: {
    formatterDates ({ cellValue }) {
      // var d = new Date(cellValue)
      return moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  methods: {
    formatterDate ({ cellValue }) {
      // var d = new Date(cellValue)
      return moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    },
    formatterNumberOfDay ({ cellValue }) {
      if (cellValue) {
        return cellValue / 100
      }
    },
    selectChannels () {
      // eslint-disable-next-line no-unused-vars
      var urls = `${servicePath.orders}?`

      if (this.sousuo.id !== '') {
        // eslint-disable-next-line no-const-assign
        urls += `id=${this.sousuo.id}`
      } else if (this.sousuo.merchantOrderId !== '') {
        urls += `&merchantOrderId=${this.sousuo.merchantOrderId}`
      } else if (this.sousuo.orderstatus !== '') {
        urls += `&status=${this.sousuo.orderstatus}`
      } else if (this.sousuo.channelType !== '') {
        urls += `&channelType=${this.sousuo.channelType}`
      } else if (this.sousuo.transactionType !== '') {
        urls += `&transactionType=${this.sousuo.transactionType}`
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
    // 补单
    fixOrder (row) {
      axios({
        url: `${servicePath.fixOrder}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        data: {
          'orderId': row.id
        }
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.init()
            setTimeout(() => {
              this.$notification.success({
                message: '补单成功'
              })
            }, 100)
          } else {
            this.$notification.error({
              message: res.message
            })
          }
        })
        .catch(err => {
          this.$notification.error({
            message: JSON.stringify(err.message)
          })
        })
    },
    // 验单
    verifyOrder (row) {
      axios({
        url: `${servicePath.verifyOrder}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        data: {
          'orderId': row.id
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.init()
            setTimeout(() => {
              this.$notification.success({
                message: '验单成功'
              })
            }, 100)
          } else {
            this.$notification.error({
              message: res.message
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.error({
            message: JSON.stringify(err.message)
          })
        })
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.init()
    },
    init () {
      axios({
        url: `${servicePath.orders}?_start=${(this.tablePage.currentPage - 1) * this.tablePage.pageSize}&_limit=${this.tablePage.pageSize}&_sort=id:DESC`,
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

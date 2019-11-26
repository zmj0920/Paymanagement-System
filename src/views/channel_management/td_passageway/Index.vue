/* eslint-disable vue/valid-v-for */
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
                v-model="sousuo.name"
              />
            </a-form-item>
          </a-col>
          <a-col
            :md="7"
            :sm="24"
          >
            <a-form-item label="分组">
              <a-select
                placeholder="请选择分组"
                default-value="0"
              >
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  分组111
                </a-select-option>
                <a-select-option value="2">
                  运行中
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :md="7"
            :sm="24"
          >
            <a-form-item label="渠道类型">
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
            <a-form-item label="交易类型">
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
            <span class="table-page-search-submitButtons">
              <a-button
                type="primary"
                @click="selectChannels()"
              >查询</a-button>
              <a-button
                style="margin-left: 8px"
                @click="()=>visible1 = true"
              >新增</a-button>
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
    </vxe-toolbar>
    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="400"
      row-id="id"
      :loading="loading"
      :edit-config="{trigger: 'click', mode: 'cell'}"
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
        title="通道ID"
        align="center"
      />
      <vxe-table-column
        field="name"
        width="150"
        title="通道名称"
        sortable
        align="center"
      />
      <vxe-table-column
        field="channelType"
        width="150"
        title="渠道类型"
        align="center"
      />
      <vxe-table-column
        field="transactionType"
        width="150"
        title="交易类型"
        align="center"
      />
      <vxe-table-column
        field="limitedAcmoutOfDay"
        width="150"
        :formatter="formatterNumberOfDay"
        title="当天限额(元/分)"
        align="center"
        :edit-render="{name: 'input'}"
      >
        <template v-slot:edit="{ row }">
          <a-input type="text" v-model="row.limitedAcmoutOfDay" >
          </a-input>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="limitedNumberOfDay"
        width="150"
        title="当天限笔(元/分)"
        :formatter="formatterNumberOfDay"
        align="center"
        :edit-render="{name: 'input'}"
      >
        <template v-slot:edit="{ row }">
          <a-input type="text" v-model="row.limitedNumberOfDay">
          </a-input>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="isRepeatedArrange"
        :formatter="formatterTrue"
        width="150"
        title="是否重新分配"
        align="center"
      />
      <vxe-table-column
        field="isAvailable"
        width="150"
        title="是否可用"
        align="center"
      >
        <template v-slot="{ row }">
          <a-switch v-model="row.isAvailable"/>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="channelAccount"
        width="150"
        title="渠道的账号"
        align="center"
      />
      <vxe-table-column
        field="isOnline"
        width="150"
        title="是否在线"
        align="center"
        :formatter="formatterBadge"
      >
        <template v-slot="{ row }">
          <a-badge status="default" text="已下线" v-show="row.isOnline==null" />
          <a-badge status="success" text="在线" v-show="row.isOnline!=null" />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="channelgroup.name"
        width="150"
        title="通道组名称"
        align="center"
      />
      <vxe-table-column
        title="操作"
        width="200"
        fixed="right"
        align="center"
      >
        <template v-slot="{ row }">
          <vxe-button @click="handleEdit(row)">
            编辑
          </vxe-button>
          <a-popconfirm
            title="你是否确认删除?"
            @confirm="channelsDelete(row)"
            @cancel="cancel"
            okText="Yes"
            cancelText="No"
          >
            <!-- @click="channelsDelete(row)" -->
            <vxe-button >
              删除
            </vxe-button>
          </a-popconfirm>

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
      :footer="null"
    >
      <p>
        <label>通道名称:</label> <a-input
          placeholder="通道名称"
          v-model="mdl.name"
          style="width: 200px"
        />
      </p>
      <p>
        <label>渠道类型:</label>
        <a-select
          placeholder="请选择渠道类型"
          style="width: 200px"
          v-model="mdl.channelType"
        >
          <a-select-option value="apilay">
            apilay
          </a-select-option>
          <a-select-option value="wechat">
            wechat
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label>通道组:</label>
        <a-select
          placeholder="请选择通道组"
          style="width: 200px"
          v-model="mdlchannelGroupId"
        >
          <a-select-option v-for="item in channelGroup" :value="item.id" :key="item.id">
            {{ item.name }}
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
        <label>当天限额:</label><a-input
          placeholder="当天限额"
          style="width: 200px"
          v-model="mdl.limitedAcmoutOfDay"
        />
      </p>
      <p>
        <label>当天限笔:</label><a-input
          placeholder="当天限笔"
          style="width: 200px"
          v-model="mdl.limitedNumberOfDay"
        />
      </p>
      <p>
        <label>渠道的账号:</label><a-input
          placeholder="渠道的账号"
          style="width: 200px"
          v-model="mdl.channelAccount"
        />
      </p>
      <p>
        <a-checkbox v-model="mdl.isRepeatedArrange">
          是否重新分配
        </a-checkbox>
      </p>
      <p>
        <a-checkbox v-model="mdl.isAvailable">
          是否可用
        </a-checkbox>
      </p>
      <a-button
        type="primary"
        style="width: 200px"
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
      :footer="null"
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
          <a-select-option value="apilay">
            apilay
          </a-select-option>
          <a-select-option value="wechat">
            wechat
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label>通道组:</label>
        <a-select
          placeholder="请选择通道组"
          style="width: 200px"
          v-model="mdl1.channelgroup"
        >
          <a-select-option v-for="item in channelGroup" :value="item.id" :key="item.id">
            {{ item.name }}
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
        <label>当天限额:</label><a-input
          placeholder="当天限额"
          style="width: 200px"
          v-model="mdl1.limitedAcmoutOfDay"
        />
      </p>
      <p>
        <label>当天限笔:</label><a-input
          placeholder="当天限笔"
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
        style="width: 200px"
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
export default {
  components: {},
  data () {
    return {
      mdl: {},
      mdlchannelGroupId: null,
      visible: false,
      visible1: false,
      channelGroup: [],
      sousuo: {
        name: ''
      },
      mdl1: {
        'name': '',
        'channelType': 'alipay',
        'transactionType': 'h51',
        'limitedAcmoutOfDay': 1000000,
        'limitedNumberOfDay': 1000000,
        'isRepeatedArrange': true,
        'isAvailable': true,
        'channelgroup': '请选择',
        'channelAccount': ''
      },
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
    selectchannelGroups () {
      axios({
        url: servicePath.channelGroups,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.channelGroup = res.data
          }
        })
        .catch(err => console.log(err))
    },
    cancel (e) {
      this.$message.error('已取消')
    },
    formatterNumberOfDay ({ cellValue }) {
      if (cellValue) {
        return cellValue / 100
      }
    },
    formatterTrue ({ cellValue }) {
      if (cellValue === true) {
        return ''
      } else {
        return '否'
      }
    },
    selectChannels () {
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
    updateChannel () {
      axios({
        url: `${servicePath.updateChannel}/${this.mdl.id}`,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        data: {
          'name': this.mdl.name,
          'channelType': this.mdl.channelType,
          'transactionType': this.mdl.transactionType,
          'limitedAcmoutOfDay': this.mdl.limitedAcmoutOfDay,
          'limitedNumberOfDay': this.mdl.limitedNumberOfDay,
          'isRepeatedArrange': this.mdl.isRepeatedArrange,
          'isAvailable': this.mdl.isAvailable,
          'channelgroup': this.mdlchannelGroupId,
          'channelAccount': this.mdl.channelAccount
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
          } else {
            this.$notification.error({
              message: '修改失败'
            })
          }
        })
        .catch(err => {
          this.$notification.error({
            message: err.message
          })
        })
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
          'channelgroup': Number(this.mdl1.channelgroup),
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
          } else {
            this.$notification.error({
              message: '添加失败'
            })
          }
        })
        .catch(err => {
          this.$notification.error({
            message: err.message
          })
        })
    },
    handleEdit (row) {
      this.mdl = row
      this.mdlchannelGroupId = row.channelgroup.id
      this.visible = true
    },
    channelsDelete (row) {
      axios({
        url: `${servicePath.channelsDelete}/${row.id}`,
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
          } else {
            this.$notification.error({
              message: '删除失败'
            })
          }
        })
        .catch(err => {
          this.$notification.error({
            message: err.message
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
    this.selectchannelGroups()
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

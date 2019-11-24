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
          <!-- <a-col :md="7" :sm="24">
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
          </a-col> -->

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
      <vxe-table-column field="id" width="80" title="通道组ID"></vxe-table-column>
      <vxe-table-column field="user.username" width="150" title="所属用户" sortable></vxe-table-column>
      <vxe-table-column field="name" width="150" title="通道组名称"></vxe-table-column>
      <vxe-table-column field="routeRule" width="150" title="路由规则"></vxe-table-column>
      <vxe-table-column field="isAvailable" width="150" title="是否可用"></vxe-table-column>
      <vxe-table-column title="操作" width="200" fixed="right">
        <template v-slot="{ row }">
          <vxe-button @click="channelsDelete(row)">删除</vxe-button>
          <vxe-button @click="handleEdit(row)">编辑</vxe-button>
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
      @ok="handleOk"
      class="model-item"
    >
      <p><label>通道组名称:</label> <a-input placeholder="通道组名称" v-model="mdl.name" style="width: 200px"/></p>
      <p><label>路由规则:</label>
        <a-select placeholder="请选择路由规则" style="width: 200px" v-model="mdl.routeRule" default-value="0">
          <a-select-option value="rr">rr</a-select-option>
          <a-select-option value="iphash">iphash</a-select-option>
          <a-select-option value="lessAmountPriority">lessAmountPriority</a-select-option>
          <a-select-option value="moreAmountPriority">moreAmountPriority</a-select-option>
        </a-select>
      </p>
      <p><a-checkbox v-model="mdl.isAvailable">是否可用</a-checkbox></p>
      <a-button type="primary" @click="updateChannel()">保存</a-button>
    </a-modal>

    <a-modal
      title="添加"
      v-model="visible1"
      @ok="handleOk"
      class="model-item"
    >
      <p><label>通道组名称:</label> <a-input placeholder="通道组名称" v-model="mdl1.name" style="width: 200px"/></p>
      <p><label>路由规则:</label>
        <a-select placeholder="请选择路由规则" style="width: 200px" v-model="mdl1.routeRule" default-value="0">
          <a-select-option value="rr">rr</a-select-option>
          <a-select-option value="iphash">iphash</a-select-option>
          <a-select-option value="lessAmountPriority">lessAmountPriority</a-select-option>
          <a-select-option value="moreAmountPriority">moreAmountPriority</a-select-option>
        </a-select>
      </p>
      <p><a-checkbox v-model="mdl1.isAvailable">是否可用</a-checkbox></p>
      <a-button type="primary" @click="addChannels()" >保存</a-button>
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
        'name': '',
        'routeRule': '',
        'isAvailable': true
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

    selectChannels () {
      // eslint-disable-next-line no-unused-vars
      var urls = `${servicePath.channelGroups}?`

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
        url: `${servicePath.updateChannelGroups}/${this.mdl.id}`,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        data: {
          'name': this.mdl.name,
          'routeRule': this.mdl.routeRule,
          'isAvailable': this.mdl.isAvailable
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
        url: servicePath.addChannelGroups,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        data: {
          'name': this.mdl1.name,
          'routeRule': this.mdl1.routeRule,
          'isAvailable': this.mdl1.isAvailable
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
        url: `${servicePath.channelGroupsDelete}/${row.id}`,
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
        url: `${servicePath.channelGroups}?_start=${(this.tablePage.currentPage - 1) * this.tablePage.pageSize}&_limit=${this.tablePage.pageSize}`,
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
        url: servicePath.channelGroupsCount,
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

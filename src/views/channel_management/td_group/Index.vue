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
    />
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
        title="通道组ID"
        align="center"
      />
      <vxe-table-column
        field="user.username"
        width="150"
        title="所属用户"
        sortable
        align="center"
      />
      <vxe-table-column
        field="name"
        width="150"
        title="通道组名称"
        align="center"
      />
      <vxe-table-column
        field="routeRule"
        width="150"
        title="路由规则"
        align="center"
      />
      <vxe-table-column
        field="isAvailable"
        width="150"
        title="是否可用"
        align="center"
      >
        <template v-slot="{ row }">
          <a-switch v-model="row.isAvailable" @change="onChangeAvailable(row.id,row.isAvailable)"/>
        </template>
      </vxe-table-column>
      <vxe-table-column
        title="操作"
        width="280"
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
        <label>通道组名称:</label> <a-input
          placeholder="通道组名称"
          v-model="mdl.name"
          style="width: 200px"
        />
      </p>
      <p>
        <label>路由规则:</label>
        <a-select
          placeholder="请选择路由规则"
          style="width: 200px"
          v-model="mdl.routeRule"
          default-value="0"
        >
          <a-select-option value="rr">
            rr
          </a-select-option>
          <a-select-option value="iphash">
            iphash
          </a-select-option>
          <a-select-option value="lessAmountPriority">
            lessAmountPriority
          </a-select-option>
          <a-select-option value="moreAmountPriority">
            moreAmountPriority
          </a-select-option>
        </a-select>
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
    </a-modal>

    <a-modal
      title="添加"
      v-model="visible1"
      class="model-item"
      :footer="null"
    >
      <p>
        <label>通道组名称:</label> <a-input
          placeholder="通道组名称"
          v-model="mdl1.name"
          style="width: 200px"
        />
      </p>
      <p>
        <label>路由规则:</label>
        <a-select
          placeholder="请选择路由规则"
          style="width: 200px"
          v-model="mdl1.routeRule"
          default-value="0"
        >
          <a-select-option value="rr">
            rr
          </a-select-option>
          <a-select-option value="iphash">
            iphash
          </a-select-option>
          <a-select-option value="lessAmountPriority">
            lessAmountPriority
          </a-select-option>
          <a-select-option value="moreAmountPriority">
            moreAmountPriority
          </a-select-option>
        </a-select>
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
    onChangeAvailable (id, e) {
      console.log(id, e)
      axios({
        url: `${servicePath.updateChannelGroups}/${id}`,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.getters.token}`
        },
        data: {
          'isAvailable': e
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
    cancel (e) {
      this.$message.error('已取消')
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
          } else {
            setTimeout(() => {
              this.$notification.error({
                message: '添加失败'
              })
            }, 1000)
          }
        })
        .catch(err => {
          this.$notification.error({
            message: err.message
          })
        })
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

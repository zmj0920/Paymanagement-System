<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-item label="ID名称">
              <a-input placeholder="ID名称" />
            </a-form-item>
          </a-col>
          <a-col :sm="24">
            <span
              class="table-page-search-submitButtons"
            >
              <a-button
                type="primary"
                @click="$refs.table.refresh(true)"
              >查询</a-button>
              <a-button
                style="margin-left: 8px"
                @click="() => queryParam = {}"
              >新增</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      bordered
      :columns="columns4"
      :data-source="dataSource"
      :pagination="true"
    >
      <template
        slot="operation"
        slot-scope="text, record"
      >
        <a-button
          size="small"
          type="primary"
          @click="handleEdit(record)"
          class="btn"
        >
          编辑
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="handleDelete(record)"
          class="btn"
        >
          新增通道
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="handleDelete(record)"
          class="btn"
        >
          删除
        </a-button>
      </template>
      <template
        slot="interest"
        slot-scope="text, "
      >
        <a-badge
          status="success"
          text="成功"
          v-if="text=='1'"
        />
        <a-badge
          status="error"
          text="报错"
          v-else-if="text=='2'"
        />
        <a-badge
          status="default"
          text="正常"
          v-else-if="text=='3'"
        />
        <a-badge
          status="processing"
          text="进行中"
          v-else-if="text=='4'"
        />
        <a-badge
          status="warning"
          text="警告"
          v-else
        />
      </template>
    </a-table>
    <a-modal
      title="操作"
      :width="800"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :auto-form-create="(form)=>{this.form = form}">
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="唯一识别码"
          has-feedback
          validate-status="success"
        >
          <a-input
            placeholder="唯一识别码"
            v-model="mdl.id"
            id="no"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="角色名称"
          has-feedback
          validate-status="success"
        >
          <a-input
            placeholder="起一个名字"
            v-model="mdl.username"
            id="role_name"
          />
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="状态"
          has-feedback
          validate-status="warning"
        >
          <a-select v-model="mdl.status">
            <a-select-option value="1">
              正常
            </a-select-option>
            <a-select-option value="2">
              禁用
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-divider />
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { Modal, message } from 'ant-design-vue'
import dataSource from './data'
export default {
  name: '',
  components: {
    'a-modal': Modal
  },
  data () {
    return {
      dataSource: dataSource.data,
      columns4: dataSource.highColumns4,
      sortedInfo: {
        order: 'descend',
        columnKey: 'age'
      },
      params: {
        page: 1
      },
      mdl: {},
      visible: false
    }
  },
  computed: {},
  methods: {
    handleDelete (record) {
      Modal.confirm({
        title: '确认',
        content: '您确认要删除此条数据吗？',
        onOk: () => {
          message.success('删除成功')
          this.request()
        }
      })
    },
    handleOk () {

    },
    handleEdit (record) {
      this.mdl = Object.assign({}, record)
      console.log(this.mdl)
      this.visible = true
    }
  },
  mounted () {}
}
</script>

<style scoped lang="less">
.btn {
 margin-left: 5px;
}
</style>

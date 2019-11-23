<template>
  <div>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input v-model="filterName" type="search" placeholder="试试全表搜索"></vxe-input>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      height="300"
      :data="list">
      <vxe-table-column type="index" width="80"></vxe-table-column>
      <vxe-table-column field="name" title="Name">
        <template v-slot="{ row }">
          <span v-html="row.name"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="sex">
        <template v-slot="{ row }">
          <span v-html="row.sex"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="Age">
        <template v-slot="{ row }">
          <span v-html="row.age"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address">
        <template v-slot="{ row }">
          <span v-html="row.address"></span>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterName: '',
      tableData: []
    }
  },
  computed: {
    list () {
      if (this.filterName) {
        const filterName = this.$utils.toString(this.filterName).trim().toLowerCase()
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['name', 'sex', 'age', 'address']
        const rest = this.tableData.filter(item => searchProps.some(key => this.$utils.toString(item[key]).toLowerCase().indexOf(filterName) > -1))
        return rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = this.$utils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
      }
      return this.tableData
    }
  },
  created () {
    this.tableData = [ { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' },
      { index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' }]
  }
}
</script>

<style scoped>

</style>

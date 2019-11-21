<template>
  <div>
    <vxe-table highlight-hover-row :data="tableData">
      <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{ index: 1, name: 'xiaoming', sex: '男', age: 18, address: '上海' }]
    }
  }
}
</script>

<style scoped>
/* @import 'ant-design-vue/lib/style/themes/default.less'; */
</style>

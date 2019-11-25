const data = [
  {
    id: '0',
    username: 'Jack',
    ly: '1',
    state: '1',
    interest: '1',
    birthday: '2000-01-01',
    address: '北京市海淀区奥林匹克公园',
    time: '09:00'
  },
  {
    id: '1',
    username: 'Tom',
    ly: '1',
    state: '1',
    interest: '1',
    birthday: '2000-01-01',
    address: '北京市海淀区奥林匹克公园',
    time: '09:00'
  },
  {
    id: '2',
    username: 'Lily',
    ly: '1',
    state: '1',
    interest: '1',
    birthday: '2000-01-01',
    address: '北京市海淀区奥林匹克公园',
    time: '09:00'
  }
]

const highColumns4 = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'username'
  },
  {
    title: '路由',
    dataIndex: 'ly'
  },
  {
    title: '状态',
    dataIndex: 'state',
    customRender (state) {
      const config = {
        '1': '咸鱼一条',
        '2': '风华浪子',
        '3': '北大才子',
        '4': '百度FE',
        '5': '创业者'
      }
      return config[state]
    }
  },
  {
    title: '运行',
    dataIndex: 'interest',
    scopedSlots: { customRender: 'interest' }
  },
  {
    title: '创建时间',
    dataIndex: 'birthday'
  },
  {
    title: '操作',
    dataIndex: '操作',
    scopedSlots: { customRender: 'operation' }
  }
]
const dataSource = {
  data,
  highColumns4
}
export default dataSource

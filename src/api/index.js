const ipUrl = 'http://47.56.180.125'

const servicePath = {
  userLogin: ipUrl + '/auth/local', //  登录接口
  userRegister: ipUrl + '/auth/local/register', // 注册用户
  channels: ipUrl + '/channels', // 渠道
  channelsCount: ipUrl + '/channels/count', // 渠道总数
  channelsDelete: ipUrl + '/channels', // 删除渠道
  addChannel: ipUrl + '/channels', // 添加渠道
  updateChannel: ipUrl + '/channels', // 修改渠道
  channelGroups: ipUrl + '/channelgroups', // 通道组查询
  channelGroupsCount: ipUrl + '/channelgroups/count', // 通道组总数
  channelGroupsDelete: ipUrl + '/channelgroups', // 删除通道组
  addChannelGroups: ipUrl + '/channelgroups', // 添加通道组
  updateChannelGroups: ipUrl + '/channelgroups' // 修改通道组
}
export default servicePath

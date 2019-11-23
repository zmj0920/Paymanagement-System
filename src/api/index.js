const ipUrl = 'http://47.56.180.125'

const servicePath = {
  userLogin: ipUrl + '/auth/local', //  登录接口
  userRegister: ipUrl + '/auth/local/register', // 注册用户
  channels: ipUrl + '/channels', // 渠道
  channelsCount: ipUrl + '/channels/count', // 渠道总数
  channelsDelete: ipUrl + '/channels' // 渠道总数
}
export default servicePath

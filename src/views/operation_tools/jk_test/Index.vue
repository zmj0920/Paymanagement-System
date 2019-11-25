<template>
  <div>
    接口调试说明
    <p>
      第一步填写异步地址：
      <a-input
        placeholder="异步地址"
        style="width:200px"
      />
    </p>
    <p>userApiKey:   <a-input type="text" style="width:400px" id="key" v-model="key"/> <a-button @click="copes()">复制密钥</a-button></p>
    <p>JWT: <a-input type="text" style="width:600px" id="jwt" v-model="token"/><a-button @click="copesjwt()">复制JWT</a-button></p>
    <p>下单地址：{{ url }}</p>
    <p>请求方式: POST 请求Content-Type: application/json </p>
    <p>
      验签方式：<br>
      /**<br>
      * 验证签名<br>
      * @param {*} args <br>
      * @param {*} key <br>
      */<br>
      function verifySign(args, key) {<br>
      let str = rawString(args, key)<br>
      let signString = md5(str).toUpperCase();<br>
      return args.sign == signString<br>
      }<br>
    </p>
    <p>
      参数说明:<br>
      "channelType": "alipay",//通道类型<br>
      "transactionType": "pc",//交易渠道类型<br>
      "amount": "1",//金额 分<br>
      "channelGroupId": "1", //通道组id<br>
      "bankCode": "",//银行编号<br>
      "userId": 1,//用户id<br>
      'userOrderId': //用户自己的订单号<br>
      action 银行跳转的url<br>
      epccGwMsg 向银行提交表单的参数。<br>
    </p>

    <div
      class="content"
      id="art-content"
    >
      <div class="content-bd">
        <div class="marks-msg with-title mb20">
          <h3><a name="1" />1、签名算法</h3>
          <p>签名生成的通用步骤如下： </p>
          <p>
            第一步，设所有发送或者接收到的数据为集合M，将集合M内非空参数值的参数按照参数名ASCII码从小到大排序（字典序）
            ，使用URL键值对的格式（即key1=value1&amp;key2=value2…）拼接成字符串stringA。
          </p>
          <p>特别注意以下重要规则： </p>
          <ol class="mb10">
            <li>◆ 参数名ASCII码从小到大排序（字典序）； </li>
            <li>◆ 如果参数的值为空不参与签名； </li>
            <li>◆ 参数名区分大小写； </li>
            <li>◆ 验证调用返回主动通知签名时，传送的sign参数不参与签名，将生成的签名与该sign值作校验。 </li>
            <li>◆ 接口可能增加字段，验证签名时必须支持增加的扩展字段 </li>
          </ol>
          <p>
            第二步，在stringA最后拼接上key得到stringSignTemp字符串，并对stringSignTemp进行MD5运算，
            再将得到的字符串所有字符转换为大写，得到sign值signValue。
          </p>
          <p>举例： </p>
          <p class="mb10">
            假设传送的参数如下：
          </p>
          <div class="guide-msg mb20">
            "channelType": "alipay",//通道类型<br>
            "transactionType": "pc",//交易渠道类型<br>
            "amount": "1",//金额 分<br>
            "channelGroupId": "1", //通道组id<br>
            "bankCode": "",//银行编号<br>
            "userId": 1,//用户id<br>
            'userOrderId': //用户自己的订单号<br>
          </div>

          <p>第一步：对参数按照key=value的格式，并按照参数名ASCII字典序排序如下： </p>
          <div class="guide-msg mb20">
            <p>stringA="amount=1&bankCode=cmb103&channelGroupId=1&channelType=alipay&nonce_str=qewwppmfpji&transactionType=pc&userId=1&userOrderId=34vjqeyc0sp"; </p>
          </div>
          <p class="mb10">
            第二步：拼接API密钥：
          </p>
          <div class="guide-msg mb10">
            <p>
              stringSignTemp=stringA+"&amp;key=63ce3b400d3111eaaa5a2f4c75753a15"
              <font
                face="宋体"
                color="#008000"
              >
                //注：key为商户平台设置的密钥key
              </font>
            </p>
            <p>
              sign=MD5(stringSignTemp).toUpperCase()="9A0A8659F005D6984697E2CA0A9CF3B7"
              <font
                face="宋体"
                color="#008000"
              >
                //注：MD5签名方式
              </font>
            </p>
            <p>最终得到最终发送的数据：{"channelType":"alipay","transactionType":"pc","amount":"1","channelGroupId":"1","bankCode":"cmb103","userId":1,"userOrderId":"34vjqeyc0sp","nonce_str":"qewwppmfpji","sign":"1925275B657B526A49D420C8FCAEC80F"}"</p>
            <p>
              生成订单返回数据：{
              "user": 1,
              "channelType": "alipay",
              "transactionType": "pc",
              "amount": 1,
              "fee": 0,
              "status": "pay_wating",
              "notifyStatus": "notbegin",
              "channel": 46,
              "userOrderId": "5j5g6btxtzd",
              "merchantOrderId": "2019112513542969250237140101300",
              "action": "https://netpay.cmbchina.com/netpayment/PC_EpccPay.do",
              "epccGwMsg": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iV",
              "orderId": 15,
              "nonce_str": "3nsof53wmm",
              "sign": "38B7372C7AB8376A7C9D258224CDB2F3"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: '',
      key: '',
      token: ''
    }
  },
  methods: {
    copes () {
      const a = document.getElementById('key')
      a.select()
      if (document.execCommand('Copy', 'false', null)) {
      // 如果复制成功
        this.$message.success(
          '复制成功',
          10
        )
      } else {
      // 如果复制失败
        this.$message.success(
          '复制失败',
          10
        )
      }
    },
    copesjwt () {
      const a = document.getElementById('jwt')
      a.select()
      if (document.execCommand('Copy', 'false', null)) {
      // 如果复制成功
        this.$message.success(
          '复制成功',
          10
        )
      } else {
      // 如果复制失败
        this.$message.success(
          '复制失败',
          10
        )
      }
    }
  },
  mounted () {
    this.url = window.location.origin + '/orders/unifiedorder'
    console.log(this.$store.getters.userInfo)
    this.key = this.$store.getters.userInfo.apikey
    this.token = this.$store.getters.token
  }
}
</script>

<style scoped>
/* @import 'ant-design-vue/lib/style/themes/default.less'; */
</style>

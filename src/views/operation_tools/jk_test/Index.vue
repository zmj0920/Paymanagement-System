<template>
  <div>
    <h2 style=" text-align: center;">接口文档调用说明</h2>
    <br/>
    <br/>

    <h3>在线调试</h3>
    <p>默认下单地址： <a-input
      placeholder="异步地址"
      style="width:500px"
      v-model="url"
    /></p>
    <p>传递参数</p>
    <p>通道类型 <a-input type="text" style="width:400px" v-model="postData.channelType"/></p>
    <p> 交易渠道类型:  <a-input type="text" style="width:400px" v-model="postData.transactionType"/></p>
    <p> 金额(分)<a-input type="text" style="width:400px" v-model="postData.amount"/></p>
    <p>通道组id： <a-input type="text" style="width:400px" v-model="postData.channelGroupId"/></p>
    <p>银行编号： <a-input type="text" style="width:400px" v-model="postData.bankCode"/></p>
    <p>用户id： <a-input type="text" style="width:400px" v-model="postData.userId"/></p>
    <p>userApiKey: <a-input type="text" style="width:400px" v-model="userApiKey"/></p>
    <a-button @click="init()" >提交</a-button>
    </p>
    <br/>
    <br/>
    <h3>调用接口说明</h3>

    <h4>第一步跳转支付接口url</h4>
    <br/>
    <p>下单地址：&nbsp;{{ url }}</p>
    <br/>
    <h4> <p>请求方式: POST 请求头格式Content-Type: application/json </p> </h4>
    <p>参数说明</p>

    <a-table
      :columns="columns"
      :dataSource="datatable"
    >
    </a-table>

    <p>userApiKey:   <a-input type="text" style="width:400px" id="key" v-model="key"/> <a-button @click="copes()">复制密钥</a-button></p>
    <p>urerid: <a-input type="text" style="width:400px" id="userid" v-model="userid"/> <a-button @click="copesid()">复制id</a-button></p>
    <p>JWT: <a-textarea type="text" style="width:600px" id="jwt" v-model="token"/><a-button @click="copesjwt()">复制JWT</a-button></p>
    <br/>
    <br/>
    <h3>  验签方式：</h3>
    <br/>
    <br/>
    <p>第一步：对参数按照key=value的格式排序如下： </p>
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

      <p>最终得到最终发送JSON的数据：<br/><br/>
        {<br/>
        "channelType":"alipay",<br/>
        "transactionType":"pc",<br/>
        "amount":"1",<br/>
        "channelGroupId":"1",<br/>
        "bankCode":"cmb103",<br/>
        "userId":1,<br/>
        "userOrderId":"34vjqeyc0sp",<br/>
        "nonce_str":"qewwppmfpji",<br/>
        "sign":"1925275B657B526A49D420C8FCAEC80F"<br/>
        }"<br/>
      </p>
      <p>
      </p><p>
        发送成功返回生成订单返回数据：<br/><br/>
        {<br/>
        "user": 1,<br/>
        "channelType": "alipay",<br/>
        "transactionType": "pc",<br/>
        "amount": 1,<br/>
        "fee": 0,<br/>
        "status": "pay_wating",<br/>
        "notifyStatus": "notbegin",<br/>
        "channel": 46,<br/>
        "userOrderId": "5j5g6btxtzd",<br/>
        "merchantOrderId": "2019112513542969250237140101300",<br/>
        "action": "https://netpay.cmbchina.com/netpayment/PC_EpccPay.do",<br/>
        "epccGwMsg": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iV",<br/>
        "orderId": 15,<br/>
        "nonce_str": "3nsof53wmm",<br/>
        "sign": "38B7372C7AB8376A7C9D258224CDB2F3"<br/>
        }<br/>
      </p>
      </p>
    </div>
  </div></template>

<script>
import md5 from 'md5'
import axios from 'axios'
export default {
  data () {
    return {
      columns: [
        {
          title: '参数名',
          dataIndex: 'name',
          width: '20%'
        },
        {
          title: '含义',
          dataIndex: 'hy',
          width: '20%'
        },
        {
          title: '类型',
          dataIndex: 'lx'
        }, {
          title: '说明',
          dataIndex: 'sm'
        }
      ],
      datatable: [
        { name: 'channelType', hy: '通道类型', lx: 'string', sm: '' },
        { name: 'transactionType', hy: '交易渠道类型', lx: 'string', sm: '' },
        { name: 'amount', hy: '金额 (分)', lx: 'number', sm: '' },
        { name: 'channelGroupId', hy: '通道组id', lx: 'number', sm: '' },
        { name: 'bankCode', hy: '银行编号', lx: 'string', sm: '' },
        { name: 'userId', hy: '用户id', lx: 'number', sm: '' },
        { name: 'userOrderId', hy: '用户自己的订单号', lx: 'string', sm: '' },
        { name: 'action', hy: '银行跳转的url', lx: 'string', sm: '' },
        { name: 'epccGwMsg', hy: '向银行提交表单的参数。', lx: 'string', sm: '' }],
      url: '',
      userid: '',
      key: '',
      token: '',
      userApiKey: '',
      postData: {
        'channelType': 'alipay', // 通道类型
        'transactionType': 'pc', // 交易渠道类型
        'amount': '1', // 金额 分
        'channelGroupId': '1', // 通道组id
        'bankCode': '', // 银行编号
        'userId': 1, // 用户id
        'userOrderId': this.createNonceStr()
      }
    }
  },
  methods: {
    init () {
      // var userApiKey = '63ce3b400d3111eaaa5a2f4c75753a15'
      // const postData = {
      //   'channelType': 'alipay', // 通道类型
      //   'transactionType': 'pc', // 交易渠道类型
      //   'amount': '1', // 金额 分
      //   'channelGroupId': '1', // 通道组id
      //   'bankCode': '', // 银行编号
      //   'userId': 1, // 用户id
      //   'userOrderId': this.createNonceStr()
      // }
      //   postData.bankCode = 123 // $('input[name=bankApicodeCode]:checked').val()
      const postDataSign = this.sign(this.postData, this.userApiKey)
      axios({
        url: 'http://47.56.180.125/orders/unifiedorder', // window.location.origin + ,
        method: 'post',
        data: JSON.stringify(postDataSign),
        headers: {
          'Content-Type': 'application/json'
          // Authorization: `Bearer ${this.$store.getters.token}`
        }
      }).then(res => {
        const orderInfo = res.data
        if (this.verifySign(res.data, this.userApiKey)) {
          console.log('验签成功')
          window.location.href = orderInfo.payLocation
        //  this.makeFormAndRedirect(orderInfo.action, orderInfo.epccGwMsg)
        } else {
          alert('签名验证失败')
        }
      }).catch(err => {
        alert('生产订单错误,原因:' + err.message)
      })
      console.log(postDataSign)
    },
    makeFormAndRedirect (action, epccGwMsg) {
      const formHtml =
        '<div>支付跳转中…</div><form   target="_self" id="ebankDepositForm" name="ebankDepositForm" method="POST" action="' +
        action + '"><input type="hidden" name="epccGwMsg" value="' + epccGwMsg + '"/></form>'
      document.write(formHtml)
      setTimeout(() => {
        document.getElementById('ebankDepositForm').submit()
      }, 100)
    },
    /**
     * 对参数对象进行字典排序
     * @param  {对象} args 签名所需参数对象
     * @param  {字符串} key token
     * @return {字符串}    排序后生成字符串
     */
    rawString (args, key) {
      var argsArray = Object.keys(args)
        .filter(arg => {
          return arg !== 'sign' && args[arg] !== ''
        })
        .sort().map(key => {
          return key + '=' + args[key]
        })
      argsArray.push(`key=${key}`)

      return argsArray.join('&')
    },
    /**
     * 生成签名的随机串
     * @return {字符串}
     */
    createNonceStr () {
      return Math.random().toString(36).substr(2, 15)
    },
    /**
     * 验证签名
     * @param {*} args
     * @param {*} key
     */
    verifySign (args, key) {
      const str = this.rawString(args, key)
      const signString = md5(str).toUpperCase()
      return args.sign === signString
    },
    /**
     * 返回加了签名的参数对象
     * @param {*} args
     * @param {*} key
     */
    sign (args, key) {
      args.nonce_str = this.createNonceStr()
      const str = this.rawString(args, key)
      const signString = md5(str).toUpperCase()
      args.sign = signString
      return args
    },

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
    copesid () {
      const a = document.getElementById('userid')
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
    this.userApiKey = this.$store.getters.userInfo.apikey
    this.userid = this.$store.getters.userInfo.id
  }
}
</script>

<style scoped>

</style>

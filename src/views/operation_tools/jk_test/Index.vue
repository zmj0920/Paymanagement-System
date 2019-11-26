<template>
  <div>
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
    <p>userApiKey:   <a-input type="text" style="width:400px" id="key" v-model="key"/> <a-button @click="copes()">复制密钥</a-button></p>
    <p>urerid: <a-input type="text" style="width:400px" id="key" v-model="key"/> <a-button @click="copes()">复制id</a-button></p>
    <p>JWT: <a-input type="text" style="width:600px" id="jwt" v-model="token"/><a-button @click="copesjwt()">复制JWT</a-button></p>
    <p>下单地址：{{ url }}</p>
    <p>请求方式: POST 请求Content-Type: application/json </p>
  </div>
</template>

<script>
import md5 from 'md5'
import axios from 'axios'
export default {
  data () {
    return {
      url: '',
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
  }
}
</script>

<style scoped>
/* @import 'ant-design-vue/lib/style/themes/default.less'; */
</style>

http://47.56.180.125/

http://47.56.180.125/documentation

qingfeng

{
  "name": "通道1frompost",
  "channelType": "alipay",
  "transactionType": "h51",
  "limitedAcmoutOfDay": 1,
  "limitedNumberOfDay": 1,
  "isRepeatedArrange": true,
  "isAvailable": true,
  "channelgroup": 1,
   "channelAccount":"test"
}


{
"jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc0MzQyMjM3LCJleHAiOjE1NzY5MzQyMzd9.49YTFrbLNtb0-XMtClG0hZOaTDq1KdEXQPv4HDPGwj0",
"user":{
"id": 1,
"username": "zmj0920",
"email": "mj960920@163.com",
"provider": "local",
"confirmed": true,
"blocked": null,
"role":{
"id": 1,
"name": "Authenticated",
"description": "Default role given to authenticated user.",
"type": "authenticated"
},
"apikey": "3db319100c6111eaa06241413e2622d6",
"created_at": "2019-11-21T13:17:17.000Z",
"updated_at": "2019-11-21T13:17:17.000Z"
}
}


{
"jwt": "   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc0NDg4NzY0LCJleHAiOjE1NzcwODA3NjR9.dhh6jM-mU1qCoVlXfH359dV6WeQLvpkeNpET_CONR1I",
"user":{
"username": "test1",
"id": 1,
"email": "test1@qq.com",
"provider": "local",
"confirmed": true,
"blocked": false,
"role":{"id": 2, "name": "Authenticated", "description": "Default role given to authenticated user.", "type": "authenticated"…},
"apikey": "63ce3b400d3111eaaa5a2f4c75753a15",
"orderNotifyUrl": "http://47.56.180.125/orders/orderNotify",
"created_at": "2019-11-22T14:07:17.000Z",
"updated_at": "2019-11-22T14:07:17.000Z"
}
}



http://47.56.180.125/orders/verifyOrder 这个是验单接口，请求参数是 

{
	"orderId":10
} 

 orderId代表订单id，只有订单状态=="pay_wating"的时候，才显示按钮。 返回值，状态码200，代表操作正常。

{
  "isNotify": true,
  "status": "pay_success"
}  isNotify：已经通知下游服务器。 status:订单支付成功。




http://47.56.180.125/orders/fixOrder 这个是补单接口，请求参数是

{
	"orderId":10
} 
 只有订单状态=="pay_wating"的时候，才显示按钮。返回值，状态码200，代表操作正常。
 
 {
  "isNotify": true
} isNotify：订单已经修改成完成这支付， 并通知下游服务器。
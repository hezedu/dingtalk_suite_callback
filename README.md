# dingtalk suite callback
express中间件。自动验证回调URL有效性。

配合另一个项目：主动调用API [dingtalk_suite](https://github.com/hezedu/dingtalk_suite) 使用。

##安装
`npm install dingtalk_suite_callback`

使用方法：
```js
var dd_suite_callback = require('dingtalk_suite_callback');
var config = {
  token: 'xxxxxxxxx',
  encodingAESKey: 'xxxxxxxxxxxxxxxxxxx',
  suiteid: 'xxxxxxxxxxxx', //第一次验证没有不用填
  
  saveTicket: function(data, callback){//可选，和主动调用API: dingtalk_suite 配合使用。
    //data:{value: ticket字符串,  expires：到期时间，钉钉回调时间戳 + 20分钟}
    fs.writeFile(this.suiteid + 'ticket.txt',JSON.stringify(data), callback);
  }
  
}

app.post('/dd_suite_callback', dd_suite_callback(config, 
  function(message, req, res, next){
    console.log('message', message);
    switch (message.EventType) {
      case 'tmp_auth_code': //企业号临时授权码
      
        /*{ AuthCode: '6b4294d637a0387eb36e6785451ff845',
            EventType: 'tmp_auth_code',
            SuiteKey: 'suitexpiycccccccccchj',
            TimeStamp: '1452665779818' }*/
        //使用 dingtalk_suite 获取永久授权码
        
        res.reply();
        break;

      case 'change_auth': //授权变更消息
        res.reply();
        break;
      case 'suite_relieve': //解除授权消息
      
        /*{ AuthCorpId: 'ding5bfeb97afcccb984',
            EventType: 'suite_relieve',
            SuiteKey: 'suitexpiycccccccccchj',
            TimeStamp: '1452665774168' }*/
            
        res.reply();
        break;
        
      case 'suite_ticket': //ticket，间隔20分。如果有config.saveTicket 不会触发。
      
        /*{ EventType: 'suite_ticket',
            SuiteKey: 'suitexpiycccccccccchj',
            SuiteTicket: 'wrEooJqhQlNcWU327mtr20yzWkPtea9LOm0P8w2M3MDjRPUYY5Tu9fspDhZ8HPXeP5yzKuorHIQ0P9GSU5evAc',
            TimeStamp: '1452328049089'}*/
            
        res.reply();
        break;
        
      default:
        message.name = 'ddtalk unknow EventType';
        next(message);
    }
}));

```

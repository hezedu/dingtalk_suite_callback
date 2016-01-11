# dingtalk suite callback
dingtalk express 中间件。自动验证回调URL有效性。

##安装
`npm install dingtalk_suite_callback`

使用方法：
```js
var dd_suite_callback = require('dingtalk_suite_callback');
var config = {
  token: 'xxxxxxxxx',
  encodingAESKey: 'xxxxxxxxxxxxxxxxxxx',
  suiteid: 'xxxxxxxxxxxx' //第一次验证没有不用填
}

app.post('/dd_suite_callback', dd_suite_callback(config, 
  function(message, req, res, next){
    console.log('message', message);
    switch (message.EventType) {
      case 'suite_ticket': //ticket，间隔20分。
        /*{
            EventType: 'suite_ticket',
            SuiteKey: 'suitexpiygdnz51hsbbhj',
            SuiteTicket: 'wrEooJqhQlNcWU327mtr20yzWkPtea9LOm0P8w2M3MDjRPUYY5Tu9fspDhZ8HPXeP5yzKuorHIQ0P9GSU5evAc',
            TimeStamp: '1452328049089'
          }保存到数据库*/
        res.reply();
        break;

      case 'tmp_auth_code': //企业号临时授权码
        res.reply();
        break;

      case 'change_auth': //授权变更消息
        res.reply();
        break;
      case 'suite_relieve': //解除授权消息
        res.reply();
        break;
      default:
        message.name = 'ddtalk unknow EventType';
        next(message);
    }
});

```

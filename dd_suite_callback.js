var WXBizMsgCrypt = require('wechat-crypto');
var config = {
  token : '2323',
  encodingAESKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  ip:'115.22.3.222',
  suiteid : 'suite4xxxxxxxxxxxxxxx'
}

var newCrypt = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.suiteid);


module.exports= function(req, res, next){
  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var encrypt = req.body.encrypt;


  var result = newCrypt.decrypt(encrypt);

  var message = JSON.parse(result.message);

  var Random = message.Random;
  Random = newCrypt.encrypt(Random);

  signature = newCrypt.getSignature(timestamp, nonce, Random);//新签名

  var data = {
    msg_signature: signature,
    encrypt : Random,
    timeStamp : timestamp,
    nonce : nonce
  }
  res.json(data);
}

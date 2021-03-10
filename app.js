var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var kuromoji = require("kuromoji");

app.get('/', function(req, res){
  if(!req.query) res.send({ok: false,message:"parameter is lack"})
  if(!req.query.text) res.send({ok: false,message:"parameter text is lack"})
  kuromoji
    .builder({ dicPath: "node_modules/kuromoji/dict" })
    .build(function (err, tokenizer) {
      const result = tokenizer.tokenize(req.query.text);
      res.send({ok: true, result})
    });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});

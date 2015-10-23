onmessage=function(e){
  var ws=e.data.ws;
  var data=e.data.data;
  ws.send(JSON.stringify(data));
}
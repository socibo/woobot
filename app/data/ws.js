var ws = {
	init: function(){
	var wsUrl = "ws://socibo.facebook.com:8443/command";
	document.sociboSocket = new WebSocket(wsUrl);

	document.sociboSocket.onopen = function(e){
	    console.log("Connected to " + wsUrl);
	};	
    }
}

ws.init();

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function(searchString, position) {
	    position = position || 0;
	    return this.lastIndexOf(searchString, position) === position;
	}
    });
}

document.facebook = {

    newWindow: function() {
	document.sociboSocket.send("$$.delay(500);bot.keys([$$.k('VK_CONTROL'), $$.k('VK_T')]);");
    },
    
    openUrl: function(url){
	document.sociboSocket.send("$$.delay(500);bot.keys([$$.k('VK_CONTROL'), $$.k('VK_L')]);");
	document.sociboSocket.send("$$.delay(500);$$.enter('" + url + "')");
	document.sociboSocket.send("$$.init();$$.delay(500);$$.toggleFullscreen()");
    },

    scanTimeline: function(url){
	var arr = [];
	var blocks = $("._1dwg");
	blocks.each(function(idx, it) {
	    arr.push({
		time: $('._5pcp span', it).text(),
		text: $('.userContent', it).text(),
		extra: 
		$.map($('a', $('.userContent', it).next()), function(it, i) {
		    return  {
			href: $(it).attr('href'),
			img: $('img', it).attr('src')
		    }
		})		    
	    });
	});
	return arr;
    },

    scanLikers: function(url){
	//document.facebook.openUrl(url);
	var likers = [];
	
	$("a:contains(' likes')")[0].click();
	setTimeout(function() {
	    
	    var pageNum = 0;
	    var grabData = function() {
		var listContainer = $(".fbProfileBrowserList.fbProfileBrowserListContainer")[0];
		console.log('Grabbing data');
		$('.fsl.fwb.fcb a', listContainer).each(function(idx, it) {
		    likers.push($(it).attr('href').replace(/\?.*/, '')); // cutting only profile URL
		});
		console.log('Data size', likers.length);
		var i,j,temparray,chunk = 100;
		for (i=0,j=likers.length; i<j; i+=chunk) {
		    temparray = likers.slice(i,i+chunk);
		    // do whatever
		    document.stompClient.send("facebook.scanLikers.result", {url: url}, JSON.stringify(temparray));
		}		
	    }
	    var openNextId;
	    var openNext = function() {
		var listContainer = $(".fbProfileBrowserList.fbProfileBrowserListContainer")[0];
		pageNum++;
		console.log('Opening next page', pageNum);
		if(($('a:contains("See More")', listContainer).size() == 0) || (pageNum >= 100)){
		    clearInterval(openNextId);
		    grabData();
		} else {
		    $('a:contains("See More")', listContainer)[0].click();		    
		}
	    }	    
	    openNextId = setInterval(openNext, 10000);
	}, 10000);
    },

    scanVisitors: function(url){
	//document.facebook.openUrl(url);
	var visitors = [];
	
	$("a:contains(' visits')")[0].click();
	setTimeout(function() {
	    
	    var pageNum = 0;
	    var grabData = function() {
		var listContainer = $(".fbProfileBrowserList.fbProfileBrowserListContainer")[0];
		console.log('Grabbing data');
		$('.fsl.fwb.fcb a', listContainer).each(function(idx, it) {
		    visitors.push($(it).attr('href').replace(/\?.*/, '')); // cutting only profile URL
		});
		console.log('Data size', visitors.length);
		var i,j,temparray,chunk = 100;
		for (i=0,j=visitors.length; i<j; i+=chunk) {
		    temparray = visitors.slice(i,i+chunk);
		    // do whatever
		    document.stompClient.send("facebook.scanVisitors.result", {url: url}, JSON.stringify(temparray));
		}		
	    }
	    var openNextId;
	    var openNext = function() {
		var listContainer = $(".fbProfileBrowserList.fbProfileBrowserListContainer")[0];
		pageNum++;
		console.log('Opening next page', pageNum);
		if(($('a:contains("See More")', listContainer).size() == 0) || (pageNum >= 100)){
		    clearInterval(openNextId);
		    grabData();
		} else {
		    $('a:contains("See More")', listContainer)[0].click();		    
		}
	    }	    
	    openNextId = setInterval(openNext, 10000);
	}, 10000);
    },
    
    
    searchPage: function(name){
	
    },
    
    commentOnFirstRatings: function(){
	//$$.toggleFullscreen();

	var allLikes = $("div#rating_5_star_card .fbPageTips form div.mts.fsm.fwn.fcg .UFILikeLink:contains('Like'):visible:first")
	if(allLikes.size()){
	    $(allLikes).each(function(idx, it){
		it.click(); // Liking rating
		console.log("1");
		var p = $(it).parents(".fbPageTips");
		//var c = $("div:contains('Write a comment...')", p)[0];
		console.log("2");
		var c = $("a:contains('Comment')", p)[0];
		console.log("3");
		var actorParts = document.URL.match(/com\/(pages\/)?([^\/]*)/)
		console.log("4");
		
		var headers = {
		    "stars": $("._4w5k", p).text(),
		    "user": $("a._ohe", p).attr("href").match(/com\/(.*)/)[1],
		    "userName": $("div._4w5j a", p).text(),
		    "actor": actorParts[actorParts.length - 1],
		    "actorName": $("#fbProfileCover h2").text(),
		    "text": $("div._4w5j div", p).text(),
		    "likers":  $("a.UFINoWrap", p).text(),
		    "comments": JSON.stringify($(".UFIComment", p).map(function(){
			return {
			    actor: $("a.UFICommentActorName", p).attr("href"),
			    likes: $("a.UFICommentLikeButton", p).text(),
			    text: $(".UFICommentBody", p).text()
			}
		    }).toArray()),
		    
		    "likes":  $("a.UFICommentLikeButton", p).text(),
		    "offset": JSON.stringify($(c).offset())
		};
		console.log("5");
		console.log("Sending", headers);
		// should use STOMP/whetever to send message to queue
		document.stompClient.send("facebook.ratings", headers, "");
		console.log("6");
	    });
	} else {
	    var seeMore = $("a:contains('See more')");
	    if(seeMore.size()){
		seeMore[0].click();
		setTimeout(function() {
		    document.facebook.commentOnFirstRatings();
		}, Math.random() * (50000 - 10000) + 10000); // giving 10-50 seconds to load
	    }
	}
    },
    
    init: function() {
	console.log('Initializing facebook');
	document.stompClient.subscribe("bot.command", function(message) {
	    console.log("Receiving message from stomp:", message);	    
	    var offset = JSON.parse(message.headers.offset);
	    $(document).scrollTop(offset.top - 250);
	    document.sociboSocket.send("$$.delay(500);bot.move(" + offset.left + ", " + 250 + ");bot.click();");

	    // TODO: try to highlight
	    var replacement  = message.body.replace(/\$(userName|user|actorName|actor)/g, function(x, who) {
		console.log("Looking for", who);
		//return (who.startsWith('actor')?"@":"") + message.headers[who];
		return message.headers[who];
	    });

	    console.log("Going to write", replacement);
	    
	    document.sociboSocket.send("$$.delay(250);");
	    document.sociboSocket.send("$$.enter(\"" + replacement + "\");");
	    document.sociboSocket.send("$$.delay(250);");
	    // document.sociboSocket.send("bot.keys([$$.k('VK_DOWN')]);");// just hitting enter here
	    // document.sociboSocket.send("bot.keys([$$.k('VK_ENTER')]);");// just hitting enter here
	    // document.sociboSocket.send("bot.ret();");// just hitting enter here
	    //document.sociboSocket.send("$$.$enter(\"" + strings[1] + "\");");

	    var tid = 
		setTimeout(function() {
		    console.log("Invoked");		    
		    clearTimeout(tid);
		    document.facebook.commentOnFirstRatings();
		}, 2000);
	    console.log("Sceduled invocation");
	    
	});
	
    }
};

console.log('Hello Facebook');

setTimeout(function() {
    document.facebook.init();
}, 1000)



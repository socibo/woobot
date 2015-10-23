var $$ = {
    k: function(key){
	return java.awt.event.KeyEvent[key];
    },
    
    enter: function(text){
	bot.saveToClipboard(text);
	bot.keys([$$.k('VK_CONTROL'), $$.k('VK_V')]);
	bot.ret();
    },
    
    $enter: function(text){
	bot.saveToClipboard(text);
	bot.keys([$$.k('VK_CONTROL'), $$.k('VK_V')]);
    },

    runCommand: function(arguments) {
	java.lang.Runtime.getRuntime().exec(arguments);
    },

    toggleInspector: function(){
	bot.keys([$$.k('VK_CONTROL'), $$.k('VK_SHIFT'), $$.k('VK_I')]);
    },
    
    delay: function(time){
	java.lang.Thread.sleep(time);
    },

    loadScript: function(uri) {
	//bot.injectScript(uri);
	$$.enter("var s = document.createElement('script');s.type='text/javascript';s.src='" + uri + "';document.getElementsByTagName('head')[0].appendChild(s);");
    },


    execFindWithTextAndCopyOffsetsToClipboard: function(text){
	$$.enter('var a = $("a:contains(\'' + text + '\')")');
	$$.enter('var arr = [];$(a).each(function(i, k){ arr.push($(k).offset()) })');
	$$.enter('copy(arr)');
    },

    parseClipboard: function(){
	return JSON.parse(bot.showClipboard());
    },

    toggleFullscreen: function(){
	bot.keys([$$.k('VK_F11')]);
    },


    newTab: function(url){
	bot.keys([$$.k('VK_CONTROL'), $$.k('VK_T')]);
	$$.enter(url);
	$$.delay(1000);
    },
    
    forEach:function (arr, f){
	JSON.stringify(_(arr).forEach(f));
    },

    scrollTop: function(top){
	$$.enter('$("html, body").scrollTop(' + top + ');');
    },

    init: function(){
	this.toggleInspector();
	
	this.delay(500);
	$$.loadScript("https://127.0.0.1:8443/js/jquery-1.11.3.min.js");
	$$.loadScript("https://127.0.0.1:8443/js/ws.js");
	$$.loadScript("https://127.0.0.1:8443/js/facebook/init.js");
	$$.loadScript("https://127.0.0.1:8443/js/stomp.js");
	$$.loadScript("https://127.0.0.1:8443/js/init.js");
    }
}

//$$.delay(1000);$$.init();$$.scrollToTop();$$.delay(1000);$$.execFindWithTextAndCopyOffsetsToClipboard('View Reviews');
// var f = $$.parseClipboard()[0];bot.move(f.left, f.top);bot.click();$$.delay(2000);
//  $$.delay(5000);$$.newTab('https://www.facebook.com/golden5city?sk=reviews');$$.init();$$.facebook.commentOnRatings($);
// 

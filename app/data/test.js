'use strict';

(function init($) {
    var	hoWmAnY = _.range(0, _.random(20, 400));
    
    $(document).ready(function name(arg) {
	
    });

//    document.getElementsByTagName('head')[0]
    
    _.each(hoWmAnY, function(){
	var childs = $('.grid').children(),
	    size = childs.size();
	var el = childs.eq(_.random(0, size));
	$('.grid').append(el.clone());

	$('.grid').isotope({});
	setInterval(function(){
	    $('.grid').isotope('shuffle');
	}, 5000);		
    });
})($);

// $('input#email').val('arsen.gutsal@socibo.com'),
// $('input#pass').val('Xt12Ujnj12'),
// $('input#persist_box').prop('checked',true),
// $('input#u_0_x').click();console.log('ok'),
// $('body').on('DOMNodeInserted', function(){ $('._2dpb').text($('.userContentWrapper').size())})

// var ls = function(src){
//     var s = document.createElement('script');
//     s.src = src;
//     document.getElementsByTagName('head')[0].appendChild(s);
//     console.log('injecting skewer');
// };

//ls('https://socibo.spotilocal.com/skewer');

//if(document.body)document.body.style.border = 'yellow solid 2px';

//window.alert('hello');
document.body.style.border = 'green dashed 2px';

var ls = function (src) {
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
    console.log('added skewer ');
}

ls('https://socibo.facebook.com/skewer');

$('input#email').val('arsen.gutsal@socibo.co');

var f = function () {
    $('.userContentWrapper:visible').eq(0).fadeOut();
}
//setInterval(f, 1000);

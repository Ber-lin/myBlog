var listItems=$('.list-item')
var rightWraps=$('.right-wrap')
listItems.on('click',function(){
    var tag=$(this).attr('data-wrap')
    // 先把所有的active去掉，在给点击的加上
    rightWraps.removeClass('active')
    $('#'+tag).addClass('active')
    listItems.removeClass('active')
    $(this).addClass('active')
}) 
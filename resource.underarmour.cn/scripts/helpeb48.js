//common
function questionTabs(){
    var container = $('.question-type'),
        thisId,
        aItem = $(".question-item");

    $('.question-tabs', container).on('click', 'a', function(e){
        //阻止跳转
        e.preventDefault();
        //获取选中ID
        thisId = $(this).attr("href");
        //更换导航颜色
        $(this).parent().addClass('cur').siblings().removeClass('cur');
        //判断切换方式
        if (aItem.is(":hidden")) {
            //切换div
            aItem.addClass("tab-none");
            $(thisId).removeClass("tab-none");
        } else{
            //滚动页面高度
            mTop = $(thisId).offset().top;
            $("html,body").scrollTop(mTop-90);
        };
    });

    

    $('li > a').click(function(){
      $(this).parents('li').siblings('li').find('dl').slideUp()
      $(this).next('dl').slideToggle()
    });

$(".showmore").click(function(){
    $(this).siblings(".li-hide").show();
    $(this).siblings(".hidemore").show();
    $(this).hide();
})
$(".hidemore").click(function(){
    $(this).siblings(".li-hide").hide();
    $(this).siblings(".showmore").show();
    $(this).hide();
})

}
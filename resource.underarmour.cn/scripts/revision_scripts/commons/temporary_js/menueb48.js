//导航
$(function(){
  //pc导航
	$(".nav .nav-ul>li>a").hover(function(){
		var num = $(".nav .nav-ul>li").length;
		for(var i = 0; i< num; i++)
		{
			$(".nav .nav-ul>li").eq(i).removeClass("current");
			$(".nav .nav-ul>li").eq(i).find("div.nav-two").hide();
		}
		$(this).parent(".nav .nav-ul>li").addClass("current");
		$(this).siblings("div.nav-two").show();
	});
	 $(".nav .nav-ul").mouseleave(function(){
		$(".nav .nav-ul>li").removeClass("current");
		$(this).find("li div.nav-two").hide();
	});
	
	
  //手机导航
	var menuwidth  = 85; // 边栏宽度
	var menuspeed  = 0; // 边栏滑出耗费时间
	
	var $bdy       = $('body');
	var $container = $('#wrapper');
	var $burger    = $('#hamburgermenu');
	
	$('.menubtn').on('click',function(e){
		if($bdy.hasClass('openmenu')) {
		    jsAnimateMenu('close');
		} else {
		    jsAnimateMenu('open');
		}
	});
	
	$('.mobile-menu-right').on('click', function(e){
		if($bdy.hasClass('openmenu')) {
		    jsAnimateMenu('close');
			/*$(".mobile-menu-submenu").css("display","none");*/
		    $(".mobile-menu-submenu").css("left","-85%");
		    $(".mb-menu-Level-3").css("left","-85%");
		    $(".mobile-menu-left li").css("background","none");
		}
	});
	
	function jsAnimateMenu(tog) {
		if(tog == 'open') {
			$bdy.addClass('openmenu');
			$burger.animate({left:"0"}, menuspeed);
			$container.addClass("container");
		}
		
		if(tog == 'close') {
			$bdy.removeClass('openmenu');			
			$burger.animate({left: "-100%"}, menuspeed);
			$container.removeClass("container");
		}
	}
	
});


//导航定位
(function($){
    $.fn.capacityFixed = function(options) {
        var opts = $.extend({},$.fn.capacityFixed.deflunt,options);
        var FixedFun = function(element) {
            var top = opts.top;
            element.css({
                "top":top
            });
            $(window).scroll(function() {
                var scrolls = $(this).scrollTop();
                if (scrolls > top) {
                    if (window.XMLHttpRequest) {
						element.addClass("menu-fixed");
						element.find(".logo").addClass("logo-fixed");
						element.find(".util-nav>li").addClass("li-fixed");
						element.find(".util-nav li.cart").addClass("cart-fixed");
						element.find(".util-nav .cart>a").addClass("a-fixed");
						element.find(".util-nav .cart>a .label").addClass("label-fixed");
						//$(".sellingGoods,.homePage,.offlineStore").css("display","none");
						$(".homePage,.offlineStore").css("display","block");
						$(".module-typeahead").addClass("module-typeahead-fixed");
						$(".nav").addClass("nav-fixed");
						$(".ipad-search").addClass("ipad-search-fixed");
						
						
                    } else {
                        element.css({
                            top: scrolls
                        });
                    }
                }else {
					element.removeClass("menu-fixed");
					element.find(".logo").removeClass("logo-fixed");
					element.find(".util-nav>li").removeClass("li-fixed");
					element.find(".util-nav li.cart").removeClass("cart-fixed");
					element.find(".util-nav .cart>a").removeClass("a-fixed");
					element.find(".util-nav .cart>a .label").removeClass("label-fixed");
					//$(".sellingGoods,.homePage,.offlineStore").css("display","block");
					$(".homePage,.offlineStore").css("display","none");
					$(".module-typeahead").removeClass("module-typeahead-fixed");
					$(".nav").removeClass("nav-fixed");
					$(".ipad-search").removeClass("ipad-search-fixed");
					
                }
            });
        };
        return $(this).each(function() {
            FixedFun($(this));
        });
    };
    $.fn.capacityFixed.deflunt={
		right : 0,
        top:48
	};
})(jQuery);


//手机底部菜单
(function($) {
    $.fn.mobile_middle_menu = function(b) {
        var c,
        item;
        //httpAdress;
        b = jQuery.extend({
            Speed: 220,
            autostart: 1,
            autohide: 1
        },
        b);
        c = $(this);
        item = c.children("ul").parent("li").children("a");
        //httpAdress = window.location;
        item.addClass("inactive");
        function _item() {
            var a = $(this);
            if (b.autohide) {
                a.parent().parent().find(".active").parent("li").children("ul").slideUp(b.Speed / 1.2, 
                function() {
                    $(this).parent("li").children("a").removeAttr("class");
                    $(this).parent("li").children("a").attr("class", "inactive");
                })
            }
            if (a.attr("class") == "inactive") {
                a.parent("li").children("ul").slideDown(b.Speed, 
                function() {
                    a.removeAttr("class");
                    a.addClass("active")
                })
            }
            if (a.attr("class") == "active") {
                a.removeAttr("class");
                a.addClass("inactive");
                a.parent("li").children("ul").slideUp(b.Speed)
            }
        }
        item.unbind('click').click(_item);
    }
})(jQuery);


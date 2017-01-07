var currentPageUrl = window.location.href;
//common
var getMiniShoppingCartInfoUrl = pagebase + "/getMiniShoppingCart.json";
var logoutUrl = pagebase + "/member/logout.htm";
var mobileLogoutUrl = pagebase+"/member/logout.htm";
var ajaxuernameurl = pagebase + '/member/member.json';
var urlsetUrl = pagebase + "/member/urlset.json";

$(function(){

	//设置登录时 返回URL
	$("#login").click(function(){
		var json = {"url":window.location.href};
		asyncXhr(urlsetUrl, json, {
			type : "POST",
			success : function(data) {
				var result = data;
				if (result.isSuccess) {
					window.location.href = result.returnUrl;
				}
			}
		});
	});
	
	//登出
	$("#out").click(function(){
		var json = {};
		asyncXhr(logoutUrl, json, {
			type : "POST",
			success : function(data) {
				var result = data;
				if (result.isSuccess) {
					//如果登出时是在提交支付页面，则跳转首页
					if(currentPageUrl.indexOf("/o/createOrderSuccess")!= -1 || currentPageUrl.indexOf("/account/")!= -1 ||currentPageUrl.indexOf("openid")!=-1){
						window.location.href = result.returnUrl;
					}else{
//						window.location.href = result.returnUrl;
						window.location.reload();
					}
				}
			}
		});
	});
	
	//mobile登出
	$("#mobileLogOut").click(function(){
		var json = {};
		asyncXhr(logoutUrl, json, {
			type : "POST",
			success : function(data) {
				var result = data;
				if (result.isSuccess) {
					//如果登出时是在提交支付页面，则跳转首页
					if(currentPageUrl.indexOf("/o/createOrderSuccess")!= -1 ||currentPageUrl.indexOf("openid")!=-1){
						window.location.href = result.returnUrl;
					}else{
//						window.location.href = result.returnUrl;
						window.location.reload();
					}
				}
			}
		});
	});
	
	loadMiniCartInfo();
	//迷你购物车
	$(".cart").hover(function() { 
		//loadMiniCartInfo();
		if($(this).find("div.cart-mini").find("ul").find("li").length==0){
			$(this).find("div").hide();
		}else{
			$(this).find("div").show();
		  //IE $.browser.msie && $.browser.version==7
			if($.browser.msie && $.browser.version<=8) {
			} else {
				$("#cart_scroll").mCustomScrollbar({
			        scrollButtons:{enable:true},
			        theme:"3d-thick"
			    });
			}
			
		  /*ie8*/
			$(".cart-mini ul li").last().addClass("last_li");
			
		}
	},function() { 
		$(this).find("div").hide();
	});	

	   //微信弹出层
	if($(document).width()>1024){
		$(".footer-share a.weChat").hover(function() { 
			$(".weChat-pop-up").show();
		},function() { 
			$(".weChat-pop-up").hide();
		});
	}else{
		$(".footer-share a.weChat").attr("href","weixin://profile/UnderArmourChina");
	}	
	
	
	if($(window).width() > 767){
		$(".nav-two.navbg3").find(".movement-series.clear li").each(function(){
			var nav_img = $(this).find("a span img").attr("data-src");
			$(this).find("a span img").attr("src",nav_img);
		});
		var weixin_img = $(".weChat-pop-up").find("img").attr("data-src");
		$(".weChat-pop-up").find("img").attr("src",weixin_img);
		var weixin_img = $(".footer-trademark").find("img").attr("data-src");
		$(".footer-trademark").find("img").attr("src",weixin_img);
	}
	
	   //mobile子菜单
	$(".mobile-menu-title").click(function() {
		$(this).parent("li").css("background","#bdbdbd");
		$(this).siblings("div").animate({left:"0"},300);
	});
	$(".mobile-menu-submenu .back").click(function() {
		$(this).parent().parent("li").css("background","none");
		$(this).parent().animate({left:"-85%"},300);
	});
	
	//mobile子菜单三级
	$(".mb-menu-Level-2").click(function() {
		$(this).parent("li").css("background","#bdbdbd");
		$(this).siblings("div.mb-menu-Level-3").animate({left:"0"},300);
	});
	$(".mb-menu-Level-3 .back").click(function() {
		$(this).parent().parent("li").css("background","none");
		$(this).parent().animate({left:"-85%"},300);
	});
	
	
	   //mobile搜索
    $('body').bind('touchend',function(e){
		if(e.target.tagName == 'IMG' && $(e.target).parent("a#mobile-search").hasClass('mobile-search')){
			if($(".mobile-search-content").hasClass("mobile-search-content-show")){
				$(".mobile-search-content").removeClass("mobile-search-content-show");
			}else{
				$(".mobile-search-content").addClass("mobile-search-content-show");
			}
	    }else{
			if(!(e.target.tagName == 'DIV' && $(e.target).hasClass('mobile-search-content') || e.target.tagName != 'DIV' && $(e.target).parents('.mobile-search-content').length != 0)){
				$(".mobile-search-content").removeClass("mobile-search-content-show");
			}
		}
	});
    
	if (checkTouchDevice()) {
		   //移动端 推荐商品名称、价格显示
			
			$('body').bind('touchend',function(e){
			   //迷你购物车
				if($(e.target).parent("li.cart").find("div.cart-mini").css("display") == "none"){
					if($("div.cart-mini").find("ul").find("li").length==0){
						$("div.cart-mini").hide();
					}else{
						$("div.cart-mini").show();
						$("#cart_scroll").mCustomScrollbar({
					        scrollButtons:{enable:true},
					        theme:"3d-thick"
					    });
					}
			    }else{
					if(!(e.target.tagName == 'DIV' && $(e.target).hasClass('cart-mini') || e.target.tagName != 'DIV' && $(e.target).parents('.cart-mini').length != 0)){
						$("div.cart-mini").hide();
					}
				}
				
			   //ipad 搜索
				if($(e.target).parent("a#ipad-search-but").hasClass('ipad-search-but')){
					if($(".ipad-search-content").hasClass("search-content-show")){
						$(".ipad-search-content").hide();
						/*$(".ipad-search-content").removeClass("search-content-show");*/
					}else{
						$(".ipad-search-content").show();
						/*$(".ipad-search-content").addClass("search-content-show");*/
					}
			    }else{
					if(!(e.target.tagName == 'DIV' && $(e.target).hasClass('ipad-search-content') || e.target.tagName != 'DIV' && $(e.target).parents('.ipad-search-content').length != 0)){
						$(".ipad-search-content").hide();
						/*$(".ipad-search-content").removeClass("search-content-show");*/
					}
				}
			   
			   //ipad 导航
				if($(e.target).parent("li").hasClass('nav-li')){
					if($(".nav-two").hasClass("nav-two-show")){
						$(".nav-two").hide();
						$(".nav .nav-ul>li").removeClass("current");
					}else{
						$(this).show();
					}
			    }else{
					if(!(e.target.tagName == 'DIV' && $(e.target).hasClass('nav-two') || e.target.tagName != 'DIV' && $(e.target).parents('.nav-two').length != 0)){
						$(".nav-two").hide();
						$(".nav .nav-ul>li").removeClass("current");
					}
				}
				
			});
		}
    
    // mobile端   客户服务、选购指引、订单及售后的点击方法
	if($(document).width()<768){
	    var arr = [];
		$(".wizard-content li").click(function(event) {
			var innum = $(this).index();
			var len = arr.length;
			if(arr[len-1] == innum){
				$(".mobile_help_pop").slideUp();
				$(this).find("strong").removeClass('strong_line');
				arr = [];
			}else{
				$(".mobile_help_pop").eq(innum).slideDown().siblings('.mobile_help_pop').slideUp();
				$(".wizard-content li").find('strong').removeClass('strong_line');
				$(this).find("strong").addClass('strong_line');
				arr.push($(this).index());
			}
		});
	}else{
		$(".wizard-content li").find("strong").removeClass('strong_line');
		$(".mobile_help_pop").hide();
		$(".wizard-content li").unbind();
	}

	
	//国双监控(在线咨询按钮);
	$(".header .top-consulting a").live("click",(function() {
			var URL =window.location.href;
			 if (window._gsTracker) {
				//window.alert("URL="+URL);
			        _gsTracker.trackEvent('OnlineChat',URL,'');
			    }
						}));
	
	//国双监控(在线咨询按钮);
	$(".footer .consulting a").live("click",(function() {
			var URL =window.location.href;
			 if (window._gsTracker) {
				//window.alert("URL="+URL);
			        _gsTracker.trackEvent('OnlineChat',URL,'');
			    }
						})); 
	
});


function isNotNullOrEmpty(str) {
	if (str != undefined && str != null && str != "" && str != "undefined") {
		return true;
	} else {
		return false;
	}
}

/**----------购物车部分操作start-------------------**/
function showCartDeleteDiv(index,type){
	 var cartType=$("#shoppingCartType").val();
	var deleteDialog = $(".order-submission-dialog").data('spice.dialog');
	if(deleteDialog == null || deleteDialog == undefined){
		deleteDialog = $.spice.dialog({
			title: ''
			, content: '确认要从购物车内删除此商品？'
			, buttons: {
				'取消': {
					btnClass: 'btn-border'
					, btnEvent: function(e){
						//隐藏弹出层
						e.data.dialog.hide();
					}
				}
				,'确定': {
					btnClass: 'btn-black'
					, btnEvent: function(e){
						//隐藏弹出层
						e.data.dialog.hide();
						deleteShoppingCart(index,type,cartType);
					}
				}
			}
			, dialogClass: 'order-submission-dialog'
			, initEvent: function(e){
			  //弹出层初始化时需要做的事情，只会在创建弹出层的时候执行
			  //如：初始化事件
			}
		});		
	}else{
		var options = {
				title: ''
					, content: '确认要从购物车内删除此商品？'
					, buttons: {
						'取消': {
							btnClass: 'btn-border'
							, btnEvent: function(e){
								//隐藏弹出层
								e.data.dialog.hide();
							}
						}
						,'确定': {
							btnClass: 'btn-black'
							, btnEvent: function(e){
								//隐藏弹出层
								e.data.dialog.hide();
								deleteShoppingCart(index,type,cartType);
							}
						}
					}
					, dialogClass: 'order-submission-dialog'
					, initEvent: function(e){
					  //弹出层初始化时需要做的事情，只会在创建弹出层的时候执行
					  //如：初始化事件
					}
				}
		deleteDialog.init(options);
	}
	deleteDialog.show();
};

/**
 * 删除购物车中的商品（单个）
 */
function deleteShoppingCart(index,type,cartType,obj){
	var json = {
		"skuId" :  $("#"+type+"skuId_"+index).val()
	};	
	var data=syncXhr(pagebase + "/removeShopCartSku.json",json ,{type: "POST"});
	if(data.isSuccess) {
		loadMiniCartInfo();
		if(type=="miniCart"){
			if(cartType=='shoppingCartType'){
				loadCartSection();
			}
		}else{
			loadCartSection();
		}
	}else {
		alert("购物车商品删除失败！");
	}	
}

/**重载迷你购物车的数据**/
function loadMiniCartInfo(){
	var obj=$(".cart").find("div.cart-mini");
	var getMiniShoppingCartInfo = getMiniShoppingCartInfoUrl+"?t="+new Date().getMilliseconds();
	$.get(getMiniShoppingCartInfo, function(html) {
		obj.html(html);
		$("#miniCartCount").html($("#tempMiniCartNum").val());
		$("#mobminiCartCount").html($("#tempMiniCartNum").val());
	});
}


function matchNull(str) {

	if (str == undefined || str == null || str == "") {
		return true;
	} else
		return false;
}

function matchEmail(email) {

	return eval(map["emailReg"]).test(email);
}

function matchMobile(mobile) {

	return eval(map["mobileReg"]).test(mobile);
}

function matchTelphone(phone) {

	return eval(map["telReg"]).test(phone);
}

function asyncXhrPost(url, data, args) {
	args = $.extend({}, args, {
		"type" : "POST"
	});
	asyncXhr(url, data, args);
}





function asyncXhr(url, data, args) {

	if (!args.success) {

		args = $.extend({}, args, {
			success : function(data, textStatus) {
				if (data.exception) {
					// with exception
					if (data.exception.statusCode == 1) {
						alert("系统错误,请联系客服人员");
					} else {
						alert(data.exception.message);
					}
					reloadToken();
				} else {
					if (args.successHandler)
						hitch(args, "successHandler")(data, textStatus);
					else {
						alert( $(f).attr("name"));
					}
				}

			}
		});
	}

	if (!args.error) {
		args = $.extend({}, args, {
			error : function(XMLHttpRequest, textStatus, errorThrown) {

				if (XMLHttpRequest.status == 502) {
					alert("服务器繁忙，请稍后再试！");
				} else if (XMLHttpRequest.status == 603) {
					alert("服务器繁忙，请稍后再试！");
				} else if (XMLHttpRequest.status == 604) {
//					showTipsInfoDiv('','重复提交，请刷新页面后再进行修改!');
				} else {
					/*
					 * $(this).sAlert({ type : "open", title : '温馨提示！', content
					 * :textStatus });
					 */
				}

				if (args.errorHandler)
					hitch(args, "errorHandler")(textStatus, XMLHttpRequest);
			}
		});
	}

	$.ajax(this._ajaxOptions(url, data, args));
}

function _ajaxOptions(url, data, args) {
	if (!args.cache)
		url = makeRealVersionUrl(url);

	url += ((/\?/.test(url)) ? "&" : "?") + "_t=" + commonToken;
	var options = {};
	if (arguments.length === 1)
		options = url;
	else {
		options = args || {};
		options["url"] = url;
		if (data) {

			if (isString(data) || $(data).is("form")) {
				// data is a form
				var dataJson = this._ajaxFormToObj(data);

				$.extend(options, {
					data : dataJson
				});
			} else {

				$.extend(options, {
					data : data
				});
			}

		}
	}
	// console.dir(options);
	return options;
}

/**
 * 给url地址加上一个实时的版本号
 * 
 * @param url
 * @returns {String}
 */
function makeRealVersionUrl(url) {
	var iTime = (new Date()).getTime();
	url += (/\?/.test(url)) ? "&" : "?";

	return (url + "rv=" + iTime.toString());
}



function hitch(scope, method) {
	if (!method) {
		method = scope;
		scope = null;
	}
	if (this.isString(method)) {
		scope = scope || _g;
		if (!scope[method]) {
			throw ([ 'hitch: scope["', method, '"] is null (scope="', scope, '")' ].join(''));
		}
		return function() {
			return scope[method].apply(scope, arguments || []);
		}; // Function
	}
	return !scope ? method : function() {
		return method.apply(scope, arguments || []);
	};
}

function _ajaxFormToObj(form) {
	form = _getForm(form);
	if (!form)
		return {};
	var ret = {}, exclude = "file|submit|image|reset|button|";
	$.each(form.elements, function(i, e) {
		var name = e.name, type = (e.type || "").toLowerCase();
		if (name && type && exclude.indexOf(type) === -1 && !e.disabled) {
			_ajaxSetValue(ret, name, _ajaxFieldValue(e));
		}
	});
	return ret;
}

function _getForm(form) {
	var f = form;
	if (this.isString(form)) {
		f = $("#" + form);
		if (f.length == 0)
			f = $("form[name='" + form + "']");
	}
	return (f instanceof jQuery) ? f.get(0) : f;
}

function isString(obj) {
	return typeof obj === "string" || obj instanceof String;
}

function _ajaxSetValue(obj, name, value) {
	if (value === null)
		return;
	var val = obj[name];
	if (isString(val)) {
		obj[name] = [ val, value ];
	} else if ($.isArray(val)) {
		obj[name].push(value);
	} else {
		obj[name] = value;
	}
}

function reloadToken() {

	if (commonToken != "") {
		var d = syncXhrGet(commonTokenUrl);
		commonToken = d;
	}
}
function syncXhrPost(url, data, args) {
	args = $.extend({}, args, {
		"type" : "POST"
	});
	return syncXhr(url, data, args);
}

function syncXhrGet(url, data, args) {
	args = $.extend({}, args, {
		"type" : "GET"
	});
	return syncXhr(url, data, args);
}

function syncXhr(url, data, args) {
	var _data, options = this._ajaxOptions(url, data, args);
	$.extend(options, {
		async : false,
		success : function(data, textStatus) {
			_data = data;
		},
		error : args.error ? args.error : function(XMLHttpRequest, textStatus, errorThrown) {
			_data = {};
			var exception = {};
			exception["message"] = "Error occurs when fetching data from url:" + this.url;
			exception["cause"] = textStatus ? textStatus : errorThrown;
			_data["exception"] = exception;
			if (XMLHttpRequest.status == 502) {
				alert("服务器繁忙，请稍后再试！");
			} else if (XMLHttpRequest.status == 604) {
				alert("服务器繁忙，请稍后再试！");
			}
		}
	});
	$.ajax(options);
	// console.dir(_data);
	return _data;
}

/**live800相关js缓加载**/
function _load(fun){
	 if (window.attachEvent){
		 window.attachEvent('onload', fun);
	 }else{
		 window.addEventListener('load', fun, false);
	}
}
function async_load(src){
   var live800_script = document.createElement('script');
   live800_script.type = 'text/javascript';
   live800_script.async = true;
   live800_script.src = src;
   document.body.appendChild(live800_script);
}
_load( function(){
	var infoValue = $("#infoValue").val();
	var enterurl = $("#enterurl").val();
	var remarkValue = $("#remarkValue").val();
	var vid = $("#vid").val();
	if($("#live800_76701").size()>0){
		async_load("http://chat32.live800.com/live800/chatClient/staticButton.js?jid=2677314674&companyID=232417&configID=76701&codeType=custom&delayload=1&renderid=live800_76701");
	}
	if($("#live800_76698").size()>0){
		async_load("http://chat32.live800.com/live800/chatClient/staticButton.js?jid=2677314674&companyID=232417&configID=76698&codeType=custom&delayload=1&renderid=live800_76698");
	}
	if($("#live800_76699").size()>0){
		async_load("http://chat32.live800.com/live800/chatClient/staticButton.js?jid=2677314674&companyID=232417&configID=76699&codeType=custom&delayload=1&renderid=live800_76699");
	}
	if($("#live800_76704").size()>0){
		async_load("http://chat32.live800.com/live800/chatClient/staticButton.js?jid=2677314674&companyID=232417&configID=76704&codeType=custom&delayload=1&renderid=live800_76704");
	}
	if($("#live800_99997").size()>0){
//		console.log("http://underarmour.live800.com/live800/chatClient/monitor.js?companyID=8977&configID=2&codeType=custom&live800_language=zh-cn&webSiteId=1&delayload=1&info=" + infoValue + "&enterurl=" + enterurl +"&remark=" + remarkValue + "&vid=" + vid)
		async_load("http://underarmour.live800.com/live800/chatClient/monitor.js?companyID=8977&configID=2&codeType=custom&live800_language=zh-cn&webSiteId=1&delayload=1&info=" + infoValue + "&enterurl=" + enterurl +"&remark=" + remarkValue + "&vid=" + vid);
	}
});


function isInputEmpty(selector) {
	var selectorInput = $(selector);

	// 选择器上面的
	var selectorValue = $.trim(selectorInput.val());
	// 选择器上面的 原始值
	var selectorOri_Value = $.trim(selectorInput.attr("ori_value"));

	if (selectorValue == "" || selectorValue == selectorOri_Value) {
		return true;
	} else {
		return false;
	}
}

/**
 * 多按钮弹框
 * @param options
 */
function showDialog(options){
	
	var showDialog = $(".order-del-dialog").data('spice.dialog');
	if(showDialog == null || showDialog == undefined){
		showDialog = $.spice.dialog(options);
	}else{
		showDialog.init(options);
	
	}
	

	showDialog.show();
}

/**
 * 只用于消息提醒
 * @param title
 * @param content
 */
function showTipsInfoDialog(title,content){
	var options = {
            title: title,
            content: content,
            buttons: {
            '确定': {
                btnClass: 'btn-black',
                btnEvent: function(e){
                    //隐藏弹出层
                    e.data.dialog.hide();
                }
            }
        }
            , dialogClass: 'order-del-dialog'
            , initEvent: function(e){
            }
        };	
	var showDialog = $(".order-del-dialog").data('spice.dialog');
	if(showDialog == null || showDialog == undefined){
		showDialog = $.spice.dialog(options);
	}else{
		showDialog.init(options);
	
	}
	

	showDialog.show();
}


//订阅邮件
$(".subscribe-but").live("click",function(){
	var email=$("#subscriptEmail").val()==''?$("#mobsubscriptEmail").val():$("#subscriptEmail").val();
	var URL =window.location.href;
	if(email==""){
		showTipsInfoDialog("温馨提示！","邮箱地址不能为空！");
	}else if(checkEmail(email)){
		var createEmailSubscriptionUrl = pagebase + '/createEmailSubscription';
		asyncXhr(createEmailSubscriptionUrl, {'email':email}, {
    		type : "POST",
    		successHandler : function(backWarnEntity) {
    			if(backWarnEntity.isSuccess){
    				showTipsInfoDialog("温馨提示！",backWarnEntity.description);
    			    var des='您已经订阅不需要重复订阅!';
    			  //国双按钮监控(订阅按钮)
    				 if (window._gsTracker&&des != backWarnEntity.description) {
    					 	//window.alert("width="+$(window).width()+"URL="+URL+";email="+email);
    				        _gsTracker.trackEvent('Subscribe',URL,email);
    				    }
    			}else{
    				showTipsInfoDialog("温馨提示！",backWarnEntity.description);
    			}
    		},errorHandler : function() {
    		}
		});	
	}else{
		showTipsInfoDiv('','邮箱地址格式不正确！');
	}
   
});

function checkEmail(b) {
	var a = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return a.test(b.replace(/(^\s*)|(\s*$)/g, ""))&&WidthCheck(b,50);
}

//判断字符串长度是否符合传进来的参数N的长度
function WidthCheck(s, n){   
	    var w = 0;   
	    for (var i=0; i<s.length; i++) {   
	       var c = s.charCodeAt(i);   
	       //单字节加1   
	       if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
	      w++;   
	      }   
	      else {   
	     w+=2;   
	      }   
	   }   
	   if (w > n) {   
	     return false;   
	  }   
	  return true;   
}

function checkTouchDevice() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    //document.writeln("您的浏览设备为：");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    	return true; //document.writeln("phone");
    } else {
        return false; //document.writeln("pc");
    }
}
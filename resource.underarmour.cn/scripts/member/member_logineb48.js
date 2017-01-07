var loginUrl =pagebase + '/member/homeLogin.json';

var checkAndUpdateShoppingCartURL = pagebase +'/member/checkAndUpdateShoppingCart';

var defaultPwd = "******";

function changeCode() {
	var src = $("#imageCode").attr('src').split('?')[0];
	$("#imageCode").attr('src', src + '?' + Math.random());
}

function changeCode2() {
	var src = $("#imageCode2").attr('src').split('?')[0];
	$("#imageCode2").attr('src', src + '?' + Math.random());
}

function setValid(obj, flag, message){	
	$(obj).data("checked", flag);
	if(flag){
		var $errspan = getErrDiv(obj);
		$errspan.html(message);
	}else{
		var $errspan = getErrDiv(obj);
		$errspan.html(message);
	}
}

function getErrDiv(obj){
	return $(obj).parent().find(".codeNotice");
}

function checkStrIsNotNull(str) {
	if (str == null || str.length == 0 || str == '') {
		return false;
	} else {
		return true;
	}
}

function checkEmail(email) {
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(email);
}

function isForMobile(mobile){
	var mobileRegx = /^((1[0-9]{1})+\d{9})$/;
	return mobileRegx.test(mobile);
}

//function isPassword(password) {
//	var reg = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
//	if (reg.test(password)) {
//		return true;
//	}
//	return false;
//}

function isPassword(password){
	var ls = 0;
	if(password.match(/([a-z])+/)){  
	    ls++;  
	}  
	if(password.match(/([0-9])+/)){  
	    ls++;    
	}  
	if(password.match(/([A-Z])+/)){  
	    ls++;  
	}  
	if(password.match(/[^a-zA-Z0-9]+/)){
	    ls++;  
	}  
	    return ls; 
}

//验证特殊字符
function validSpecialWord(password){
	var pattern = new RegExp("[`~!@%#$^&*()=|{}':;',　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。，、？]"); 
  return pattern.test(password); 
}

function isPasswordUppercase(password) {
	var maxReg = /[A-Z][^A-Z\n]|[^A-Z][A-Z]/;
	if (maxReg.test(password)) {
		return true;
	}
	return false;
}

var checkFlg = true;//checkFlg作用：input的blur事件后，如果验证不通过，登陆时继续执行，加个判断，如果为false直接跳出
function login(){
		checkFlg = true;
		$("#loginName,#password,#randomCode").trigger("focus");
		$("#loginName,#password,#randomCode").trigger("blur");
		if (!checkFlg){
			return;
		}
		
		if (isInputEmpty("#randomCode")) {
			$("#randomCode").addClass("noticeRed");
			setValid("#randomCode", false, "请输入验证码");
			return;
		} else {
			$("#randomCode").removeClass("noticeRed");
			setValid("#randomCode", true, "");
		}
	
		var loginNameObj = $("#loginName");
		var loginPwdObj = $("#password");
		if (loginNameObj.data("checked") && defaultPwd!=loginPwdObj.val()?loginPwdObj.data("checked"):true) {
			
		//判断是否选中"记住密码"
		var flg = 0;
		if ($("#pwdFlg").hasClass('check-current')){
			flg = 1;
		}
		
		//RSA对称加密
		var modulus =  $("#modulus").val();
		var exponent =  $("#exponent").val();
		var key = RSAUtils.getKeyPair(exponent, '', modulus);
		
		var loginName = $.trim(loginNameObj.val());
		var json = {
			'loginName' : loginName,
			'password' : defaultPwd!=loginPwdObj.val()?RSAUtils.encryptedString(key,loginPwdObj.val()):defaultPwd,
			'randomCode' : $("#randomCode").val(),
			'pwdFlg' : flg
		};
		// 提交表单
		asyncXhr(loginUrl, json, {
			type : "POST",
			success : function(data) {
				$(".noticeRed").removeClass("noticeRed");
				var result = data;
				//刷新验证码
				if (result.resultCode != null && result.resultCode != "") {
					if($(document).width()<768){
						changeCode2();
					}else{
						changeCode();
					}
				}
				if (result.resultCode == 'requiredError') {
					$("#loginName").addClass("noticeRed");
					setValid("#loginName", false, "请输入有效的用户名或密码！");
					return false;
				} else if (result.resultCode == 'codeError') {
					$("#randomCode").addClass("noticeRed");
					setValid("#randomCode", false, "验证码输入错误,请重新输入！");
					return false;
				} else if (result.resultCode == 'loginErr') {
					$("#loginName").addClass("noticeRed");
					setValid("#loginName", false, "请输入有效的用户名或密码！");
					return false;
				} else if (result.resultCode == 'mobileError') {
					$("#loginName").addClass("noticeRed");
					setValid("#loginName", false, "请输入有效的用户名或密码！");
					return false;
				} 
				else if (checkStrIsNotNull(result.returnUrl)) {
					$.post(checkAndUpdateShoppingCartURL, function(backWarnEntity) {
						if(backWarnEntity.isSuccess){
							window.location.href = result.returnUrl;
						}
					});
				}
			}
		});
	}
}

$(document).ready(function() {

	$("#loginName,#password").keypress(function(e) {
		if (e.keyCode == 13) {
			login();
		}
	});
	
	$("#loginName").blur(function() {
		var loginName = $.trim($(this).val());
		if (isInputEmpty("#loginName")) {
			$(this).addClass("noticeRed");
			setValid(this, false, "请输入有效的用户名或密码！");
			checkFlg = false;
			return;
		}
		if (loginName.indexOf("@") != -1){
			//邮箱判断
			if (checkEmail(loginName)) {
				if ((loginName.length > 0 && loginName.length < 6) || loginName.length > 100) {
					$(this).addClass("noticeRed");
					setValid(this, false, "请输入有效的用户名或密码！");//邮箱长度必须在6-100位之间
					checkFlg = false;
					return;
				}
				$(this).removeClass("noticeRed");
				setValid(this, true, "");
			} else {
				setValid(this, false, "请输入有效的用户名或密码！");
				checkFlg = false;
				return;
			}
		} else {
			//手机号码判断
			if (isForMobile(loginName)) {
				$(this).removeClass("noticeRed");
				setValid(this, true, "");
			} else {
				$(this).addClass("noticeRed");
				setValid(this, false, "请输入有效的用户名或密码！");
				checkFlg = false;
				return;
			}
		}

	});
	
	/**
	 * 密码
	 */
	$("#password").blur(function() {
		if (isInputEmpty("#password")) {
			$(this).addClass("noticeRed");
			setValid(this, false, "请输入有效的用户名或密码！");
		} else {
			var password = $.trim($(this).val());
			if (isPassword($.trim(password))<2||validSpecialWord(password)) {
				$(this).addClass("noticeRed");
				setValid(this, false, "请输入有效的用户名或密码！");
			} else {
				$(this).removeClass("noticeRed");
				setValid(this, true, "");
			}
//			if (password.length < 6 || password.length > 20) {
//				setValid(this, false, "密码输入错误");
//			} else if (!isPasswordUppercase(password)) {
//				setValid(this, false, "密码输入错误");
//			} else {
//				setValid(this, true, "");
//			}
		}
	});
	
	
	/**
	 * 验证密码
	 */
	$("#randomCode").blur(function() {
		if (isInputEmpty("#randomCode")) {
			$(this).addClass("noticeRed");
			setValid("#randomCode", false, "请输入验证码");
		} else {
			$(this).removeClass("noticeRed");
			setValid(this, true, "");
		}
	});
	
	
	/*收藏登陆*/
	$("#ptploginName,#ptppassword").keypress(function(e) {
		if (e.keyCode == 13) {
			login();
		}
	});
	
	$("#ptploginName").blur(function() {
		var loginName = $(this).val();
		if (isInputEmpty("#ptploginName")) {
			$("#ptploginName").addClass("noticeRed");
			setValid(this, false, "请输入有效的用户名或密码！");
			checkFlg = false;
			return;
		}
		if (loginName.indexOf("@") != -1){
			//邮箱判断
			if (checkEmail(loginName)) {
				if ((loginName.length > 0 && loginName.length < 6) || loginName.length > 100) {
					$("#ptploginName").addClass("noticeRed");
					setValid(this, false, "请输入有效的用户名或密码！");//邮箱长度必须在6-100位之间
					checkFlg = false;
					return;
				}
				$("#ptploginName").removeClass("noticeRed");
				setValid(this, true, "");
			} else {
				$("#ptploginName").addClass("noticeRed");
				setValid(this, false, "请输入有效的用户名或密码！");
				checkFlg = false;
				return;
			}
		} else {
			//手机号码判断
			if (isForMobile(loginName)) {
				$("#ptploginName").removeClass("noticeRed");
				setValid(this, true, "");
			} else {
				$("#ptploginName").addClass("noticeRed");
				setValid(this, false, "请输入有效的用户名或密码！");
				checkFlg = false;
				return;
			}
		}
	});
	
	/**
	 * 验证密码
	 */
	$("#ptppassword").blur(function() {
		if (isInputEmpty("#ptppassword")) {
			$("#ptppassword").addClass("noticeRed");
			setValid(this, false, "请输入有效的用户名或密码！");
		} else {
			var password = $(this).val();
			if (password.length < 6 || password.length > 20) {
				$("#ptppassword").addClass("noticeRed");
				setValid(this, false, "请输入有效的用户名或密码！");
			} else if (!isPassword(password)) {
				$("#ptppassword").addClass("noticeRed");
				setValid(this, false, "请输入有效的用户名或密码！");
			} else {
				$("#ptppassword").removeClass("noticeRed");
				setValid(this, true, "");
			}
		}
	});
});


/**
 * pdp登录
 */
function ptplogin(type) {	
	//登录名判断
	var loginName = $("#ptploginName").val();
	if (isInputEmpty("#ptploginName")) {
		$("#ptploginName").addClass("noticeRed");
		setValid("#ptploginName", false, "请输入有效的用户名或密码！");
		return;
	}
	if (loginName.indexOf("@")!= -1){
		//邮箱判断
		if (checkEmail(loginName)) {
			if ((loginName.length > 0 && loginName.length < 6) || loginName.length > 100) {
				$("#ptploginName").addClass("noticeRed");
				setValid("#ptploginName", false, "请输入有效的用户名或密码！");//邮箱长度必须在6-100位之间
				return;
			}
			$("#ptploginName").removeClass("noticeRed");
			setValid("#ptploginName", true, "");
		} else {
			$("#ptploginName").addClass("noticeRed");
			setValid("#ptploginName", false, "请输入有效的用户名或密码！");
			return;
		}
	} else {
		//手机号码判断
		if (isForMobile(loginName)) {
			$("#ptploginName").removeClass("noticeRed");
			setValid("#ptploginName", true, "");
		} else {
			$("#ptploginName").addClass("noticeRed");
			setValid("#ptploginName", false, "请输入有效的用户名或密码！");
			return;
		}
	}
	
	//密码判断
	var password = $("#ptppassword").val();
	
	if (isInputEmpty("#ptppassword")) {
		$("#ptppassword").addClass("noticeRed");
		setValid("#ptppassword", false, "请输入有效的用户名或密码！");
		return;
	} else {
		if (password.length < 6 || password.length > 20) {
			$("#ptppassword").addClass("noticeRed");
			setValid("#ptppassword", false, "请输入有效的用户名或密码！");
			return;
		} else if (!isPassword(password)) {
			$("#ptppassword").addClass("noticeRed");
			setValid("#ptppassword", false, "请输入有效的用户名或密码！");
			return;
		} else {
			$("#ptppassword").removeClass("noticeRed");
			setValid("#ptppassword", true, "");
		}
	}
	
	//验证码判断
	if (isInputEmpty("#pdprandomCode")) {
		$("#pdprandomCode").addClass("noticeRed");
		setValid("#pdprandomCode", false, "请输入验证码");
		return;
	} else {
		$("#pdprandomCode").removeClass("noticeRed");
		setValid("#pdprandomCode", true, "");
	}
	
	var loginNameObj = $("#ptploginName");
	var loginPwdObj = $("#ptppassword");
	if (loginNameObj.data("checked") && defaultPwd != loginPwdObj.val() ? loginPwdObj.data("checked"):true) {

	// 判断是否选中"记住密码"
	var flg = 0;
	if ($("#ptppwdFlg").hasClass('check-current')) {
		flg = 1;
	}
	
	//RSA对称加密
	var modulus =  $("#modulus").val();
	var exponent =  $("#exponent").val();
	var key = RSAUtils.getKeyPair(exponent, '', modulus);
	
	var json = {
		'loginName' : loginName,
		'password' : defaultPwd != password?RSAUtils.encryptedString(key,password): defaultPwd,
		'randomCode' : $("#pdprandomCode").val(),
		'pwdFlg' : flg,
		'ptptype':1
	};
	
	// 提交表单
	asyncXhr(loginUrl, json, {
		type : "POST",
		success : function(data) {
			$(".noticeRed").removeClass("noticeRed");
			var result = data;
			//刷新验证码
			if (result.resultCode != null && result.resultCode != "") {
				if($(document).width()<768){
					changeCode2();
				}else{
					changeCode();
				}
			}
			
			if (result.resultCode == 'requiredError') {
				$("#ptploginName").addClass("noticeRed");
				setValid("#ptploginName", false, "请输入有效的用户名或密码！");
				return false;
			}else if (result.resultCode == 'codeError') {
				$("#pdprandomCode").addClass("noticeRed");
				setValid("#pdprandomCode", false, "验证码输入错误,请重新输入！");
				return false;
			} else if (result.resultCode == 'loginErr') {
				$("#ptploginName").addClass("noticeRed");
				setValid("#ptploginName", false, "请输入有效的用户名或密码！");
				return false;
			} else if (result.resultCode == 'mobileError') {
				$("#ptploginName").addClass("noticeRed");
				setValid("#ptploginName", false, "请输入有效的用户名或密码！");
				return false;
			} else if (checkStrIsNotNull(result.returnUrl)) {
				//登录成功，关闭login
				$(".pop-up-login .pop-up-close").click();
				if(type && type=='notice'){
					$('a.buy-but-collection-new').trigger("click");
				}else{
					if(result.description.id!=null){
						var skuId=$("li.sizeOption.screening-size-show").attr("skuId");
						var itemId=$("li.sizeOption.screening-size-show").attr("itemId");
						var json = {
								"skuId" : skuId,
								"itemId":itemId
							};
						var data=syncXhr(pagebase + "/account/addfavorit.json",json ,{type: "POST"});
						if(data==1){
							showTipsInfoDiv('', "抱歉您所添加的商品不存在!");
						}else if(data==2){
							showTipsInfoDiv('', "您已经收藏过该商品啦!!");
						}else if(data==3){
							showTipsInfoDiv('', "收藏商品数量已达到上限，请删除后再添加新的收藏商品!");
						}else if(data==0){
							// 国双按钮监控（收藏商品）
							var ProductName_gs = $(".trade-name").text();
							var SKU_gs = $("#SKU").text();
							var pageDiff = $("#pageDiff").text();
							if(pageDiff==null || pageDiff == undefined || pageDiff==''){
							    if (window._gsTracker) {
							        _gsTracker.trackEvent('CollectionProducts_PDP',ProductName_gs,SKU_gs);
							    }								
							}else{
						    	var style = $(".price-style.clear .style").attr("styleid");
						    	var color = $(".pdp-color .fonta").text();
						    	color = color.replace("(","").replace(")","");
						        if (window._gsTracker) {
						            _gsTracker.trackEvent('CollectionProducts_PQV',ProductName_gs,SKU_gs);
						        }																	
							}

							//库存数量
							var qty=$("li.sizeOption.screening-size-show").attr("qty");
							//判断弹出层
							if($(document).width()<768){
								var button="订阅到货通知";
								if(qty && parseInt(qty)>0){
									button="查看收藏夹";
								}
								var mb_popup = showConfirmPop("继续购物", button, "您已经收藏成功", "您已将1件商品加入收藏夹");
								$(".pop-up-button-ok").live("click",function(){
									$(this).parents(".pop-up-content").find(".pop-up-close").click();
								});
								$(".pop-up-button-cancel").live("click",function(){
									if(qty && parseInt(qty)>0){
										window.location="/account/favoritlist.htm";
									}else{
										var createNoticeUrl=pagebase+'/account/createNotice.json';
										var itemId=$(".trade-name").attr("itemId");
										var skuId=$("li.sizeOption.screening-size-show").attr("skuId");
										var json = {
											'skuId' : skuId,
											'itemId' : itemId
										};
										// 提交表单
										$.ajax({
											url:createNoticeUrl, 
											data:json,
											type: "post",
											success:function(data) {
												if(data.isSuccess){
													mb_popup.find(".pop-up-close").click();
													showTipsInfoDiv("成功订阅到货通知！","该商品到货时我们将在第一时间以邮件形式通知您。");
												} else{
													showTipsInfoDiv("提示",data.description);
												}
											}
										});
									}
								});
							}else{
								var popup = showPopup("prompt-box pop-up-collection");
								popup.find(".pop-up-main").html($("#pdp-popup-favourite_pc").html());
								//更新尺寸
								$("#pdp_fav_size").html('尺码：'+$("li.sizeOption.screening-size-show").text());
								//继续购物关闭当前窗口
								$(document).on('click','.continue_cart_btn',function(){
									popup.find(".pop-up-close").click();
								});
								if(qty && parseInt(qty)>0){
									$("#fav_notice_btn").hide();
								}else{
									$("#fav_notice_btn").show();
									$(document).on('click','#fav_notice_btn a',function(){
										var createNoticeUrl=pagebase+'/account/createNotice.json';
										var itemId=$(".trade-name").attr("itemId");
										var skuId=$("li.sizeOption.screening-size-show").attr("skuId");
										var json = {
											'skuId' : skuId,
											'itemId' : itemId
										};
										// 提交表单
										$.ajax({
											url:createNoticeUrl, 
											data:json,
											type: "post",
											success:function(data) {
												if(data.isSuccess){
													popup.find(".pop-up-close").click();
													showTipsInfoDiv("成功订阅到货通知！","该商品到货时我们将在第一时间以邮件形式通知您。");
												} else{
													showTipsInfoDiv("提示",data.description);
												}
											}
										});
									});
										
								}
							}
							
						}				
					}
				}
				loadMiniCartInfo();
				var  username =result.description.loginName;
				//username = username.substring(0,username.indexOf("@"));
				$("#login").hide();
				$("#registered").hide();
				$("#homelogin").hide();
				$("#regist").hide();
				$("#userName").show();
				$("#account").show();
				$("#logout").show();
				$("#showUserName").html(username);
				$("#myaccount").show();
				$("#loginOut").show();
				//新增移动端
				$("#mobileLogin").hide();
				$("#mobileLogOut").show();
				
			}
		}});
	}	
}

var randomCodeFlag = false;
var registerMobileFlag = false;

var sengMsgUrl = pagebase + "/member/sendMobileMsgCode.json";

var registerUrl = pagebase + "/member/register.htm";

var validateEmailUrl = pagebase + "/member/memberemailcheck.json";

var validateRandomCodeUrl = pagebase + "/member/checkRandomCode.json";

var validateMobileUrl = pagebase + "/member/membermobilecheck.json";

//国双按钮监控（Register）
function onfocus_gs_test(obj){
	var value=$(obj).val();
	var trim=$.trim(value);
    if (window._gsTracker&&trim) {
    	//alert("Register="+$(obj).attr("id"));
        _gsTracker.trackEvent('Register',$(obj).attr("id"),'');
    }
}

function changeCode() {
	var src = $("#imageCode").attr('src').split('?')[0];
	$("#imageCode").attr('src', src + '?' + Math.random());
}

function changeCode2() {
	var src = $("#imageCode2").attr('src').split('?')[0];
	$("#imageCode2").attr('src', src + '?' + Math.random());
}

function Codeyzm() {
	var src = $("#codeyzm").attr('src').split('?')[0];
	$("#codeyzm").attr('src', src + '?' + Math.random());
	
}

function codemob() {
	var src = $("#codemobd").attr('src').split('?')[0];
	$("#codemobd").attr('src', src + '?' + Math.random());
}

function setValid(obj, flag, message){
	$(obj).data("checked", flag);
	if(flag){
		var $errspan = getErrDiv(obj);
		$errspan.html(message);
		var verification_text = $(".verification-style .pL .codeNotice").html();
		$(".verification-style .codeNotices").html(verification_text);		
	}else{
		var $errspan = getErrDiv(obj);
		$errspan.html(message);
		var verification_text = $(".verification-style .pL .codeNotice").html();
		$(".verification-style .codeNotices").html(verification_text);
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

function checkMobile(mobile) {
//	var checkMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
/*	var checkMobile = /^1[3|4|5|8][0-9]\d{4,8}$/;*/
	var checkMobile = /^1[3|4|5|7|8]\d{9}$/;
	if (checkMobile.test(mobile)) {
		return true;
	}
	return false;
}

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

/*手机验证码*/
var wait=60;
function time(o) {
    if (wait == 0) {
    	o.removeAttribute("disabled");   
    	o.value="获取短信验证码";
    	wait = 60;
    }else{ 
	   o.setAttribute("disabled", true);
	   o.value="重新发送(" + wait + ")";
	   wait--;
	   setTimeout(function() {
		   time(o)
	   },1000)
    }
}
/**
 * 绑定发送短信按钮的点击事件
 */
function bindClick(){
	// 获取手机验证码
    $(".obile_phone_validation-yes").unbind("click").click(function(){
    	var flag = true;
    	var obj = this;
    	// 判断验证码是否为空
/*		if (isInputEmpty("#randomCode")) {
			$("#randomCode").addClass("noticeRed");
			setValid("#randomCode", false, "请输入验证码");
			flag = false;
		} else {
			$("#randomCode").removeClass("noticeRed");
			setValid("#randomCode", true, "");
		}
		
    	// 判断手机号是否为空
		if (isInputEmpty("#registerMobile")) {
			$("#registerMobile").addClass("noticeRed");
			setValid("#registerMobile", false, "请输入手机号");
			flag = false;
		} else {
			$("#registerMobile").removeClass("noticeRed");
			setValid("#registerMobile", true, "");
		}
		
		// 验证无效手机号
		var loginMobile = $("#registerMobile").val();
		if(!checkMobile(loginMobile)){
			$("#registerMobile").addClass("noticeRed");
			setValid("#registerMobile", false, "手机号无效");
			flag = false;			
		}else{
			$("#registerMobile").removeClass("noticeRed");
			setValid("#registerMobile", true, "");
		}*/
    	    	
		$("#randomCode,#registerMobile").trigger('blur');
		
		if(!randomCodeFlag  || !registerMobileFlag ){
			return;
		}
		
    	// 控件倒计时
    	time(obj);
    	
		var json = {
				'mobile' : $.trim($("#registerMobile").val()),
				'randomCode' : $.trim($("#randomCode").val())
			};
		
		// 提交表单
		asyncXhr(sengMsgUrl, json, {
			type : "POST",
			successHandler : function(data) {
				var result = data;			
                if (result.resultCode == 'registerMobileErr') {
					$("#registerMobile").addClass("noticeRed");
					setValid("#registerMobile", false, "手机号无效");
					return false;
				}else if(result.resultCode == 'mobileExist'){
					$("#registerMobile").addClass("noticeRed");
					setValid("#registerMobile", false, "手机号已存在");
					return false;
				}else if(result.resultCode == 'codeError'){
					$("#randomCode").addClass("noticeRed");
					setValid("#randomCode", false, "验证码输入错误，请重新输入！");
					return false;
				}else{
			    	
				}
			}
		});
    })
}

$(document).ready(function() {
	
	if($(window).width() < 768){
    	$(".signup-main-pc").html("");
    }else{
    	$(".signup-main-mobile").html("");
    }
	
	$('.check-txt').click(function(){
	   	$(this).children('.check-input').toggleClass('check-current');
	});
	
	$("#birthday").datepicker({
		 buttonImageOnly: true,
		 changeMonth: true,
		 changeYear: true,
		 yearRange : 'c-100',
		 defaultDate:"-20y",
		 maxDate : '-18y'
	});
	
	
    

//	$("#securityImg").click(function() {
//		changeCode($(this));
//	});

	/**
	 * 验证邮箱是否已经存在
	 */
	$("#email").blur(function() {
		var t = /^[A-Za-z][A-Za-z0-9_-]*$/;
		var loginEmail =  $.trim($(this).val());
		if (isInputEmpty("#email")) {
			$(this).addClass("noticeRed");
			if($(window).width() < 768){
				setValid(this, false, "");				
			}else{
				setValid(this, false, "请输入邮箱");				
			}
			return;
		} else {
			if (checkEmail(loginEmail)) {
				if ((loginEmail.length > 0 && loginEmail.length < 6) || loginEmail.length > 100) {
					$(this).addClass("noticeRed");
					setValid(this, false, "邮箱长度必须在6-100位之间");
					return;
				}

				if (!checkStrIsNotNull(loginEmail))
					return false;
				var url, json, message = "该邮箱已被使用";
				if (checkEmail(loginEmail)) {
					// 邮箱
					url = validateEmailUrl;
					json = {
						"email" : loginEmail
					};
				}
				var _d = syncXhr(url, json, {
					type : "POST"
				});
				if (!_d.isSuccess) {
					if (checkEmail(loginEmail)) {
						$(this).addClass("noticeRed");
						message = "该邮箱已存在";
					}
					setValid(this, false, message);
					return false;
				} else {
					$(this).removeClass("noticeRed");
					setValid(this, true, "");
				}

			} else {
				$(this).addClass("noticeRed");
				setValid(this, false, "邮箱格式不正确");
				return;
			}
		}
	});

	/**
	 * 验证手机号
	 */
	$("#registerMobile").blur(function() {
		var loginMobile = $.trim($(this).val());
		if (isInputEmpty("#registerMobile")) {
			$(this).addClass("noticeRed");
			if($(window).width() < 768){
				setValid(this, false, "");
			}else{
				setValid(this, false, "请输入手机号");
			}

		}else{
			if (loginMobile) {
				if (checkMobile(loginMobile)) {
					// 校验手机号码是否存在
					url = validateMobileUrl;
					json = {
						"mobile" : loginMobile
					};
					var _d = syncXhr(url, json, {
						type : "POST"
					});
					if (!_d.isSuccess) {
						if (checkMobile(loginMobile)) {
							$(this).addClass("noticeRed");
							message = "该手机号码已存在";
							registerMobileFlag = false;
						}
						setValid(this, false, message);
						return false;
					} else {
						$(this).removeClass("noticeRed");
						setValid(this, true, "");
						registerMobileFlag = true;
					}
				} else {
					$(this).addClass("noticeRed");
					setValid(this, false, "手机号无效");
					registerMobileFlag = false;
					return;
				}
			}			
		}
	});

	/**
	 * 验证密码
	 */
	$("#password").blur(function() {
		var password = $("#password").val();
		if (isInputEmpty("#password")) {
			$(this).addClass("noticeRed");
			if($(window).width() < 768){
				setValid(this, false, "");
			}else{
				setValid(this, false, "请输入密码");
			}

		} else {
			if (password.length < 8 || password.length > 16) {
				$(this).addClass("noticeRed");
				setValid(this, false, "密码长度必须大于8位小于16位");
				return;
			} 
			if (isPassword($.trim(password))<2||validSpecialWord(password)) {
				$(this).addClass("noticeRed");
				setValid(this, false, "密码必须是数字跟字母的组合");
				return;
			} else {
				$(this).removeClass("noticeRed");
				setValid(this, true, "");
			}
		}
	});

	$("#repassword").blur(function() {
		var repassword = $("#repassword").val();
		if (isInputEmpty("#repassword")) {
			$(this).addClass("noticeRed");
			setValid(this, false, "请输入确认密码");
			return;
		} else {
			if (repassword.length < 8 || password.length > 16) {
				$(this).addClass("noticeRed");
				setValid(this, false, "密码长度必须大于8位小于16位");
				return;
			}
			if (repassword != $("#password").val()) {
				$(this).addClass("noticeRed");
				setValid(this, false, "两次密码填写不一致");
			} else {
				$(this).removeClass("noticeRed");
				setValid(this, true, "");
			}
		}
	});
	
	/**
	 * 验证码
	 */
	$("#randomCode").blur(function() {
		if (isInputEmpty("#randomCode")) {
			$(".obile_phone_validation").removeClass("obile_phone_validation-yes");
			$(this).addClass("noticeRed");
			if($(window).width() < 768){
				setValid("#randomCode", false, "");
			}else{
				setValid("#randomCode", false, "请输入验证码");
			}

			randomCodeFlag = false;
		} else {
			//校验验证码是否正确
			var randomCode = $.trim($("#randomCode").val());
			url = validateRandomCodeUrl;
			json = {
				"randomCode" : randomCode
			};
		var _d = syncXhr(url, json, {
			type : "POST"
		});
		if (_d.isSuccess) {
			$(".obile_phone_validation").addClass("obile_phone_validation-yes");
			$(this).removeClass("noticeRed");
			setValid(this, true, "");
			bindClick();
			randomCodeFlag = true;
		}else{
			$(".obile_phone_validation").removeClass("obile_phone_validation-yes");
			$(this).addClass("noticeRed");
			setValid("#randomCode", false, "验证码错误");	
			randomCodeFlag = false;
		}
/*			if(true){
				$(".obile_phone_validation").addClass("obile_phone_validation-yes");
				$(this).removeClass("noticeRed");
				setValid(this, true, "");
				bindClick();
			}else{
				$(".obile_phone_validation").removeClass("obile_phone_validation-yes");
				$(this).addClass("noticeRed");
				setValid("#randomCode", false, "验证码错误");				
			}*/
		}
	});
	
	/**
	 * 手机验证码
	 */
	$("#registerMobileCode").blur(function() {
		if (isInputEmpty("#registerMobileCode")) {
			$(this).addClass("noticeRed");
			if($(window).width() < 768){
				setValid("#registerMobileCode", false, "");					
			}else{
				setValid("#registerMobileCode", false, "请输入短信验证码");				
			}

		} else {
			$(this).removeClass("noticeRed");
			setValid(this, true, "");
		}
	});
	
	$("#registBut").click(function() {
	    if($(window).width() < 768){
			$("#email,#registerMobile, #password,#randomCode").trigger('focus');
			$("#email,#registerMobile, #password,#randomCode").trigger('blur');
			
			$("#repassword").val($("#password").val());
			
			var birthday = $("#birthday").val();
			if (isInputEmpty("#birthday")) {
				$("#birthday").addClass("noticeRed");
				setValid("#birthday", false, "");
			}else {
				$("#birthday").removeClass("noticeRed");
				setValid("#birthday", true, "");
			}

			var sex = $("#selectSex").text();
			if (sex == "请选择") {
				$("#selectSex").parent().addClass("noticeRed");
				$("#sex_codeNotice").html("");
			}else{
				if(sex == "男"){
					$("#sex").val("1");
				}else{
					$("#sex").val("2");
				}
				$("#selectSex").parent().removeClass("noticeRed");
				$("#sex_codeNotice").html("");
			}
			
	    	// 判断手机验证码是否为空
			var registerMobileCode = $("#registerMobileCode").val();
			if (isInputEmpty("#registerMobileCode")) {
				$("#registerMobileCode").addClass("noticeRed");
				setValid("#registerMobileCode", false, "");
			} else {
				$("#registerMobileCode").removeClass("noticeRed");
				setValid("#registerMobileCode", true, "");
			}
			
	    	// 判断手机号是否为空
			if (isInputEmpty("#registerMobile")) {
				$("#registerMobile").addClass("noticeRed");
				setValid("#registerMobile", false, "");
				flag = false;
			} else {
				$("#registerMobile").removeClass("noticeRed");
				setValid("#registerMobile", true, "");
			}
			
			var randomCode = $("#randomCode").val();
			if (isInputEmpty("#randomCode")) {
				$("#randomCode").addClass("noticeRed");
				setValid("#randomCode", false, "");
				return;
			} else {
				$("#randomCode").removeClass("noticeRed");
				setValid("#randomCode", true, "");
			}
				
			var acceptChck = $("#acceptChck").attr("class");
			if (acceptChck == "check-input check-current") {
				$("#accepNotice").html("");
			} else {
				$("#accepNotice").html("同意网站使用规则才能注册会员");
				return;
			}
			var receiveMail = $("#receive").attr("class");
			if (receiveMail == "check-input check-current") {
				$("#receiveMail").val("1");
			} else {
				$("#receiveMail").val("0");
			}
			if ($("#email").data("checked") &&  $("#password").data("checked")) {
				//RSA对称加密
				var modulus =  $("#modulus").val();
				var exponent =  $("#exponent").val();
				var key = RSAUtils.getKeyPair(exponent, '', modulus);
				
				var json = {
					'registerMobileCode' : $.trim($("#registerMobileCode").val()),
					'loginName' : $.trim($("#email").val()),
					'loginMobile' : $.trim($("#registerMobile").val()),
					'password' : RSAUtils.encryptedString(key,$("#password").val()),
					'repassword' : RSAUtils.encryptedString(key,$("#repassword").val()),
					'birthday' : $("#birthday").val(),
					'randomCode' : $("#randomCode").val(),
					'receiveMail' : $("#receiveMail").val() == undefined ? 0 : $("#receiveMail").val(),
					'sex' : $("#sex").val()
				};

				// 提交表单
				asyncXhr(registerUrl, json, {
					type : "POST",
					successHandler : function(data) {
//						$(".noticeRed").removeClass("noticeRed");
						var result = data;
						//刷新验证码
						if (result.resultCode != null && result.resultCode != "") {
							if($(document).width()<768){
								changeCode2();
							}else{
								changeCode();
							}
						}
						
						if (result.resultCode == 'registerEmailErr') {
							$("#email").addClass("noticeRed");
							setValid("#email", false, "邮箱格式不正确");
							return false;
						} else if (result.resultCode == 'registerMobileErr') {
							$("#registerMobile").addClass("noticeRed");
							setValid("#registerMobile", false, "手机号无效");
							return false;
						}else if(result.resultCode == 'mobileExist'){
							$("#registerMobile").addClass("noticeRed");
							setValid("#registerMobile", false, "手机号已存在");
							return false;
						} else if (result.resultCode == 'passwordErr') {
							$("#password").addClass("noticeRed");
							setValid("#password", false, "密码必须是数字跟字母的组合");
							return false;
						}/* else if (result.resultCode == 'repasswordErr') {
							$("#repassword").addClass("noticeRed");
							setValid("#repassword", false, "重复密码必须是数字跟字母的组合");
							return false;
						}*/ else if (result.resultCode == 'requiredError') {
							$("#email").addClass("noticeRed");
							setValid("#email", false, "请输入必填项！");
							return false;
						} else if (result.resultCode == 'userExist') {
							var message = "该用户名已被使用";
							if (result.type == 2) {
								$("#email").addClass("noticeRed");
								message = "该邮箱已存在";
							}
							setValid("#email", false, message);
							return false;
						}/* else if (result.resultCode == 'pwdMatchErr') {
							$("#repassword").addClass("noticeRed");
							setValid("#repassword", false, "两次密码填写不一致");
							return false;
						} */else if(result.resultCode == 'codeError'){
							$("#randomCode").addClass("noticeRed");
							setValid("#randomCode", false, "验证码输入错误，请重新输入！");
							return false;
						} else if(result.resultCode == 'registerMobileCodeError'){
							$("#registerMobileCode").addClass("noticeRed");
							setValid("#registerMobileCode", false, "手机验证码输入错误，请重新输入！");
							return false;
						} else if (result.resultCode == 'registerError') {
							setValid("#email", false, "注册失败，请稍后重试!");
						} else if (result.resultCode == 'sysError') {
							setValid("#email", false, "注册失败，请稍后重试!");
							return false;
						} else if (checkStrIsNotNull(result.returnUrl)) {
							window.location.href = pagebase + result.returnUrl;
						}
					}
				});

			}
	    }else{
			$("#email,#registerMobile, #password, #repassword,#randomCode").trigger('focus');
			$("#email,#registerMobile, #password, #repassword,#randomCode").trigger('blur');
			
			var birthday = $("#birthday").val();
			if (isInputEmpty("#birthday")) {
				$("#birthday").addClass("noticeRed");
				setValid("#birthday", false, "请选择生日");
			}else {
				$("#birthday").removeClass("noticeRed");
				setValid("#birthday", true, "");
			}

			var sex = $("#selectSex").text();
			if (sex == "请选择") {
				$("#selectSex").parent().addClass("noticeRed");
				$("#sex_codeNotice").html("请选择性别");
			}else{
				if(sex == "男"){
					$("#sex").val("1");
				}else{
					$("#sex").val("2");
				}
				$("#selectSex").parent().removeClass("noticeRed");
				$("#sex_codeNotice").html("");
			}
			
	    	// 判断手机验证码是否为空
			var registerMobileCode = $("#registerMobileCode").val();
			if (isInputEmpty("#registerMobileCode")) {
				$("#registerMobileCode").addClass("noticeRed");
				setValid("#registerMobileCode", false, "请输入短信验证码");
			} else {
				$("#registerMobileCode").removeClass("noticeRed");
				setValid("#registerMobileCode", true, "");
			}
			
	    	// 判断手机号是否为空
			if (isInputEmpty("#registerMobile")) {
				$("#registerMobile").addClass("noticeRed");
				setValid("#registerMobile", false, "请输入手机号");
				flag = false;
			} else {
				$("#registerMobile").removeClass("noticeRed");
				setValid("#registerMobile", true, "");
			}
			
			var randomCode = $("#randomCode").val();
			if (isInputEmpty("#randomCode")) {
				$("#randomCode").addClass("noticeRed");
				setValid("#randomCode", false, "请输入验证码");
				return;
			} else {
				$("#randomCode").removeClass("noticeRed");
				setValid("#randomCode", true, "");
			}
				
			var acceptChck = $("#acceptChck").attr("class");
			if (acceptChck == "check-input check-current") {
				$("#accepNotice").html("");
			} else {
				$("#accepNotice").html("同意网站使用规则才能注册会员");
				return;
			}
			var receiveMail = $("#receive").attr("class");
			if (receiveMail == "check-input check-current") {
				$("#receiveMail").val("1");
			} else {
				$("#receiveMail").val("0");
			}
			if ($("#email").data("checked") &&  $("#password").data("checked") && $("#repassword").data("checked")) {
				//RSA对称加密
				var modulus =  $("#modulus").val();
				var exponent =  $("#exponent").val();
				var key = RSAUtils.getKeyPair(exponent, '', modulus);
				
				var json = {
					'registerMobileCode' : $.trim($("#registerMobileCode").val()),
					'loginName' : $.trim($("#email").val()),
					'loginMobile' : $.trim($("#registerMobile").val()),
					'password' : RSAUtils.encryptedString(key,$("#password").val()),
					'repassword' : RSAUtils.encryptedString(key,$("#repassword").val()),
					'birthday' : $("#birthday").val(),
					'randomCode' : $("#randomCode").val(),
					'receiveMail' : $("#receiveMail").val() == undefined ? 0 : $("#receiveMail").val(),
					'sex' : $("#sex").val()
				};

				// 提交表单
				asyncXhr(registerUrl, json, {
					type : "POST",
					successHandler : function(data) {
//						$(".noticeRed").removeClass("noticeRed");
						var result = data;
						//刷新验证码
						if (result.resultCode != null && result.resultCode != "") {
							if($(document).width()<768){
								changeCode2();
							}else{
								changeCode();
							}
						}
						
						if (result.resultCode == 'registerEmailErr') {
							$("#email").addClass("noticeRed");
							setValid("#email", false, "邮箱格式不正确");
							return false;
						} else if (result.resultCode == 'registerMobileErr') {
							$("#registerMobile").addClass("noticeRed");
							setValid("#registerMobile", false, "手机号无效");
							return false;
						}else if(result.resultCode == 'mobileExist'){
							$("#registerMobile").addClass("noticeRed");
							setValid("#registerMobile", false, "手机号已存在");
							return false;
						} else if (result.resultCode == 'passwordErr') {
							$("#password").addClass("noticeRed");
							setValid("#password", false, "密码必须是数字跟字母的组合");
							return false;
						} else if (result.resultCode == 'repasswordErr') {
							$("#repassword").addClass("noticeRed");
							setValid("#repassword", false, "重复密码必须是数字跟字母的组合");
							return false;
						} else if (result.resultCode == 'requiredError') {
							$("#email").addClass("noticeRed");
							setValid("#email", false, "请输入必填项！");
							return false;
						} else if (result.resultCode == 'userExist') {
							var message = "该用户名已被使用";
							if (result.type == 2) {
								$("#email").addClass("noticeRed");
								message = "该邮箱已存在";
							}
							setValid("#email", false, message);
							return false;
						} else if (result.resultCode == 'pwdMatchErr') {
							$("#repassword").addClass("noticeRed");
							setValid("#repassword", false, "两次密码填写不一致");
							return false;
						} else if(result.resultCode == 'codeError'){
							$("#randomCode").addClass("noticeRed");
							setValid("#randomCode", false, "验证码输入错误，请重新输入！");
							return false;
						} else if(result.resultCode == 'registerMobileCodeError'){
							$("#registerMobileCode").addClass("noticeRed");
							setValid("#registerMobileCode", false, "手机验证码输入错误，请重新输入！");
							return false;
						} else if (result.resultCode == 'registerError') {
							setValid("#email", false, "注册失败，请稍后重试!");
						} else if (result.resultCode == 'sysError') {
							setValid("#email", false, "注册失败，请稍后重试!");
							return false;
						} else if (checkStrIsNotNull(result.returnUrl)) {
							window.location.href = pagebase + result.returnUrl;
						}
					}
				});

			}
	    }
	});
	
});

var isReturn =false;
(function($){
    var tokenValue = $("meta[name='_csrf']").attr("content");
    
    //备份jquery的ajax方法
    var _ajax=$.ajax;
     
    //重写jquery的ajax方法
    $.ajax=function(opt){
        //备份opt中error和success方法
        var fn = {
            error:function(XMLHttpRequest, textStatus, errorThrown){},
            success:function(data, textStatus){}
        };
        if(opt.error){
            fn.error=opt.error;
        }
        if(opt.success){
            fn.success=opt.success;
        }
         
        //扩展增强处理
        var _opt = $.extend(opt,{
            error:function(XMLHttpRequest, textStatus, errorThrown){
                //错误方法增强处理
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data, textStatus){
                //成功回调方法增强处理
            	if (data && data.denied) {
            		isReturn =true;
				}else{
					fn.success(data, textStatus);
				}
            },
            beforeSend:function(XHR){
                //提交前回调方法
            	if(typeof(tokenValue) != "undefined") {
            		XHR.setRequestHeader("X-CSRF-TOKEN", tokenValue);
            	}
            },
            complete:function(XHR, TS){
                //请求完成后回调函数 (请求成功或失败之后均调用)。
            },
            cache: false
        });
        
       if(isReturn){
    	   isReturn =false;
    	   return false;
       }else{
    	   _ajax(_opt);
       }
    };
    
    $('form[method=post]').append($('<input />').attr('name', "_csrf").attr('type','hidden').val(tokenValue));

})(jQuery);


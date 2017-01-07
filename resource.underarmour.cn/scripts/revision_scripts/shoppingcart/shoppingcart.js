var arrivalNoticeDialog;
/**
 * 编辑订单行
 * @param obj
 */
function editLine(obj,itemId,skuId){
	var w = $("body").width();
	var $thisClosetList = $(obj);

	// 购买的数量
	var num = $thisClosetList.find(".shoppingcart-num span").text();
	
	// 获取原来的勾选状态
	var choiceFlag = false;
	if($thisClosetList.find(".form-simulate.form-checkbox").hasClass("on")){
		choiceFlag = true;
	}

	if(itemId == null || itemId == undefined){
	   itemId = $thisClosetList.find(".shoppingcart-num input[name='itemId']").val();
	}
	
	if(skuId == null || skuId == undefined){
		skuId = $thisClosetList.find(".shoppingcart-num input[name='skuId']").val();
	}
	
	// 获取最开始选择的skuId
	var initSkuId = '';
	initSkuId = $thisClosetList.find(".shoppingcart-num input[name='initSkuId']").val();

	// 行号
	var lineIndex = $thisClosetList.find(".shoppingcart-num input[name='lineIndex']").val();
	 var json = {
			 "itemId" : itemId,
			 "choiceSku" : skuId,
			 "returnPath":"/revision_pages/shoppingcart/shoppingCart_line"
	 };
		var cartProColourUrl=pagebase + "/product/"+itemId+".json";
		$.post(cartProColourUrl,json, function(html){
			$thisClosetList.html(html);
						
	    	$thisClosetList.addClass('is-edit');
	    	
	    	$thisClosetList.find(".shoppingcart-num input[name='initSkuId']").val(initSkuId);
	    	    		    	
	    	var index = 0;
				if( $(window).width() > 767 ){
					index = 0;
				}else{
					index = 1;
				}
								
		    var sizeText = $thisClosetList.find(".edit-size .dropdown-text").eq(index).text();
			if(sizeText.indexOf("无货") > 0){
					$thisClosetList.find(".edit-size .dropdown-text").eq(index).parents(".cart-size").addClass("is-out");
					$thisClosetList.find(".form-simulate.form-checkbox").addClass("is-disabled");
					$thisClosetList.find(".form-simulate.form-checkbox").find("i").attr("onclick","");
				}else{
			    	if(choiceFlag){
			    		$thisClosetList.find(".form-simulate.form-checkbox").addClass("on");
			    	}					
				}
			
			// 购物车行数量(判断购买的数量是否大于库存量)
			var qty= $thisClosetList.find(".shoppingcart-goods .edit-size .dropdown-text").eq(index).attr("qty");
			if(qty <= num){
				num = qty;
				if(qty == 0){
					num = 0;
					qty = 0;
				}
				$thisClosetList.find('.btn-plus').addClass('is-disabled');
			}
			$thisClosetList.find(".shoppingcart-num span").text(num);
			
			// 购物车行小计
			$thisClosetList.find(".shoppingcart-subtotal p").text("￥"+(Number($thisClosetList.find(".shoppingcart-unit p").text().split("￥")[1]) * Number(num)).toFixed(2));

			var thisNum = $thisClosetList.find('.shoppingcart-num p span').text();

    		$thisClosetList.find('.calculateNum input').val( thisNum );
	    	if( thisNum == 1 ){
	    		$thisClosetList.find('.btn-minus').addClass('is-disabled');
	    	}
	    	$(this).parents('.shoppingcart-list').find('.shoppingcart-unit').removeClass('block');
	    	// 编辑打开
	    	//editOpen();
	    	
	    	//模拟下拉框
	    	if(w > 767){
		    	// pc模拟下拉框
		    	$thisClosetList.find(".shoppingcart-goods-info-edit .events-dropdown-scroll").addClass("dropdown_pc_"+lineIndex);
		    	pcDropdown(lineIndex);	    		
	    	}else{
		    	// mobile模拟下拉框
		    	$thisClosetList.find(".shoppingcart-goods-info-edit .events-form-select").addClass("dropdown_mb_"+lineIndex);
		    	mobileDropdown(lineIndex);	    		
	    	}
	    	
	    	// 数量选择
	    	$thisClosetList.find(".shoppingcart-num input[name='lineIndex']").val(lineIndex);
	    	$thisClosetList.find(".calculateNum").removeClass("events-calculateNum").addClass("events-calculateNum_"+lineIndex);
	    	spiceCalculateNum(lineIndex,qty);
	    	// 初始化复选框
	    	//CheckBox2($thisClosetList);
	    	//初始化删除按钮
	    	deleteInit();
	    	// 到货通知初始化
	    	arrivalNoticeClickInit();
	    	// 编辑结束初始化
	    	editClose();
	    	
	    	$thisClosetList.find(".shoppingcart-num input[name='skuId']").attr("id","skuId_"+lineIndex).val(skuId);
		});	
}
/**
 * 编辑打开
 */
function editOpen(){
    $('.events-shoppingcart-list .shoppincart-edit').on('tap', function(event) {
    	event.preventDefault();
    	editLine($(this).closest('.shoppingcart-list'));
    });   	
}

/**
 * mobile模拟下拉框
 */
function mobileDropdown(index){
    $('select', '.dropdown_mb_'+index).change(function(){
    	if($(this).closest('div').hasClass("cart-color")){
    		var newItemId = $('option:checked', this).attr("itemid");
    		editLine($(this).closest('.shoppingcart-list'),newItemId,'');
    	}
    	 	
    	if($(this).closest('div').hasClass("cart-size")){
			// 判断是否选择无货的尺码
			if($('option:checked', this).text().indexOf("无货") < 0){
				$(this).closest('.shoppingcart-list').find('.form-simulate.form-checkbox').removeClass("is-disabled");
				$(this).closest('.shoppingcart-list').find('.form-simulate.form-checkbox').find("i").attr("onclick","CheckBox2(this)");
			}   		
    		
    		$(this).closest('.events-form-select').find(".dropdown-text").attr("skuid",$('option:checked', this).attr("skuid"));
    		$(this).closest('.events-form-select').find(".dropdown-text").attr("itemid",$('option:checked', this).attr("itemid"));
    		$(this).closest('.events-form-select').find(".dropdown-text").attr("qty",$('option:checked', this).attr("qty"));
    		$(this).closest('.events-form-select').find(".dropdown-text").attr("stmclk",$('option:checked', this).attr("stmclk"));
    		$(this).closest('.events-form-select').find(".dropdown-text").attr("title",$('option:checked', this).attr("title"));
    		$(this).closest('.events-form-select').find(".dropdown-text").text($('option:checked', this).text());
    		
    		$(this).closest('.events-form-select').removeClass("is-out");
    		
			var lineIndex = $(this).closest('.shoppingcart-list').find(".shoppingcart-num input[name='lineIndex']").val();
			var stock = $('option:checked', this).attr("qty");
			if(1 < stock){
				$(this).closest('.shoppingcart-list').find(".shoppingcart-num .calculateNum .btn-plus").removeClass("is-disabled");
			}else{
				$(this).closest('.shoppingcart-list').find(".shoppingcart-num .calculateNum .btn-plus").addClass("is-disabled");
			}
			$(this).closest('.shoppingcart-list').find(".shoppingcart-num .calculateNum .btn-minus").addClass("is-disabled");

			$(this).closest('.shoppingcart-list').find(".shoppingcart-num .calculateNum input").attr("value","1");

			$(".events-calculateNum_"+lineIndex).data('spice.calculateNum').opt.max = stock;
			$(".events-calculateNum_"+lineIndex).data('spice.calculateNum').init();    		
    	}    
	});	
}

/**
 * pc模拟下拉框
 */
function pcDropdown(index){
	$.spice.dropdown('.dropdown_pc_'+index, {
		showElemTapCallBack: function(s, o){
			s.addClass('active').siblings().removeClass('active');
			
			if($(o.elem).hasClass("cart-color")){
				var oldItemId = $(o.opt.dropElem, o.elem).find('span:eq(0)').attr("itemid");
				var newItemId = s.find('a').find("i").attr("itemid");
				// 颜色变更
				if(newItemId != oldItemId){
					// 颜色变更重置购买数量(用于显示购买默认值)
					$(o.elem).closest('.shoppingcart-list').find(".shoppingcart-num span").text("1");
					// 修改商品颜色下拉框的显示
					editLine($(o.elem).closest('.shoppingcart-list'),newItemId,'');
				}
			}
			
			if($(o.elem).hasClass("cart-size")){
				// 判断是否选择无货的尺码
				if(s.find('a').find("span").text().indexOf("无货") < 0){
					$(o.elem).closest('.shoppingcart-list').find('.form-simulate.form-checkbox').removeClass("is-disabled");
					$(o.elem).closest('.shoppingcart-list').find('.form-simulate.form-checkbox').find("i").attr("onclick","CheckBox2(this)");
				}
				
				var oldSkuId = $(o.opt.dropElem, o.elem).find('span:eq(0)').attr("skuid");
				$(o.opt.dropElem, o.elem).find("span:eq(0)").remove();
				$(o.opt.dropElem, o.elem).prepend(s.find('a').html());
				$(o.opt.dropElem, o.elem).find("span:eq(0)").addClass("dropdown-text");
				var newSkuId = s.find('a').find("span").attr("skuid");
				// 尺码变更
				if(newSkuId != oldSkuId){
					var lineIndex = $(o.elem).closest('.shoppingcart-list').find(".shoppingcart-num input[name='lineIndex']").val();
					var stock = $(o.opt.dropElem, o.elem).find('span:eq(0)').attr("qty");
					if(1 < stock){
						$(o.elem).closest('.shoppingcart-list').find(".shoppingcart-num .calculateNum .btn-plus").removeClass("is-disabled");
					}else{
						$(o.elem).closest('.shoppingcart-list').find(".shoppingcart-num .calculateNum .btn-plus").addClass("is-disabled");
					}
					
					$(o.elem).closest('.shoppingcart-list').find(".shoppingcart-num .calculateNum .btn-minus").addClass("is-disabled");
					
					$(o.elem).closest('.shoppingcart-list').find(".shoppingcart-num .calculateNum input").attr("value","1");

					$(".events-calculateNum_"+lineIndex).data('spice.calculateNum').opt.max = stock;
					$(".events-calculateNum_"+lineIndex).data('spice.calculateNum').init();
					$(o.elem).closest('.shoppingcart-list').find(".shoppingcart-subtotal p").text("￥"+(Number($(o.elem).closest('.shoppingcart-list').find(".shoppingcart-unit p").text().split("￥")[1]) * 1).toFixed(2));
					var liIndex = $(s).index()
					, $thisListNotice = $(o.elem).closest('.shoppingcart-list').find('.arrival-notice');
				if( $(s).hasClass('is-out') ){
					$(o.elem).addClass('is-out');
					$thisListNotice.addClass('active');
				}else{
					$(o.elem).removeClass('is-out');
					$thisListNotice.removeClass('active');
				}
				}
			}
		}
		, showCallBack: function(o){
			//console.log('show', o);
		}
		, hideCallBack: function(o){
			//console.log('hide', o);
		}
		, tinyscrollbarCallBack: function(s, o){
		}
	});
	
	$('.dropdown_pc_'+index+' .is-out').off();
}
/**
 * 数量选择
 */
function spiceCalculateNum(index,max){
	$.spice.calculateNum('.events-calculateNum_'+index, {
        btnMinus: '.events-minus'
        , btnPlus: '.events-plus'
        , textInput: '.events-input'
        , max: max
        , min: 1
        , callBack: function(s, o){
        	if (o <= s.opt.min) {
        		if(o < s.opt.max){
        			$(s.opt.plus).removeClass('is-disabled');	
        		}
				$(s.opt.minus).addClass('is-disabled');
			} else if (o >= s.opt.max) {
				if(s.opt.min < o){
					$(s.opt.minus).removeClass('is-disabled');
				}
				$(s.opt.plus).addClass('is-disabled');
			} else {
				$(s.opt.minus).removeClass('is-disabled');
				$(s.opt.plus).removeClass('is-disabled');
			}
        	$thisClosetList= $(s.elem).closest('.shoppingcart-list');
			//计算小计
        	var salePrice = $thisClosetList.find(".shoppingcart-unit p").text().split("￥")[1];
			$thisClosetList.find(".shoppingcart-subtotal p").text("￥"+(Number(salePrice) * Number(o)).toFixed(2));
        }
	});	
}

/**
 * 复选框
 */
function CheckBox(){
    $.spice.CheckBox('.events-checkBox', {
    	isBan : true,
    	checkAllCallBack : function(obj){
    		changeAllSettlementState();
/*    		if($(obj.this).hasClass("on") && $(obj.this).find("input").prop("checked")){
    			$.each(obj.allBoxNoDis, function() {
    				changeSettlementState( $(this).find(".icon-checkbox").attr("data-attr"),true);
    			});
    		}else{
    			$.each(obj.allBoxNoDis, function() {
    				changeSettlementState( $(this).find(".icon-checkbox").attr("data-attr"),false);
    			});
    		}*/
    		loadCartSection();
        },    	
        checkCallBack : function(obj){
    		var skuId = $(obj.this).find(".icon-checkbox").attr("data-attr");
        	if($(obj.this).hasClass("on") && $(obj.this).find("input").prop("checked")){
        		changeSettlementState(skuId,true);
        	}else{
        		changeSettlementState(skuId,false);
        	} 	
        	loadCartSection();
        }
    });
}

/**
 * 编辑下的复选框
 * @returns
 */
function CheckBox2(obj){
	var $div = $(obj).closest(".form-simulate.form-checkbox");
	if($div.hasClass("on")){
		$div.removeClass("on");
	}else{
		$div.addClass("on");
	}
}

/**
 * 删除按钮初始化
 */
function deleteInit(){	
	    	$('.events-shoppingcart-list .shoppincart-delete').on('tap', function(event) {
		    	event.preventDefault();
		    	var lineIndex = $(this).closest('.shoppingcart-list').find(".shoppingcart-num input[name='lineIndex']").val();
		    	showCartDeleteDiv(lineIndex,'');
		    });
}

/**
 * 到货通知初始化
 */
var arrivalNoticeDialogUrl = pagebase + "/shoppingcartArrivalNotice.htm";
function arrivalNoticeClickInit(){
	$('.events-shoppingcart-list .arrival-notice').die().on('tap', function(event) {
		event.preventDefault();
		// 获取到货通知弹出层内容
		var json ={
				itemId:	$(this).parents('.shoppingcart-list').find(".shoppingcart-num input[name='itemId']").val()
			};
		$.post(arrivalNoticeDialogUrl,json, function(html){
			arrivalNoticeDialogInit(html);
			arrivalNoticeDialog.show();
		});				
	});		
}

/**
 * 到货弹出层初始化
 */
function arrivalNoticeDialogInit(html){
	arrivalNoticeDialog = $.spice.dialog({
              template: html
    	    , btnSuccessClass: '.btn-black'
    	    , dialogClass: 'dialog-arrival-notice' 
    	    , initEvent: function(e){
    	        //弹出层初始化时需要做的事情，只会在创建弹出层的时候执行
    	        //如：初始化事件
    	        var dialog = e.data.dialog;
    	        $('.btn-black', dialog.elem).on('tap', function(){
    	        	//点击订阅到货通知的操作
    	        	var createNoticeUrl=pagebase+'/account/createNotice.json';
    	        	var skuId = "";
    	        	var itemId = "";
    	        	if(767 < $(window).width()){
        	        	skuId = $(dialog.elem).find(".events-arrivalnotice-dropdown-scroll .dropdown-text").attr("skuid");
        	        	itemId = $(dialog.elem).find(".events-arrivalnotice-dropdown-scroll .dropdown-text").attr("itemid");
    	        	}else{
        	        	skuId = $(dialog.elem).find(".events-arrivalnotice-form-select .dropdown-text").attr("skuid");
        	        	itemId = $(dialog.elem).find(".events-arrivalnotice-form-select .dropdown-text").attr("itemid");
    	        	}

    	        	if(skuId == null || itemId == null){
    	        		showTipsInfoDialog("温馨提示！","订阅前请先选择无货的尺码");
    	        		//alert("请选择尺码");
    	        	}
    	        	var json = {
    	        		'skuId' : skuId,
    	        		'itemId' : itemId
    	        	};
    	        	// 提交表單
    	        	$.ajax({
    	        		url:createNoticeUrl, 
    	        		data:json,
    	        		type: "post",
    	        		success:function(data) {
    	        			if(data.isSuccess){
    	        				showTipsInfoDialog("成功订阅到货通知!","该商品到货时我们将在第一时间以邮件形式通知您.");
    	        				//alert("成功订阅到货通知!","该商品到货时我们将在第一时间以邮件形式通知您.");
    	        	        	dialog.hide();
    	        			} else{
    	        				showTipsInfoDialog("温馨提示！",data.description);
    	        				//alert(data.description);
    	        			}
    	        		},
    	        		error: function(xmlHttpRequest, textStatus, errorThrown) {
    	        			if(xmlHttpRequest.status==900){

    	        			}
    	        		}
    	        	});     	
    	        });
    	        //pc 全模拟下拉框
    	        arrivalNoticeDialogDropdown = $.spice.dropdown('.events-arrivalnotice-dropdown-scroll', {
    				showElemTapCallBack: function(s, o){
    					$(o.opt.dropElem, o.elem).find('span:eq(0)').attr("skuid",s.find('a span').attr("skuid"));
    					$(o.opt.dropElem, o.elem).find('span:eq(0)').attr("itemid",s.find('a span').attr("itemid"));
    					$(o.opt.dropElem, o.elem).find('span:eq(0)').attr("qty",s.find('a span').attr("qty"));
    					$(o.opt.dropElem, o.elem).find('span:eq(0)').attr("stmclk",s.find('a span').attr("stmclk"));
    					$(o.opt.dropElem, o.elem).find('span:eq(0)').attr("title",s.find('a span').attr("title"));
    					$(o.opt.dropElem, o.elem).find('span:eq(0)').text(s.find('a span').text());    					
    					
    					var liIndex = $(s).index()
    						, $thisListNotice = $(o.elem).closest('.shoppingcart-list').find('.arrival-notice');
    					if( $(s).hasClass('is-out') ){
    						$(o.elem).addClass('is-out');
    						$thisListNotice.addClass('active');
    					}else{
    						$(o.elem).removeClass('is-out');
    						$thisListNotice.removeClass('active');
    					}
    				}
    				, showCallBack: function(o){
    					//console.log('show', o);
    				}
    				, hideCallBack: function(o){
    					//console.log('hide', o);
    				}
    				, tinyscrollbarCallBack: function(s, o){
    				}
    			});
    			//mobile 半模拟下拉框
    			$('select', '.events-arrivalnotice-form-select').change(function(){
    	    		$(this).closest('.events-arrivalnotice-form-select').find(".dropdown-text").attr("skuid",$('option:checked', this).attr("skuid"));
    	    		$(this).closest('.events-arrivalnotice-form-select').find(".dropdown-text").attr("itemid",$('option:checked', this).attr("itemid"));
    	    		$(this).closest('.events-arrivalnotice-form-select').find(".dropdown-text").attr("qty",$('option:checked', this).attr("qty"));
    	    		$(this).closest('.events-arrivalnotice-form-select').find(".dropdown-text").attr("stmclk",$('option:checked', this).attr("stmclk"));
    	    		$(this).closest('.events-arrivalnotice-form-select').find(".dropdown-text").attr("title",$('option:checked', this).attr("title"));
    	    		$(this).closest('.events-arrivalnotice-form-select').find(".dropdown-text").text($('option:checked', this).text());
/*    				var val = $('option:checked', this).attr('value');
    				$('span.dropdown-text', $(this).closest('select').prev('a')).html(val);*/
    			});
    	    }
    	});			
}

/**
 * 编辑结束
 * @returns
 */
function editClose(){
    $('.events-shoppingcart-list .shoppingcart-edit-sure').die().on('click', function(event) {
    	event.preventDefault();
    	var windW = $(window).width()
    		,$goodList = $(this).closest('.shoppingcart-list')
    		, $calculateNum = $goodList.find('.calculateNum')
    		, $unitPrice = $goodList.find('.shoppingcart-unit')
    		, InputNum = $calculateNum.find('input').val();

    	var index = 0
		, colorTxt
		, sizeTxt;
			if( windW > 767 ){
				index = 0;
			}else{
				index = 1;
			}    	
    	
    	// 检查是否选择尺码
    	var sizeText = $goodList.find('.edit-size .dropdown').eq(index).find('.dropdown-text').text();

    	if(sizeText == '请选择'){
    		showTipsInfoDialog("温馨提示！","确认前请选择想要购买的尺码");
    		//alert("请选择尺码");
    		return;
    	}
    	
    	if(0 < sizeText.indexOf("无货")){
    		showTipsInfoDialog("温馨提示！","确认前请选择有货的尺码");
    		return;
    	}
    	
    	// 检查是否编辑数量
    	var num = $goodList.find('.shoppingcart-num .calculateNum input').val();
    	
    	if(num == null || num == undefined || num == 0){
    		showTipsInfoDialog("温馨提示！","确认前请选择想要购买的数量");
    		//alert("请选择数量");
    		return;
    	}
    	 	
    	// 判断当前的勾选状态
    	var choiceFlag = false;
    	if($goodList.find(".form-simulate.form-checkbox").hasClass("on")){
    		choiceFlag = true;
    	}
    	
    	// 更新购物车
    	var oldSkuId = $goodList.find(".shoppingcart-num input[name='initSkuId']").val();
    	var newSkuId = $goodList.find('.edit-size .dropdown').eq( index ).find('.dropdown-text').attr("skuid");
    	var num = $goodList.find('.shoppingcart-num .calculateNum input').val();
    	updateShoppingCart(oldSkuId,newSkuId,num,choiceFlag);
    });	
}

/**
 * 购物车事件初始化
 */
function carInit(){

    //编辑打开
    editOpen();

    //结束编辑
    //editClose();

    // 删除按钮初始化
	deleteInit();	
    // 复选框初始化
	CheckBox();
    // 到货通知初始化
	arrivalNoticeClickInit();
	
//	判断邮件通知显示/隐藏
	if($(window).width()>767){
		$.each($('.m-stock-info .stock-info'), function() {
			if($(this).text()=='暂时无货'){
				$(this).parents('.shoppingcart-list').find(".shoppingcart-goods").find(".arrival-notice").show();
			}
		});
	}
	if($(window).width()<768){
		$.each($('.m-stock-info .stock-info'), function() {
			if($(this).text()=='暂时无货'){
				$(this).siblings(".arrival-notice").show();
			}
			if($(this).text()=='商品已下架' || $(this).text()=='库存不足'){
				$(this).removeClass("none-xs");
				$(this).show();
			}
		});
	}
		
	//自动判断是否全选
	ifAutoSelectAll();	
	
	//季末精选特惠商品满减提示
	var disCountPrice = Number($("#disCountPrice").val());
	var dkf = $("#dkf").val();
	var nowTime = new Date().getTime();
	var startTime=transdate("2016-12-30 00:00:00");
	var enTime=transdate("2017-01-08 23:59:59");
	if(startTime<nowTime && nowTime<enTime && dkf != 'true'){
		var freeMess = "";
		if(disCountPrice <= 1000 ){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(1000-disCountPrice).toFixed(2)+"，即可立减￥300。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(1000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥300。</span>";
			}
		}else if(disCountPrice <= 2000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(2000-disCountPrice).toFixed(2)+"，即可立减￥600。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(2000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥600。</span>";
			}
			
		}else if(disCountPrice <= 3000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(3000-disCountPrice).toFixed(2)+"，即可立减￥900。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(3000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥900。</span>";
			}
			
		}else if(disCountPrice <= 4000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(4000-disCountPrice).toFixed(2)+"，即可立减￥1200。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(4000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥1200。</span>";
			}
			
		}else if(disCountPrice <= 5000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(5000-disCountPrice).toFixed(2)+"，即可立减￥1500。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(5000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥1500。</span>";
			}
			
		}else if(disCountPrice <= 6000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(6000-disCountPrice).toFixed(2)+"，即可立减￥1800。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(6000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥1800。</span>";
			}
			
		}else if(disCountPrice <= 7000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(7000-disCountPrice).toFixed(2)+"，即可立减￥2100。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(7000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥2100。</span>";
			}
			
		}else if(disCountPrice <= 8000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(8000-disCountPrice).toFixed(2)+"，即可立减￥2400。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(8000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥2400。</span>";
			}
			
		}else if(disCountPrice <= 9000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(9000-disCountPrice).toFixed(2)+"，即可立减￥2700。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(9000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥2700。</span>";
			}
			
		}else if(disCountPrice <= 10000){
			if($(window).width()>768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(10000-disCountPrice).toFixed(2)+"，即可立减￥3000。";
			}
			if($(window).width()<=768){
				freeMess = "再购买<a href='/endofseason' style='color: red;'>指定商品</a>￥"+(10000-disCountPrice).toFixed(2)+"，</br><span style='line-height: 2;'>即可立减￥3000。</span>";
			}
		}
		$(".free-postage").html(freeMess);
	}else{
		// 判断免邮提醒显示
		if($(".free-postage").find("input[id='useragent']").val() != 'cmblife'){
			if(199 <= Number($(".free-postage").find("input[id='currentPayAmount']").val())){
				$(".free-postage").html("订单享受免邮优惠");
			}else{
				if($(window).width()>768){
					var freeMess = "再购买￥"+(199-Number($(".free-postage").find("input[id='currentPayAmount']").val())).toFixed(2)+"元商品即可享受免邮费优惠";
					$(".free-postage").html(freeMess);
				}
				if($(window).width()<=768){
					var freeMess = "再购买￥"+(199-Number($(".free-postage").find("input[id='currentPayAmount']").val())).toFixed(2)+"元商品</br>即可享受免邮费优惠";
					$(".free-postage").html(freeMess);
				}			
			}
		}else{
			$(".free-postage").html("");
		}
	}
	
	 $('.btn-red').on('tap', function(event) {
	    	event.preventDefault();
	    	gotoPayment();
	    });
	
}

function transdate(endTime){ 
	var date=new Date(); 
	date.setFullYear(endTime.substring(0,4)); 
	date.setMonth(endTime.substring(5,7)-1); 
	date.setDate(endTime.substring(8,10)); 
	date.setHours(endTime.substring(11,13)); 
	date.setMinutes(endTime.substring(14,16)); 
	date.setSeconds(endTime.substring(17,19)); 
	return Date.parse(date); 
	}

/******************华丽的分割线**********************/
$(function(){
	// 购物车方法初始化
	carInit();	
});

/******************华丽的分割线**********************/
/**
 * 自动判断是否全选
 */
function ifAutoSelectAll(){
	var flag=true;

	$(".form-simulate.form-checkbox").each(function(){
		if(!$(this).hasClass("on") && !$(this).hasClass("is-disabled")){
			flag = false;
		}				
	});
	
	if(flag){
		$(".form-simulate.form-checkall").addClass("on");
		$(".form-simulate.form-checkall").find("input").attr("checked","checked");
	}
}

/**
 * 重新加载购物车
 */
var loadUpdateUrl = pagebase + "/shopping/cart/loadUpdate.htm";
function loadCartSection() {
	if(isie60()){
		var loadUpdateUrlTemp = loadUpdateUrl+"?t="+new Date().getMilliseconds();
		$.get(loadUpdateUrlTemp, function(html) {
			$("#shopping_content").html(html);
			carInit();//购物车事件初始化
			$(window).resize();
		});
	}else{
		location.href= pagebase + "/myShoppingCart.htm";
	}
}

/*判断IE浏览器版本*/
function isie60(){
	 var browser=navigator.appName;
	 if(browser=="Microsoft Internet Explorer"){
		 var b_version=navigator.appVersion;
		 var version=b_version.split(";");
		 var trim_Version=version[1].replace(/[ ]/g,"");
		 if( trim_Version=="MSIE7.0"){
			 return false;
		 }else if( trim_Version=="MSIE6.0"){				 
			 return false;
		 }else if( trim_Version=="MSIE8.0"){				 
			 return false;
		 }else if( trim_Version=="MSIE9.0"){				 
			 return false;
		 }
	 }
	 return true;
}


/**
 * 更新购物车
 */
function updateShoppingCart(oldSkuId,skuId,num,choiceFlag){
	var skuId = skuId;
	var num= num;  // product num 
	if(isNullOrEmpty(skuId)||isNullOrEmpty(num)){
		//$(".error-prompt").show();
		return;
	}else{
		//$(".error-prompt").hide();
	}
	var oldSkuId = oldSkuId;
	var url=pagebase + "/editItemColorAndSkuId.json";
	var json = {
			"oldSkuId":oldSkuId,
			"newSkuId":skuId,
			"newCount":num
	};
	if(oldSkuId==skuId){
		// 刷新勾选状态
		changeSettlementState(oldSkuId,choiceFlag);
		url=pagebase + "/editShopCartSkuNum.json";
		json = {
				"skuId":oldSkuId,
				"quantity":num
		};
	}
	var data=syncXhr(url,json ,{type: "POST"});
	if(data.isSuccess) {
		// 刷新勾选状态
		changeSettlementState(skuId,choiceFlag);
		loadCartSection();
		loadMiniCartInfo();
	}else {
		showTipsInfoDialog("温馨提示！",data.description);
		//alert("更新购物车失败");
	}	
}

function isNullOrEmpty(value){
	if(value==""||value==null||value==undefined){
		return true;
	}else{
		return false;
	}
}


/*********--------立即结算-**************/
var calcUrl=pagebase + "/checkShoppingCartEmpty.json";
var checkflag=true;
function gotoPayment(){	
	//判断是否存在选中的购物车行
	if(!checkflag){
		return ;
	}
	var flag=false;
	$(".form-checkbox").each(function(){
		if($(this).hasClass("on")){
			flag=true;
		}
	})
	
	if(!flag){
		showTipsInfoDialog("温馨提示！","选中的购物车为空，请选择想要购买的商品!");
		//alert(content);
		return ;
	}
	
	flag = false;
	// 判断购物车中是否有未确认的
	$(".shoppingcart-list").each(function(){
		if($(this).hasClass("is-edit")){
			flag=true;
		}
	})
	
	if(flag){
		showTipsInfoDialog("温馨提示！","购物车中有未确定的商品，请确认！");
		return ;	
	}

	// 设置支付按钮不可用
	//$(".btn-red").attr("disabled",true);
		var jsonObj={};
		var data = syncXhr(calcUrl,jsonObj ,{type: "POST"});
		if(data!=null){
			if(data.isSuccess){
				// 国双按钮部署（立即结算）
			    if (window._gsTracker) {
			        _gsTracker.trackEvent('Checkout','','');
			    }				
				checkflag=false;
				window.location.href = pagebase + "shopping/checkoutLogin";
			}else{
				$(".btn-red").attr("disabled",false);
				if(data.errorCode == 11014){
					showTipsInfoDialog("温馨提示！","你结算的时候包含了库存不足的商品，请先删除！");
					//alert(content);
					loadCartSection();
				} else {
					var errorMsg = data.description;
					if(isNotNullOrEmpty(errorMsg)){
						if("由于您购买了限量或预售商品必须登录后继续提交订单"==errorMsg){
							//alert("由于您购买了限量或预售商品必须登录后继续提交订单");
							var options = {
									title: '温馨提示！'
										, content: '由于您购买了限量或预售商品必须登录后继续提交订单'
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
													 location.href=pagebase+'/member/login.htm?cartAddFavFlag=cartAddFav';
												}
											}
										}
										, dialogClass: 'order-del-dialog'
										, initEvent: function(e){
										  //弹出层初始化时需要做的事情，只会在创建弹出层的时候执行
										  //如：初始化事件
										}
									}
							showDialog(options);
						}else if(errorMsg.indexOf("__")>-1){
							var strs= errorMsg.split("__"); //定义一数组 
							showTipsInfoDialog("温馨提示！",strs[0]);
							//alert(strs[0]);
							if(strs[1].indexOf(",") < 0){
								var $div = $(".form-simulate.form-checkbox.on").eq(strs[1]).closest('.shoppingcart-list');
								$div.find(".shoppingcart-num .m-stock-info").html('<div class="stock-info limitations">限购1件</div>');
							}else{
								var row=strs[1].split(",");
								for(var i=0;i<row.length;i++){
									var $div = $(".form-simulate.form-checkbox.on").eq(row[i]).closest('.shoppingcart-list');
									$div.find(".shoppingcart-num .m-stock-info").html('<div class="stock-info limitations">限购1件</div>');								
								}								
							}
						}else{
							showTipsInfoDialog("温馨提示！",errorMsg);
							//alert(errorMsg);
						}
					}else{
						//alert(content);
						showTipsInfoDialog("温馨提示！","结算失败，请稍后重试！");
					}
				}
			}
		}else{
			//alert(content);
			showTipsInfoDialog("温馨提示！","结算失败，请稍后重试！");
		}	
	}



//勾选购物车行
var shoppingCartSelectUrl  = pagebase + '/shopping/cart/select';
/**
 * 勾选购物车行
 */
function changeSettlementState(skuId, isSelected){
	var json = {"skuId":skuId, "isSelected":isSelected};
	var data=syncXhr(shoppingCartSelectUrl,json ,{type: "POST"});
};

// 全部勾选或者全部取消
var shoppingCartSelectAllUrl  = pagebase + '/shopping/cart/selectAll';
function changeAllSettlementState(){
	var skuIds = '';
	var choiceFlag = false;
	if($(".form-checkall").hasClass("on")){
		choiceFlag = true;
	}
	$(".form-checkbox").each(function(){
		skuIds = skuIds +$(this).find(".icon-checkbox").attr("data-attr")+ ";";
	})
	var json = {"skuIds":skuIds, "isSelected":choiceFlag};
	var data=syncXhr(shoppingCartSelectAllUrl,json ,{type: "POST"});
};
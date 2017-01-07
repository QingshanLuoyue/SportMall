$(document).ready(function(){
	
	var n = 2;
	var total = $("#totalPages").val();
	var _tag = true;
	var _h = $("#footer").height();
	$(window).scroll(function(){
		if(!_tag){
			return;
		}
		var scrollBottom= $(document).height() - $(window).height() - $(window).scrollTop();
		
		if(scrollBottom<_h+50){
			_tag = false;
			if(n > total){
				$('.list-loading-wrap').hide();
				return;
			}
			$("#pageNumber").val(n);
			loxia.asyncXhrGet(
				"/sys/navigation/loading", 
				loxia._ajaxFormToObj($("#searchForm")), 
				{
					success:function(data){
					$(data).appendTo("#productList");
						list_grid_nav();
						
						//商品名称的链接
						$(".product-text").each(function(){
					        var item_code= $(this).parents("li.product-list-li").find("div.quick-buy").attr("data-attr"); 
					         $(this).find("a").attr("href",pagebase+"/p"+item_code+".htm");
						});
						
						//排序
						$("#common_selectSex").click(function(){
							$("ul.select_scroll_1").toggle();
						});
						$(".common_select_box li").click(function() {
							$("#container").spin();
							var pf = "sortStr";
							var pv = $(this).attr("order");
							isRemove = "other";
							var url = geUrlHashParam(pf,pv,isRemove);
							window.location = url;
						});
					_tag = true;
					n ++;
				}
			});
		}
	});
	
	//商品名称的链接
	$(".product-text").each(function(){
        var item_code= $(this).parents("li.product-list-li").find("div.quick-buy").attr("data-attr"); 
         $(this).find("a").attr("href",pagebase+"/p"+item_code+".htm");
	});
	
	var choice='选项';
	//导航选中效果
	if($(".grid-nav-category .grid-nav-items .filter-item ul li").hasClass("is-selected") 
			|| $(".grid-nav-category ul.mobile li").hasClass("is-selected")){
		$(".grid-nav-category li.filter-item ul li.is-selected").parents("li.filter-item").addClass("is-selected");
		//添加样式
		$(".grid-nav-category .grid-nav-items .filter-item ul li.is-selected").parent("ul").parent(".filter-item").addClass("filter-selected");
		
		//mobile
		var mselected_text = $(".grid-nav-category ul.mobile li.filter-item ul li.is-selected").find("a").text();
		if(mselected_text == ""){
			mselected_text = $(".grid-nav-category ul.mobile li.filter-item.is-selected a").eq(0).text();
			$(".grid-nav-category ul.mobile li.filter-item.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_text);
		}
		$(".grid-nav-category li.filter-item ul li.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_text)
	}
	
	//颜色选中效果
	if($(".grid-nav-color .grid-nav-items li").hasClass("is-selected") || $(".grid-nav-color ul.mobile li.filter-item").hasClass("is-selected")){
		//显示选择内容
		var propertyId = $(".grid-nav-color .grid-nav-items li").parents(".grid-nav-items").find("li.is-selected a").attr("propertyid");
		var selected_text = $(".grid-nav-color .grid-nav-items li").parents(".grid-nav-items").find("li.is-selected a").attr("title");
		var selected_length = $(".grid-nav-color .grid-nav-items li").parents(".grid-nav-items").find(".is-selected").length;
		$(".grid-nav-color .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").show();
		if(selected_length>1){
			var pv="";
			$(".grid-nav-color .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").text(selected_length+choice);
			$(".grid-nav-color .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").attr("propertyId",propertyId);
		}else{
			$(".grid-nav-color .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").text(selected_text);
			$(".grid-nav-color .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").attr("propertyId",propertyId);
		}
		//添加样式
		$(".grid-nav-color .grid-nav-items li.is-selected").parent("ul").parent(".filter-item").addClass("filter-selected");
		$(".grid-nav-color .grid-nav-items li.is-selected").parent("ul").find('li.clear-selections').show();
		$(".grid-nav-color .grid-nav-items li.is-selected").parent("ul").find('li.clear-selections a').attr("propertyId",propertyId);
		
		//mobile显示选择内容
		var mpropertyId = $(".grid-nav-color ul.mobile li.filter-item.is-selected").find("a").attr("propertyid");
		var mselected_text = $(".grid-nav-color ul.mobile li.filter-item.is-selected").find("a").attr("title");
		var mselected_length = $(".grid-nav-color ul.mobile li.filter-item.is-selected").find("a").length;
		if(mselected_length>1){
			$(".grid-nav-color ul.mobile li.filter-item.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_length+choice);
			$(".grid-nav-color ul.mobile li.filter-item.is-selected").siblings(".clear-selections").find("a").attr("propertyId",mpropertyId);
		}else{
			$(".grid-nav-color ul.mobile li.filter-item.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_text);
			$(".grid-nav-color ul.mobile li.filter-item.is-selected").siblings(".clear-selections").find("a").attr("propertyId",mpropertyId);
		}
		//mobile添加样式
		$(".grid-nav-color ul.mobile li.filter-item.is-selected").siblings(".clear-selections").show();
	}
	
	//尺码选中效果
	if($(".grid-nav-size-and-fit .grid-nav-items li").hasClass("is-selected") || $(".grid-nav-size .mobile li.filter-item").hasClass("is-selected")){
		//显示选择内容
		var propertyId = $(".grid-nav-size-and-fit .grid-nav-items li").parents(".grid-nav-items").find("li.is-selected a").attr("propertyid");
		var selected_text = $(".grid-nav-size-and-fit .grid-nav-items li").parents(".grid-nav-items").find("li.is-selected").text();
		var selected_length = $(".grid-nav-size-and-fit .grid-nav-items li").parents(".grid-nav-items").find(".is-selected").length;
		$(".grid-nav-size-and-fit .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").show();
		if(selected_length>1){
			$(".grid-nav-size-and-fit .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").text(selected_length+choice);
			$(".grid-nav-size-and-fit .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").attr("propertyId",propertyId);
		}else{
			$(".grid-nav-size-and-fit .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").text(selected_text);
			$(".grid-nav-size-and-fit .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").attr("propertyId",propertyId);
		}
		//添加样式
		$(".grid-nav-size-and-fit .grid-nav-items li.is-selected").parents(".grid-nav-menu").addClass("filter-selected");
		$(".grid-nav-size-and-fit .grid-nav-items li.is-selected").parents(".grid-nav-menu").find('li.clear-selections').show();
		$(".grid-nav-size-and-fit .grid-nav-items li.is-selected").parents(".grid-nav-menu").find('li.clear-selections a').attr("propertyId",propertyId);
		
		//mobile显示选择内容
		var mpropertyId = $(".grid-nav-size ul.mobile li.filter-item.is-selected").find("a").attr("propertyid");
		var mselected_text = $(".grid-nav-size ul.mobile li.filter-item.is-selected").find("a").html();
		var mselected_length = $(".grid-nav-size ul.mobile li.filter-item.is-selected").find("a").length;
		if(mselected_length>1){
			$(".grid-nav-size ul.mobile li.filter-item.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_length+choice);
			$(".grid-nav-size ul.mobile li.filter-item.is-selected").siblings(".clear-selections").find("a").attr("propertyId",mpropertyId);
		}else{
			$(".grid-nav-size ul.mobile li.filter-item.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_text);
			$(".grid-nav-size ul.mobile li.filter-item.is-selected").siblings(".clear-selections").find("a").attr("propertyId",mpropertyId);
		}
		//mobile添加样式
		$(".grid-nav-size ul.mobile li.filter-item.is-selected").siblings(".clear-selections").show();
	}
	
	//价格区间选中效果
	if($(".grid-nav-price .grid-nav-items li").hasClass("is-selected") || $(".grid-nav-price .mobile li.filter-item").hasClass("is-selected")){
		//显示选择内容
		var type = $(".grid-nav-price .grid-nav-items li").parents(".grid-nav-items").find("li.is-selected a").attr("type");
		var selected_text = $(".grid-nav-price .grid-nav-items li").parents(".grid-nav-items").find("li.is-selected").text();
		var selected_length = $(".grid-nav-price .grid-nav-items li").parents(".grid-nav-items").find(".is-selected").length;
		$(".grid-nav-price .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").show();
		if(selected_length>1){
			$(".grid-nav-price .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").text(selected_length+choice);
			$(".grid-nav-price .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").attr("propertyId",type);
		}else{
			$(".grid-nav-price .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").text(selected_text);
			$(".grid-nav-price .grid-nav-items li").parents(".grid-nav-menu").siblings(".clear-selected").attr("propertyId",type);
		}
		//添加样式
		$(".grid-nav-price .grid-nav-items li.is-selected").parent("ul").parent(".filter-item").addClass("filter-selected");
		$(".grid-nav-price .grid-nav-items li.is-selected").parent("ul").find('li.clear-selections').show();
		$(".grid-nav-price .grid-nav-items li.is-selected").parent("ul").find('li.clear-selections a').attr("propertyId",type);

		//mobile显示选择内容
		var type = $(".grid-nav-price ul.mobile li.filter-item.is-selected").find("a").attr("type");
		var mpropertyId = $(".grid-nav-price ul.mobile li.filter-item.is-selected").find("a").attr("propertyid");
		var mselected_text = $(".grid-nav-price ul.mobile li.filter-item.is-selected").find("a").text();
		var mselected_length = $(".grid-nav-price ul.mobile li.filter-item.is-selected").find("a").length;
		if(mselected_length>1){
			$(".grid-nav-price ul.mobile li.filter-item.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_length+choice);
			$(".grid-nav-price ul.mobile li.filter-item.is-selected").siblings(".clear-selections").find("a").attr("propertyId",type);
		}else{
			mselected_text = mselected_text.substring(0,mselected_text.indexOf("("));
			$(".grid-nav-price ul.mobile li.filter-item.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_text);
			$(".grid-nav-price ul.mobile li.filter-item.is-selected").siblings(".clear-selections").find("a").attr("propertyId",type);
		}
		//mobile添加样式
		$(".grid-nav-price ul.mobile li.filter-item.is-selected").siblings(".clear-selections").show();
	}
	
	list_grid_nav();
	filter_GS();
});

/**
 * 国双list界面筛选条件监控
 * @param contant
 */
function filter_GS(){
	// 国双代码部署（筛选条件:性别、剪裁、适合运动）
	var FilterProductList = $("#FilterProductList");
	var FilterProductListText = "";
	FilterProductListText = "ProListFilter";
	if(1<$(".breadcrumbs-wrapper a").length){
		FilterProductListText += "|";
		$(".breadcrumbs-wrapper a").each(function(i){
			if(i != 0){
				FilterProductListText += $(this).text().replace("/","");
			}
		});		
	}else{
		FilterProductListText += "|搜索结果页面";
	}

	// 获取筛选条件（筛选条件:性别、剪裁、适合运动）
	$(".grid-nav-filter").find(".is-selected").each(function(i){
		FilterProductListText = FilterProductListText +"|"+$(this).find("a").attr("title");
	});
	// 获取筛选条件（筛选条件:颜色）
	$(".grid-nav-color").find(".is-selected").each(function(i){
		if(FilterProductListText.indexOf($(this).find("a").attr("title")) == -1){
			FilterProductListText = FilterProductListText +"|"+$(this).find("a").attr("title");
		}	
		
	});
	// 获取筛选条件（筛选条件:尺码）
	$(".grid-nav-size-and-fit").find(".is-selected").each(function(i){
		FilterProductListText = FilterProductListText +"|"+$(this).find("a").attr("title");
	});
	// 获取筛选条件（筛选条件:价格区间）
	$(".grid-nav-price").find(".is-selected").each(function(i){
		if(FilterProductListText.indexOf($(this).find("a").attr("title")) == -1){
			FilterProductListText = FilterProductListText +"|"+$(this).find("a").attr("title");			
		}

	});
	// 获取筛选条件（筛选条件:新品推荐）
	if($(".grid-nav-menu-name-NEWPRODUCT").find("#newProduct").val().length != 0){
		FilterProductListText = FilterProductListText +"|"+"新品推荐";
	}
	// 获取筛选条件（筛选条件:热卖商品）
	if($(".grid-nav-menu-name-SELLING").find("#selling").val().length != 0){
		FilterProductListText = FilterProductListText +"|"+"热卖商品";
	}
	
	var re=/[|]/g;
	if(re.test(FilterProductListText)){
		var n=FilterProductListText.match(re).length;
		if(1 < n){
			FilterProductList.text(FilterProductListText);
		    if (window._gsTracker) {
		         getGspcp('/targetpage/pcp/proListFilter');
		    }			
		}
	}
}

function list_grid_nav(){
	
	//初始化新品图片显示
	$(".product-list-li").each(function(){
		var newItem = $(this).find('.isNewItem').val();
		var code = $(this).find('img.positive-img.first').attr("id");
		if(newItem){
			if(newItem.indexOf(code) != -1){
				$(this).children("a.product-img").find("img.badge-2.newitem").show();
				$(this).children("a.product-img").find("img.badge-2.discount").hide();
			}
		}
	});
	
	//初始化特惠图片显示
	$(".product-list-li").each(function(){
		var disCount = $(this).find('.disCount').val();
		var code = $(this).find('img.positive-img.first').attr("id");
		if(disCount){
			if(disCount.indexOf(code) != -1){
				$(this).children("a.product-img").find("img.badge-2.newitem").hide();
				$(this).children("a.product-img").find("img.badge-2.discount").show();
			}
		}
	});
	
	//列表頁圖片翻轉
	if($(window).width() > 1199){
		$(".product-list .product-list-li .product-img").hover(function(){
			var reverseUrl = $(this).find(".reverse-img.first").attr("hidden_url");
			if (reverseUrl == null || reverseUrl == "" || reverseUrl.indexOf("default_img.gif") > -1) {
				return;
			}
			$(this).find(".positive-img.first").hide();
			$(this).find(".reverse-img.first").attr("src", $(this).find(".reverse-img.first").attr("hidden_url"));
			$(this).find(".reverse-img.first").show();
			
		},function() { 
			$(this).find(".reverse-img.first").hide();
			$(this).find(".positive-img.first").show();	
			
		});
	}
	
	//排序筛选
	/*if($(document).width()<768){
		if($("#select-number li:eq(4)").text()=="默认排序"){
			$(this).html("默认");
		}
		if($("#select-number li:eq(0)").text()=="价格 低到高"){
			$(this).html("价格 ↓");
		}
		if($(".listing-search-2 select option:eq(1)").text()=="价格 高到低"){
			$(this).html("价格");
		}

		if ($.trim($(".common_select_title").text()) == "价格 低到高") {
			$(".common_select_title").text("价格 ↑");
		}
		if ($.trim($(".common_select_title").text()) == "价格 高到低") {
			$(".common_select_title").text("价格 ↓");
		}
	}*/
	//排序
	$("#common_selectSex").click(function(){
		$("ul.select_scroll_1").toggle();
	});
	$(".common_select_box li").click(function() {
		$("#container").spin();
		var pf = "sortStr";
		var pv = $(this).attr("order");
		isRemove = "other";
		var url = geUrlHashParam(pf,pv,isRemove);
		window.location = url;
	});
	
	//清除新品、热卖筛选条件
	$('.clear-selected.newproduct,.clear-selected.selling').click(function(){
		isRemove = "true";
		var type = $(this).attr("propertyId");
		var pf = "qf";
		var pv = type;
		var url = delParam(pf,pv,isRemove);
		window.location = url;
	});
	
	/*清除筛选条件*/
	$(".clear-selected").click(function(){
		
		isRemove = "true";
		var type = $(this).attr("propertyId");
		if(type == "RANGE"){
			var pf = "pf";
		}else{
			var pf = "qf";
			var pv = type;
		}
		var url = delParam(pf,pv,isRemove);
		window.location = url;
		$(this).siblings(".grid-nav-menu").find(".clear-selections").hide();
		$(this).hide().siblings(".grid-nav-menu").find(".is-selected").removeClass("is-selected");
	});
	$(".clear-selections").click(function(){
		
		isRemove = "true";
		var type = $(this).find("a").attr("propertyId");
		if(type == "RANGE"){
			var pf = "pf";
		}else{
			var pf = "qf";
			var pv = type;
		}
		var url = delParam(pf,pv,isRemove);
		window.location = url;
		
		$(this).parents(".grid-nav-menu").siblings(".clear-selected").hide();
		$(this).hide().siblings(".filter-item").removeClass("is-selected");
		$(this).hide().siblings(".filter-item").find(".is-selected").removeClass("is-selected");
		$(this).parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text("");
	});
	
	//新品推荐click
	$(".grid-nav-menu-name-NEWPRODUCT ").click(function(){
		//如果筛选过直接刷新页面
		var pv = $(this).find('a').attr("propertyid")+"-"+$(this).find('a').attr("valueid");
		var qf = $("#qf").val();
		if(qf.indexOf(pv) == -1){
			$(this).siblings('a').attr("propertyid",$(this).find('a').attr("propertyid"));
			var pf = "qf";
			isRemove = "false";
			var url = geUrlHashParam(pf,pv,isRemove);
	    	window.location = url;
		}else{
			window.location.reload();
		}
		filter_GS();
	});
	
	//热卖商品click
	$(".grid-nav-menu-name-SELLING").click(function(){
		//如果筛选过直接刷新页面
		var pv = $(this).find('a').attr("propertyid")+"-"+$(this).find('a').attr("valueid");
		var qf = $("#qf").val();
		if(qf.indexOf(pv) == -1){
			var pf = "qf";
			isRemove = "false";
			var url = geUrlHashParam(pf,pv,isRemove);
	    	window.location = url;
		}else{
			window.location.reload();
		}
		filter_GS();
	});
	
	//特惠商品click
	$(".grid-nav-menu-name-DISCOUNT").click(function(){
		//如果筛选过直接刷新页面
		var pv = $(this).find('a').attr("propertyid")+"-"+$(this).find('a').attr("valueid");
		var qf = $("#qf").val();
		if(qf.indexOf(pv) == -1){
			var pf = "qf";
			isRemove = "false";
			var url = geUrlHashParam(pf,pv,isRemove);
	    	window.location = url;
		}else{
			window.location.reload();
		}
		filter_GS();
	});
	
	//mobile 新品、热卖click
	$(".ua-cord-header-clear").click(function(){
		var filterpf = "qf";
		var filterpv = $(this).find('a').attr("propertyid")+"-"+$(this).find('a').attr("valueid");
		var pricepf = "pf";
		var pricepv="";
		var url = creatMobileParam(filterpf,filterpv,pricepf,pricepv);
		window.location=url;
		return false;
	});
	
	
	/*颜色、价格、尺码  click*/
	$(".grid-nav-color ul li.filter-item " +
	  ", .grid-nav-price ul li.filter-item " +
	  ",.grid-nav-sex ul li.filter-item "+//mobile筛选
	  ",.grid-nav-size ul li.filter-item "+
	  ", .grid-nav-size-and-fit ul li.selected-size > ul > li > ul > li ").click(function(){
		//如果是mobile筛选
		if($(this).parent("ul").hasClass("mobile")){
			$(this).toggleClass("is-selected");
		}else{
			//获取propertyId和valueId进行筛选
			var type = $(this).find('a').attr("type");
			if(type == "RANGE"){
				var pf = "pf";
				if($(this).find('a').attr("title").indexOf("-") == -1){
	    			var min = "600";
	    			var max = "100000";
	    		}else{
	    			var min = $(this).find('a').attr("title").substring(1,$(this).find('a').attr("title").indexOf("-"));
	    			var max = $(this).find('a').attr("title").substring($(this).find('a').attr("title").lastIndexOf("-")+2,$(this).find('a').attr("title").length);
	    		}
	    		var pv = min+"-"+max;
			}else{
				var pf = "qf";
				var pv = $(this).find('a').attr("propertyid")+"-"+$(this).find('a').attr("valueid");
			}
			isRemove = "false";
			if($(this).hasClass("is-selected")){
				isRemove = "true";
			}
			var url = geUrlHashParam(pf,pv,isRemove);
	    	window.location = url;
		}
	});
	
	//mb- 显示筛选弹层
    $(".search-screening").click(function(){
		$(".mb-listing-filter").animate({left:"0"}, 0);
		$('#container').addClass("container");
    });
    /*mobile 确认筛选按钮 click*/
    $(".filter-footer a").click(function(){
    	var filterpf = "qf";
    	var pricepf = "pf";
		var pricepv = "";
		var filterpv = "";
		$(".grid-nav-sex ul.mobile li.filter-item.is-selected "+
			",.grid-nav-size ul.mobile li.filter-item.is-selected "+
			",.grid-nav-color ul.mobile li.filter-item.is-selected "+
			",.grid-nav-price ul.mobile li.filter-item.is-selected ").each(function(){
			var type = $(this).find("a").attr("type");
			if(type){
				if($(this).find('a').attr("title").indexOf("-") == -1){
	    			var min = "600";
	    			var max = "100000";
	    		}else{
	    			var min = $(this).find('a').attr("title").substring(1,$(this).find('a').attr("title").indexOf("-"));
	    			var max = $(this).find('a').attr("title").substring($(this).find('a').attr("title").lastIndexOf("-")+2,$(this).find('a').attr("title").length);
	    		}
				pricepv += min+"-"+max+",";
			}else{
//				if($(this).find('a').attr("propertyid") == $("#sizeProId").val()){
//					filterpv += $(this).find('a').attr("propertyid")+"-"+$(this).find('a').attr("title")+",";
//				}else{
					filterpv += $(this).find('a').attr("propertyid")+"-"+$(this).find('a').attr("valueid")+",";
//				}
			}
		});
		if(filterpv){
			filterpv = filterpv.substring(0,filterpv.length-1);
		}
		if(pricepv){
			pricepv = pricepv.substring(0,pricepv.length-1);
		}
		var url = creatMobileParam(filterpf,filterpv,pricepf,pricepv);
		window.location = url;
		$(".mb-listing-filter").animate({left:"-100%"}, 0);
		$('#container').removeClass("container");
	})
	
	/*mobile filter click*/
	$(".ua-accordion-cord .ua-cord-header").click(function(){
		$(this).parent(".ua-accordion-cord").toggleClass("active").siblings(".ua-accordion-cord").removeClass("active");
	});

    /*new-product*/
	var new_product_length = $(".new-product ul .product-list-li").length;
	if($(window).width() > 991 && $(window).width() < 1200 ){
		if(new_product_length > 5){
			$(".new-product ul .product-list-li:gt(4)").hide();
			$(".new-product .show-more").show();
		}
	}else{
		if($(".new-product ul .product-list-li").hasClass("product-list-banner")){
			if(new_product_length > 7){
				$(".new-product ul .product-list-li:gt(6)").hide();
				$(".new-product .show-more").show();
			}
		}else{
			if(new_product_length > 7){
				$(".new-product ul .product-list-li:gt(7)").hide();
				$(".new-product .show-more").show();
			}
		}
	}
	
	$(".new-product .show-more button").click(function(){
		$(".new-product ul .product-list-li").show();
		$(".new-product .show-more").hide();
	})
	/*颜色*/
	$(".color-list-small .color-item").hover(function(){
		$(this).addClass("active").siblings("li").removeClass("active");
		//切换图片
		var pitCode = $(this).find("div").attr("id");
		var listPrice = $(this).find("div").attr("data-listPrice");
		var dataAttr = $(this).find("div").attr("data-attr");
		var imgsrc1 = $(this).find("img.imgUrl1").attr("hidden_url");
		var imgsrc2 = $(this).find("img.imgUrl2").attr("hidden_url");
		//获取图片的点击事件用于国双新品的点击监控
		var event = $(this).parent().parent().siblings().find("span").find("img.positive-img.first").attr("onclick");
		if(event.indexOf(";") > 0 ){
		   event = event.split(";")[1];
		}
		$(this).parent().parent().siblings().find("span").find("img.positive-img.first").attr("id",pitCode);
		$(this).parent().parent().siblings().find("span").find("img.positive-img.first").attr("onclick","ptpgo('"+pitCode+"')"+";"+event);
		$(this).parent().parent().siblings().find("span").find("img.positive-img.first").attr("src",imgsrc1);
		
		//获取图片的点击事件用于国双新品的点击监控
		event = $(this).parent().parent().siblings().find("span").find("img.reverse-img.first").attr("onclick");
		if(event.indexOf(";") > 0 ){
		   event = event.split(";")[1];
		}
		
		$(this).parent().parent().siblings().find("span").find("img.reverse-img.first").attr("id",pitCode);
		$(this).parent().parent().siblings().find("span").find("img.reverse-img.first").attr("onclick","ptpgo('"+pitCode+"')"+";"+event);
		$(this).parent().parent().siblings().find("span").find("img.reverse-img.first").attr("hidden_url",imgsrc2);
		
		$(this).parent().parent().siblings().find("div").attr("data-attr",pitCode);
		
		//点击商品颜色色块时修改商品名称的链接
		$(this).parent().siblings().eq(1).children("a").attr("href",pagebase+"/p"+pitCode+".htm");
		//点击商品颜色色块时修改商品价格的链接
		$(this).parent().siblings().eq(1).find("span.promotion-price").children("a").attr("href",pagebase+"/p"+pitCode+".htm");
		//点击商品颜色色块时修改商品价格
		if(listPrice == undefined || listPrice == null || listPrice == '' || listPrice == dataAttr){
			// 隐藏原价
			$(this).parent().siblings().eq(2).find("span.original-price").hide();
		}else{
			// 修改原价
			$(this).parent().siblings().eq(2).find("span.original-price").show();
			$(this).parent().siblings().eq(2).find("span.original-price").children("a").text(listPrice);
		}		
		$(this).parent().siblings().eq(2).find("span.promotion-price").children("a").text(dataAttr);
		//点击商品颜色色块时判断是否是新品显示新品图片
		var newItem = $(this).parent().parent().siblings().find("span").find("#isNewItem").val()
		if(newItem.indexOf(pitCode) != -1){
			$(this).parent().parent().siblings().find("span").find("img.badge-2.newitem").show();
		}else{
			$(this).parent().parent().siblings().find("span").find("img.badge-2.newitem").hide();
		}
		//点击商品颜色色块时判断是否是特惠商品显示特惠图片
		var discount = $(this).parent().parent().siblings().find("span").find("#disCount").val()
		if(discount.indexOf(pitCode) != -1){
			$(this).parent().parent().siblings().find("span").find("img.badge-2.newitem").hide();
			$(this).parent().parent().siblings().find("span").find("img.badge-2.discount").show();
		}else{
			$(this).parent().parent().siblings().find("span").find("img.badge-2.discount").hide();
		}
		
	});
	$.each($(".color-list-small"),function(){
		var colorLiLength = $(this).find("li").length;
		$(this).siblings(".color-count").find("span").text(colorLiLength+"色");
	});
	if($(window).width() < 1200 && $(window).width() > 767 ){
		$.each($(".color-list-small"),function(){
			$(this).find(".color-item:gt(8)").hide();
			$(this).find(".color-item:eq(8)").addClass("more");
		});
	}else if($(window).width() < 768){
		$.each($(".color-list-small"),function(){
			$(this).find(".color-item:gt(3)").hide();
			$(this).find(".color-item:eq(3)").addClass("more");
		});
	}
}

//除颜色、价格、尺码外的筛选点击
var filterClick = function(obj,propertyid,valueid){
	//获取propertyId和valueId进行筛选
	var pf = "qf";
	var pv = propertyid +"-"+ valueid;
	isRemove = "false";
	if($(obj).hasClass("is-selected")){
		isRemove = "true";
	}
	var url = geUrlHashParam(pf,pv,isRemove);
	window.location = url;
}
//mobile排序切换
var changeSort = function(sortStr){
	var filterpf = "sortStr";
	var filterpv = sortStr;
	var pricepf = "pf";
	var pricepv= "";
	var mobileStr = creatMobileParam(filterpf,filterpv,pricepf,pricepv);
	window.location = mobileStr;
	return false;
}
function delParam(pf,pv,isRemove){
	var str = currentPageUrl.substring(0,currentPageUrl.indexOf("?"));
	var urlHash = currentPageUrl.substring(currentPageUrl.lastIndexOf("?"),currentPageUrl.length);
	var filterHash = urlHash.split("&");
	if(isRemove){	
		for(var i=0;i<filterHash.length;i++){
			var param = filterHash[i].substring(0,filterHash[i].indexOf("=")+1);
			if(pf =="qf" && filterHash[i].indexOf(pf) != -1){
				var f = filterHash[i].substring(filterHash[i].indexOf("=")+1,filterHash[i].length);
				var p = f.split(",");
				for(var k=0;k<p.length;k++){
					var propertyId = p[k].substring(0,p[k].indexOf("-")+1);
					if(propertyId != pv+"-"){
						param += p[k]+",";
					}
				}
				var v = param.substring(param.length-1,param.length);
				if(v.indexOf(",") != -1){
					param = param.substring(0,param.length-1)+"&";
				}else{
					param = param.substring(0,param.length)+"&";
				}
				str += param;
			}else if(pf =="pf" && filterHash[i].indexOf(pf) != -1){
				str += "pf=&";
			}else{
				str += filterHash[i]+"&";
			}
		}
		str = str.substring(0,str.length-1);
		return str;
	}
	
}

var creatMobileParam = function(filterpf,filterpv,pricepf,pricepv){
	var str ="";
	var urlHash="";
	var sortStr = $("#sortStr").val();
	if(currentPageUrl.indexOf("#") != -1 && currentPageUrl.indexOf("searchWord") == -1){
		str = currentPageUrl.substring(0,currentPageUrl.lastIndexOf("#"));
		urlHash = currentPageUrl.substring(currentPageUrl.lastIndexOf("#")+1,currentPageUrl.length);
	}else if(currentPageUrl.indexOf("?") != -1){
		str = currentPageUrl.substring(0,currentPageUrl.indexOf("?"));
		urlHash = currentPageUrl.substring(currentPageUrl.lastIndexOf("?"),currentPageUrl.length);
	}else{
		str = currentPageUrl.substring(0,currentPageUrl.length);
		urlHash = currentPageUrl.substring(currentPageUrl.lastIndexOf("/")+1,currentPageUrl.length);
	}
	if(urlHash.indexOf("search") != -1){
//		urlHash = currentPageUrl.substring(currentPageUrl.lastIndexOf("/")+1,currentPageUrl.indexOf("searchWord"));
		var seachWord = "";
		if(currentPageUrl.indexOf("searchWord") != -1){
			seachWord = currentPageUrl.substring(currentPageUrl.indexOf("searchWord"),currentPageUrl.length);
		}
		if(urlHash.indexOf("&") == -1){
			if(filterpf == "sortStr"){
				str += "?qf="+"&pf="+"&sortStr="+filterpv+"&pageNumber="+1+"&"+seachWord;
			}else{
				if(str.indexOf("cf") == -1){
					str += "?"+filterpf+"="+filterpv+"&"+pricepf+"="+pricepv+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
				}
				if(str.indexOf("cf") != -1){
					str += "&"+filterpf+"="+filterpv+"&"+pricepf+"="+pricepv+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
				}
			}
			if(str.substring(str.length,str.length-1) == "&"){
				str = str.substring(0,str.length-1);
			}
			return str;
		}else{
			var filterHash = urlHash.split("&");
			for(var i=0;i<filterHash.length;i++){
				var param = filterHash[i].substring(0,filterHash[i].indexOf("=")+1);
				if(filterHash[i].indexOf(filterpf) != -1){
					str += param+filterpv+"&";
				}else if (filterHash[i].indexOf(pricepf) !=-1){
					str += param+pricepv+"&";
				}else{
					str += filterHash[i]+"&";
				}
			}
			if(str.indexOf(seachWord) == -1){
				str = str.substring(0,str.length-1)+seachWord;
			}else{
				str = str.substring(0,str.length-1);
			}
			return str;
		}
	}else if(urlHash.indexOf("&") == -1 || urlHash.indexOf("qf")== -1){//导航搜索拼接
		var seachWord = "";
		if(currentPageUrl.indexOf("searchWord") != -1){
			seachWord = currentPageUrl.substring(currentPageUrl.indexOf("searchWord"),currentPageUrl.length);
		}
		if(filterpf == "sortStr"){
			str += "?qf="+"&pf="+"&nav="+$("#nav").val()+"&sortStr="+filterpv+"&pageNumber="+1+"&"+seachWord;
		}else{
			if(str.indexOf("cf") == -1){
				str += "?"+filterpf+"="+filterpv+"&"+pricepf+"="+pricepv+"&nav="+$("#nav").val()+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
			}
			if(str.indexOf("cf") != -1){
				str += "&"+filterpf+"="+filterpv+"&"+pricepf+"="+pricepv+"&nav="+$("#nav").val()+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
			}
		}
		if(str.substring(str.length,str.length-1) == "&"){
			str = str.substring(0,str.length-1);
		}
		return str;
	}else{
		var filterHash = urlHash.split("&");
		for(var i=0;i<filterHash.length;i++){
			var param = filterHash[i].substring(0,filterHash[i].indexOf("=")+1);
			if(filterHash[i].indexOf(filterpf) != -1){
				str += param+filterpv+"&";
			}else if (filterHash[i].indexOf(pricepf) !=-1){
				str += param+pricepv+"&";
			}else{
				str += filterHash[i]+"&";
			}
		}
		if(str.substring(str.length,str.length-1) == "&"){
			str = str.substring(0,str.length-1);
		}
		return str;
	}
}

function geUrlHashParam(pf,pv,isRemove){
	var str = "";
	var urlHash = "";
	if(currentPageUrl.indexOf("#") != -1 && currentPageUrl.indexOf("searchWord") == -1){
		str = currentPageUrl.substring(0,currentPageUrl.lastIndexOf("#"));
		urlHash = currentPageUrl.substring(currentPageUrl.lastIndexOf("#")+1,currentPageUrl.length);
	}else if(currentPageUrl.indexOf("?") != -1){
		str = currentPageUrl.substring(0,currentPageUrl.indexOf("?"));
		urlHash = currentPageUrl.substring(currentPageUrl.lastIndexOf("?"),currentPageUrl.length);
	}else{
		str = currentPageUrl.substring(0,currentPageUrl.length);
		urlHash = currentPageUrl.substring(currentPageUrl.lastIndexOf("/")+1,currentPageUrl.length);
	}
	var code = currentPageUrl.substring(currentPageUrl.indexOf("#"),currentPageUrl.length);
	var sortStr = $("#sortStr").val();
	//关键词搜索URL拼接
	if(urlHash.indexOf("search") != -1){
		var seachWord = "";
		if(currentPageUrl.indexOf("searchWord") != -1){
			seachWord = currentPageUrl.substring(currentPageUrl.indexOf("searchWord"),currentPageUrl.length);
		}
		if(urlHash.indexOf("&") == -1){
			if(pf == "qf"){
				str += "?qf="+pv+"&pf="+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
			}else if (pf == "pf"){
				str += "?qf="+"&pf="+pv+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
			}else if(pf == "sortStr"){
				str += "?qf="+"&pf="+"&sortStr="+pv+"&pageNumber="+1+"&"+seachWord;
			}else{
				str += "?qf="+"&pf="+"&sortStr="+sortStr+"&pageNumber="+pv+"&"+seachWord;
			}
			return str;
		}else{
			var filterHash = urlHash.split("&");
			for(var i=0;i<filterHash.length;i++){
				var param = filterHash[i].substring(0,filterHash[i].indexOf("=")+1);
				if(filterHash[i].indexOf("qf") != -1){
					if(isRemove == "true" && filterHash[i].indexOf(pf) != -1){
						var f = filterHash[i].substring(filterHash[i].indexOf("=")+1,filterHash[i].length);
						var p = f.split(",");
						for(var j = 0; j<p.length;j++){
							if(p[j] != pv){
								param += p[j]+",";
							}
						}
						//如果去除筛选条件时qf=11-149,筛选不为空时去除,
						var v = param.substring(param.length-1,param.length);
						if(v.indexOf(",") != -1){
							param = param.substring(0,param.length-1)+"&";
						}else{
							param = param.substring(0,param.length)+"&";
						}
						str += param;
//						isRemove = false;
					}else{
						if(isRemove == "other"){
							param = filterHash[i] +"&";
							str += param;
						}else{
							if(filterHash[i].indexOf(pf) != -1){
								if(filterHash[i].indexOf("-") != -1){
									param = filterHash[i] +","+pv +"&";
									str += param;
								}else{
									param = filterHash[i] +pv +"&";
									str += param;
								}
							}else{
								param = filterHash[i] +"&";
								str += param;
							}
						}
					}
				}else if (filterHash[i].indexOf("pf") !=-1){
					if(isRemove == "true" && filterHash[i].indexOf(pf) != -1){
						var f = filterHash[i].substring(filterHash[i].indexOf("=")+1,filterHash[i].length);
						var p = f.split(",");
						for(var j = 0; j<p.length;j++){
							if(p[j] != pv){
								param += p[j]+",";
							}
						}
						//如果去除筛选条件时qf=11-149,筛选不为空时去除,
						var v = param.substring(param.length-1,param.length);
						if(v.indexOf(",") != -1){
							param = param.substring(0,param.length-1)+"&";
						}else{
							param = param.substring(0,param.length)+"&";
						}
						str += param;
//						isRemove = false;
					}else{
						if(isRemove == "other"){
							param = filterHash[i] +"&";
							str += param;
						}else{
							if(filterHash[i].indexOf(pf) != -1){
								if(filterHash[i].indexOf("-") != -1){
									param = filterHash[i] +","+pv +"&";
									str += param;
								}else{
									param = filterHash[i] +pv +"&";
									str += param;
								}
							}else{
								param = filterHash[i] +"&";
								str += param;
							}
						}
					}
				}else{
					if(filterHash[i].indexOf(pf) != -1 && filterHash[i].indexOf("qf") == -1 && filterHash[i].indexOf("pf") == -1){
						param += pv+"&";
					}else{
						if(filterHash[i].indexOf("pageNumber") != -1){
							param = "pageNumber=1"+"&";
						}else{
							param = filterHash[i]+"&";
						}
					}
					str += param;
				}
			}
			if(str.indexOf(seachWord) == -1){
				str = str.substring(0,str.length-1)+seachWord;
			}else{
				str = str.substring(0,str.length-1);
			}
			return str;
		}
	}else if(urlHash.indexOf("&") == -1 || urlHash.indexOf("qf")== -1){//导航搜索拼接
		var seachWord = "";
		if(currentPageUrl.indexOf("searchWord") != -1){
			seachWord = currentPageUrl.substring(currentPageUrl.indexOf("searchWord"),currentPageUrl.length);
		}
		if(pf == "qf" && str.indexOf("cf") == -1){
			str += "?qf="+pv+"&pf="+"&nav="+$("#nav").val()+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
		}else if(pf == "qf" && str.indexOf("cf") != -1){
			str += "&qf="+pv+"&pf="+"&nav="+$("#nav").val()+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
		}else if (pf == "pf"){
			str += "?qf="+"&pf="+pv+"&nav="+$("#nav").val()+"&sortStr="+sortStr+"&pageNumber="+1+"&"+seachWord;
		}else if(pf == "sortStr"){
			str += "?qf="+"&pf="+"&nav="+$("#nav").val()+"&sortStr="+pv+"&pageNumber="+1+"&"+seachWord;
		}else{
			str += "?qf="+"&pf="+"&nav="+$("#nav").val()+"&sortStr="+sortStr+"&pageNumber="+pv+"&"+seachWord;
		}
		return str;
	}else{
		var filterHash = urlHash.split("&");
		for(var i=0;i<filterHash.length;i++){
			var param = filterHash[i].substring(0,filterHash[i].indexOf("=")+1);
			if(filterHash[i].indexOf("qf") != -1){
				if(isRemove == "true" && filterHash[i].indexOf(pf) != -1){
					var f = filterHash[i].substring(filterHash[i].indexOf("=")+1,filterHash[i].length);
					var p = f.split(",");
					for(var j = 0; j<p.length;j++){
						if(p[j] != pv){
							param += p[j]+",";
						}
					}
					//如果去除筛选条件时qf=11-149,筛选不为空时去除,
					var v = param.substring(param.length-1,param.length);
					if(v.indexOf(",") != -1){
						param = param.substring(0,param.length-1)+"&";
					}else{
						param = param.substring(0,param.length)+"&";
					}
					str += param;
//					isRemove = false;
				}else{
					if(isRemove == "other"){
						param = filterHash[i] +"&";
						str += param;
					}else{
						if(filterHash[i].indexOf(pf) != -1){
							if(filterHash[i].indexOf("-") != -1){
								param = filterHash[i] +","+pv +"&";
								str += param;
							}else{
								param = filterHash[i] +pv +"&";
								str += param;
							}
						}else{
							param = filterHash[i] +"&";
							str += param;
						}
					}
				}
			}else if (filterHash[i].indexOf("pf") !=-1){
				if(isRemove == "true" && filterHash[i].indexOf(pf) != -1){
					var f = filterHash[i].substring(filterHash[i].indexOf("=")+1,filterHash[i].length);
					var p = f.split(",");
					for(var j = 0; j<p.length;j++){
						if(p[j] != pv){
							param += p[j]+",";
						}
					}
					//如果去除筛选条件时qf=11-149,筛选不为空时去除,
					var v = param.substring(param.length-1,param.length);
					if(v.indexOf(",") != -1){
						param = param.substring(0,param.length-1)+"&";
					}else{
						param = param.substring(0,param.length)+"&";
					}
					str += param;
//					isRemove = false;
				}else{
					if(isRemove == "other"){
						param = filterHash[i] +"&";
						str += param;
					}else{
						if(filterHash[i].indexOf(pf) != -1){
							if(filterHash[i].indexOf("-") != -1){
								param = filterHash[i] +","+pv +"&";
								str += param;
							}else{
								param = filterHash[i] +pv +"&";
								str += param;
							}
						}else{
							param = filterHash[i] +"&";
							str += param;
						}
					}
				}
			}else{
				if(filterHash[i].indexOf(pf) != -1 && filterHash[i].indexOf("qf") == -1 && filterHash[i].indexOf("pf") == -1){
					param += pv+"&";
				}else{
					if(filterHash[i].indexOf("pageNumber") != -1){
						param = "pageNumber=1"+"&";
					}else{
						param = filterHash[i]+"&";
					}
				}
				str += param;
			}
		}
		str = str.substring(0,str.length-1);
		return str;
	}
	

}

//进入PDP页面
function ptpgo(code1){
	var width = $(this).width();
	if(width>767){
		window.open(pagebase+'/p'+code1+'.htm')
	}else{
		location=pagebase+'/p'+code1+'.htm';
	} 
}

//快速購買Tab選擇
function selectTag(showContent,selfObj){
	var tag = document.getElementById("tags").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "selected";
	for(i=0; j=document.getElementById("tagContent"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	$(".listing_pupup_scroll").mCustomScrollbar({
        scrollButtons:{enable:true},
        theme:"3d-thick"
    });
	// 国双按钮监控（快速购买颜色尺码）
	var ProductName_gs = $(".trade-name").text();
	var style = $(".price-style.clear .style").attr("styleid");
	var color = $(".pdp-color .fonta").text();
	color = color.replace("(","").replace(")","");  
	if(showContent == 'tagContent0'){
	    if (window._gsTracker) {
	        _gsTracker.trackEvent('ColorSize_PQV',ProductName_gs,style+"-"+color);
	    }
	}else if(showContent == 'tagContent1'){
	    if (window._gsTracker) {
	        _gsTracker.trackEvent('ProductDescription_PQV',ProductName_gs,style+"-"+color);
	    }
	}else if(showContent == 'tagContent2'){
	    if (window._gsTracker) {
	        _gsTracker.trackEvent('SizeTable_PQV',ProductName_gs,style+"-"+color);
	    }
	}	
}

//=====================全局函数========================
//Tab控制函数
$(".color-size-category li").live("click",function() {
	var colorId=$(this).attr("itemId");
	var popwin = $(this).parents(".pop-up-main");
	$.ajax({
		type : "POST",
		url : "/ajax_shop_product.htm",
		data : "itemId="+colorId,
		success : function(msg) {
//			alert(msg);
			popwin.html(msg);
			$(".color-size-category li[itemid="+colorId+"]").find("div.ico_position").addClass("ico_show");
			$("#select-number").dropkick({
				mobile: true
			});
			
			$(".pdp_select_box ul").addClass("addselect");
			$(".pdp_select_box").addClass("addcolor");
			//这里的滚动条和小图片列表点击效果是在 size_popup.js中 所以下列代码无效
			changeImageLi();

		}
	});
	
});	



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


//下拉框
function pdpselect(){
	$(".common_select_box").children('ul').hide();
	$(".common_select_box").live("click",(function(event){
		$(this).children('ul').show();
	}));
	$(".common_select_box li").live("mouseover",(function(event){  
		$(this).addClass('current');
	}));
	$(".common_select_box li").live("mouseout",(function(event){
		$(this).removeClass('current');
	}));
	$(".common_select_box li").live("click",(function(event){ 
	    var text = $(this).text();
	    $(this).parent("ul").parent("div").children("span").text(text);
	    $(this).parent("ul").hide();
	    event.stopPropagation();
	}));
	$(".common_select_box").live("mouseleave",(function(event){
	    $(this).children("ul").hide();
	}));
}


function isNullOrEmpty(value){
	if(value==""||value==null||value==undefined){
		return true;
	}else{
		return false;
	}
}

//=====================全局函数======================== 
function clickcode(obj){
	var code = $(obj).attr("data-attr");
	var popwin = showPopup("prompt-box");
	popwin.spin();
	$.ajax({
		type : "POST",
		url : "/shop_product.htm",
		data : "itemId=" + code,
		success : function(msg) {
			popwin.find(".pop-up-main").html(msg);
			$("#select-number").dropkick({
				mobile: true
			});
			$(".pdp_select_box ul").addClass("addselect");
			$(".pdp_select_box").addClass("addcolor");  	
			changeImageLi();
			popwin.spin(false);
			
			$(".listing_pupup_scroll").mCustomScrollbar({
		        scrollButtons:{enable:true},
		        theme:"3d-thick"
		    });
		}
	});
} 
// ==================图片详细页函数=====================

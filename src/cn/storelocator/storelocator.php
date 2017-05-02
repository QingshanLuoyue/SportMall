<!DOCTYPE html">
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, user-scalable=0, maximum-scale=1, initial-scale=1">
	<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta http-equiv="Cache-Control" content="no-transform " />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta http-equiv="X-UA-Compatible" content="IE=9"> </meta>
    <meta name="applicable-device" content="pc,mobile" />

    <link rel="stylesheet" type="text/css" href="http://localhost/SportMall/src/css/index9210.css" />
    <link href="http://localhost/SportMall/src/css/page.css" rel="stylesheet" type="text/css" />
    <link href="http://localhost/SportMall/src/css/map.css" rel="stylesheet" type="text/css" />
    <link href="http://localhost/SportMall/src/css/myorders.css" rel="stylesheet" type="text/css" />

    <script src="http://localhost/SportMall/src/scripts/index.js"></script>
    <script src="http://localhost/SportMall/src/scripts/storelocator.js"></script>
    <script src="http://localhost/SportMall/src/scripts/jquery.page.js"></script>
</head>

<body>
    <style>
	    .nav-two .nav-male .recommended-series.border_none {
	        border: none;
	    }
	    
	    .nav-two .nav-male .recommended.border_none {
	        border: none;
	    }
	    
	    .nav-two .nav-male .buy-all.buy-all-fix {
	        right: 40px;
	    }
	    
	    .nav-two .nav-male.the_nav_five .kinds {
	        margin: 0 0 0 52px;
	    }
	    
	    @media(max-width:1435px) {
	        .nav-two .nav-male.the_nav_five .kinds {
	            margin: 0 0 0 49px;
	        }
	    }
	    
	    @media(max-width:1366px) {
	        .nav-two .nav-male.the_nav_five .kinds {
	            margin: 0px 0px 0px 5.2%;
	        }
	    }
	    
	    @media(max-width:1024px) {
	        .nav-two .nav-male.the_nav_five .kinds {
	            margin: 0px 0px 0px 42px;
	        }
	    }
    </style>
    <div id="container">
        <!-- 头部开始 -->
        <?php include '../../partial/header.html'; ?>
        <!-- 头部结束 -->

        <div id="content" class="content">
            <div class="map-detail-content">
            </div>
            <div class="map-wrap">
                <h1>线下店铺</h1>
                <div class="offline-shop">
                    <label>选择您的所在地：</label>
                    <div class="common_select_box detail_select_box common_select_box_1">
                        <span class="common_select_title" id="common_selectSex">请选择省份</span>
                        <i class="common_select_box_bg"></i>
                        <ul id="" class="province_x select_scroll_1"></ul>
                    </div>
                    <div class="common_select_box detail_select_box common_select_box_2">
                        <span class="common_select_title" id="common_selectSex">请选择城市</span>
                        <i class="common_select_box_bg"></i>
                        <ul id="select-number" class="select_scroll_2"></ul>
                    </div>
                    <form action="" id="store_form">
                        <input type="hidden" id="cityx" value="" />
                    </form>
                    <a class="search-shop" href="#"><span>查询店铺</span></a>
                </div>
                <div class="can-search">搜索到164间UA零售店</div>
                <!-- 查询出来的线下店铺列表 -->
                <div class="shop-list" id="shop-list">
                    <ul></ul>
                </div>
            </div>
        </div>
        <form action="http://www.underarmour.cn/storelocator/index.htm" method="post" id="store_form">
            <input type="hidden" id="store_province" name="province" value="" />
            <input type="hidden" id="store_city" name="city" value="" />
            <input type="hidden" id="Pages" name="Pages" value="1" />
        </form>
        <!-- 底部 -->
        <?php include '../../partial/footer.html'; ?>
    </div>
    <!-- 移动端点击头部菜单按钮，弹出的左侧边栏 -->
    <?php include '../../partial/mobile-menu.html'; ?>
    <script>
    $(".tcdPageCode").createPage({
        pageCount: parseInt('17'),
        current: parseInt($("#Pages").val()),
        backFn: function(num) {
            var province = $("#store_province").val();
            var city = $("#store_city").val();
            var page = num;
            var url = $("#store_form").attr("action");
            var param = "&province=" + province + "&city=" + city;
            url += "?Pages=" + page + param;
            window.location = url;
        }
    });
    function first() {
        var url = $("#store_form").attr("action");
        var pages = $("#Pages").val();
        if (pages <= 1) {
            pages = 1;
        } else {
            pages = parseInt(pages) - parseInt(1);
        }
        var url1 = url;
        var url = url1;
        url += "?Pages=" + pages;
        window.location = url;
    }

    function next() {
        var url = $("#store_form").attr("action");
        var pages = $("#Pages").val();
        if (pages >= '17') {
            pages = '17';

        } else {
            pages = parseInt(pages) + parseInt(1);
        }
        var url1 = url;
        var url = url1;
        url += "?Pages=" + pages;
        window.location = url;
    }
    </script>
</body>
</html>

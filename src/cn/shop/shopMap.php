<!doctype html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=0, maximum-scale=1, initial-scale=1">
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta http-equiv="Cache-Control" content="no-transform ">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta http-equiv="X-UA-Compatible" content="IE=9">
    <meta name="applicable-device" content="pc,mobile">

    <link rel="stylesheet" type="text/css" href="http://localhost/SportMall/src/css/index9210.css">
    <link href="http://localhost/SportMall/src/css/map.css" rel="stylesheet" type="text/css">

    <script src="http://localhost/SportMall/src/scripts/index.js"></script>
     <script src="http://api.map.baidu.com/api?v=1.4"></script>
    <!-- <script type="text/javascript" src="https://api.map.baidu.com/getscript?v=1.4&amp;ak=&amp;services=&amp;t=20150522093217"></script> -->
    <script src="http://localhost/SportMall/src/scripts/storelocator.js"></script>
    <script src="http://localhost/SportMall/src/scripts/convertor.js"></script>
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
</head>

<body>
    <div id="container">
        <!-- 头部开始 -->
        <?php include '../../partial/header.html'; ?>
        <!-- 头部结束 -->
        <div class="content">
            
        </div>
        <script>
            $(function(){
                createMap()
            })
        </script>
        <!-- 底部 -->
        <?php include '../../partial/footer.html'; ?>
    </div>
    <!-- 移动端点击头部菜单按钮，弹出的左侧边栏 -->
    <?php include '../../partial/mobile-menu.html'; ?>
</body>
</html>

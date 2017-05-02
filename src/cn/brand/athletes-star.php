<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=0, maximum-scale=1, initial-scale=1">
    <meta content="" name="keywords">
    <meta content="" name="description">
    <meta http-equiv="Cache-Control" content="no-transform ">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta http-equiv="X-UA-Compatible" content="IE=9">
    
    <link href="http://localhost/SportMall/src/css/index9210.css" rel="stylesheet" type="text/css">
    <link href="http://localhost/SportMall/src/css/index-athlete.css" rel="stylesheet" type="text/css">
    <link href="http://localhost/SportMall/src/css/swiper-3.4.0.min.css" rel="stylesheet" type="text/css">
    <link href="http://localhost/SportMall/src/css/video-js.min.css" rel="stylesheet" type="text/css">
    <script src="http://localhost/SportMall/src/scripts/index.js" ></script>
    <script src="http://localhost/SportMall/src/scripts/video.min.js" ></script>
    <script src="http://localhost/SportMall/src/scripts/swiper-3.4.0.min.js"></script>
    <title>迈克尔·菲尔普斯(Michael Phelps)- UA品牌合作明星</title>
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

        <div id="content" class="content brandstory-content">
            <!-- PC端大图轮播 -->
            <div class="slick-slide brandon-slider">
                <div class="swiper-container" id="swiper-container5">
                    <ul class="swiper-wrapper bx-wrapper">
                        <li class="swiper-slide">
                            <a href="javascript:void(0)">
                                <img src="http://localhost/SportMall/src/images/story/pc/athletes/phelps/phelps-bkv-01.jpg">
                            </a>
                            <a href="" class="li_a4 video_btn">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/pc/athletes/phelps/phelps-tv.jpg">
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <a href="javascript:void(0)">
                                <img src="http://localhost/SportMall/src/images/story/pc/athletes/phelps/phelps-bkv-02.jpg">
                            </a>
                            <a href="" class="li_a4 video_btn">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/pc/athletes/phelps/phelps-tv.jpg">
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <a href="javascript:void(0)">
                                <img src="http://localhost/SportMall/src/images/story/pc/athletes/phelps/phelps-bkv-03.jpg">
                            </a>
                            <a href="" class="li_a4 video_btn">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/pc/athletes/phelps/phelps-tv.jpg">
                            </a>
                        </li>
                    </ul>
                    <div class="swiper-button-prev swiper-button-prev5"></div>
                    <div class="swiper-button-next swiper-button-next5"></div>
                </div>
            </div>
            <!-- PC端大图轮播js -->
            <script>
            	var mySwiper5 = new Swiper('#swiper-container5', {
		 			nextButton : '.swiper-button-next5',
					prevButton : '.swiper-button-prev5',
                    loop:true,
                    autoplay: 3000,
				});
            </script>

            <!-- 移动端大图轮播 -->
            <div class="mobile-slick-slide brandon-slider ">
                <div class="bx-viewport swiper-container" id="swiper-container6">
                    <ul class="bxslider-mobile swiper-wrapper">
                        <li class="swiper-slide">
                            <a href="javascript:void(0)">
                                <img class="swiper-img" src="http://localhost/SportMall/src/images/story/mobile/athletes/phelps/Phelps_01.jpg">
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <a href="javascript:void(0)">
                                <img class="swiper-img" src="http://localhost/SportMall/src/images/story/mobile/athletes/phelps/Phelps_02.jpg">
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <a href="javascript:void(0)">
                                <img class="swiper-img" src="http://localhost/SportMall/src/images/story/mobile/athletes/phelps/Phelps_03.jpg">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <script>
                $(function(){
                    var mySwiper6 = new Swiper('#swiper-container6', {
                        loop:true,
                        autoplay: 3000,
                    });
                })
            </script>

            <!-- 移动端视频-->
            <a href="" class="brand-video-mobile">
                <img src="http://localhost/SportMall/src/images/story/mobile/athletes/phelps/Phelps_04.jpg" alt="">
            </a>

            <!-- 多个明星轮播 -->
            <?php include '../../partial/athletes-star-swiper.html'; ?>
            
            <!-- pc、移动公用-推荐商品 -->
            <?php include '../../partial/athletes-star-recommend.html'; ?>
        </div>
        <!-- 底部 -->
        <?php include '../../partial/footer.html'; ?>
    </div>
    <!-- 移动端点击头部菜单按钮，弹出的左侧边栏 -->
    <?php include '../../partial/mobile-menu.html'; ?>
</body>

</html>

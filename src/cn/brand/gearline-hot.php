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

    <link rel="stylesheet" type="text/css" href="http://localhost/SportMall/src/css/index9210.css">
    <link rel="stylesheet" type="text/css" href="http://localhost/SportMall/src/css/swiper-3.4.0.min.css">
    <link href="http://localhost/SportMall/src/css/brandstory.css" rel="stylesheet" type="text/css">
    <link href="http://localhost/SportMall/src/css/check-out.css" rel="stylesheet" type="text/css">
    <link href="http://localhost/SportMall/src/css/video-js.min.css" rel="stylesheet" type="text/css">
    <script src="http://localhost/SportMall/src/scripts/index.js"></script>
    <script src="http://localhost/SportMall/src/scripts/video.min.js"></script>
    <script src="http://localhost/SportMall/src/scripts/swiper-3.4.0.min.js"></script>
    <title>官网</title>
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
    .content-mobile {
        display: none;
    }
    .swiper-pagination-bullet {
        margin-right: 5px;
    }
    @media (max-width: 767px) {
        .content-mobile {
            display: block;
        }
        .content-pc {
            display: none;
        }
    }
    </style>
    <!-- PC端轮播按钮 -->
    <style>
        .button-box {
            position: absolute;
            top: 65%;
            right: 10.7%;
            width: 130px;
            height: 50px;
            background-color: #cd1314;
            z-index: 999;
        }
        .b-pre,
        .b-nex {
            position: absolute;
            top: 0;
            width: 35px;
            height: 50px;
            margin-top: 0;
            z-index: 1000;
        }
        .button-box .b-pre {
            left: 0!important;
        }
        .button-box .b-nex {
            right: 0!important;
        }
        .button-box .pag-num {
            position: absolute;
            top: 0;
            left: 35px;
            width: 60px;
            height: 50px;
            color: #fff;
            font-size: 24px;
            line-height: 50px;
            text-align: center;
        }
    </style>
    <!-- video视频样式 -->
    <style>
        .video-box {
            width: 100%;
            margin-top: 60px;
        }
        .video-js {
            float: left;
            width: 60%;
            min-width: 245px;
            height: 400px;
        }
        .video-js:nth-of-type(1) {
            margin-right: 2%;
        }
        @media (max-width:1140px) {
            .video-js {
                float: left;
                width: 60%;
                min-width: 245px;
                height: 300px;
            }
        }
        @media (max-width:970px) {
            .video-js {
                float: left;
                width: 60%;
                min-width: 245px;
                height: 250px;
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
            <!-- pc端轮播 -->
            <div class="content-pc">
                <div class="swiper-container" id="swiper-container2">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide">
                            <img src="http://localhost/SportMall/src/images/story/pc/gearline/hot/1_02.jpg">
                            <a href="javascript:playVideo('video1','http://localhost/SportMall/src/video/poster.png','http://localhost/SportMall/src/video/love.mp4')" class="li_a1 video_btn_1">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/video_btn.png">
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <img src="http://localhost/SportMall/src/images/story/pc/gearline/hot/1_03.jpg">
                            <a href="javascript:playVideo('video2','http://localhost/SportMall/src/video/poster.png','http://localhost/SportMall/src/video/love.mp4')" class="li_a2 video_btn_2">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/video_btn.png">
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <img src="http://localhost/SportMall/src/images/story/pc/gearline/hot/1_04.jpg">
                            <a href="javascript:playVideo('video3','http://localhost/SportMall/src/video/poster.png','http://localhost/SportMall/src/video/love.mp4')" class="li_a3 video_btn_3">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/video_btn.png">
                            </a>
                        </li>
                    </ul>
                    <div class="button-box">
                        <div class="swiper-button-next b-nex"></div>
                        <div class="swiper-pagination pag-num" id="swiper-pagination2">
                            <span class="swiper-pagination-current"></span> / <span class="swiper-pagination-total">3</span>
                        </div>
                        <div class="swiper-button-prev b-pre"></div>
                    </div>
                </div>
            </div>
            <!-- 移动端轮播 -->
            <div class="content-mobile">
                <div class="swiper-container" id="swiper-container1">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide">
                            <img src="http://localhost/SportMall/src/images/story/mobile/gearline/hot/GearLines1_01.jpg">
                            <a href="javascript:playVideo('video1','http://localhost/SportMall/src/video/poster.png','http://localhost/SportMall/src/video/love.mp4')" class="li_a1_m video_btn_1">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/video_btn.png">
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <img src="http://localhost/SportMall/src/images/story/mobile/gearline/hot/GearLines1_02.jpg">
                            <a href="javascript:playVideo('video1','http://localhost/SportMall/src/video/poster.png','http://localhost/SportMall/src/video/love.mp4')" class="li_a2_m video_btn_2">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/video_btn.png">
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <img src="http://localhost/SportMall/src/images/story/mobile/gearline/hot/GearLines1_03.jpg">
                            <a href="javascript:playVideo('video1','http://localhost/SportMall/src/video/poster.png','http://localhost/SportMall/src/video/love.mp4')" class="li_a3_m video_btn_3">
                                <img width="100%" height="100%" src="http://localhost/SportMall/src/images/story/video_btn.png">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <?php include '../../partial/footer.html'; ?>
    </div>
    <script>
        $(function(){
            var param = window.location.search.slice(1).split('&');
            var resArr = [];
            var page = 1;
            for (var i = 0; i < param.length; i++) {
                resArr.push({
                    name: param[i].split('=')[0],
                    value: param[i].split('=')[1]
                })
            }
            for (var i = 0; i < resArr.length; i++) {
                if (resArr[i].name == 'page') {
                    page = parseInt(resArr[i].value)
                }
            }
            var mySwiper2 = new Swiper('#swiper-container2', {
                pagination: '#swiper-pagination2',
                paginationType: 'fraction',
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                loop: true,
                autoplay: 3000,
                initialSlide: (page - 1),
            })
            var mySwiper1 = new Swiper('#swiper-container1', {
                loop: true,
                autoplay: 3000,
                initialSlide: (page - 1),
            })
        })
    </script>
    <!-- 移动端点击头部菜单按钮，弹出的左侧边栏 -->
    <?php include '../../partial/mobile-menu.html'; ?>
</body>

</html>

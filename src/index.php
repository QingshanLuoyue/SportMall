<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'partial/index_head.html'; ?>
</head>

<body>
    <div id="container">
        <!-- 头部开始 -->
        <?php include 'partial/header.html'; ?>
    	<!-- 头部结束 -->
		
        <!-- 主要内容 -->
        <div id="content" class="content ">
        	<!-- PC端内容开始 -->
            <div class="content-pc">
                <!--公告-->
				<!-- 大图轮播 -->
	            <div class="swiper-container">
	                <div class="swiper-wrapper">
	                    <div class="swiper-slide">
	                    	<a href="">
	                    		<img class="slide-img" src="http://localhost/SportMall/src/images/1.jpg" alt="">
	                    	</a>
	                    </div>
	                    <div class="swiper-slide">
	                    	<a href="">
	                    		<img class="slide-img" src="http://localhost/SportMall/src/images/2.jpg" alt="">
	                    	</a>
	                    </div>
	                    <div class="swiper-slide">
	                    	<a href="">
	                    		<img class="slide-img" src="http://localhost/SportMall/src/images/1.jpg" alt="">
	                    	</a>
	                    </div>
	                </div>
	                <!-- 小圆点 -->
	                <div class="swiper-pagination"></div>
	            </div>
	            <!-- 轮播js -->
	            <script>
	            	var swiper = new Swiper('.swiper-container', {
				        pagination: '.swiper-pagination',
				        paginationClickable: true,
				        autoplay: 3000
				    });
	            </script>
	            
	            <!-- 视频 -->
	            <div class="video-box clearfix">
	                <!-- 第一个 -->
	                <video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered" width="100%" height="100%" controls preload="none" poster="http://localhost/SportMall/src/video/poster.png" data-setup="{}">
	                    <source src="http://localhost/SportMall/src/video/love.mp4" type='video/mp4' />
	                    <!-- <source src="http://视频地址格式2.webm" type='video/webm' /> -->
	                    <!-- <source src="http://视频地址格式3.ogv" type='video/ogg' /> -->

	                </video>
	                <!-- 第二个 -->
	                <video id="example_video_2" class="video-js vjs-default-skin vjs-big-play-centered" width="100%" height="100%" controls preload="none" poster="http://localhost/SportMall/src/video/snow.png" data-setup="{}">
	                    <source src="http://localhost/SportMall/src/video/snow.mp4" type='video/mp4' />
	                    <!-- <source src="http://视频地址格式2.webm" type='video/webm' /> -->
	                    <!-- <source src="http://视频地址格式3.ogv" type='video/ogg' /> -->
	                </video>
	            </div>
                <script>
                    $(function(){
                        var video1 = videojs('example_video_1');
                        var video2 = videojs('example_video_2');
                        video1.on('play',function(){
                            video2.pause()
                        })
                        video2.on('play',function(){
                            video1.pause()
                        })
                    })
                </script>
                <!--文字按钮-->
                <div class="cms-html-edit">
                    <!--文字按钮-->
                    <div class="landingpaga-text">
                        <p>UA秋冬装备全新上市</p>
                        <h3><span>我们潜心改良装备</span><span>让你专注提升表现</span></h3>
                        <a id="mens" href="javascript:void(0)">男子新品<i class="btn-icon"></i></a>
                        <a id="womens" href="javascript:void(0)">女子新品<i class="btn-icon"></i></a>
                    </div>
                    <!-- 点击跳转到相应新品页面 -->
                    <script type="text/javascript">
                    	// 全部新品
	                    $(".landingpaga-text").on("click", function(e) {
	                        e.stopPropagation();
	                        window.open(pagebase + "/cn/newitem/newitem.php");
	                    })
	                    // 男子新品
	                    $("#mens").on("click", function(e) {
	                        e.stopPropagation();
	                        window.open("cn/newitem/newitem.php");
	                    })
	                    // 女子新品
	                    $("#womens").on("click", function(e) {
	                        e.stopPropagation();
	                        window.open("cn/newitem/newitem.php");
	                    })
                    </script>
                </div>

                <!--banner1  特别挑选出来的产品1-->
                <div class="banner clear">
                    <div class="banner-box">
                        <div class="posi-rel">
                            <div class="banner-link cms-imgarticle-edit">
                                <a target="_blank" href="index.html" class="">
                                	<img src="http://localhost/SportMall/src/images/banner/banner1/HP-2-147bc.jpg" alt="" class="cms-area-img" />
                                </a>
                            </div>
                            <div class="cms-imgarticle-edit">
                                <a target="_blank" class="banner-btn cms-area-title cms-area-href" href="" title="遮罩层">遮罩层</a>
                            </div>
                            <div class="banner-btn1 cms-imgarticle-edit">
                                <a target="_blank"  href="" title="立即购买">立即购买<i class="btn-icon2"></i></a>
                            </div>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text1 cms-area-href cms-area-title" title="运动员专属">运动员专属</a>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text2 cms-area-title cms-area-href" title="UA运动无线耳机">UA运动无线耳机</a>
                        </div>
                    </div>
                    <div class="banner-box">
                        <div class="posi-rel">
                            <div class="banner-link cms-imgarticle-edit">
                                <a target="_blank" href="index.html" class="">
                                	<img src="http://localhost/SportMall/src/images/banner/banner1/HP-2-208f8.jpg" alt="" class="cms-area-img" />
                                </a>
                            </div>
                            <div class="cms-imgarticle-edit">
                                <a target="_blank" href="" class="banner-btn cms-area-title cms-area-href" title="遮罩层">遮罩层</a>
                            </div>
                            <div class="banner-btn1 cms-imgarticle-edit">
                                <a target="_blank" href="" class="cms-area-title cms-area-href" title="立即购买">立即购买<i class="btn-icon2"></i></a>
                            </div>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text1 cms-area-title cms-area-href" title="每一步，精益求精">每一步，精益求精</a>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text2 cms-area-title cms-area-href" title="DELTA HIGHLIGHT">DELTA HIGHLIGHT</a>
                        </div>
                    </div>
                </div>
                <!--banner2  特别挑选出来的产品2-->
                <div class="banner2 clear">
                    <div class="banner-box">
                        <div class="posi-rel">
                            <div class="banner-link cms-imgarticle-edit">
                                <a target="_blank" href="" class="">
                                    <img src="http://localhost/SportMall/src/images/banner/banner2/14823141510884043.jpg" alt="" class="cms-area-img" />
                                </a>
                            </div>
                            <div class="cms-imgarticle-edit">
                                <a target="_blank" href="" class="banner-btn cms-area-title cms-area-href" title="遮罩层">遮罩层</a>
                            </div>
                            <div class="banner-btn1 cms-imgarticle-edit">
                                <a target="_blank" href="" class="cms-area-title cms-area-href" title="立即购买">立即购买<i class="btn-icon2"></i></a>
                            </div>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text1 cms-area-title cms-area-href" title="武装自己">武装自己</a>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text2 cms-area-title cms-area-href" title="COLDGEAR ARMOUR系列">COLDGEAR ARMOUR系列</a>
                        </div>
                    </div>
                    <div class="banner-box">
                        <div class="posi-rel">
                            <div class="banner-link cms-imgarticle-edit">
                                <a target="_blank" href="" class="">
                                <img src="http://localhost/SportMall/src/images/banner/banner2/14823142228804506.jpg" alt="" class="cms-area-img" />
                                </a>
                            </div>
                            <div class="cms-imgarticle-edit">
                                <a target="_blank" href="" class="banner-btn cms-area-title cms-area-href" title="遮罩层">遮罩层</a>
                            </div>
                            <div class="banner-btn1 cms-imgarticle-edit">
                                <a target="_blank" href="" class="cms-area-title cms-area-href" title="立即购买">立即购买<i class="btn-icon2"></i></a>
                            </div>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text1 cms-area-title cms-area-href" title="无视温度 动无限度">无视温度 动无限度</a>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text2 cms-area-title cms-area-href" title="UA女子外套">UA女子外套</a>
                        </div>
                    </div>
                    <div class="banner-box">
                        <div class="posi-rel">
                            <div class="banner-link cms-imgarticle-edit">
                                <a target="_blank" href=" " class="cms-area-href">
                                <img src="http://localhost/SportMall/src/images/banner/banner2/14823142903501420.jpg" alt="" class="cms-area-img" />
                                </a>
                            </div>
                            <div class="cms-imgarticle-edit">
                                <a target="_blank" href="" class="banner-btn cms-area-title cms-area-href" title="遮罩层">遮罩层</a>
                            </div>
                            <div class="banner-btn1 cms-imgarticle-edit">
                                <a target="_blank" href="" class="cms-area-title cms-area-href" title="立即购买">立即购买<i class="btn-icon2"></i></a>
                            </div>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text1 cms-area-title cms-area-href" title="革新提升表现 工艺专注细节">革新提升表现 工艺专注细节</a>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text2 cms-area-title cms-area-href" title="UA男子外套">UA男子外套</a>
                        </div>
                    </div>
                </div>
            </div>
        	<!-- PC端内容结束 -->
			
            <!-- 移动端内容开始 -->
            <div class="content-mob">
                <!-- 移动端轮播 -->
                <div class="swiper-container swiper-container2">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide">
                            <a class="block" href="" target="_blank">
                                <img class="block" src="http://localhost/SportMall/src/images/mobile/carousel/scroll1.jpg"/>
                            </a>
                            <a class="m-slide-a" href="" target="_blank">
                                <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                            </a>
                            <a class="m-slide-a" href="" target="_blank">
                                <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                            </a>
                            <a class="m-slide-a" href="" target="_blank">
                                <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                            </a>
                        </li>
                        <li class="swiper-slide">
                            <a class="block" href="" target="_blank">
                                <img class="block" src="http://localhost/SportMall/src/images/mobile/carousel/scroll1.jpg"/>
                            </a>
                            <a class="m-slide-a" href="" target="_blank">
                                <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                            </a>
                            <a class="m-slide-a" href="" target="_blank">
                                <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                            </a>
                            <a class="m-slide-a" href="" target="_blank">
                                <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                            </a>
                        </li>
                    </ul>
                    <div class="swiper-pagination"></div>
                </div>
                <!-- 移动端轮播js -->
                <script>
                	var swiper2 = new Swiper('.swiper-container2', {
				        pagination: '.swiper-pagination',
				        paginationClickable: true,
				        autoplay: 3000
				    });
                </script>
                <!-- 移动端文字按钮 -->
                <div class="mobile-advertising">
                    <div class="posi-rel">
                        <a class="tol-btn" href="" target="_blank">
                            <img src="http://localhost/SportMall/src/images/mobile/textbtn.jpg" border="0"/>
                        </a>
                        <a class="text-btn" href="" target="_blank">
                            <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                        </a>
                        <a class="text-btn" href="" target="_blank">
                            <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                        </a>
                        <a class="text-btn" href="" target="_blank">
                            <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                        </a>
                        <a class="text-btn" href="" target="_blank">
                            <img src="http://localhost/SportMall/src/images/href_blank.png" height="100%" width="100%" />
                        </a>
                    </div>
                </div>
                <!--移动端-导航-->
                <div class="mobile-middle-menu clear">
                    <ul class="clear">
                        <li class="mobile-middle-menu-title"><a class="inactive" href="javascript:void(0);">新品推荐</a>
                            <ul class="mobile-middle-menu-content clear">
                                <li class="mobile-middle-menu-text">
                                    <a href="http://localhost/SportMall/src/cn/newitem/newitem.php">
                                        <span>男子新品推荐</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="http://localhost/SportMall/src/cn/newitem/newitem.php">
                                        <span>女子新品推荐</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="http://localhost/SportMall/src/cn/newitem/newitem.php">
                                        <span>所有新品推荐</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="mobile-middle-menu-title"><a class="inactive" href="javascript:void(0);">热卖商品</a>
                            <ul class="mobile-middle-menu-content clear">
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>男子热卖推荐</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>女子热卖推荐</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>所有热卖推荐</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="mobile-middle-menu-title"><a class="inactive" href="javascript:void(0);">男子装备</a>
                            <ul class="mobile-middle-menu-content clear">
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>上装</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>下装</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>鞋类</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>配件</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>运动</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>查看所有男子装备</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="mobile-middle-menu-title"><a class="inactive" href="javascript:void(0);">女子装备</a>
                            <ul class="mobile-middle-menu-content clear">
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>上装</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>下装</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>鞋类</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>配件</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>运动</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                                <li class="mobile-middle-menu-text">
                                    <a href="">
                                        <span>查看所有女子装备</span>
                                        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!--移动端推荐商品 -->
                <div class="recommend-commodities clear">
                    <span>推荐商品</span>
                    <div class="mobile-recommend-commodities">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <a href="" target="_blank">
                                        <img src="http://localhost/SportMall/src/images/mobile/recommend/14806608378259843_150X200.png" alt="男子UA Pursuit Fleece连帽上衣" />
                                        <div class="recommend-det">
                                            <div class="type" >男子UA Pursuit Fleece连帽上衣</div>
                                            <div class="price">￥699.00</div>
                                        </div>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <a href="p1280824-787.html#36" target="_blank">
                                        <img src="http://localhost/SportMall/src/images/mobile/recommend/14769564484787643_150X200.png" alt="男子UA ColdGear® Reactor连帽夹克" />
                                        <div class="recommend-det">
                                            <div class="type">男子UA ColdGear® Reactor连帽夹克</div>
                                            <div class="price">￥1999.00</div>
                                        </div>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <a href="p1287555-001.html#36" target="_blank">
                                        <img src="http://localhost/SportMall/src/images/mobile/recommend/14806608327572437_150X200.png" alt="男子UA Pursuit工装裤" />
                                        <div class="recommend-det">
                                            <div class="type">男子UA Pursuit工装裤</div>
                                            <div class="price">￥599.00</div>
                                        </div>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <a href="p1289822-001.html#36" target="_blank">
                                        <img src="http://localhost/SportMall/src/images/mobile/recommend/14793506799427224_150X200.png" alt="UA运动无线心率监测耳机" />
                                        <div class="recommend-det">
                                            <div class="type">UA运动无线心率监测耳机</div>
                                            <div class="price">￥1899.00</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 移动端内容结束 -->
        </div>
        <!-- 底部 -->
        <?php include 'partial/footer.html'; ?>
    </div>
    <!-- 移动端点击头部菜单按钮，弹出的左侧边栏 -->
    <?php include 'partial/mobile-menu.html'; ?>
</body>
</html>

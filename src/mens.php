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
	            
                <!--文字按钮-->
                <div class="cms-html-edit">
                    <!--文字按钮-->
                    <div class="landingpaga-text">
                        <p>UA秋冬装备全新上市</p>
                        <h3><span>我们潜心改良装备</span><span>让你专注提升表现</span></h3>
                        <a id="mens" href="http://localhost/SportMall/src/cn/newitem/newitem.php">男子新品<i class="btn-icon"></i></a>
                        <a id="womens" href="http://localhost/SportMall/src/cn/newitem/newitem.php">女子新品<i class="btn-icon"></i></a>
                    </div>
                    <!-- 点击跳转到相应新品页面 -->
                    <script type="text/javascript">
                    	// 全部新品
	                    $(".landingpaga-text").on("click", function(e) {
	                        e.stopPropagation();
	                        window.open(pagebase + "/cvirtual-newitem/#22");
	                    })
                    </script>
                </div>

                <!--banner1  特别挑选出来的产品1-->
                <div class="banner clear">
                    <div class="banner-box">
                        <div class="posi-rel">
                            <div class="banner-link cms-imgarticle-edit">
                                <a target="_blank" href="" class="">
                                	<img src="http://localhost/SportMall/src/images/banner/banner1/HP-2-147bc.jpg" alt="" class="cms-area-img" />
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
                            <a target="_blank" href="" class="banner-text1 cms-area-href cms-area-title" title="运动员专属">运动员专属</a>
                        </div>
                        <div class="cms-imgarticle-edit">
                            <a target="_blank" href="" class="banner-text2 cms-area-title cms-area-href" title="UA运动无线耳机">UA运动无线耳机</a>
                        </div>
                    </div>
                    <div class="banner-box">
                        <div class="posi-rel">
                            <div class="banner-link cms-imgarticle-edit">
                                <a target="_blank" href="" class="">
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
                <!-- 男士装备导航 -->
				<div class="landingpage-nav clear">
				    <dl class="landingpage-nav-text">
				        <dt><a target="_blank" href=""><strong>推荐系列</strong></a></dt>
				        <dd><a target="_blank" href="">Coldgear Infrared系列</a></dd>
				        <dd><a target="_blank" href="">运动耳机</a></dd>
				        <dd><a target="_blank" href="">Armour贴身运动衣</a></dd>
				        <dd><a target="_blank" href="">Reactor系列</a></dd>
				        <dd><a target="_blank" href="">Curry库里专区</a></dd>
				        <dd><a target="_blank" href="">冷装备</a></dd>
				        <dd><a target="_blank" href="">热装备</a></dd>
				        <dd><a target="_blank" href="">全季装备</a></dd>
				    </dl>
				    <dl class="landingpage-nav-text">
				        <dt><a target="_blank" href=""><strong>上装</strong></a></dt>
				        <dd><a target="_blank" href="">外套</a></dd>
				        <dd><a target="_blank" href="">连帽上衣</a></dd>
				        <dd><a target="_blank" href="">长袖</a></dd>
				        <dd><a target="_blank" href="">短袖</a></dd>
				        <dd><a target="_blank" href="">背心</a></dd>
				        <dd><a target="_blank" href="">POLO衫</a></dd>
				    </dl>
				    <dl class="landingpage-nav-text">
				        <dt><a target="_blank" href=""><strong>下装</strong></a></dt>
				        <dd><a target="_blank" href="">紧身裤</a></dd>
				        <dd><a target="_blank" href="">长裤</a></dd>
				        <dd><a target="_blank" href="">短裤</a></dd>
				        <dd><a target="_blank" href="">中裤</a></dd>
				        <dd><a target="_blank" href="">内裤</a></dd>
				    </dl>
				    <dl class="landingpage-nav-text">
				        <dt><a target="_blank" href=""><strong>鞋类</strong></a></dt>
				        <dd><a target="_blank" href="">跑步鞋</a></dd>
				        <dd><a target="_blank" href="">训练鞋</a></dd>
				        <dd><a target="_blank" href="">篮球鞋</a></dd>
				        <dd><a target="_blank" href="">足球鞋</a></dd>
				        <dd><a target="_blank" href="">棒球鞋</a></dd>
				    </dl>
				    <dl class="landingpage-nav-text">
				        <dt><a target="_blank" href=""><strong>配件</strong></a></dt>
				        <dd><a target="_blank" href="">运动耳机</a></dd>
				        <dd><a target="_blank" href="">包</a></dd>
				        <dd><a target="_blank" href="">帽</a></dd>
				        <dd><a target="_blank" href="">袜</a></dd>
				        <dd><a target="_blank" href="">手套</a></dd>
				        <dd><a target="_blank" href="">其他</a></dd>
				    </dl>
				    <dl class="landingpage-nav-text">
				        <dt><a target="_blank" href=""><strong>运动</strong></a></dt>
				        <dd><a target="_blank" href="">训练</a></dd>
				        <dd><a target="_blank" href="">跑步</a></dd>
				        <dd><a target="_blank" href="">篮球</a></dd>
				        <dd><a target="_blank" href="">高尔夫</a></dd>
				        <dd><a target="_blank" href="">登山</a></dd>
				        <dd><a target="_blank" href="">足球</a></dd>
				        <dd><a target="_blank" href="">棒球</a></dd>
				    </dl>
				    <dl class="landingpage-nav-text">
				    </dl>
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
                                	<a href="">
                                		<span>男子新品推荐</span>
                                		<img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
                                	</a>
                                </li>
								<li class="mobile-middle-menu-text">
								    <a href="">
								        <span>女子新品推荐</span>
								        <img src="http://localhost/SportMall/src/images/mobile/icon-5.png" />
								    </a>
								</li>
								<li class="mobile-middle-menu-text">
								    <a href="">
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
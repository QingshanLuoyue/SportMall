<!DOCTYPE html>
<html lang="en">
<head>
    <?php include '../../partial/newitem_head.html'; ?>
</head>

<body>
    <div id="container">
        <!-- 头部开始 -->
        <?php include '../../partial/header.html'; ?>
        <!-- 头部结束 -->

        <!-- 主要内容 -->
        <div id="content" class="content">
            <div class="list-content-box">
            	<!-- pc端=筛选列表头部 -->
                <div class="list-header">
                	<!-- 面包屑导航 -->
                    <div class="headline-breadcrumbs-wrapper">
                        <h1 class="headline">新品推荐</h1>
                        <div class="breadcrumbs-wrapper">
                            <ul>
                                <li>
                                    <a href="">首页</a>
                                    <a href="index.html#11">/新品推荐</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 排序 -->
                	<div class="list_select_box">
                    	<div class="product-count"><span>131<span>件商品</div>
						<div class="common_select_box list_select common_select_box_1">
		            		<span class ="common_select_title" id="common_selectSex">默认排序</span>
                            <i class="common_select_box_bg"></i>
                            <ul id="select-number" class="select_scroll_1">
                                <li value="0" order="default_order">默认排序</li>
                                <li value="1" order="orders_desc">销量</li>
                                <li value="2" order="salesprice_asc">价格 低到高</li>
                                <li value="3" order="salesprice_desc">价格 高到低</li>
                                <li value="4" order="newest_desc">最新</li>
                            </ul>
                            <input type="hidden" id="" nameid="sortMethod">
                        </div>
                    </div>
	            </div>
                <!-- pc端筛选条件 -->
                <?php include '../../partial/pc_newitem_filter.html' ?>
                
				<!-- 移动端-筛选头部 -->
                <div class="listing-top mb-listing-top clear">
                    <div class="screening-sorting clear">
                    	<!-- 筛选条件 -->
                        <div class="listing-search-1">
                            <div class="search-screening">筛选</div>
                        </div>
                        <!-- 排序 -->
                        <div class="listing-search-1 sorting-screening1">
                            <div class="sorting-screening" id="common_selectSex_pc">默认排序</div>
                            <select class="sorting-select" nameid="sortMethod">
                                <option value="0">默认排序</option>
                                <option value="1">销量</option>
                                <option value="2">价格 低到高</option>
                                <option value="3">价格 高到低</option>
                                <option value="4">最新</option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="results-count">
                        <span class="">131</span>
                        <span class="">件商品</span>
                    </div>
                </div>
                <!-- 移动端筛选条件 -->
                <?php include '../../partial/mobile_newitem_filter.html' ?>

                <div class="listing-main" id="ajax_listpages">
                    <input type="hidden" id="totalPages" name="totalPages" value="4" />
                    <!-- 提交的查询条件表单 pc和移动通用 -->
                    <form action="#" id="searchForm" name="searchForm">
                        <input type="hidden" id="sortMethod" name="sortMethod" value="" />
                        <input type="hidden" id="productstyle" name="productstyle" value="" />
                        <input type="hidden" id="sexname" name="sexname" value="" />
                        <input type="hidden" id="clipname" name="clipname" value="" />
                        <input type="hidden" id="equitname" name="equitname" value="" />
                        <input type="hidden" id="fitsport" name="fitsport" value="" />
                        <input type="hidden" id="colorname" name="colorname" value="" />
                        <input type="hidden" id="pricerange" name="pricerange" value="" />
                        <input type="hidden" id="newProduct" name="newProduct" value="" />
                        <input type="hidden" id="selling" name="selling" value="" />
                        <input type="hidden" id="discount" name="discount" value="" />
                    </form>
                    <!-- 根据条件查询出来的产品列表 -->
                    <div class="grid">
                        <ul class="product-list clear" id="productList">
                            <li class="product-list-li">
                                <style>
                                    .positive-img.rotateimg {
                                        display: none;
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        transition: all .3s linear;
                                        transform: rotateY(180deg);
                                    }
                                    .positive-img.rotateback {
                                        transform: rotateY(0);
                                    }
                                    .imgUrl2 {
                                        display: none;
                                    }
                                </style>
                                <a class="product-img">
                                    <span>
                                        <img class="positive-img first" alt="" id="" src="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png" hidden_url=""/>
                                        <img class="positive-img first rotateimg" alt="" hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png"/>
                                    </span>
                                </a>
                                <div class="product-content">
                                    <ul class="color-list-small clear">
                                        <li class="color-item  active">
                                            <img hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png" class="imgUrl2" />
                                            <a style="background-color: #BD1B34;" href="javascript:void(0);"></a>
                                        </li>
                                        <li class="color-item">
                                            <img hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie2_320X390.png" class="imgUrl2" />
                                            <a style="background-color: #7F7E78;" href="javascript:void(0);"></a>
                                        </li>
                                    </ul>
                                    <div class="product-text">
                                        <a target="_blank">男子UA Curry 3篮球鞋</a>
                                    </div>
                                    <div class="product-money">
                                        <span class="price promotion-price">
                                            <a target="_blank">￥1299.00</a>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li class="product-list-li">
                                <a class="product-img">
                                    <span>
                                        <img class="positive-img first" alt="" id="" src="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png" hidden_url=""/>
                                        <img class="positive-img first rotateimg" alt="" id="" hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png"/>
                                    </span>
                                </a>
                                <div class="product-content">
                                    <ul class="color-list-small clear">
                                        <li class="color-item  active">
                                            <img hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png" class="imgUrl2" />
                                            <a style="background-color: #BD1B34;" href="javascript:void(0);"></a>
                                        </li>
                                        <li class="color-item">
                                            <img hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie2_320X390.png" class="imgUrl2"/>
                                            <a style="background-color: #7F7E78;" href="javascript:void(0);"></a>
                                        </li>
                                    </ul>
                                    <div class="product-text">
                                        <a target="_blank">男子UA Curry 3篮球鞋</a>
                                    </div>
                                    <div class="product-money">
                                        <span class="price promotion-price">
                                            <a target="_blank">￥1299.00</a>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li class="product-list-li">
                                <a class="product-img">
                                    <span>
                                        <img class="positive-img first" alt="" id="" src="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png" hidden_url=""/>
                                        <img class="positive-img first rotateimg" alt="" id="" hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png"/>
                                    </span>
                                </a>
                                <div class="product-content">
                                    <ul class="color-list-small clear">
                                        <li class="color-item  active">
                                            <img hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png" class="imgUrl2" />
                                            <a style="background-color: #BD1B34;" href="javascript:void(0);"></a>
                                        </li>
                                        <li class="color-item">
                                            <img hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie2_320X390.png" class="imgUrl2"/>
                                            <a style="background-color: #7F7E78;" href="javascript:void(0);"></a>
                                        </li>
                                    </ul>
                                    <div class="product-text">
                                        <a target="_blank">男子UA Curry 3篮球鞋</a>
                                    </div>
                                    <div class="product-money">
                                        <span class="price promotion-price">
                                            <a target="_blank">￥1299.00</a>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li class="product-list-li">
                                <a class="product-img">
                                    <span>
                                        <img class="positive-img first" alt="" id="" src="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png" hidden_url=""/>
                                        <img class="positive-img first rotateimg" alt="" id="" hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png"/>
                                    </span>
                                </a>
                                <div class="product-content">
                                    <ul class="color-list-small clear">
                                        <li class="color-item  active">
                                            <img hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie1_320X390.png" class="imgUrl2"/>
                                            <a style="background-color: #BD1B34;" href="javascript:void(0);"></a>
                                        </li>
                                        <li class="color-item">
                                            <img hidden_url="http://localhost/SportMall/src/images/new-list/newitem/xie2_320X390.png" class="imgUrl2"/>
                                            <a style="background-color: #7F7E78;" href="javascript:void(0);"></a>
                                        </li>
                                    </ul>
                                    <div class="product-text">
                                        <a target="_blank">男子UA Curry 3篮球鞋</a>
                                    </div>
                                    <div class="product-money">
                                        <span class="price promotion-price">
                                            <a target="_blank">￥1299.00</a>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- 加载更多旋转图标 -->
                        <div class="list-loading-wrap"><img src="../../images/loading.gif" width="32" height="32" /></div>
                    </div>
                </div>
            </div>
        </div>
	</div>

	<!-- 底部 -->
    <?php include '../../partial/footer.html'; ?>

    <!-- 移动端点击头部菜单按钮，弹出的左侧边栏 -->
    <?php include '../../partial/mobile-menu.html'; ?>
</body>
</html>

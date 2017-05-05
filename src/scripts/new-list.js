// 加载更多
$(function(){
	var n = 2;
	var total = $("#totalPages").val();
	var _tag = true;
	var _h = $("#footer").height();
	$(window).scroll(function(){
		if(!_tag){
			// return;
		}
		var scrollBottom= $(document).height() - $(window).height() - $(window).scrollTop();
		if(scrollBottom<_h+100){
			_tag = false;
			if(n > total){
				$('.list-loading-wrap').hide();
				return;
			}
			$("#pageNumber").val(n);
			$.ajax({
				url: 'http://localhost/SportMall/src/cn/newitem/newitem.json',
				type: 'get',
				dataType: 'text',
				success: function(res){
					var data = res && JSON.parse(res);
					var str = '';
					for (var i in data) {
						str += '<li class="product-list-li">\
	                                <a class="product-img">\
	                                    <span>\
                                            <img class="positive-img first" alt="" id="" src="'+ data[i].defaultImgUrl +'" />\
											<img class="positive-img first rotateimg" alt="" id="" hidden_url="'+ data[i].defaultImgUrl +'" />\
										</span>\
	                                </a>\
	                                <div class="product-content">\
	                                    <ul class="color-list-small clear">'
	                                    	for (var j in data[i].hiddenImgUrls) {
		                                        str += '<li class="color-item  '+ (j == 0 ? 'active' : '')  +'">\
				                                            <img hidden_url="'+ data[i].hiddenImgUrls[j].imgUrl +'" class="imgUrl2" />\
				                                            <a style="background-color: '+ data[i].hiddenImgUrls[j].color +'" href="javascript:void(0);"></a>\
				                                        </li>'
	                                    	}
	                                    str += '</ul>\
	                                    <div class="product-text">\
	                                        <a target="_blank">'+ data[i].productText +'</a>\
	                                    </div>\
	                                    <div class="product-money">\
	                                        <span class="price promotion-price">\
	                                            <a target="_blank">'+ data[i].productMoney +'</a>\
	                                        </span>\
	                                    </div>\
	                                </div>\
	                            </li>'
					}
	                $('#productList').append(str);
                    // 成功加载元素后运行imgEvents绑定函数
                    imgEvents()
				},
				error: function() {

				}
			})
		}
	});
    // <!-- pc-查询出来的图片的hover、click事件js -->
    function imgEvents(){
        $('.product-list .product-list-li').each(function(){
            var self = $(this);
            var tempImgUrl = $(this).find('.positive-img.first').attr('src')
            // hover事件
            $(this).find('.color-item').hover(function(){
                var hidden_url = $(this).find('img').attr('hidden_url')
                // 隐藏第一个显示图片
                self.find('.positive-img.first').eq(0).hide(0);
                // 设置翻转图片路径
                self.find('.positive-img.rotateimg').attr('src',hidden_url).show(0).addClass('rotateback')
            },function(){
                self.find('.positive-img.first').eq(0).show(0)
                self.find('.positive-img.rotateimg').removeAttr('src').hide(0).removeClass('rotateback')
            })
            // 点击事件
            // 设计ajax重复绑定，因此这里做了去除事件处理
            $(this).find('.color-item').off('click');
            $(this).find('.color-item').click(function(){
                console.log(1)
                $(this).addClass('active').siblings().removeClass('active')
                var hidden_url = $(this).find('img').attr('hidden_url')
                tempImgUrl = hidden_url;
                self.find('.positive-img.first').attr('src',hidden_url)
            })
        })
    }imgEvents()
});

// <!-- pc端排序js -->
$(function(){
    var inputName = $('.list_select_box').find('input').attr('nameid');
    var sortLsVal = getLS(inputName);
    if (sortLsVal) {
        var sortMethodVal = sortLsVal;
    } else {
        var sortMethodVal = '默认排序';
    }
    $('#' + inputName).val(sortMethodVal)
    $('#common_selectSex').text(sortMethodVal)

    $('.list_select_box .common_select_title').click(function(){
        $('#select-number').toggle();
        var _this = $(this),
            _thisText = $.trim(_this.text()),
            _thisP = _this.parents('.common_select_box');
            
        $('ul li:contains('+ _thisText +')', _thisP).css('color','#e70033');
    })
    $('#select-number > li').click(function(){
        // 设置input值
        $('#' + inputName).val($(this).attr('value'))
        $('#select-number').toggle();
        // 本地存储
        setLS(inputName,$(this).text())
        winLoad()
    })
})

// <!-- pc-移动公用-产品种类选择js -->
$(function(){
    $('.grid-nav-category .filter-item').each(function(){
        var inputName = $('.grid-nav-category').find('input').attr('nameid');
        $(this).find('a').click(function(){
            var temp = $(this).attr('title')
            setLS(inputName,temp)
            $('#' + inputName).val(temp)
            winLoad()
        })
    })
    var inputEl = $('.grid-nav-category').find('input');
    var inputName = inputEl.attr('nameid');
    var temp = getLS(inputName);
    $('#' + inputName).val(temp)
    $('.grid-nav-category .filter-item').each(function(){
        if ($(this).find('a').attr('title') == temp) {
            $(this).addClass('is-selected')
        }
    })
})

// <!-- pc-性别、剪裁，装备、运动、颜色、价格选择js -->
$(function(){
    // 点击事件
    $('.grid-nav-filter').each(function(){
        var inputName = $(this).find('input').attr('nameid');
        var temp = []
        $(this).find('.filter-item').each(function(){
            $(this).find('a').click(function(){
                temp.push($(this).attr('title'))
                $(this).parent().siblings('.filter-item').each(function(){
                    if ($(this).hasClass('is-selected')) {
                        temp.push($(this).find('a').attr('title'))
                    }
                })
                setLS(inputName,temp);
                $('#' + inputName).val(temp)
                winLoad()
            })
        })
    })

    // 反推、清除条件
    $('.grid-nav-filter').each(function(){
        var inputName = $(this).find('input').attr('nameid');
        var temp = getLS(inputName)
        $('#' + inputName).val(temp)
        $(this).find('.filter-item').each(function(){
            if (temp) {
                for (var i = 0; i < temp.length; i++) {
                    if ($(this).find('a').attr('title') == temp[i]) {
                        $(this).addClass('is-selected')
                    }
                }
                $(this).siblings('.clear-selections').show()
            }
        })
        $(this).find('.clear-selections').click(function(){
            $(this).siblings().removeClass('is-selected')
            setLS(inputName,'');
            $('#' + inputName).val('')
            winLoad()
        })
        $(this).find('.clear-selected').click(function(){
            $(this).siblings('.grid-nav-menu').find('.filter-item').removeClass('is-selected')
            setLS(inputName,'');
            $('#' + inputName).val('')
            winLoad()
        })
    })
})

// <!-- pc-新品推荐、热卖商品、精选特惠商品js -->
$(function(){
    // 点击事件
    $('.grid-nav-once').each(function(){
        var inputName = $(this).find('input').attr('nameid');
        $(this).find('a').click(function(){
            var temp = $(this).attr('title')
            setLS(inputName,temp)
            $('#' + inputName).val(temp)
            winLoad()
        })
        $(this).find('.clear-selected').click(function(){
            setLS(inputName,'')
            $('#' + inputName).val('')
        })
    })
    // 反推
    $('.grid-nav-once').each(function(){
        var inputName = $(this).find('input').attr('nameid');
        var temp = getLS(inputName);
        $('#' + inputName).val(temp)
    })
})

// <!-- pc-筛选条件列表效果 -->
$(function(){
    $(".grid-nav-filter ul.grid-nav-items").each(function() {
        if ($(this).find("li").length <= 1) {
            $(this).parent().hide();
        }
        if ($(this).find("li").hasClass("is-selected")) {
            //显示选择内容
            var selected_text = $(this).find("li.is-selected").find("a").attr("title");
            var selected_length = $(this).find("li.is-selected").length;
            if (selected_length > 1) {
                $(this).parents(".grid-nav-menu").siblings(".clear-selected").text(selected_length + "选项");
            } else {
                $(this).parents(".grid-nav-menu").siblings(".clear-selected").text(selected_text);
            }
            //添加样式
            $(this).parents(".grid-nav-menu").siblings(".clear-selected").show();
            $(this).find('li.clear-selections').show();
        } else {
            $(this).find('li.clear-selections').hide();
        }
        //新品
        var newProduct = $("#newProduct").val();
        if (newProduct) {
            $('.clear-selected.newProduct').text("新品推荐");
            $('.clear-selected.newProduct').show();
        }
        //热卖
        var selling = $("#selling").val();
        if (selling) {
            $('.clear-selected.selling').text("热卖推荐");
            $('.clear-selected.selling').show();
        }
        //特惠
        var discount = $("#discount").val();
        if (discount) {
            $('.clear-selected.discount').text("精选特惠商品");
            $('.clear-selected.discount').show();
        }
    });
})

// <!-- 移动端排序js -->
$(function(){
    var inputName = $('.sorting-select').attr('nameid');
    var sortLsVal = getLS(inputName);
    if (sortLsVal) {
        var sortMethodVal = sortLsVal;
    } else {
        var sortMethodVal = '默认排序';
    }
    $('#' + inputName).val(sortMethodVal)
    $('#common_selectSex_pc').text(sortMethodVal)

    $('.sorting-select').change(function(){
        // 设置input值
        $('#' + inputName).val($(this).val())
        // 本地存储
        setLS(inputName,$(this).find('option:selected').text())
        winLoad()
    })
})

// 移动端-条件列表筛选结果
$(function(){
	$(".mb-nav-filter div.grid-nav-sex ul.mobile").each(function(){
		if($(this).find("li").length<=1){
			$(this).parents(".ua-cord-content").parent(".mb-nav-filter").hide();
		}
		if($(this).find("li").hasClass("is-selected")){
			//mobile显示选择内容
			var mselected_text = $(this).find("li.is-selected a").attr("title");
			var mselected_length = $(this).find("li.is-selected").length;
			if(mselected_length>1){
				$(this).find("li.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_length+"选项");
			}else{
				$(this).find("li.is-selected").parents(".ua-cord-content").siblings(".ua-cord-header").find(".nav-selection-text").text(mselected_text);
			}
			//mobile添加样式
			$(this).find("li.clear-selections").show();
		}
	});
})

// 移动端筛选条件交互
$(function(){
	//mb- 显示筛选弹层
    $(".search-screening").click(function(){
		$(".mb-listing-filter").animate({left:"0"}, 0);
		$('#container').addClass("container");
    });

    /*点击item  改变选择状态*/
	$(".ua-accordion-cord .ua-cord-header").click(function(){
		$(this).parent(".ua-accordion-cord").toggleClass("active").siblings(".ua-accordion-cord").removeClass("active");
	});	

    // 上拉下拉
    $('.ua-cord-header .accordion-header').each(function(){
    	$(this).click(function(){
    		$(this).parents('.ua-cord-header').siblings('.ua-cord-content').toggle();
    		$(this).parents('.ua-accordion-cord').siblings('.ua-accordion-cord').each(function(){
    			$(this).find('.ua-cord-content').hide()
    		})
	    })
    })

    // 性别、剪裁，装备、运动、颜色、价格选择
    // 点击事件
    var tempLs = [];
    $('.ua-cord-container .grid-nav-sex').each(function(){
        $(this).find('.filter-item').each(function(){
            $(this).find('a').click(function(){
                $(this).parent().toggleClass('is-selected');
            })
        })

    })

    // 反推、清除条件
    $('.mb-nav-filter').each(function(){
        var inputName = $(this).find('.grid-nav-sex').attr('nameid');
        var temp = getLS(inputName)
        $('#' + inputName).val(temp)
        $(this).find('.filter-item').each(function(){
            if (temp) {
                for (var i = 0; i < temp.length; i++) {
                    if ($(this).find('a').attr('title') == temp[i]) {
                        $(this).addClass('is-selected')
                    }
                }
                $(this).siblings('.clear-selections').show()
            }
        })
        $(this).find('.clear-selections').click(function(){
            $(this).siblings().removeClass('is-selected')
            setLS(inputName,'');
            $('#' + inputName).val('')
            winLoad()
        })
        $(this).find('.clear-selected').click(function(){
            $(this).siblings('.grid-nav-menu').find('.filter-item').removeClass('is-selected')
            setLS(inputName,'');
            $('#' + inputName).val('')
            winLoad()
        })
    })

    /*mobile 确认筛选按钮 click*/
    $(".filter-footer a").click(function(){
    	// 存储选择条件
    	var tempLs = {};
	    $('.ua-cord-container .grid-nav-sex').each(function(){
	    	var inputName = $(this).attr('nameid');
	    	tempLs[inputName] = [];
	        $(this).find('.filter-item').each(function(){
	            if($(this).hasClass('is-selected')) {
	            	tempLs[inputName].push($(this).find('a').attr('title'))
	            }
	        })
	    })
	    for (var i in tempLs) {
	    	setLS(i,tempLs[i])
	    	$('#' + i).val(tempLs[i])
	    }
		winLoad()
		$(".mb-listing-filter").animate({left:"-100%"}, 0);
		$('#container').removeClass("container");
	})
})
	
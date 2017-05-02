var citydata = [
    {
        "id": "100000",
        "name": "广东省",
        "nodes": [
            {
                "id": "100100",
                "name": "深圳市"
            },
            {
                "id": "100200",
                "name": "广州市"
            },
            {
                "id": "100300",
                "name": "东莞市"
            }
        ]
    },
    {
        "id": "200000",
        "name": "福建省",
        "nodes": [
            {
                "id": "200100",
                "name": "福州市"
            },
            {
                "id": "200200",
                "name": "厦门市"
            },
            {
                "id": "300300",
                "name": "泉州市"
            }
        ]
    },
    {
        "id": "300300",
        "name": "北京",
        "nodes": [
            {
                "id": "300100",
                "name": "东城区"
            },
            {
                "id": "300200",
                "name": "西城区"
            },
            {
                "id": "300300",
                "name": "海淀区"
            }
        ]
    }
]
// 初始化省份
function selectInit(){
    var str = '';
    for (var i in citydata) {
        str += '<li value="'+ citydata[i].id +'">'+ citydata[i].name +'</li>'
    }
    $('.province_x').html(str)
}
// 选择城市
function selectCity(id){
    var tempData = {};
    var str = '';
    for (var i in citydata) {
        if (citydata[i].id == id) {
            tempData = citydata[i].nodes;
        }
    }
    for (var i in tempData) {
        str += '<li value="'+ tempData[i].id +'">'+ tempData[i].name +'</li>'
    }
    $('#select-number').html(str)
}
// 生成线下店铺列表
function productShopList(data){
    var str = '';
    for (var i in data) {
        str += '<li class="clear">\
                    <div class="txt">\
                        <dl>\
                            <dt>'+ data[i].name +'</dt>\
                            <dd class="mb15">'+ data[i].engName +'</dd>\
                            <dd>'+ data[i].detailsAddress +'</dd>\
                            <dd>'+ data[i].engDistrict +'</dd>\
                            <dd>'+ data[i].engdetailsDistrict +'</dd>\
                            <dd>'+ data[i].tel +'</dd>\
                            <dd>'+ data[i].time +'</dd>\
                        </dl>\
                    </div>\
                    <div class="pic">\
                        <img src="'+ data[i].imgUrl +'" alt="" />\
                    </div>\
                    <div class="see-shop">\
                        <a onclick="setShopData(this)" href="http://localhost/SportMall/src/cn/shop/shopMap.php" \
                        longitude="'+ data[i].longitude +'" latitude="'+ data[i].latitude +'" name="'+ data[i].name +'" detailsAddress="'+ data[i].detailsAddress +'">点击查看地图&gt;</a>\
                    </div>\
                </li>'
    }

    $('#shop-list ul').html(str);
    $('.can-search').text('搜索到'+ data.length +'间UA零售店')
}
// 设置线下店铺数据
function setShopData(el){
    var shopdata = {
        longitude: $(el).attr('longitude'),
        latitude: $(el).attr('latitude'),
        name: $(el).attr('name'),
        detailsAddress: $(el).attr('detailsAddress')
    }
   setLS('shopdata',shopdata)
}
$(document).ready(function() {
    // 初始化省份、
    selectInit()
    // 初始化线下店铺列表
    shopListInit()
    // 绑定省份城市点击事件
    function pdpselect() {
        $(".common_select_box").children('ul').hide();
        $(".common_select_box").on("click", (function(event) {
            $(this).children('ul').show();
        }));
        $(".common_select_box").on("mouseover",'li', (function(event) {
            $(this).addClass('current');
        }));
        $(".common_select_box").on("mouseout",'li', (function(event) {
            $(this).removeClass('current');
        }));
        $(".common_select_box").on(
            "click",'li',
            (function(event) {
                var text = $(this).text();
                city = text;
                $("#Pages").val(1);
                $(this).addClass('currents');
                $(this).siblings("li").removeClass('currents');
                $(this).parents("ul.select_scroll_1").parent("div").children("span").text(text);
                $(this).parents("ul.select_scroll_1").hide();
                $(this).parent("ul").parent("div").children("span").text(text);
                $(this).parent("ul").hide();
                event.stopPropagation();
            }));
        $(".common_select_box").on("mouseleave", (function(event) {
            $(this).children("ul").hide();
        }));
    }
    pdpselect();
    // 点击省份
    $(".province_x li").click(function() {
        var valueid = $(this).attr('value');
        $('#cityx').val('')
        $('.common_select_box_2 .common_select_title').text('请选择城市')
        selectCity(valueid);
    });
    // 点击城市
    $("#select-number").on('click','li',function() {
        var valueid = $(this).attr('value');
        $('#cityx').val(valueid)
    });

    if ($("#provincex").val() != '' && $("#cityx").val() == '') {
        $(".common_select_box_1").find("span.common_select_title").text($("#provincex").val());
        province = $("#provincex").val();
    } else if ($("#provincex").val() != '' && $("#cityx").val() != '') {
        if ($("#cityx").val() != '请选择城市') {
            $(".common_select_box_1").find("span.common_select_title").text($("#provincex").val());
            $(".common_select_box_2").find("span.common_select_title").text($("#cityx").val());
            province = $("#provincex").val();
        } else {
            $(".common_select_box_1").find("span.common_select_title").text($("#provincex").val());
            $(".common_select_box_2").find("span.common_select_title").text($("#cityx").val());
        }
    }
    // 点击搜索店铺
    $(".search-shop").click(function() {
        // $("#store_form").submit();
        $.ajax({
            url: 'http://localhost/SportMall/src/cn/storelocator/shopaddress.json',
            type: 'get',
            success: function(data){
                // console.log(data)
                // var data = data && JSON.parse(data);
                productShopList(data);
            },
            error: function(){

            }
        })
    });
});
function shopListInit() {
    $.ajax({
        url: 'http://localhost/SportMall/src/cn/storelocator/shopaddress.json',
        type: 'get',
        success: function(data){
            // console.log(data)
            // var data = data && JSON.parse(data);
            productShopList(data);
        },
        error: function(){

        }
    })
}
// 创建地图
function createMap() {
    var getshopdata = getLS('shopdata')
    var content = '';
    content += '<div class="map-content"> ';
    content += '<div class="back-tit map-back-tit"><a href="javascript:history.go(-1);"><i></i>返回</a></div> ';
    content += '<div class="address-name"> ';
    content += '<h1>' + getshopdata.name + '</h1> ';
    content += '<p class="address-detail">' + getshopdata.detailsAddress + '</p> ';
    content += '<div id="content"  class="map-dic"  style="height: 400px; border: 1px solid #acacac; width: 100%;"></div> ';
    content += '<div id="content"  class="map-pro">';
    content += '<p class="title">去Under Armour零售店购物</p>';
    content += '<p>快来UnderArmour线下店铺体验最新款的专业运动装备吧！在这里你可以试穿各种运动衣、运动鞋和配件，亲切专业的品牌顾问熟悉最新的运动科技，能帮你找到度身打造的专属装备,';
    content += '适应在任何气候、任何环境下运动。Under Armour带给你专业的产品、创新的购物体验，助你达成你的运动目标。</p>';
    content += '</div> ';
    content += '</div> </div>';
    $('.content').append(content);
    // 初始化地图
    var map = new BMap.Map("content");
    var sourcePoint = new BMap.Point(getshopdata.longitude, getshopdata.latitude);
    map.centerAndZoom(sourcePoint, 15);
    map.addControl(new BMap.NavigationControl()); // 添加控件
    map.enableScrollWheelZoom(); // 启用鼠标缩放
    map.addControl(new BMap.MapTypeControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    /* 其它坐标系转换为百度地图的坐标系 */

    BMap.Convertor.translate(sourcePoint,1,function(point) {
        var marker = new BMap.Marker(sourcePoint);
        map.addOverlay(marker);
        // var icon = new BMap.Icon(staticbase + "/images/map/ua_icon.png",
        //     new BMap.Size(33, 45), {
        //         anchor: new BMap.Size(16, 45)
        //     }); // 自定义标注图标
        var label = new BMap.Label(getshopdata.name + "<br />" + getshopdata.detailsAddress, {
            offset: new BMap.Size(30, 13)
        }); // 店铺名称label
        marker.setLabel(label);
        // marker.setIcon(icon);
        map.setCenter(sourcePoint);
    });
}


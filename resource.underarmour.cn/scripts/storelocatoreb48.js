var province;
var city;
$(document).ready(
    function() {
        function pdpselect() {
            $(".common_select_box").children('ul').hide();
            $(".common_select_box").live("click", (function(event) {
                $(".select_scroll_1").mCustomScrollbar({
                    scrollButtons: {
                        enable: true
                    },
                    theme: "3d-thick"
                });
                $(this).children('ul').show();
            }));
            $(".common_select_box li").live("mouseover", (function(event) {
                $(this).addClass('current');
            }));
            $(".common_select_box li").live("mouseout", (function(event) {
                $(this).removeClass('current');
            }));
            $(".common_select_box li").live(
                "click",
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
            $(".common_select_box").live("mouseleave", (function(event) {
                $(this).children("ul").hide();
            }));
        }
        pdpselect();
        $(".province_x li").click(function() {
            province = $(this).html();
            json(province, 1);
        });

        if ($("#provincex").val() != '' && $("#cityx").val() == '') {
            $(".common_select_box_1").find("span.common_select_title").text($("#provincex").val());
            province = $("#provincex").val();
            json(province, 1);
        } else if ($("#provincex").val() != '' && $("#cityx").val() != '') {
            if ($("#cityx").val() != '请选择城市') {
                $(".common_select_box_1").find("span.common_select_title").text($("#provincex").val());
                $(".common_select_box_2").find("span.common_select_title").text($("#cityx").val());
                province = $("#provincex").val();
                json(province, 2);
            } else {
                $(".common_select_box_1").find("span.common_select_title").text($("#provincex").val());
                $(".common_select_box_2").find("span.common_select_title").text($("#cityx").val());
            }
        }
        $(".search-shop").click(function() {
            if (province == null || city == null) {
                $("#store_province").val($("#store_province").val());
                $("#store_city").val($("#store_city").val());
            } else if (province == city) {
                $("#store_province").val(province);
                $("#store_city").val("");
            } else {
                $("#store_province").val(province);
                $("#store_city").val(city);
            }
            $("#store_form").submit();
        });
    });

function json(province, type) {
    var prams = {
        province: province
    };
    var url = pagebase + '/shop/shopprovinceandcity.json';
    asyncXhr(url, prams, {
        type: "POST",
        dataType: "json",
        successHandler: function(data) {
            var html = "";
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    html += "<li  id='libnumer'  value='" + data[i].city + "'>" + data[i].city + "</li>";
                }
                $('#select-number').html(html);
                if (type == 1) {
                    $(".common_select_box_2").find("span.common_select_title").text("请选择城市");
                }
            }
        },
        errorHandler: function() {}
    });
}

function createMap(no) {
    $.ajax({
        type: "POST",
        url: pagebase + "/shop/showMapJson.json",
        data: {
            id: no
        },
        dataType: "json",
        success: function(sl) {
            var content = '';
            content += '<div class="map-content"> ';
            content += '<div class="back-tit map-back-tit"><a href="javascript:history.go(-1);"><i></i>返回</a></div> ';
            content += '<div class="address-name"> ';
            content += '<h1>' + sl.name + '</h1> ';
            content += '<p class="address-detail">' + sl.fullAddress + '</p> ';
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
            var sourcePoint = new BMap.Point(sl.pointX, sl.pointY);
            map.centerAndZoom(sourcePoint, 15);
            map.addControl(new BMap.NavigationControl()); // 添加控件
            map.enableScrollWheelZoom(); // 启用鼠标缩放
            map.addControl(new BMap.MapTypeControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            /* 其它坐标系转换为百度地图的坐标系 */
            BMap.Convertor.translate(sourcePoint, sl.pointType,
                function(point) {
                    var marker = new BMap.Marker(sourcePoint);
                    map.addOverlay(marker);
                    var icon = new BMap.Icon(staticbase + "/images/map/ua_icon.png",
                        new BMap.Size(33, 45), {
                            anchor: new BMap.Size(16, 45)
                        }); // 自定义标注图标
                    var label = new BMap.Label(sl.name + "<br />" + sl.ename, {
                        offset: new BMap.Size(30, 13)
                    }); // 店铺名称label
                    marker.setLabel(label);
                    marker.setIcon(icon);
                    map.setCenter(sourcePoint);
                });
        }
    });
}

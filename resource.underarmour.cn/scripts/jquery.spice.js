/**
 *
 * 共用代码，提供常用事件、方法等
 * 详细用法请参考：http://ued.baozun.cn/spice/expo/js/
 * @ author 梁宏
 * @ version 1.0
 *
 */

;(function($){

    var nav         = navigator
        , ua        = nav.userAgent
        , namespace = '.spice'
        , hasTouch  = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
        , rEmail    = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        , rMobile   = /^(1[3-9]{1}[0-9]{1})\d{8}$/;

    var _spice = function(){
        if ( !(this instanceof arguments.callee) ) return new _spice();
    }

    _spice.prototype = {
        //命名空间
        namespace           : namespace
        //是否支持touch事件
        , hasTouch          : hasTouch
        , nav               : nav
        , ua                : ua
        //IE内核
        , trident           : ua.indexOf('Trident') > -1
        //opera内核
        , presto            : ua.indexOf('Presto') > -1
        //苹果、谷歌内核
        , webKit            : ua.indexOf('AppleWebKit') > -1
        //火狐内核
        , gecko             : ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1
        //是否为移动终端
        , mobile            : !!ua.match(/AppleWebKit.*Mobile.*/)
        //ios终端
        , ios               : !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        //android终端或者uc浏览器
        , android           : ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1
        //是否为iPhone或者QQHD浏览器
        , iPhone            : ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1
        //是否iPad
        , iPad              : ua.indexOf('iPad') > -1
        //是否web应该程序，没有头部与底部
        , webApp            : ua.indexOf('Safari') == -1 
        //检测该环境是否支持touch事件
        , hasTouch          : hasTouch
        //常用事件
        , mouseenter        : hasTouch ? 'touchend' + namespace + ' touchcancel' + namespace    : 'mouseenter' + namespace
        , mouseleave        : hasTouch ? 'touchend' + namespace + ' touchcancel' + namespace    : 'mouseleave' + namespace
        , mousedown         : hasTouch ? 'touchstart' + namespace   : 'mousedown' + namespace
        , mouseup           : hasTouch ? 'touchend' + namespace  + ' touchcancel' + namespace   : 'mouseup' + namespace
        , mousemove         : hasTouch ? 'touchmove' + namespace    : 'mousemove' + namespace
        , click             : hasTouch ? 'touchend' + namespace  + ' touchcancel' + namespace   : 'click' + namespace
        , tap               : 'tap' + namespace
    }

    var spice = $.spice = _spice();

    var fn = {
        /**
         * 返回body下最大的zIndex值
         *
         * @return {Number} 要计算的字符串
         */
        getMaxZIndex: function(){
            return Math.max.apply(null, $(document.body).children().map(function(){ return $(this).css('zIndex')>>>0; }).get());
        }
        /**
         * 获取不同设备下的 event
         *
         * @param {event} event对象
         *
         * @return {boolean} 返回 true 或者 false
         */
        , getEvent: function(e){
            return spice.hasTouch ? e.originalEvent.changedTouches : e;
        }
        /**
         * 获取当前 event 第一个 x, y
         *
         * @param {event} event对象
         *
         * @return {objece} 返回 第一个位置的横坐标和纵坐标
         */
        , getEventXY: function(e){
            var ev = this.getEvent(e);
            return {
                x: ev.clientX ? ev.clientX : ev[0].pageX
                , y: ev.clientY ? ev.clientY : ev[0].pageY
            };
        }
        /** 
         * 返回字符串的字符长度，一个中文占两个字符长度
         *
         * @param str {String} 要计算的字符串

         * @return {Number} 字符串的长度
         */
        , getStringLength: function(str){
            var num = 0, i = 0, len = str.length, unicode;
            for(; i < len; i++){
                unicode = str.charCodeAt(i);
                num += unicode > 127 ? 2 : 1;
            }
            return num;
        }
        /** 
         * 本函数将字符串 str 的第 start 位起的字符串取出 strlen 个字符。
         * 若 start 为负数，则从字符串尾端算起。
         * 若可省略的参数 strlen 存在，但为负数，则表示取到倒数第 strlen 个字符。
         * 
         * @param str {String} 要截取的字符串
         * @param start {Number} 开始点
         * @param strlen {Number} 截取长度
         * 
         * @return {String} 截取后的字符串
         */
        , subString: function(str, start, strlen){
            var i = 0, num = 0, unicode, rstr = '',
                len = str.length, sblen = fn.getStringLength(str);

            if (start < 0) {
                start = sblen + start;
            }

            if (strlen < 0 || $.type(strlen) != 'number') {
                strlen = ~~strlen + sblen;
            }
            else{
                strlen += start;
            }

            // 起点
            for(; i < len; i++) {
                if (num >= start) {
                    break;
                }
                var unicode = str.charCodeAt(i);
                num += unicode > 127 ? 2 : 1;
            }

            // 开始取
            for(; i < len; i++) {
                var unicode = str.charCodeAt(i);
                num += unicode > 127 ? 2 : 1;

                if (num > strlen) {
                    break;
                }

                rstr += str.charAt(i);
            }

            return rstr;
        }
        /**
         *  得到url所传参数的值
         *  @ key     变量名
         *  @ frame   获取某帧，默认是 window
         */
        , getURLParameter: function(key, frame){
            var param = (frame || window).location.search,reg = new RegExp('[&\?]+'+key+'=([^&]*)'),str = '';
              if(reg.test(param))str = RegExp.$1;
              return str;
        }
        /**
         *  元素的可视区域
         *  @ elem          元素选择器
         *  @ callback      元素在可视区域的回调函数
         */
        , visualArea: function(elem, options){
            if(!elem || !$.spice.isString(elem) || $(elem).length == 0) return false;
            var opt = {
                callBack: null
                , num: 0
            }
            opt = $.extend({}, opt, options);
            $(window).on('scroll.spice.visualArea', function(){
                var $W = $(this);
                if ($W.scrollTop() + $W.height() > $(elem).offset().top - opt.num) {
                    opt.callBack && $.isFunction(opt.callBack) && opt.callBack($(elem));
                }
            }).trigger('scroll.spice.visualArea');
        }
        /**
         *  获取Cookie的值
         *  @ cookieName     cookie变量名
         */
        , getCookie: function(cookieName){
            var getC = document.cookie,reg = new RegExp(cookieName+'=([^;]*)');
            var val = '';
            if(reg.test(getC)){
                val = RegExp.$1;
            }
            return val;
        }
        /**
         *  计算毫秒，返回毫秒数
         *  @ temer     要计算的字符串
         */
        , getDates:function(temer){
            var timeSize = ['s','m','h','D','W','M','Y'];
            var tl = temer.length;
            var str = {};
            var s = 24*60*60;
            var sum = 0;
            var arra = temer.match(/\d+\w/g);
            if(arra == null)return false;
            for(var i=0,l=arra.length;i<l;i++)
            {
                new RegExp('^(\\d+)([a-z]+)$','i').test(arra[i]);
                str[RegExp.$2]=RegExp.$1;
            }
            if(str.s)sum = +str.s;
            if(str.m)sum += +str.m*60;
            if(str.h)sum += +str.h*60*60;
            if(str.D)sum += +str.D*s;
            if(str.W)sum += +str.W*s*7;
            if(str.M)sum += +str.M*s*30;
            if(str.Y)sum += +str.Y*s*365;
            return sum*1000;
        }
        /**
         *  设置Cookie的方法
         *  @ cookieName    Cookie的名字
         *  @ cookieInfo    参数是Cookie内容和要设置的时间
         */
        , setCookie:function(cookieName,cookieInfo){
            var str = [];
            //判断参数类型
            if(typeof cookieInfo == 'string'){
                str = cookieInfo;
            }else{
                if(typeof cookieInfo.values == 'object'){
                    for(var o in cookieInfo.values){
                        str.push(o+'='+cookieInfo.values[o]+'&');
                    }
                    str = str.join('').slice(0,-1);              
                }else{
                    str = cookieInfo.values;
                }
            }
            //判断时间的存在
            var cookieStr = cookieName + '=' + str;
            if(cookieInfo.expires){
                cookieStr += ';expires=' + new Date(new Date().getTime()+fn.getDates(cookieInfo.expires)).toGMTString();
            }
            if(cookieInfo.path){
                cookieStr += ';path=' + cookieInfo.path;
            }
            if(cookieInfo.domain){
                cookieStr += ';domain=' + cookieInfo.domain;
            }
            if(cookieInfo.secure === true){
                cookieStr += ';secure';
            }
            document.cookie = cookieStr;
        }
        /**
         *  删除Cookie的方法
         *  @ cookieName    Cookie的名字
         */
        , delCookie:function(cookieName){
            var getC = document.cookie,reg = new RegExp(cookieName+'=[^;]?');
            if(reg.test(getC))document.cookie = cookieName + '=;expires='+new Date(-1).toGMTString();
        }
        , getTimeUrl: function(url){
            var iTime = (new Date()).getTime();
            if(url.indexOf('spiceflag=') >=0){
                url = url.replace(/spiceflag=\d{13}/,'spiceflag=' + iTime.toString());
                return url;
            }
            url += (/\?/.test(url))?'&':'?';
            return (url + 'spiceflag=' + iTime.toString());
        }
        /*used in building ajax data object from one form*/
        , _ajaxSetValue : function(obj, name, value){
            if(value === null) return;
            var val = obj[name];
            if($.spice.isString(val)){
                obj[name] = [val, value];
            }else if($.isArray(val)){
                obj[name].push(value);
            }else{
                obj[name] = value;
            }
        }
        /*used in building ajax data object from one form*/
        , _ajaxFieldValue : function(domNode){
            var ret = null
                , type = (domNode.type||'').toLowerCase();
            if(domNode.name && type && !domNode.disabled){
                if(type === 'radio' || type === 'checkbox'){
                    if(domNode.checked){ ret = domNode.value }
                }else if(domNode.multiple){
                    ret = [];
                    $('option',domNode).each(function(){
                        if(this.selected){
                            ret.push(this.value);
                        }
                    });
                }else{
                    ret = domNode.value;
                }
            }
            return ret;
        }
        /*used in building ajax data object from one form*/
        , _ajaxFormToObj : function (form){
            if(!form) return {};
            form = $.spice.isString(form) ? $('#' + form).get(0) : form;
            var ret = {}, exclude = 'file|submit|image|reset|button|';
            $.each(form.elements,function(i,e){
                var name = e.name,
                type = (e.type||'').toLowerCase();
                if(name && type && exclude.indexOf(type) === -1 && !e.disabled){
                    fn._ajaxSetValue(ret, name, fn._ajaxFieldValue(e));
                }
            });
            return ret;
        }
        , _ajaxOptions : function(url, data, args){
            var options = {};
            url = fn.getTimeUrl(url);
            if(arguments.length === 1){
                options = url;
            }else{
                options = args || {};
                options['url'] = url;
                if(data){
                    if($.spice.isString(data)){
                        //data is a form id
                        $.extend(options, {data: fn._ajaxFormToObj(data)});
                    }else{
                        $.extend(options,{data: data});
                    }
                }
            }
            //console.dir(options);
            return options;
        }
        /**
         *  异步请求
         *  @ url ajax call url
         *  @ data data object or form id
         *  @ args other options
         */
        , asyncXhr: function(url, data, args){
            $.ajax(fn._ajaxOptions(url, data, args));
        }
        /*ajax call with GET type*/
        , asyncXhrGet : function(url, data, args){
            var options = fn._ajaxOptions(url, data, args);
            options['type'] = 'GET';
            $.ajax(options);
        }
        /*ajax call with POST type*/
        , asyncXhrPost : function(url, data, args){
            var options = fn._ajaxOptions(url, data, args);
            options['type'] = 'POST';
            $.ajax(options);
        }
        /**
         *  同步请求
         */
        , syncXhr : function(url, data, args){
            var _data, options = fn._ajaxOptions(url, data, args);
            $.extend(options,{
                async : false,
                success : function(data, textStatus){
                    _data = data;
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                    _data = {};
                    var exception = {};
                    exception['message'] = 'Error occurs when fetching data from url:' + this.url;
                    exception['cause'] = textStatus ? textStatus : errorThrown;
                    _data['exception'] = exception;
                }
            });
            $.ajax(options);
            return _data;
        }
        /*ajax sync call with GET type*/
        , syncXhrGet : function(url, data, args){
            if(arguments.length === 1){
                url['type'] = 'GET';
            }else{
                args = $.extend({},args,{type:'GET'});
            }
            return fn.syncXhr(url, data, args);
        }
        /*ajax sync call with POST type*/
        , syncXhrPost : function(url, data, args){
            if(arguments.length === 1){
                url['type'] = 'POST';
            }else{
                args = $.extend({},args,{type:'POST'});
            }
            return fn.syncXhr(url, data, args);
        }
    };
    
    /**
     * 弹出层
     */
    fn.dialog = function(options){

        if ( !(this instanceof arguments.callee) ) return new fn.dialog(options);

        var self    = this;
        var opt     = self.opt = $.extend({}, self.defaultOptions,options);
        
        self.init();
    }

    fn.dialog.prototype = {
        getTemplate: function(){
            var self = this
                , btn = self.opt.button
                , type = self.opt.type
                , title = self.opt.title
                , content = self.opt.content;
            return '<div class="dialog">\
                        <div class="dialog-container text-center">'
                            +(title ? ('<h4>' + title + '</h4>') : '')
                            +(content ? ('<p>' + content + '</p>') : '')
                            +'<div class="dialog-btn-wrap">\
                                <a class="btn btn-success">' + (btn[0] || '确认') + '</a>'
                                    +
                                        (type == 'confirm' ? '<a class="btn btn-cancel">' + (btn[1] || '取消') + '</a>' : '')
                                    +
                            '</div>\
                        </div>\
                        <a class="icon icon-close dialog-close">&times;</a>\
                    </div>';
        }
        , defaultOptions: {
            template             : ''
            , type               : 'info'
            , dialogClass        : 'spice-dialog'
            , fixed              : false
            , title              : ''
            , content            : ''
            , button             : ['确认', '取消']
            , btnSuccessClass    : '.btn-success'
            , btnCancelClass     : '.btn-cancel'
            , btnCloseClass      : '.dialog-close'
        }
        , _trigger : function(type, o) {
            this.elem.triggerHandler(type, o);
        }
        , init: function(options){
            var self = this, opt = self.opt = $.extend({}, self.opt, options);
            //删除之前的结构
            self.destroy();

            self.elem = self.createElem( opt.template );

            $.each(['submit', 'initEvent'],function(i,type) {
                $.isFunction(opt[type]) && self.elem.on(type, opt[type])
            });

            self._trigger('initEvent', [$(self.elem)]);

            self.btnSuccess = $((opt.btnSuccessClass || '.btn-success'), self.elem);
            self.btnCancel = $((opt.btnCancelClass || '.btn-cancel'), self.elem);
            self.btnClose = $((opt.btnCloseClass || '.dialog-close'), self.elem);
            self.elemMask = fn.mask();

            //触发事件
            self.activate();
            return self;
        }
        , activate: function(){
            var self = this;
            self.btnSuccess.on('tap', function(){
                if(!$.isFunction(self.opt.submit)){
                    self.hide();
                    return false;
                }
                self._trigger('submit');
            });
            self.btnCancel.add(self.btnClose).add(self.elemMask.elem).on('tap', function(){
                self.hide();
            });
        }
        , refreshPosition: function( spiceDialog ){
            spiceDialog.removeAttr('style').hide();
            var dW = spiceDialog.outerWidth(true)
                , dH = spiceDialog.outerHeight(true)
                , cssStyle = {
                    marginTop: -dH/2
                    , marginLeft: -dW/2
                    , left: '50%'
                    , top: '50%'
                    , position: 'fixed'
                };
            
            if(!this.opt.fixed){
                var wSt = $(window).scrollTop()
                    , wH = $(window).height();
                cssStyle.position = 'absolute';
                cssStyle.marginTop = '';
                cssStyle.top = wSt + (wH - dH)/2;
            }
            spiceDialog.css( cssStyle );
        }
        , createElem: function( elem ){
            var self = this, opt = self.opt;
            var spiceDialog = $(elem || self.getTemplate()).addClass(opt.dialogClass).hide().appendTo('body');
            self.refreshPosition(spiceDialog);
            //fn.mask();
            spiceDialog.css('zIndex', spice.getMaxZIndex() + 2);

            return spiceDialog;
        }
        , refreshZIndex: function(){
            this.elem.css('zIndex', spice.getMaxZIndex() + 1);
            return this;
        }
        , show: function( callback ){
            this.refreshPosition( this.elem );
            this.elem.fadeTo(0, 1, callback);
            //fn.mask().show();
            this.elemMask.show();
            this.elem.css('zIndex', spice.getMaxZIndex() + 2);
            return this;
        }
        , hide: function( callback ){
            this.elem.fadeOut(0, callback);
            //fn.mask().hide();
            this.elemMask.hide();
            return this;
        }
        , destroy: function(){
            this.elem && this.elem.remove();
            //fn.mask().remove();
            this.elemMask && this.elemMask.remove();
            return this;
        }
    }

    /**
     * 遮罩层
     */
    fn.mask = function(options){
        if ( !(this instanceof arguments.callee) ) return new fn.mask(options);
        var self  = this;
        self.opt = $.extend({}, self.defaultOptions, options);
        self.elem = self.createElem();
    }
    fn.mask.prototype = {
        defaultOptions: {
            style: {
                position            : 'fixed'
                , width             : '100%'
                , height            : '100%'
                , top               : 0
                , left              : 0
                , display           : 'none'
                , backgroundColor   : '#000000'
                , zIndex            : 100
                , opacity            : 0
            }
        }
        , createElem: function(){
            var blackOpacity = $('.spice-black-opacity');
            //if(blackOpacity.length == 0){
                return $('<div>', { 'class' : 'spice-black-opacity' })
                    .css(this.opt.style)
                    .css('zIndex', spice.getMaxZIndex() + 2)
                    .appendTo('body');
            /*}else{
                return blackOpacity;
            }*/
        }
        , show: function( callback ){
            this.elem.fadeTo(500, 0.5, callback);
            return this;
        }
        , hide: function( callback ){
            this.elem.fadeOut(500, callback);
            return this;
        }
        , setZIndex: function( zIndex ){
            this.elem.css('zIndex', zIndex);
            return this;
        }
        , refreshZIndex: function(){
            this.elem.css('zIndex', spice.getMaxZIndex() - 1);
            return this;
        }
        , remove: function(){
            this.elem.remove();
            return this;
        }
    }
    
    $.extend($.spice, fn);

    /**
     * 常用方法
     */
    $.extend($.spice, {
        isUndefined: function(o){
            return o === undefined;
        }
        , isNull: function(o){
            return o === null;
        }
        , isBoolean: function(o){
            return toString.call(o) === '[object Boolean]';
        }
        , isString: function(o){
            return toString.call(o) === '[object String]';
        }
        , checkEmail: function(o, reg){
            try{
                return (reg || rEmail).test(o);
            }catch(e){
                return false;
            }
        }
        , checkMobile: function(o, reg){
            try{
                return (reg || rMobile).test(o);
            }catch(e){
                return false;
            }
        }
    });


    /** 
     * 常用touch事件封装，处理pc和mobile设备的事件兼容
     */
    $.each( 'tap'.split( ' ' ), function( i, name ) {

        $.fn[ name ] = function( fn ) {
            return fn ? this.on( name, fn ) : this.trigger( name );
        };

        // jQuery < 1.8
        if ( $.attrFn ) {
            $.attrFn[ name ] = true;
        }
    });

    function triggerCustomEvent( obj, eventType, event, bubble ) {
        var originalType = event.type;
        event.type = eventType;
        if ( bubble ) {
            $.event.trigger( event, undefined, obj );
        } else {
            $.event.dispatch.call( obj, event );
        }
        event.type = originalType;
    }
    //tap事件，处理 pc 的 `click` 和 mobile 的 `touch`
    $.event.special.tap = {
        setup: function(data, namespaces, eventHandle){
            function init(){
                return {
                    sx: 0
                    , sy: 0
                    , ex: 0
                    , ey: 0
                }
            }
            var i = init();
            var self = $(this);
            if($.spice.hasTouch){
                self
                    .on($.spice.mousedown, function(e){
                        var o = $.spice.getEventXY(e);
                        i.sx = o.x;
                        i.sy = o.y;
                    })
                    .on($.spice.click, function(e){
                        var o = $.spice.getEventXY(e);
                        i.ex = o.x;
                        i.ey = o.y;
                        if(i.sx == i.ex && i.sy == i.ey){
                           triggerCustomEvent( self[0], 'tap', e );
                           i = init();
                        }
                    });
            }else{
                self.on($.spice.click, function(e){
                    triggerCustomEvent( self[0], 'tap', e );
                });
            }
        }
        , teardown: function(namespaces){
            $( this ).off( $.spice.click ).off( $.spice.mousedown );
        }
    }

    
    //扩展方法
    $.extend($.spice, {
        /**
         * 提示弹出层，弹出来之后，1500毫秒后弹出层消失
         */
        tips: function(options){

            function getTemplate(title, content){
                return '<div class="dialog">\
                            <div class="dialog-container text-center">'
                            + (title ? '<h4>' + title + '</h4>' : '')
                            + (content ? '<p>' + content + '</p>' : '') +
                            '</div>\
                            <a class="icon icon-close dialog-close">&times;</a>\
                        </div>';
            }

            var opt = $.extend({}, {
                    dialogClass: 'dialog-tips'
                    , title: ''
                    , content: ''
                    , time: 1500
                    , template: ''
                }, options)
                , tips = $.spice.dialog({
                    dialogClass: opt.dialogClass
                    , fixed: true
                    , template: opt.template || getTemplate(opt.title, opt.content)
                });
            tips.show(function(){
                setTimeout(function(){
                    tips.destroy();
                }, opt.time);
            });
        }
    });

})(jQuery);

(function() {
    var method;
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = $.noop;
        }
    }
}());
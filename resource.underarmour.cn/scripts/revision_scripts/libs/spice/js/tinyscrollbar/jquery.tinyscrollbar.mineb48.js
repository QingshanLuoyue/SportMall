/**
 *
 * 滚动条
 * 详细用法请参考：http://v3.spice.lh/javascript/tinyscrollbar
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 */
!function(a){"use strict";function b(b,e){function f(){return o.update(),h(),o}function g(a){t.css(y,a||o.thumbPosition),q.css(y,a||-o.contentPosition),r.css(x,a||o.trackSize),s.css(x,a||o.trackSize),t.css(x,a||o.thumbSize)}function h(){u?p[0].ontouchstart=function(a){1===a.touches.length&&(a.stopPropagation(),k(a.touches[0]))}:(t.bind("mousedown",function(a){a.stopPropagation(),k(a)}),s.bind("mousedown",function(a){k(a,!0)})),a(window).bind("resize."+c,function(){o.update("relative")}),o.options.wheel&&window.addEventListener?b[0].addEventListener(v,l,!1):o.options.wheel&&(b[0].onmousewheel=l)}function i(){return o.contentPosition>0}function j(){return o.contentPosition<=o.contentSize-o.viewportSize-5}function k(b,c){o.hasContentToSroll&&(a("body").addClass("noSelect"),z=c?t.offset()[y]:w?b.pageX:b.pageY,u?(document.ontouchmove=function(a){(o.options.touchLock||i()&&j())&&a.preventDefault(),m(a.touches[0])},document.ontouchend=n):(a(document).bind("mousemove",m),a(document).bind("mouseup",n),t.bind("mouseup",n),s.bind("mouseup",n)),m(b))}function l(c){if(o.hasContentToSroll){var d=c||window.event,e=-(d.deltaY||d.detail||-1/3*d.wheelDelta)/40,f=1===d.deltaMode?o.options.wheelSpeed:1;o.contentPosition-=e*f*o.options.wheelSpeed,o.contentPosition=Math.min(o.contentSize-o.viewportSize,Math.max(0,o.contentPosition)),o.thumbPosition=o.contentPosition/o.trackRatio,b.trigger("move"),t.css(y,o.thumbPosition),q.css(y,-o.contentPosition),(o.options.wheelLock||i()&&j())&&(d=a.event.fix(d),d.preventDefault()),o.options.callBack&&a.isFunction(o.options.callBack)&&o.options.callBack(o)}}function m(c){if(o.hasContentToSroll){var d=w?c.pageX:c.pageY,e=u?z-d:d-z,f=Math.min(o.trackSize-o.thumbSize,Math.max(0,o.thumbPosition+e));o.contentPosition=f*o.trackRatio,b.trigger("move"),t.css(y,f),q.css(y,-o.contentPosition),o.options.callBack&&a.isFunction(o.options.callBack)&&o.options.callBack(o)}}function n(){o.thumbPosition=parseInt(t.css(y),10)||0,a("body").removeClass("noSelect"),a(document).unbind("mousemove",m),a(document).unbind("mouseup",n),t.unbind("mouseup",n),s.unbind("mouseup",n),document.ontouchmove=document.ontouchend=null}this.options=a.extend({},d,e),this._defaults=d,this._name=c;var o=this,p=b.find(".viewport"),q=b.find(".overview"),r=b.find(".scrollbar"),s=r.find(".track"),t=r.find(".thumb"),u=a.spice.hasTouch,v="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",w="x"===this.options.axis,x=w?"width":"height",y=w?"marginLeft":"marginTop",z=0;return this.contentPosition=0,this.viewportSize=0,this.contentSize=0,this.contentRatio=0,this.trackSize=0,this.trackRatio=0,this.thumbSize=0,this.thumbPosition=0,this.hasContentToSroll=!1,this.update=function(a){var b=x.charAt(0).toUpperCase()+x.slice(1).toLowerCase();switch(this.viewportSize=p[0]["offset"+b],this.contentSize=q[0]["scroll"+b],this.contentRatio=this.viewportSize/this.contentSize,this.trackSize=this.options.trackSize||this.viewportSize,this.thumbSize=Math.min(this.trackSize,Math.max(this.options.thumbSizeMin,this.options.thumbSize||this.trackSize*this.contentRatio)),this.trackRatio=(this.contentSize-this.viewportSize)/(this.trackSize-this.thumbSize),this.hasContentToSroll=this.contentRatio<1,r.toggleClass("disable",!this.hasContentToSroll),a){case"bottom":this.contentPosition=Math.max(this.contentSize-this.viewportSize,0);break;case"relative":this.contentPosition=Math.min(Math.max(this.contentSize-this.viewportSize,0),Math.max(0,this.contentPosition));break;default:this.contentPosition=parseInt(a,10)||0}return this.thumbPosition=this.contentPosition/this.trackRatio,g(),o},this.remove=function(){g("0"),u?p[0].ontouchstart=null:(t.unbind("mousedown"),s.unbind("mousedown")),a(window).unbind("resize."+c),o.options.wheel&&window.addEventListener?b[0].removeEventListener(v,l,!1):o.options.wheel&&(b[0].onmousewheel=null)},f()}var c="tinyscrollbar",d={axis:"y",wheel:!0,wheelSpeed:40,wheelLock:!0,touchLock:!0,trackSize:!1,thumbSize:!1,thumbSizeMin:20,callBack:null};a.spice[c]=function(d,e){return!d||a.isPlainObject(d)?!1:a(d).each(function(d,f){a(f).removeData("spice."+c),a.data(this,"spice."+c,new b(a(this),e))})}}(jQuery);
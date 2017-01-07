/**
 *
 * 数量加减
 * 详细用法请参考：http://v3.spice.lh/javascript/calculateNum
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 1.0
 *
 */
!function(a,b,c){"object"==typeof module&&"object"==typeof module.exports?module.exports=b(a):a.spice[c]=b(a)}(jQuery,function(a){function b(b,c){if(!b||a.isPlainObject(b))return!1;var d=[];return a(b).each(function(b,f){var g=a(f),h=g.data("spice.calculateNum");h||g.data("spice.calculateNum",h=new e(g,c)),d.push(h)}),d}var c={btnMinus:".btn-minus",btnPlus:".btn-plus",textInput:".form-input",max:10,min:0,callBack:null},d={initMaxNum:function(a){var b=a.elem.attr("data-stock"),c=a.opt.max;b&&c>=b?a.opt._max=b:a.opt._max=c}},e=function(b,d){var e=this;e.opt=a.extend({},c,d),e.elem=b,e.init()};return e.prototype={init:function(){var b=this,c=b.opt,e=b.elem,f=c.plus=a(c.btnPlus,e),g=c.minus=a(c.btnMinus,e),h=c.textInput=a(c.textInput,e);b.destroy(),f.on(a.spice.click,function(){d.initMaxNum(b),b.plus()}),g.on(a.spice.click,function(){d.initMaxNum(b),b.minus()}),f.add(g).on("mousedown",function(){a("body").addClass("noSelect")}).on("mouseup",function(){a("body").removeClass("noSelect")}),h.on("keyup",function(){d.initMaxNum(b);var e=h.val();""!=e&&(e=Number(e),e=0===e?c.min:e&&e<=c._max&&e>=c.min?e:c._max,h.val(e),c.callBack&&a.isFunction(c.callBack)&&c.callBack(b,e))}).on("blur",function(){d.initMaxNum(b),h.val()||(h.val(c.min),c.callBack&&a.isFunction(c.callBack)&&c.callBack(b,c.min))})},plus:function(){var b=this.opt.textInput,c=+b.val(),d=this.opt._max;c+=1,c=d>=c?c:d,b.val(c),this.opt.callBack&&a.isFunction(this.opt.callBack)&&this.opt.callBack(this,c)},minus:function(){var b=this.opt.textInput,c=+b.val();c-=1,c=c>=this.opt.min?c:this.opt.min,b.val(c),this.opt.callBack&&a.isFunction(this.opt.callBack)&&this.opt.callBack(this,c)},destroy:function(){this.opt.plus.add(this.opt.minus).off(a.spice.click),this.opt.textInput.off("keyup keypress blur")}},b},"calculateNum");
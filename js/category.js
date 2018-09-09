$(function(){
    init();

    function init(){
        setHtmlFont();
    }


     // 动态设置html标签的字体大小
  function setHtmlFont() {
    /* 
1 基础值 100px
2 设计稿的宽度 375px
3 要适配的屏幕的宽度 = 当前屏幕的宽度
4 动态去设置 html标签的fontsize 
5 公式 ：
    基础值 / 设计稿的宽度 = fz / 当前屏幕的宽度 
    fz=   基础值 / 设计稿的宽度 * 当前屏幕的宽度 ;
 */
    // 基础值
    var baseVal =100
    // 设计稿的宽度
    var pageWidth = 375;
    // 当前屏幕的宽度
    var screenWidth = window.screen.width;
    // 要设置的fontsize
    var fz = baseVal / pageWidth * screenWidth;
    // 设置到html标签里面
    $("html").css("fontSize", fz);
  }
})
$(function(){
    
    // 全局变量
    var CateDatas;
    // 左侧的滚动条对象
    var LeftScorll;
    init();
    function init(){
        setHtmlFont();
        getCategories();
        eventList();
        loadData();
    }
    // 使用这个方法，可以使rem字体适配屏幕变化而变化
    window.onresize = function () {
        // console.log(2415)
        setHtmlFont();
    }



 
// 绑定一坨事件
function eventList(){
    $(".pyg_menu").on("tap","li",function(){
  
        $(this).addClass("active").siblings().removeClass("active");
        // 获取每次点击的索引
        var index=$(this).index();
        renderRight(index);
        // 往上滚动 点击哪个li 哪个Li 就跳到第一个位置
        LeftScorll.scrollToElement(this);
        
    })
}


// 实现本地存储
/*1 本地存储思想
1 先优化或者重构一下代码 
  1 把渲染标签的代码 提取出来 
    renderLeft()
    renderRight()
2 添加本地存储的功能
  1 先判断本地存储有没有旧的数据
    有 直接使用旧
    没有 再发送请求去获取新的数据 
  2 自己控制一个过期时间
  */

//  没有过期 正常加载旧数据
// 过期了  重新发送请求 获取新的数据
// 要么从本地中获取数据，要么就发送请求拿数据
function loadData(){
    // 1获取旧的永久存储中的数据
    // localStorage： 永久存储  getItem ：获取
    var localStr=localStorage.getItem("cates")  //获取永久存储的数据   cates 为数据名称  
    // 2判断是否存在
    if(!localStr){
    // 3发送请求获取新的数据
    getCategories();
    }else{
    // 3获取本地存储中的数据对象 如{time:12222 ,datas:[...]}
    // 获取的时候 先解析成原来的样子 再去使用      JSON.parse(数据名称) 把json字符串解析成对象
    var localData=JSON.parse(localStr);
    // 4 判断是否到了过期时间  可以自己定义时间 1000为1毫秒  10000000毫秒(ms)=2.7777778时(h)
    if(Date.now()-localData.time>100000){
        // 5.过期了 需要重新获取新数据
        getCategories();
        
    }else{
        CateDatas=localData.datas;
        renderLeft();
        // 默认渲染索引为0 数据
        renderLeft(0);

    }

    }
 
}


// 发送请求获取数据
function getCategories(){
    $.get("http://api.pyg.ak48.xyz/api/public/v1/categories",function(ret){
        // 判断状态
        // console.log(35)
        if(ret.meta.status==200){
          
            // 给全局变量赋值
            CateDatas=ret.data;
            // 把数据存入到本地存储

            var obj={
                time:Date.now(),
                datas:CateDatas
            }
            // 存之前 先转成 json字符串 JSON.stringify(obj或者arr)
            // JSON.stringify   ：先转成 json字符串
            localStorage.setItem("cates",JSON.stringify(obj));

            renderLeft();
            // 默认渲染索引为0数据
            renderRight(0);

        }
    })
}


// 渲染左侧的菜单
function renderLeft(){

    var html=template("leftTpl",{arr:CateDatas});
    $(".pyg_menu").html(html);
    // 初始化左侧的滚动条
    LeftScorll = new IScroll('.left_box');

}


// 渲染右侧的内容
function renderRight(index){
    var cates0=CateDatas[index].children;
    var html2=template("rightTpl",{arr:cates0});
    // 先隐藏 马上添加淡入效果
    $(".right_box").html(html2).hide().fadeIn();

    /*初始化的滚动条 存在BUG
     一定要等到图片最后一张加载完成后，再去初始化
    */
//    获取到图片的个数
    var nums=$(".right_box img").length;
    // 图片内容加载完毕事件
    $(".right_box img").on("load",function(){
        nums--;
        if(nums==0){
            new IScroll(".right_box");
        }
    })

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
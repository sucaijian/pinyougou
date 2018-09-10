$(function(){
  var times=0;
    // zepto
// 设置拦截器
 // 只要发送了ajax请求 就会被调用 -发送前被调用 
// beforeSend会在发送请求之前被调用
  $.ajaxSettings.beforeSend = function () {
  // 添加正在等待图标
  $("body").addClass("loadding");
  times++;   //times++ 意思为发送的请求次数
  }
// complete 会在请求结束后被调用
 // 要求同时发送出去的请求 要求都结束 了再去隐藏正在等待类
  $.ajaxSettings.complete = function () {

    times--;  //times--数据回来后，再减减
    if(times==0){
      // 移除正在等待图标
      $("body").removeClass("loadding");
    }
  }
})
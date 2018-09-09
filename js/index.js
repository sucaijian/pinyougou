$(function () {
    init();
    function init() {
        gitSwiperdate();
        getCatitems();
        getGoodslist();
    }
    // 轮播图初始化
    function gitSwiperdate() {

        // 发送请求动态生成
        $.get("http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata", function (ret) {
            if (ret.meta.status = 200) {
                // console.log(ret)
                var html = template("sliderTpl", {
                    arr: ret.data
                });
                $(".pyg_view .mui-slider").html(html);

                // 初始化轮播图
                //获得slider插件对象  
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });



            }

        })

    }

    // 导航栏 (发送get请求动态生成)
    function getCatitems() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/home/catitems", function (ret) {
            if (ret.meta.status == 200) {
                var html = template("navTpl", {
                    arr: ret.data
                });
                $(".pyg_nav").html(html);
            } else {
                console.log(ret);
            }
        })
    }

    // 发送GET请求获取商品列表
    function getGoodslist() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/home/goodslist", function (ret) {
            if (ret.meta.status == 200) {
                // 开始渲染
                var html = template("goodsTpl", {
                    arr: ret.data
                });
                $(".pyg_list").html(html);
            } else {
                console.log(ret);
            }
        })
    }
})
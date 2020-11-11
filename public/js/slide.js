
// function slide (option) {
//       let main = null,
//         init = null,
//         start = null,
//         stop = null,
//         prev = null,
//         next = null,
//         timer = null,
//         elems = {},
//         defaults = {
//             speed:500,
//             dalay:3000
//         };
//         $.extend(defaults,options);
//         init=function(){
//             console.log(this);
//         }.bind(this)
//         main=function(){
//             init()
//         }
//         main()
// }

// slide()
(function($) {
    $.fn.extend({
        slider: function(options) {
            // 轮播功能复杂 函数式编程范式

            let main = null, // 主函数
                init = null, // 初始化函数
                start = null, // 开始动画
                stop = null, // 停止动画
                prev = null, // 切换上一张
                next = null, // 切换下一张
                timer = null, // 计时器
                elms = {}, // 命名空间
                defaults = {
                    speed: 500, // 动画时间
                    delay: 3000 // 停留时间
                }; // 默认参数

            $.extend(defaults, options); // 合并参数

            init = function() {
                // 元素选取
                elms.sliderDiv = this.children('.slide li'); // 需要移动的DIV元素
                elms.btns = this.children('.slide span'); // 左右按钮

                // 复制一张图片1
                elms.sliderDiv.append(elms.sliderDiv.children('.slide li img').first().clone());
                // 获取元素宽度
                elms.imgWidth = elms.sliderDiv.children('.slide li').first().width();

                // 预设索引值 当前播放的图片索引
                elms.index = 1;


                // 添加事件
                this.hover(function() {
                    stop();
                }, function() {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                });

                elms.btns.on('click', function() {
                    if (elms.btns.index(this)) {
                        next();
                    } else {
                        prev();
                    }
                });

            }.bind(this);


            start = function(direction) {
                let left = `-=${elms.imgWidth}`; // 默认移动的距离

                if (!direction) { // 上一张的方向
                    left = `+=${elms.imgWidth}`; // 修改方向
                    if (elms.index === 1) {
                        elms.index = 4; //第一张图 拉到第四张进行动画
                        let divLeft = this.offset().left,
                            imgLeft = elms.sliderDiv.children('img').last().offset().left;
                        elms.sliderDiv.css('left', `-${imgLeft-divLeft}px`);
                    }
                }

                elms.sliderDiv.animate({
                    left: left
                }, defaults.speed, function() {
                    if (direction) {
                        elms.index++; // 每次切换图片后 索引+1
                    } else {
                        elms.index--;
                    }

                    if (elms.index === 4) { // 当索引为4时  
                        elms.index = 1; // 切换成1
                        elms.sliderDiv.css('left', 0);
                    }
                });
            }.bind(this);


            stop = function() {
                clearInterval(timer);
                elms.sliderDiv.stop(true, true);
            }

            prev = function() {
                stop();
                start(0);
            }

            next = function() {
                stop();
                start(1);
            }



            main = function() {
                // 初始化
                init();
                // 开始动画
                // start();
                timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
            }

            main();
        }
    })
})(jQuery);

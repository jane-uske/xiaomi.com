import "./library/jquery.js";
import {
  baseUrl
} from "./library/config.js";
import cookie from './library/cookie.js';

(function() {
    let shop = cookie.get('shop');
    console.log(shop);
    
    if (shop) { // 有cookie数据才发请求
        shop = JSON.parse(shop);
        // console.log(shop);

        let idList = shop.map(elm => elm.id).join();
        // console.log(idList);

        $.ajax({
            type: "get",
            url: `${baseUrl}/products/getItems`,
            data: {
              idList: idList
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                let template = '';
                response.forEach((elm, i) => {
                    // 现在遍历数据时是按照数据库查询得到的结果遍历
                    // cookie中存放的数据 的顺序  和 查询结果的顺序不同
                    // 需要让cookie中的id和查询结果的id 一一对应
                    // 索引不同
                    let arr = shop.filter(val => val.id === elm.id);
                    console.log(arr);

                    let picture = JSON.parse(elm.picture);
                    // console.log(picture);
                    template+=`<li class="shop-li">
                    <div>
                        <input type="checkbox">
                    </div>
                    <div><img src="../${picture[0].src}" alt=""></div>
                    <div>${elm.title}</div>
                    <div>${(elm.price).toFixed(2)}</div>
                    <div>
                        <div>
                            <a>-</a>
                            <input type="text" value="1" min="1" max="999">
                            <a>+</a>
                        </div>
                    </div>
                    <div> ${(elm.price).toFixed(2)}元</div>
                    <div>
                        <div>
                            <a class="del">
                            x
                            </a>
                        </div>
    
                    </div>
                </li>`
                // let totalPrice =  elm.
                });
                    
                $('.shop11').append(template);
                
                // $('.allpri').html(totalPrice) 合计价格



            }
        });
    }

})();
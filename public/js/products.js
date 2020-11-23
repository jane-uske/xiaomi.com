import "./library/jquery.js";
import {
  baseUrl
} from "./library/config.js";
import cookie from './library/cookie.js';
console.log(1);
(function () {
  $('.addItem').on('click',function(){
    $('.addItem').css('background',"green")
  })
  let id = location.search.split("=")[1];
  // console.log(baseUrl);
  $.ajax({
    type: "get",
    url: `${baseUrl}/products/getItem`,
    data: {
      id: id
    },
    dataType: "json",
    success: function (response) {
      response = response[0];
      console.log(response);
      let picture = JSON.parse(response.picture);
      //   console.log(picture);
      //标题
      let tempTitle = `
            <h2><img src="../img/mi-10-11.11.jpg" alt="">${response.title}</h2>`;
      $(".body-right>.h2").append(tempTitle);
      $(".all-price").append(
        `<li style="color:orange">${response.title} 请确认你选择的参数和颜色 <span></span></li>`
      );
      //特征
      let tempSubheard = `
            <font color="#ff4a00">${response.subheard}</font>${response.feature}`;
      $(".body-right>.feature").append(tempSubheard);
      //价格
      let tempPrice = `${response.price}`;
      $(".price").append(tempPrice);
      $(".all-price>li>span").append(tempPrice);
      $(".last-price").append(tempPrice);
      //轮播图片
      // console.log(picture);
      if (id !== 2) {
        let tempPicture = `
        <div class="item active">
            <img src="../${picture[0].src}" alt="...">
        </div>
        <div class="item">
            <img src="../${picture[1].src}" alt="...">
        </div>
        <div class="item">
            <img src="../${picture[2].src}" alt="...">
        </div>
        <div class="item">
            <img src="../${picture[3].src}" alt="...">
        </div>
        <div class="item">
            <img src="../${picture[4].src}" alt="...">
        </div>`;
        $(".carousel-inner").append(tempPicture);
      } else if (id == 2) {
        console.log(picture);
        $(".body-left").html(` <img src="../${picture[0].src}" alt="...">`);
      }
      //库存
      let tempNum = `${response.num}`;
      $(".inventory").append(tempNum);
      //购物车
      $('.addItem').on("click", function () {
        // console.log(cookie);
        findItem(response.id)
      });
    },
  });

  function findItem(id) {
    // console.log(id);
    let shop = cookie.get('shop');
    let product = {
      id: id,
      // num: num
    }
    if (shop) {
      shop = JSON.parse(shop);
      // if (shop.some(elm => elm.id === id)) {
      //   shop.forEach(el => {
      //     el.id === id ? num++ : null
      //   })
      // } else {
        shop.push(product)
      // }
    } else {
      shop = [];
      shop.push(product)
    }
    cookie.set('shop', JSON.stringify(shop), 1)
  }
})();

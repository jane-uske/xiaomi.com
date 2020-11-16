import "../js/library/jquery.js";

import {baseUrl} from  './library/config.js'


(function () {
  $.ajax({
    type: "get",
    url: `${baseUrl}/products/getProducts`,
    data: "data",
    dataType: "json",
    success: function (response) {
      console.log(response);

      let tempLi = "";
      response.forEach((elm, i) => {
        let picture = JSON.parse(elm.picture);
        tempLi += `
                <a href="./good.html?id=${elm.id}">
                    <img src="../${picture[0].src}" alt="">
                    <p>${elm.title}</p>
                    <p class="last">${elm.annotation}</p>
                    <span>${elm.price}元起</span>
                </a>`;
      });
      $('.phone-right').append(tempLi);
    },
  });
})();

import "../js/library/jquery.js";


console.log(1);
let int = parseInt(90000);
function timer(int) {
  window.setInterval(function () {
    var h = 0;
    var m = 0;
    var s = 0;
    if (int) {
      h = Math.floor(int / 3600);
      m = Math.floor((int%3600)/60);
      s = Math.floor(int%60);
    }
    if (h < 9) h = "0" + h;
    if (m < 9) m = "0" + m;
    if (s < 9) s = "0" + s;
    $(".clearfix .h").text(h);
    $(".clearfix .m").text(m);
    $(".clearfix .s").text(s);
    int--;
    if (int <= 0) {
      clearInterval(timer);
      history.back(-1);
    }
  }, 100);
}
$(function () {
  timer(int);
});

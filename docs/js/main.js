// scroll to element
$(document).ready(function () {
  $("a.top").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  $("a.link").on("click", function () {
    var hrefLink = $(this).attr("href");
    $("html,body").animate(
      {
        scrollTop: $(hrefLink).offset().top,
      },
      500
    );
  });
});

let shop = document.querySelectorAll(".shop");
for (let i = 0; i < shop.length; i++) {
  shop[i].onclick = function (e) {
    // console.log(e.target.value);
    let val = e.target.value;
    let map = document.querySelector("#map");
    if (val == "taipei") {
      map.src = "https://pse.is/4xlhe6";
    } else if (val == "hsinchu") {
      map.src = "https://pse.is/4xkb94";
    }
  };
}

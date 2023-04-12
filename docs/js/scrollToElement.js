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

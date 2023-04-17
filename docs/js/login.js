$(document).ready(function () {});
function show() {
  $("#login").modal();
}

function login(e) {
  e.preventDefault();
  let umane = $("#uname").val();
  let psw = $("#psw").val();
  let info_creds = "username=" + umane + "&password=" + psw;

  // console.log(info_creds);

  $.ajax({
    type: "POST",
    url: "index.php",
    data: info_creds,
    cache: false,
    // success: function (response){login_success(response)},
    success: login_success,
    // error: login_success,
    error: login_error,
  });
}

const login_success = function (response) {
  response = "wrong!";

  console.log("inside success");
  console.log(response);

  if (response == "wrong!") {
    console.log("wrong");
    alert("Your account or password is wrong!");
  }

  if (response == "login_ok!") {
    console.log("ok");
    let uname = $("#uname").val();
    $("#login .close-modal").click();
    $("#login_number").text("Welcome! " + uname);
    $("#logout").css("display", "inline-block");
  }
};

const login_error = function (request, status, error) {
  console.log("inside error");
  console.log(request);
  console.log(status);
  console.log(error);
  alert(request.responseText);
};

const logout = function () {
  window.localStorage.clear();
  window.location.reload(true);
  window.location.replace("http://172.20.10.5:5500/docs/index.html");
};

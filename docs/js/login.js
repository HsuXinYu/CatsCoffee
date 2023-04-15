$(document).ready(function () {});
function show() {
  $("#login").modal();
}

const login_success = function (response) {
  response = "login_ok!";

  console.log("inside success");
  console.log(response);
  if (response == "wrong!") {
    console.log("wrong");
    alert("Your account or password is wroung!");
  }

  if (response == "login_ok!") {
    console.log("ok");
    let uname = $("#uname").val();
    $("#login .close-modal").click();
    $("#login_number").text("Welcome! " + uname);
  }
};

const login_error = function (request, status, error) {
  console.log("inside error");
  console.log(request, status, error);
  alert(request.responseText);
};

function login() {
  let umane = $("#uname").val();
  let psw = $("#psw").val();
  let info_creds = "username=" + umane + "&password=" + psw;
  console.log(info_creds);

  $.ajax({
    type: "POST",
    url: "login.php",
    data: info_creds,
    cache: false,
    success: login_success,
    // success: function (response){login_success(response)},
    // error: login_error,
    error: login_success,
  });
}

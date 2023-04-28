$(document).ready(function () {});

const BASE_URL = "http://127.0.0.1:5000";

function show() {
  $("#login").modal();
}

function login(e) {
  e.preventDefault();
  let umane = $("#uname").val();
  let psw = $("#psw").val();
  let info_creds = "username=" + umane + "&password=" + psw;

  // console.log(info_creds);

  if ((umane === "" && psw === "") || umane === "" || psw === "") {
    alert("You must to type something!");
    return;
  }

  $.ajax({
    type: "POST",
    url: BASE_URL + "/login/coffee",
    data: info_creds,
    // success: function (response){login_success(response)},
    success: login_success,
    // error: login_success,
    error: login_error,
  });
}

const login_success = function (response) {
  // response = "login_ok!";

  console.log("inside success");
  console.log(response);

  if (response == "login_ok!") {
    console.log("ok");
    let uname = $("#uname").val();
    $("#login .close-modal").click();
    $("#login_member").text("Welcome!" + uname);
    $("#login_member").css("font-size", "1rem");
    $("#login_form").css("display", "none");
    $("#logout").css("display", "inline-block");
    $("#delete_acc").css("display", "inline-block");
  }

  if (response == "login_wrong!") {
    console.log("wrong");
    alert("Your account or password is wrong!");
  }

  if (response == "user_not_found!") {
    console.log("not found!");
    alert("Your account is not exist!");
  }
};

const login_error = function (request, status, error) {
  console.log("inside error");
  console.log(request);
  console.log(status);
  console.log(error);
  alert(request, status, error);
};

function show_sign_up() {
  $("#login_form").css("display", "none");
  $("#sing_up_form").css("display", "inline-block");
}

function sign_up_to(e) {
  e.preventDefault();
  let name = $("#name").val();
  let address = $("#address").val();
  let phone = $("#phone").val();
  let email = $("#email").val();
  let sign_up_uname = $("#sign_up_uname").val();
  let sign_up_psw = $("#sign_up_psw").val();

  let info_creds = {
    name: $("#name").val(),
    address: $("#address").val(),
    phone: $("#phone").val(),
    email: $("#email").val(),
    sign_up_uname: $("#sign_up_uname").val(),
    sign_up_psw: $("#sign_up_psw").val(),
  };

  console.log(info_creds);

  if (
    name === "" ||
    address === "" ||
    phone === "" ||
    email === "" ||
    sign_up_uname === "" ||
    sign_up_psw === ""
  ) {
    alert("You should fill out the form!");
    return;
  }

  let phone_re = new RegExp(/\d{10}/);
  if (!phone_re.test(phone)) {
    alert("Your phone number is not currect!");
  }

  console.log(BASE_URL + "/sign_up/coffee");
  $.ajax({
    type: "POST",
    url: BASE_URL + "/sign_up/coffee",
    data: JSON.stringify(info_creds),
    contentType: "application/json",
    success: sign_up_success,
    error: sign_up_error,
  });
}

const sign_up_success = function (response) {
  console.log("inside success");
  console.log(response);

  if (response == "sign_up_ok!") {
    console.log("ok");
    alert("Your sign up is success!");
    $("#login .close-modal").click();
  }

  if (response == "sign_up_wrong!") {
    console.log("wrong");
    alert("Your account already exist!");
  }
};

const sign_up_error = function (request, status, error) {
  console.log("inside error");
  console.log(request);
  console.log(status);
  console.log(error);
  alert(request, status, error);
};

const logout = function () {
  window.localStorage.clear();
  window.location.reload(true);
  window.location.replace(BASE_URL);
};

const delete_acc = function (e) {
  e.preventDefault();
  let uname = $("#uname").val();

  console.log(uname);

  console.log(BASE_URL + "/delete_acc/coffee");
  $.ajax({
    type: "POST",
    url: BASE_URL + "/sign_up/coffee",
    data: JSON.stringify(uname),
    contentType: "application/json",
    success: delete_acc_success,
    error: delete_acc_error,
  });
};

const delete_acc_success = function (request, status, error) {
  if (response == "delete_acc_ok!") {
    console.log("ok");
    alert("Your account has been deleted!");
    $("#login .close-modal").click();
  }
};

const delete_acc_error = function (request, status, error) {
  console.log("inside error");
  console.log(request);
  console.log(status);
  console.log(error);
  alert(request, status, error);
};

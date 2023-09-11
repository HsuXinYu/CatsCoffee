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

//login
const BASE_URL = "http://127.0.0.1:8080";
var current_user = "";

function show_login() {
  $("#sign_up_form").css("display", "none");
  // if already login then dont show login_form
  if (current_user === "") {
    $("#login_form").css("display", "inline-block");
  } else {
    $("#login_form").css("display", "none");
  }
  $("#login").modal();
}

function login(e) {
  e.preventDefault();
  let uname = $("#uname").val();
  let psw = $("#psw").val();
  let info_creds = { sign_up_uname: uname, sign_up_psw: psw };

  console.log(info_creds);

  if ((uname === "" && psw === "") || uname === "" || psw === "") {
    $("#message").text("You must to type something!");
    return;
  }

  $.ajax({
    type: "POST",
    url: BASE_URL + "/login/coffee",
    data: JSON.stringify(info_creds),
    contentType: "application/json",
    // success: function (response){login_success(response)},
    success: login_success,
    // error: login_success,
    error: login_error,
  });
}

const login_success = function (response) {
  console.log("inside success");
  console.log(response);

  if (response == "login_ok!") {
    console.log("ok");
    let uname = $("#uname").val();
    current_user = uname;
    $("#login .close-modal").click();
    $("#login_member").text("Welcome!" + uname);
    $("#login_member").css("font-size", "1.2rem");
    $("#logout").css("display", "inline-block");
    $("#delete_mumber").css("display", "inline-block");
    $("#message").css("display", "none");
  }

  if (response == "login_wrong!") {
    console.log("wrong");
    $("#message").text("Your account or password is wrong!");
  }

  if (response == "user_not_found!") {
    console.log("not found!");
    $("#message").text("Your account doesn't exist!");
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
  $("#sign_up_form")[0].reset();
  $("#login_form").css("display", "none");
  $("#sign_up_form").css("display", "inline-block");
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
    $("#message").text("You should fill out the form!");
    return;
  }

  let phone_reg = new RegExp(/^[0-9]{10}$/g);
  if (!phone_reg.test(phone)) {
    $("#message").text("Your phone number is not currect!");
    return;
  }

  let email_reg = new RegExp(
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  );
  if (!email_reg.test(email)) {
    $("#message").text("Your email is not currect!");
    return;
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
    $("#message").css("display", "none");
    $("#login .close-modal").click();
    show_login();
  }

  if (response == "sign_up_wrong!") {
    console.log("wrong");
    $("#message").text("Your account already exist!");
    show_login();
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
  // window.location.replace(BASE_URL);
};

const delete_mumber = function (e) {
  e.preventDefault();
  let uname = $("#uname").val();
  let info_creds = { sign_up_uname: uname };

  console.log(BASE_URL + "/delete_mumber/coffee");
  $.ajax({
    type: "DELETE",
    url: BASE_URL + "/delete_mumber/coffee",
    data: JSON.stringify(info_creds),
    contentType: "application/json",
    success: delete_mumber_success,
    error: delete_mumber_error,
  });
};

const delete_mumber_success = function (response) {
  if (response == "delete_mumber_ok!") {
    console.log("ok");
    alert("Your account has been deleted!");
    $("#login .close-modal").click();
    logout();
  }
};

const delete_mumber_error = function (request, status, error) {
  console.log("inside error");
  console.log(request);
  console.log(status);
  console.log(error);
  alert(request, status, error);
};

//Vue
const coffeeBeans = [
  {
    id: 1,
    name: "咖啡豆1號",
    img: "images/CoffeeBeans1.png",
    qty: 12,
    price: 299,
  },
  {
    id: 2,
    name: "咖啡豆2號",
    img: "images/CoffeeBeans2.png",
    qty: 20,
    price: 299,
  },
  {
    id: 3,
    name: "咖啡豆3號",
    img: "images/CoffeeBeans1.png",
    qty: 20,
    price: 299,
  },
  {
    id: 4,
    name: "咖啡豆4號",
    img: "images/CoffeeBeans2.png",
    qty: 20,
    price: 299,
  },
  {
    id: 5,
    name: "咖啡豆5號",
    img: "images/CoffeeBeans1.png",
    qty: 20,
    price: 299,
  },
];

const app = Vue.createApp({
  delimiters: ["[[", "]]"],
  data() {
    return {
      showShop: false,
      showCart: false,
      cartItems: [],
    };
  },
  methods: {
    updateCart(index) {
      console.log(index);
      this.cartItems.push(coffeeBeans[index]);
      console.log(this.cartItems.length);
    },
    removeCart(index) {
      this.cartItems.splice(index, 1);
    },
  },
  computed: {
    total() {
      if (this.cartItems.length > 0) {
        return this.cartItems.map((data) => data.price).reduce((a, b) => a + b);
      } else {
        return 0;
      }
    },
  },
});

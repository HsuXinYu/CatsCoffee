// scroll to element
$(document).ready(function () {
  $("a.link").on("click", function () {
    var hrefLink = $(this).attr("href");
    $("html,body").animate(
      {
        scrollTop: $(hrefLink).offset().top,
      },
      500
    );
  });

  $("a.top").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });
});

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
  {
    id: 6,
    name: "咖啡豆6號",
    img: "images/CoffeeBeans2.png",
    qty: 20,
    price: 299,
  },
];

const app = Vue.createApp({
  delimiters: ["[[", "]]"],
  data() {
    return {
      current_user: "",
      showShop: false,
      showCart: false,
      cartItems: [],
    };
  },
  methods: {
    show_login() {
      $("#login-form")[0].reset();
      $("#message").text("");
      $("#sign-up-form").css("display", "none");
      //如果已經登入則不顯示
      if (this.current_user === "") {
        $("#login-form").css("display", "inline-block");
      } else {
        $("#login-form").css("display", "none");
      }
      $("#login").modal();
    },
    updateUser(user) {
      this.current_user = user;
    },
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

export default {
  template:
    /*html*/
    `<div id="login">
        <form id="login-form" method="post" onsubmit="return false;" >
            <div class="img-container">
              <img src="images/logo_150x150.png" alt="logo" />
            </div>
            <label for="email"><b>Email</b></label>
            <input id="email" type="text" name="email" placeholder="Enter Email" v-model="email"/>
            <br />
            <label for="psw"><b>Password</b></label>
            <input id="psw" type="password" name="psw" placeholder="Enter Password" v-model="psw"/>
            <br />
            <button type="button" @click="login">Login</button>
            <button type="button" @click="show_sign_up">Sign Up</button>
            <hr>
            <button type="button" @click="google_login">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png"/>
            透過Google登入
            </button>
        </form>
        <form id="sign-up-form" method="post" onsubmit="return false;">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label for="name"><b>Name</b></label>
            <input id="name" type="text" placeholder="Enter Name" name="name" />
            <br />
            <label for="address"><b>Address</b></label>
            <select id="address" name="address">
                <option>Keelung</option>
                <option>Taipei</option>
                <option>Taoyuan</option>
                <option>Hsinchu</option>
                <option>Miaoli</option>
                <option>Taichung</option>
                <option>Changhua</option>
                <option>Yunlin</option>
                <option>Nantou</option>
                <option>Chiayi</option>
                <option>Tainan</option>
                <option>Kaohsiung</option>
                <option>Pingtung</option>
                <option>Yilan</option>
                <option>Hualien</option>
                <option>Taitung</option>
            </select>
            <br />
            <label for="phone"><b>Phone</b></label>
            <input id="phone" type="text" placeholder="Enter Phone" name="phone" />
            <br />
            <label for="sign-up-email"><b>Email</b></label>
            <input id="sign-up-email" type="email" placeholder="Enter Email" name="sign-up-email" />
            <br />
            <label for="sign-up-psw"><b>Password</b></label>
            <input id="sign-up-psw" type="password" placeholder="Enter Password" name="sign-up-psw" />
            <br />
            <button id="cancel" type="button" @click="logout">Cancel</button>
            <button id="sign-up" type="button" @click="sign_up_to(event)"> Sign Up </button>
        </form>
        <button id="logout" type="button" @click="logout">Logout</button>
        <button id="delete-member" type="button" @click="delete_member(event)"> Delete Member </button>
        <div id="message" v-text="message"></div>
    </div>`,
  props: ["showLogin"],
  data() {
    return {
      BASE_URL: "http://127.0.0.1:8080",
      // BASE_URL: "https://potential-lamp-59wr44r4x7f7qxv-8080.app.github.dev",
      name: "",
      email: "",
      psw: "",
      message: "",
    };
  },
  methods: {
    updateMyUser(e) {
      this.myUser = e.target.value;
    },
    updateUser(user) {
      this.$emit("update-user", this.name);
    },
    google_login() {
      window.location.href = this.BASE_URL + "/auth/google";
    },
    login() {
      let info_creds = { login_email: this.email, login_psw: this.psw };

      // console.log(info_creds);

      if (
        (this.email === "" && this.psw === "") ||
        this.email === "" ||
        this.psw === ""
      ) {
        this.message = "You must to type something!";
        return;
      }

      $.ajax({
        type: "POST",
        url: this.BASE_URL + "/login/coffee",
        data: JSON.stringify(info_creds),
        contentType: "application/json",
        // success: function (response){login_success(response)},
        success: this.login_success,
        // error: login_success,
        error: this.login_error,
      });
    },
    login_success(response) {
      // console.log("inside success");
      // console.log(response);

      if (response == "login_ok!") {
        // console.log("ok");
        let uname = $("#uname").val();
        $("#login .close-modal").click();
        $("#login-member").text("Welcome!" + this.uname);
        $("#login-member").css("font-size", "1.2em");
        $("#logout").css("display", "inline-block");
        $("#delete-member").css("display", "inline-block");
        $("#message").css("display", "none");
        this.updateUser(this.myUser);
        // localStorage.setItem("uname", uname);
      }

      if (response == "login_wrong!") {
        // console.log("wrong");
        this.message = "Your account or password is wrong!";
      }

      if (response == "user_not_found!") {
        // console.log("not found!");
        this.message = "Your account doesn't exist!";
      }
    },
    login_error(request, status, error) {
      // console.log("inside error");
      // console.log(request);
      // console.log(status);
      // console.log(error);
      this.message = "Server could not connect!";
    },
    show_sign_up() {
      $("#sign-up-form")[0].reset();
      $("#login-form").css("display", "none");
      $("#sign-up-form").css("display", "inline-block");
    },
    sign_up_to(e) {
      let name = $("#name").val();
      let address = $("#address").val();
      let phone = $("#phone").val();
      let sign_up_email = $("#sign-up-email").val();
      let sign_up_psw = $("#sign-up-psw").val();

      let info_creds = {
        name: $("#name").val(),
        address: $("#address").val(),
        phone: $("#phone").val(),
        sign_up_email: $("#sign-up-email").val(),
        sign_up_psw: $("#sign-up-psw").val(),
      };

      // console.log(info_creds);

      if (
        name === "" ||
        address === "" ||
        phone === "" ||
        sign_up_email === "" ||
        sign_up_psw === ""
      ) {
        this.message = "You should fill out the form!";
        return;
      }

      let phone_reg = new RegExp(/^[0-9]{10}$/g);
      if (!phone_reg.test(phone)) {
        this.message = "Your phone number is not currect!";
        return;
      }

      let email_reg = new RegExp(
        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      );
      if (!email_reg.test(sign_up_email)) {
        this.message = "Your email is not currect!";
        return;
      }

      $.ajax({
        type: "POST",
        url: this.BASE_URL + "/sign_up/coffee",
        data: JSON.stringify(info_creds),
        contentType: "application/json",
        success: this.sign_up_success,
        error: this.sign_up_error,
      });
    },
    sign_up_success(response) {
      // console.log("inside success");
      // console.log(response);

      if (response == "sign_up_ok!") {
        // console.log("ok");
        alert("Your sign up is success!");
        $("#message").css("display", "none");
        $("#login .close-modal").click();
        this.$emit.showLogin();
      }

      if (response == "sign_up_wrong!") {
        // console.log("wrong");
        this.message = "Your account already exist!";
        this.$emit.showLogin();
      }
    },
    sign_up_error(request, status, error) {
      // console.log("inside error");
      // console.log(request);
      // console.log(status);
      // console.log(error);
      this.message = "Server could not connect!";
    },
    logout() {
      window.localStorage.clear();
      window.location.reload(true);
      // window.location.replace(BASE_URL);
    },
    delete_member(e) {
      // let uname = localStorage.getItem("uname");
      let uname = this.myUser;
      let info_creds = { sign_up_uname: uname };

      // console.log(info_creds);

      $.ajax({
        type: "DELETE",
        url: this.BASE_URL + "/delete_member/coffee",
        data: JSON.stringify(info_creds),
        contentType: "application/json",
        success: this.delete_member_success,
        error: this.delete_member_error,
      });
    },
    delete_member_success(response) {
      if (response == "delete_member_ok!") {
        // console.log("ok");
        alert("Your account has been deleted!");
        $("#login .close-modal").click();
        this.logout();
      }
    },
    delete_member_error(request, status, error) {
      // console.log("inside error");
      // console.log(request);
      // console.log(status);
      // console.log(error);
      alert(request, status, error);
    },
  },
};

const coffees = [
  {
    id: 1,
    name: "French Vanilla",
    img: "images/FrenchVanilla.jpg",
    price: 150,
  },
  {
    id: 2,
    name: "Caramel Macchiato",
    img: "images/CaramelMacchiato.jpg",
    price: 150,
  },
  {
    id: 3,
    name: "Pumpkin Spice",
    img: "images/PumpkinSpice.jpg",
    price: 120,
  },
  {
    id: 4,
    name: "Hazelnut",
    img: "images/Hazelnut.jpg",
    price: 120,
  },
  {
    id: 5,
    name: "Mocha",
    img: "images/Mocha.jpg",
    price: 120,
  },
];
const desserts = [
  {
    id: 6,
    name: "Donut",
    img: "images/Donut.jpg",
    price: 60,
  },
  {
    id: 7,
    name: "Cherry Pie",
    img: "images/CherryPie.jpg",
    price: 60,
  },
  {
    id: 8,
    name: "Cheese Cake",
    img: "images/CheeseCake.jpg",
    price: 70,
  },
];

app.component("menu-display", {
  template:
    /*html*/
    `<div class="main-area">
        <div id="heading">
          <img src="https://picsum.photos/1200/500" alt="heading" />
        </div>
        <div id="about">
          <p>
            凱絲貓的經營理念是希望營造出令人放鬆的咖啡館，<br />
            而店裡的貓咪也會在此等候著您的到來。 <br />
          </p>
          <br />
          <p>
            Cat's coffees is to create a relaxing environment,<br />
            and the cats in the shop will also be waiting for your arrival.
          </p>
        </div>
        <div id="news">
          <img src="" alt="" />
          <p>本店推出最新咖啡豆!歡迎前往購物搶購唷!!</p>
        </div>
        <div id="menu">
          <div class="menu_title">
            <h2>Coffee</h2>
            <img src="images/coffee_48x48.png" alt="coffee icon" />
          </div>
          <div class="item" v-for="(item,index) in coffee_items">
            <span class="coffee"><p>{{item.name}}</p></span>
            <span class="hiddenimg"> <img :src="item.img" /></span>
            <p class="price">$ {{item.price}}</p>
            <div class="input_group">
              <input
                class="minus"
                type="button"
                value="-"
                @click="deleteOrder"
              />
              <input
                class="quantity_field"
                type="number"
                v-model="coffee_item_vals[index]"
                step="1"
                min="0"
                max="10"
              />
              <input class="plus" type="button" value="+" @click="order" />
            </div>
          </div>
          <div class="menu_title">
            <h2>dessert</h2>
            <img src="images/cake_48x48.png" alt="coffee icon" />
          </div>
          <div class="item" v-for="(item,index) in dessert_items">
            <span class="coffee"><p>{{item.name}}</p></span>
            <span class="hiddenimg"> <img :src="item.img" /></span>
            <p class="price">$ {{item.price}}</p>
            <div class="input_group">
              <input
                class="minus"
                type="button"
                value="-"
                @click="deleteOrder"
              />
              <input
                class="quantity_field"
                type="number"
                v-model="dessert_item_vals[index]"
                name="quantity"
                step="1"
                min="0"
                max="10"
              />
              <input class="plus" type="button" value="+" @click="order" />
            </div>
          </div>
          <div class="ordered">
            <p>Total Price:</p>
            <p id="total">{{total}}</p>
            <button @click="total">Order</button>
          </div>
        </div>
        <div class="products-img">
          <img src="https://picsum.photos/200/200?random=1" alt="product-1" />
          <img src="https://picsum.photos/200/200?random=2" alt="product-2" />
          <img src="https://picsum.photos/200/200?random=3" alt="product-3" />
          <img src="https://picsum.photos/200/200?random=4" alt="product-4" />
          <img src="https://picsum.photos/200/200?random=5" alt="product-5" />
        </div>
        <div class="map-button">
          <!-- <a target="map" href="https://pse.is/4xlhe6">台北分店</a>
          <a target="map" href="https://pse.is/4xkb94">新竹分店</a> -->
          <button class="branch" value="taipei" @click="changeBranch">台北分店</button>
          <button class="branch" value="hsinchu" @click="changeBranch">新竹分店</button>
        </div>
        <iframe
          id="map"
          name="map"
          src="https://pse.is/4xlhe6"
          width="500px"
          height="500px"
        ></iframe>
      </div>`,

  data() {
    return {
      coffee_items: coffees,
      dessert_items: desserts,
      coffee_item_vals: coffees.map((v) => 0),
      dessert_item_vals: desserts.map((v) => 0),
    };
  },
  methods: {
    order(e) {
      // console.log(e.target);
      let parent = e.target.parentElement;
      let c = parent.children[1];
      let currentVal = parseInt(c.value);
      // console.log(c.value);

      if (currentVal >= 0) {
        c.value = currentVal + 1;
      }
      c.dispatchEvent(new Event("input", { bubbles: true }));
    },
    deleteOrder(e) {
      // console.log(e.target);
      let parent = e.target.parentElement;
      let c = parent.children[1];
      let currentVal = parseInt(c.value);
      // console.log(c.value);

      if (currentVal > 0) {
        c.value = currentVal - 1;
      }
      c.dispatchEvent(new Event("input", { bubbles: true }));
    },
    changeBranch(e) {
      console.log(e.target.value);
      let val = e.target.value;
      let map = document.querySelector("#map");

      if (val == "taipei") {
        map.src = "https://pse.is/4xlhe6";
      } else if (val == "hsinchu") {
        map.src = "https://pse.is/4xkb94";
      }
    },
  },
  computed: {
    total() {
      let total = 0;
      for (let i = 0; i < this.coffee_items.length; i++) {
        const price = this.coffee_items[i].price * this.coffee_item_vals[i];
        total += price;
      }
      for (let i = 0; i < this.dessert_items.length; i++) {
        const price = this.dessert_items[i].price * this.dessert_item_vals[i];
        total += price;
      }
      console.log(total);
      return total;
    },
  },
});

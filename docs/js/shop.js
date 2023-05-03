const coffeeBeans = [
  {
    id: 1,
    name: "咖啡豆1號",
    img: "images/CoffeeBeans.jpg",
    qty: 12,
    price: 299,
  },
  {
    id: 2,
    name: "咖啡豆2號",
    img: "images/CoffeeBeans.jpg",
    qty: 20,
    price: 299,
  },
  {
    id: 3,
    name: "咖啡豆3號",
    img: "images/CoffeeBeans.jpg",
    qty: 20,
    price: 299,
  },
  {
    id: 4,
    name: "咖啡豆4號",
    img: "images/CoffeeBeans.jpg",
    qty: 20,
    price: 299,
  },
  {
    id: 5,
    name: "咖啡豆5號",
    img: "images/CoffeeBeans.jpg",
    qty: 20,
    price: 299,
  },
];
app.component("shop-display", {
  template:
    /*html*/
    `<div class="shopping-area">
        <div class="shopping-box" v-for="(product,index) in products">
          <div class="content">
            <img :src="product.img" alt="product" />
            <div class="product-info">
              <div>{{product.name}}</div>
              <div>NT$ {{product.price}}</div>
              <a href="#" class="addToCart" @click="addToCart(index)"
                >加入購物車</a
              >
            </div>
          </div>
        </div>
      </div>
  `,
  data() {
    return {
      products: coffeeBeans,
      cartItems: [],
    };
  },
  methods: {
    addToCart(index) {
      console.log(index);
      console.log(this.products[index]);
      this.cartItems.push(this.products[index]);
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

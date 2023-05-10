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
              <a href="#" class="cart-button" @click="addToCart(index)"
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
    };
  },
  methods: {
    addToCart(index) {
      console.log(index);
      this.$emit("add-to-cart", index);
    },
  },
});

<template>
  <div id="app">
    <header class="head-site">
      <a href="/form/" class="feedback">Обратная связь</a>
      <button class="cart-button" type="button" v-on:click="showCart">
        {{ btCart }}
      </button>
    </header>
    <main class="shop-list">
      <input
        type="text"
        v-model="seach"
        v-on:input="seachGoods"
        class="seach"
        placeholder="Поиск"
        v-show="!isVisibleCart"
      />
      <div class="item-no-seach" v-show="noSeach">
        <h3>Товар "{{ seach }}" не найден!</h3>
      </div>
      <div class="goods-list" v-show="!isVisibleCart">
        <div v-for="good in seachList" :key="good.id" :id="good.id">
          <div class="goods-item">
            <h3>{{ good.title }}</h3>
            <img :src="good.imgUrl" />
            <span class="description">{{ good.description }}</span>
            <p>
              Цена: <span class="item-price">{{ good.price }}</span>
            </p>
            <input
              type="number"
              name="count"
              class="item-count"
              v-model="good.count"
              min="1"
            />
            <button
              class="add-item"
              type="button"
              @click="$emit('add-item', good)"
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
      <div class="loader" v-show="loader">
        <div class="lds-grid" v-show="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="cart-list" v-show="isVisibleCart">
        <div v-for="item in listCart" :key="item.id" :id="item.id">
          <div class="goods-item">
            <h3>{{ item.title }}</h3>
            <img :src="item.imgUrl" />
            <span class="description">{{ item.description }}</span>
            <p>
              Цена: <span class="item-price">{{ item.price }}</span>
            </p>
            <input
              type="number"
              name="count"
              class="item-count"
              v-model="item.count"
              min="1"
            />
            <button
              class="add-item"
              type="button"
              @click="$emit('add-item', item)"
            >
              В корзину
            </button>
          </div>
        </div>
        <div class="no-item-cart" v-show="summallItem == 0">
          <h3>Товара нет</h3>
        </div>
      </div>
      <div class="sum-cart" v-show="isVisibleCart">
        <span class="sum-text">Общая сумма:</span>
        <span class="sum-num">{{ summallItem }}</span>
      </div>
    </main>
    <footer class="footer-site">
      <span class="footer-site__text">Это футер</span>
    </footer>
  </div>
</template>

<script>
import Good from "@/goods.json";
import Cart from "@/cart.json";
Vue.component("good-list", {
  props: {
    good: {
      type: Object,
      requered: true,
    },
  },
  template: `<div class="goods-item">
    <h3>{{good.title}}</h3>
                <img :src= "good.imgUrl">
                <span class="description">{{good.description}}</span>
                <p>Цена: <span class="item-price">{{good.price}}</span></p>
                <input type="number" name="count" class="item-count" v-model="good.count" min="1">
                <button class="add-item" type="button" @click="$emit('add-item', good)">В корзину</button>
                
                
    </div>`,
  methods: {
    fuck() {
      console.log(this.isVisibleCart);
    },
  },
});
Vue.component("cart-list", {
  props: {
    item: {
      type: Object,
      requered: true,
    },
  },
  template: `<div class="cart-item">
    <button class="rm" v-on:click="$emit('remove-item', item)">&times;</button>
    <h3>{{item.title}}</h3>
                <img :src="item.imgUrl">
                <span class="description">{{item.description}}</span>
                <p>Цена: <span class="item-price">{{item.price}}</span></p>
                <input type="number" name="count" :id="'item-'+ item.id"
                        class="item-count" :value="item.count" min="1">
                <p>Сумма: {{item.summEl}}</p></template>
                
    </div>`,
});

export default {
  name: "App",
  components: {},
  data() {
    return {
      list: [],
      seach: "",
      seachList: [],
      listCart: [],
      btCart: "Корзина",
      isVisibleCart: false,
      summallItem: 0,
      loader: true,
      noSeach: false,
    };
  },
  methods: {
    removeItem(item) {
      this.listCart = this.listCart.filter((el) => el.id != item.id);
      this.summallItem = this.listCart.reduce(
        (sumCart, el) => sumCart + el.summEl,
        0
      );
    },
    addItem(good) {
      console.log(good);
      let add = false;
      this.listCart.forEach((el) => {
        if (el.id == good.id) {
          el.count += good.count;
          el.summEl = el.price * el.count;
          add = true;
        }
      });
      if (!add) {
        let newEl = {
          id: good.id,
          title: good.title,
          count: good.count,
          imgUrl: good.imgUrl,
          price: good.price,
          summEl: good.price * good.count,
        };
        console.log(newEl);
        this.listCart.push(newEl);
      }
      console.log(this.listCart);
    },
    seachGoods() {
      const reg = /\s+/g;
      let fixSeach = this.seach.replace(reg, "");
      const seachReg = new RegExp(fixSeach, "i");
      if (fixSeach !== "") {
        this.seachList = this.list.filter((el) => seachReg.test(el.title));
        if (this.seachList.length == 0) {
          this.noSeach = true;
        } else this.noSeach = false;
      } else this.seachList = this.list;
    },
    showCart() {
      this.isVisibleCart = !this.isVisibleCart;
      this.noSeach = false;
      this.btCart = this.isVisibleCart ? "Назад" : "Корзина";
      this.summallItem = this.listCart.reduce(
        (sumCart, el) => sumCart + el.summEl,
        0
      );
      console.log(this.summallItem);
    },
    getJson(url) {
      console.log(Good);
      return fetch(url).then((result) => console.log(result.text()));
    },
  },
  async mounted() {
    console.log(Good);
    // const res = await fetch("goods.json");
    // this.list = await res.json();
    this.list = Good;
    this.loader = false;
    this.seachList = this.list;
    // const resCart = await fetch("cart.json");
    this.listCart = Cart;
    this.listCart.forEach((el) => {
      console.log(this.list);
      let indexG = this.list.findIndex((elem) => el.id == elem.id);
      el.title = this.list[indexG].title;
      el.imgUrl = this.list[indexG].imgUrl;
      el.price = this.list[indexG].price;
      el.summEl = el.price * el.count;
    });
  },
};
</script>

<style>
</style>

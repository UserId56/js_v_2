const cartbtn = document.querySelector(".cart-button")
const goodBlock = document.querySelector('.goods-list')
const cartBlock = document.querySelector('.cart-list')

let goodVue = new Vue({
    el: "#app",
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
            noSeach: false
        }
    },
    methods: {
        seachGoods() {
            const reg = /\s+/g
            let fixSeach = this.seach.replace(reg, '')
            const seachReg = new RegExp(fixSeach, "i")
            if (fixSeach !== "") {
                this.seachList = this.list.filter((el) => seachReg.test(el.title))
                if (this.seachList.length == 0) {
                    this.noSeach = true
                } else this.noSeach = false
            } else this.seachList = this.list

        },
        showCart() {
            this.isVisibleCart = !this.isVisibleCart
            this.btCart = this.isVisibleCart ? "Назад" : "Корзина"
            this.summallItem = this.listCart.reduce((sumCart, el) => sumCart + el.summEl, 0)
        },
    },
    async mounted() {
        const res = await fetch("goods/goods.json")
        this.list = await res.json()
        this.loader = false
        this.seachList = await this.list
        const resCart = await fetch("cart/cart.json")
        this.listCart = await resCart.json()
        await this.listCart.forEach((el) => {
            let indexG = this.list.findIndex((elem) => el.id == elem.id)
            el.title = this.list[indexG].title
            el.imgUrl = this.list[indexG].imgUrl
            el.price = this.list[indexG].price
            el.summEl = el.price * el.count
        })

    }

})

// class Item {
//     constructor(id, title, price, imgUrld, description) {
//         this.id = id
//         this.title = title;
//         this.price = price;
//         this.imgUrld = imgUrld
//         this.description = description
//     }
//     render() {
//         return `<div class="goods-item" data-id="${this.id}"><h3>${this.title}</h3><img src="${this.imgUrld}"><span class="description">${this.description}</span><p>Цена: <span class="item-price">${this.price}</span></p><input type="number" name="count" id="item-${this.id}" class="item-count" value="1" min="1"><button class="add-item" type="button">В корзину</button></div>`;
//     }
// }

// class ListItems {
//     constructor() {
//         this.list = [];
//     }

//     fetch(url, list, itsCat) {
//         fetch(url)
//             .then((response) => response.json())
//             .then((dateItems) => list.render(dateItems))
//     }
// }

// class GoodsItems extends ListItems {
//     constructor() {
//         super()
//     }
//     render(RequestListItems) {
//         this.list = RequestListItems
//         let listHtml = '';
//         this.list.forEach(good => {
//             const goodItem = new Item(good.id, good.title, good.price, good.imgUrl, good.description);
//             listHtml += goodItem.render();
//         });
//         goodBlock.innerHTML = listHtml;
//     }
//     summerPrice() {
//         let summerAllItem = 0
//         this.list.forEach(good => {
//             summerAllItem += good.price
//         })
//         return summerAllItem
//     }
// }

// const list = new GoodsItems();
// list.fetch("goods/goods.json", list);

// class CartItem extends Item {
//     constructor(id, title, price, imgUrl, count) {
//         super(id, title, price, imgUrl)
//         this.count = count
//         this.summ = CartItem.summItem(count, price)
//     }
//     render() {
//         return `<div class="cart-item" data-id="${this.id}"><h3>${this.title}</h3><img src="${this.imgUrld}"><p>Цена:${this.price}</p><input type="number" name="count" id="item-${this.id}" class="item-count" value="${this.count}" min="1"><p>Сумма: ${this.summ}</p></div>`;
//     }
//     static summItem(count, price) {
//         return count * price
//     }
// }

// class CartList extends ListItems {
//     constructor() {
//         super()
//     }

//     render(RequestListItems) {
//         this.list = RequestListItems
//         let listHtml = '';
//         this.list.forEach(item => {
//             let ind = list.list.findIndex((good) => good.id == item.id)
//             const cartItem = new CartItem(item.id, list.list[ind].title, list.list[ind].price, list.list[ind].imgUrl, item.count);
//             listHtml += cartItem.render();
//         });
//         cartBlock.innerHTML = listHtml;
//     }
//     summerPrice() {
//         let summerAllItem = 0
//         this.list.forEach(good => {
//             summerAllItem += good.price
//         })
//         return summerAllItem
//     }
//     addItemCart(id, count) {
//         let add = false
//         this.list.forEach(item => {
//             if (id == item.id) {
//                 item.count += count

//             }
//         })
//         if (!add) {
//             let ind = list.list.findIndex((item) => id == item.id)
//             console.log(ind)
//             cartList.list.push({
//                 id: list.list[ind].id,
//                 count: count
//             })
//             this.sendAddCart(cartList)
//         }
//     }
//     sendAddCart(list) {
//         fetch('cart/cart.json', {
//             method: "POST",
//             body: JSON.stringify(list)
//         }).catch((error) => {
//             console.log(error)
//         })

//     }
// }

// const cartList = new CartList


// function showCart() {
//     cartList.fetch('cart/cart.json', cartList)
//     cartBlock.classList.toggle("d-none")
//     goodBlock.classList.toggle("d-none")
//     if (cartBlock.className == "cart-list") {
//         cartList.fetch('cart/cart.json', cartList)
//         cartbtn.innerText = "Назад"
//     } else cartbtn.innerText = "Корзина"
// }

// cartbtn.addEventListener("click", showCart)
const cartbtn = document.querySelector(".cart-button")
const goodBlock = document.querySelector('.goods-list')
const cartBlock = document.querySelector('.cart-list')

class Item {
    constructor(id, title, price) {
        this.id = id
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item" data-id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class ListItems {
    constructor() {
        this.list = [];
    }
    fetch(url, listname) {
        let xhr
        if (window.XMLHttpRequest) {
            // Chrome, Mozilla, Opera, Safari
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            // Internet Explorer
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                listname.render(JSON.parse(xhr.responseText));
            }
        }
        xhr.open("GET", url)
        xhr.timeout = 15000
        xhr.send()
    }
}

class GoodsItems extends ListItems {
    constructor() {
        super()
    }
    render(RequestListItems) {
        this.list = RequestListItems
        let listHtml = '';
        this.list.forEach(good => {
            const goodItem = new Item(good.id, good.title, good.price);
            listHtml += goodItem.render();
        });
        goodBlock.innerHTML = listHtml;
    }
    summerPrice() {
        let summerAllItem = 0
        this.list.forEach(good => {
            summerAllItem += good.price
        })
        return summerAllItem
    }
}

const list = new GoodsItems();
list.fetch("goods/goods.json", list);

class CartItem extends Item {
    constructor(id, title, price, count) {
        super(id, title, price)
        this.count = count
        this.summ = CartItem.summItem(count, price)
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><p>Кол-во: ${this.count}</p><p>Сумма: ${this.summ}</p></div>`;
    }
    static summItem(count, price) {
        return count * price
    }
}

class CartList extends ListItems {
    constructor() {
        super()
    }

    render(RequestListItems) {
        this.list = RequestListItems
        let listHtml = '';
        this.list.forEach(item => {
            const cartItem = new CartItem(item.id, item.title, item.price, item.count);
            listHtml += cartItem.render();
        });
        goodBlock.innerHTML = listHtml;
    }
    summerPrice() {
        let summerAllItem = 0
        this.list.forEach(good => {
            summerAllItem += good.price
        })
        return summerAllItem
    }
    addItemCart(id, count) {
        this.list.forEach(item => {
            if (id == item.id) {
                item.count = count
            } else
                indexItem = list.findindex(el => (id == el.id) ? true : false)
            cartList.push(list[indexItem])
        })
    }
}

function cartGen() {
    let cartList = new CartList
    cartList.fetch('cart/cart.json', cartList)
}

function showCart() {
    cartBlock.classList.toggle("d-none")
    goodBlock.classList.toggle("d-none")
    if (cartBlock.className == "cart-list") {
        cartGen()
    }
}

cartbtn.addEventListener("click", showCart)
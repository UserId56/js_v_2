const goods = [{
        title: 'Shirt',
        price: 150
    },
    {
        title: 'Socks',
        price: 50
    },
    {
        title: 'Jacket',
        price: 350
    },
    {
        title: 'Shoes',
        price: 250
    },
];

const renderGoodsItem = (title = "Название товара", price = "Цена") => {
    return `<div class="goods-item"><h3>Товар: ${title}</h3><p>Цена: ${price}</p></div>`
}

const renderGoodsList = (list) => document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join("")

renderGoodsList(goods)
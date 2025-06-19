let order = [];
let isRegistered = false;

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        isRegistered = true;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('account-info').innerHTML = `Привет, ${username} <span onclick="showLoginForm()" style="cursor: pointer;">(Выйти)</span>`;
        document.getElementById('menu').style.display = 'block';
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
}

function orderPizza(pizzaName, price) {
    if (!isRegistered) {
        alert('Вы должны зарегистрироваться, чтобы сделать заказ!');
        return;
    }
    order.push({ pizzaName, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    order.forEach((item, index) => {
        cartItems.innerHTML += `${item.pizzaName} - ${item.price} BYN <button onclick="removePizza(${index})">Удалить</button><br>`;
        totalPrice += item.price;
    });
    cartItems.innerHTML += `Итого: ${totalPrice} BYN`;
}

function removePizza(index) {
    order.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = (cart.style.display === 'block') ? 'none' : 'block';
}

function placeOrder() {
    if (order.length > 0) {
        document.getElementById('cart').style.display = 'none';
        document.getElementById('order-summary').style.display = 'block';
        updateOrderSummary();
    } else {
        alert('Корзина пуста, пожалуйста, выберите пиццы для заказа.');
    }
}

function updateOrderSummary() {
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';
    let totalPrice = 0;
    order.forEach(item => {
        orderDetails.innerHTML += `${item.pizzaName} - ${item.price} BYN<br>`;
        totalPrice += item.price;
    });
    orderDetails.innerHTML += `Общая сумма: ${totalPrice} BYN`;
}

function confirmOrder() {
    if (order.length > 0) {
        alert('Ваш заказ принят! Пиццы будут доставлены через 30 минут.');
        order = [];
        document.getElementById('order-summary').style.display = 'none';
        updateCart();
    } else {
        alert('Корзина пуста!');
    }
}

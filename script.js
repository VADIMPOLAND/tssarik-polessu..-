let order = [];
let isRegistered = false;
let currentUser = '';

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        isRegistered = true;
        currentUser = username;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('account-info').innerHTML = `Привет, ${currentUser} <span onclick="logout()" style="cursor: pointer; color: #ff6347;">(Выйти)</span>`;
        document.getElementById('menu').style.display = 'block';
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
}

function logout() {
    isRegistered = false;
    currentUser = '';
    order = [];
    document.getElementById('account-info').innerHTML = `<span onclick="showLoginForm()">Войти / Регистрация</span>`;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-summary').style.display = 'none';
    updateCart();
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
        cartItems.innerHTML += `<div>${item.pizzaName} - ${item.price} BYN <button onclick="removePizza(${index})">Удалить</button></div>`;
        totalPrice += item.price;
    });
    cartItems.innerHTML += `<div style="font-weight: bold;">Итого: ${totalPrice} BYN</div>`;
    if (order.length === 0) {
        document.getElementById('cart').style.display = 'none';
    }
}

function removePizza(index) {
    order.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const cart = document.getElementById('cart');
    if (!isRegistered) {
        alert('Вы должны зарегистрироваться, чтобы увидеть корзину!');
        return;
    }
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
    orderDetails.innerHTML += `<strong>Общая сумма: ${totalPrice} BYN</strong>`;
}

function confirmOrder() {
    if (order.length > 0) {
        alert(`Ваш заказ принят, ${currentUser}! Пиццы будут доставлены через 30 минут.`);
        order = [];
        document.getElementById('order-summary').style.display = 'none';
        updateCart();
        document.getElementById('order-status').innerHTML = 'Заказ успешно оформлен!';
        setTimeout(() => {
            document.getElementById('order-status').innerHTML = '';
        }, 5000);
    } else {
        alert('Корзина пуста!');
    }
}
let order = [];
let isRegistered = false;

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
}

function hideLoginForm() {
    document.getElementById('login-form').style.display = 'none';
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        isRegistered = true;
        hideLoginForm();
        document.querySelector('nav ul li:last-child').innerHTML = `Привет, ${username} <button class="logout-btn" onclick="logout()">Выйти</button>`;
        document.getElementById('menu').style.display = 'block';
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
}

function logout() {
    isRegistered = false;
    document.querySelector('nav ul li:last-child').innerHTML = `<button class="login-btn" onclick="showLoginForm()">Вход / Регистрация</button>`;
    order = [];
    updateCart();
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-summary').style.display = 'none';
}

function orderPizza(pizzaName, price) {
    if (!isRegistered) {
        alert('Вы должны зарегистрироваться, чтобы сделать заказ!');
        return;
    }
    order.push({ pizzaName, price });
    updateCart();
    document.getElementById('cart-count').textContent = order.length;
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    order.forEach((item, index) => {
        cartItems.innerHTML += `<div>${item.pizzaName} - ${item.price} BYN <button onclick="removePizza(${index})">Удалить</button></div>`;
        totalPrice += item.price;
    });
    document.getElementById('cart-total').textContent = `Итого: ${totalPrice} BYN`;
}

function removePizza(index) {
    order.splice(index, 1);
    updateCart();
    document.getElementById('cart-count').textContent = order.length;
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = (cart.style.display === 'block') ? 'none' : 'block';
}

function placeOrder() {
    if (order.length > 0) {
        const address = document.getElementById('delivery-address').value;
        if (!address) {
            alert('Пожалуйста, укажите адрес доставки!');
            return;
        }
        document.getElementById('cart').style.display = 'none';
        document.getElementById('order-summary').style.display = 'block';
        document.getElementById('delivery-address-confirm').value = address;
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
    const address = document.getElementById('delivery-address-confirm').value;
    if (order.length > 0 && address) {
        document.getElementById('order-image').style.display = 'block';
        document.getElementById('order-status').textContent = `Заказ на сумму ${document.getElementById('order-details').textContent.match(/Общая сумма: (\d+) BYN/)[1]} BYN принят! Доставка на адрес: ${address}. Оплата подтверждена.`;
    } else {
        alert('Пожалуйста, укажите адрес доставки и добавьте пиццы в корзину!');
    }
}

function hideOrderImage() {
    document.getElementById('order-image').style.display = 'none';
    order = [];
    document.getElementById('order-summary').style.display = 'none';
    updateCart();
    document.getElementById('cart-count').textContent = order.length;
}

function filterPizzas() {
    const typeFilter = document.getElementById('filter-type').value;
    const priceFilter = document.getElementById('filter-price').value;
    const cards = document.querySelectorAll('.pizza-card');

    cards.forEach(card => {
        const type = card.getAttribute('data-type');
        const price = parseInt(card.getAttribute('data-price'));
        let show = true;

        if (typeFilter !== 'all' && type !== typeFilter) show = false;
        if (priceFilter !== 'all') {
            const [min, max] = priceFilter.split('-').map(n => n === '+' ? Infinity : parseInt(n));
            if (price < min || price > max) show = false;
        }

        card.style.display = show ? 'block' : 'none';
    });
}

// Анимация при скроллинге
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.pizza-card');
    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (cardPosition < screenPosition) {
            card.classList.add('visible');
        }
    });
});

window.addEventListener('load', () => {
    updateCart();
    document.getElementById('cart-count').textContent = order.length;
});

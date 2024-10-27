const products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 }
];

let cart = {};


const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');

function renderProducts() {
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        productItem.innerHTML = `
            <span>${product.name}</span>
            <span>${product.price}</span>
            <div class="quantity-control">
                <button onclick="decreaseQuantity(${product.id})">-</button>
                <span id="quantity-${product.id}">0</span>
                <button onclick="increaseQuantity(${product.id})">+</button>
            </div>
        `;
        
        productList.appendChild(productItem);
    });
}

function renderCart() {
    cartList.innerHTML = '';
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartList.innerHTML = '<p>No Product added to the cart</p>';
    } else {
        for (const [id, item] of Object.entries(cart)) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity} x ${item.price}</span>
            `;
            cartList.appendChild(cartItem);
            total += item.quantity * item.price;
        }
    }

    totalPriceElement.textContent = total;
}

function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!cart[productId]) {
        cart[productId] = { ...product, quantity: 1 };
    } else {
        cart[productId].quantity += 1;
    }

    document.getElementById(`quantity-${productId}`).textContent = cart[productId].quantity;
    renderCart();
}

function decreaseQuantity(productId) {
    if (cart[productId]) {
        cart[productId].quantity -= 1;

        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }

        document.getElementById(`quantity-${productId}`).textContent = cart[productId] ? cart[productId].quantity : 0;
        renderCart();
    }
}


renderProducts();
renderCart();

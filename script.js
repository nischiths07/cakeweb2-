let cart = [];
const reviews = {
    "Chocolate Delight": [],
    "Vanilla Dream": [],
    "Red Velvet": [],
    "Strawberry Delight": []
};
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
        updateCartDisplay();
    }
}
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
}
function addToCart(cakeName, price, quantity) {
    const item = { cakeName, price, quantity };
    cart.push(item);
    saveCart();
    updateCartCount();
    alert(${cakeName} added to cart);
}
function updateCartCount() {
}
function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').textContent = (${cartCount});
}
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = '';
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <p>${item.cakeName} - ₹${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
}
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}
function addReview(cakeName, reviewText) {
    reviews[cakeName].push(reviewText);
    saveReviews();
    displayReviews(cakeName);
}
function displayReviews(cakeName) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
    reviews[cakeName].forEach((review) => {
        const reviewItem = document.createElement('li');
        reviewItem.textContent = review;
        reviewsList.appendChild(reviewItem);
    });
}
function saveReviews() {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}
function loadReviews(cakeName) {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
        const savedReviews = JSON.parse(storedReviews);
        Object.assign(reviews, savedReviews);
        displayReviews(cakeName);
    }
}

document.getElementById('add-to-cart')?.addEventListener('click', () => {
    const quantity = document.getElementById('quantity').value;
    const cakeName = document.querySelector('h2').textContent;
    const price = document.querySelector('p:nth-child(4)').textContent.replace('Price: ₹', '');
    addToCart(cakeName, price, quantity);
});

document.getElementById('review-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cakeName = document.querySelector('h2').textContent;
    const reviewText = document.getElementById('review').value;
    addReview(cakeName, reviewText);
    document.getElementById('review').value = ''; 
});
window.onload = () => {
    loadCart();
    const cakeName = document.querySelector('h2')?.textContent;
    if (cakeName) {
        loadReviews(cakeName);
    }
};
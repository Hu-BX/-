const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('products.html')) {
        loadProducts();
        document.getElementById('search-button').addEventListener('click', loadProducts);
    } else if (path.includes('product-detail.html')) {
        loadProductDetail();
    } else if (path.includes('admin.html')) {
        loadAdminProducts();
        document.getElementById('product-form').addEventListener('submit', handleFormSubmit);
    }
});

async function loadProducts() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const searchQuery = document.getElementById('search-input').value;

    let url = `${API_URL}/products`;
    const queryParts = [];
    if (category) queryParts.push(`category=${category}`);
    if (searchQuery) queryParts.push(`search=${searchQuery}`);
    if (queryParts.length) url += `?${queryParts.join('&')}`;

    const response = await fetch(url);
    const products = await response.json();

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.images[0]}" alt="${product.name}">
                <h3>${product.name}</h3>
            </a>
        `;
        productList.appendChild(productCard);
    });

    const categoryTitle = document.getElementById('product-category-title');
    if(category) {
        categoryTitle.textContent = category.replace('-', ' ');
    }
}

async function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();

    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `
        <div class="product-images">
            ${product.images.map(img => `<img src="${img}" alt="${product.name}">`).join('')}
        </div>
        <div class="product-info">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <button>Contact Us Now</button>
        </div>
    `;
}

async function loadAdminProducts() {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();

    const productList = document.querySelector('#admin-product-list tbody');
    productList.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('product-id').value;
    const productData = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        images: document.getElementById('images').value.split(','),
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;

    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });

    document.getElementById('product-form').reset();
    loadAdminProducts();
}

async function editProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    const product = await response.json();

    document.getElementById('product-id').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('category').value = product.category;
    document.getElementById('description').value = product.description;
    document.getElementById('images').value = product.images.join(',');
}

async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        loadAdminProducts();
    }
}

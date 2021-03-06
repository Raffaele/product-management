const STANDARD_HEADER = {
    'Content-Type': 'application/json',
};
const SERVER_PATH = 'http://localhost:2200';
const api = {
    getCategories,
    getProducts,
    getBasicInfo,
    createProduct,
    deleteProduct
};

export default api;

function getBasicInfo() {
    const categories = getCategories();
    const products = getProducts();
    return Promise.all([categories, products]).then(([categories, products]) => {
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('products', JSON.stringify(products));
        return {
            categories,
            products
        };
    }, (err) => {
        // To keep the products persisted even after the application has shutdown
        // as required in the specifications
        const categories = localStorage.getItem('categories');
        const products = localStorage.getItem('products');

        if (categories && products) {
            return {
                categories: JSON.parse(categories),
                products: JSON.parse(products)
            };
        }

        return Promise.reject(err);
    });
}

function getCategories() {
    return fetch(`${SERVER_PATH}/categories`, {
        headers: STANDARD_HEADER
    }).then(x => x.json());
}

function getProducts() {
    return fetch(`${SERVER_PATH}/products`, {
        headers: STANDARD_HEADER
    }).then(x => x.json());
}

function deleteProduct(productId) {
    return fetch(`${SERVER_PATH}/product/${productId}`, {
        method: 'DELETE',
        headers: STANDARD_HEADER
    });
}

function createProduct(product) {
    return fetch(`${SERVER_PATH}/product/new`, {
        method: 'POST',
        headers: STANDARD_HEADER,
        body: JSON.stringify(product)
    });
}

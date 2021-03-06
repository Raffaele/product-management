import React, { createContext, useReducer, useEffect, useState } from 'react';
import api from './api';

import { productInfoReducer } from './reducers/productDetails';
import { paginationReducer, PAGINATION_ACTIONS } from './reducers/pagination';

export const MainContext = createContext({});

export const ContextWrapper = ({ children }) => {
    const defaultNewProduct = {};
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [paginator, paginatorDispatch] = useReducer(paginationReducer);
    const [tableSort, setTableSort] = useState({
        direction: 1,
        key: 'CATEGORY'
    });
    const [selectedProductInfo, productInfoDispatch] = useReducer(productInfoReducer, defaultNewProduct);
    useEffect(() => {
        api.getBasicInfo().then(({products: productsFromServer, categories: categoriesFromServer}) => {
            setCategories(categoriesFromServer);
            storeDecoratedProducts(productsFromServer, categoriesFromServer);
        });
        paginatorDispatch();
        productInfoDispatch();
    }, []);

    useEffect(() => {
        if (!products.length || !paginator?.productsPerPage) {
            return;
        }
        const numOfPages = Math.ceil(products.length/paginator.productsPerPage);
        paginatorDispatch({
            payload: numOfPages,
            type: PAGINATION_ACTIONS.SET_LAST_PAGE
        });

    }, [products.length, paginator?.productsPerPage]);
    function storeDecoratedProducts(productsFromServer, categories) {
        const decoratedProducts = productsFromServer.map(product => ({
            ...product,
            CATEGORY: categories.find(category => category.ID === product.CATEGORY_ID).CATEGORY_NAME
        }));
        setProducts(decoratedProducts);
    }
    function updateProducts() {
        api.getProducts().then((productsFromServer) => {
            storeDecoratedProducts(productsFromServer, categories);
        });
    }
    const providerData = {
        products,
        categories,
        tableSort,
        selectedProductInfo,
        updateProducts,
        deleteProduct,
        setTableSortKey,
        productInfoDispatch,
        paginator: {
            ...paginator,
            setProductPage,
            setProductsPerPage,
        }
    };
    return (
        <MainContext.Provider value={providerData}>
            {children}
        </MainContext.Provider>
    )

    function setProductPage(productPage) {
        paginatorDispatch({
            type: PAGINATION_ACTIONS.GO_TO_PAGE,
            payload: productPage
        });
    }

    function deleteProduct(productId) {
        api.deleteProduct(productId)
            .then(updateProducts);
    }

    function setTableSortKey(key) {
        setTableSort({
            key,
            direction: key === tableSort.key ? -tableSort.direction : 1
        });
    }

    function setProductsPerPage(productsPerPage) {
        paginatorDispatch({
            type: PAGINATION_ACTIONS.SET_PRODUCTS_PER_PAGE,
            payload: productsPerPage
        });
    }
}

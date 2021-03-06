import React, { useContext } from 'react';
import { Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import { MainContext } from '../../engine/ContextWrapper';
import { Paginator } from '../Paginator/Paginator';
import { ProductTable } from '../ProductTable/ProductTable';

import './ProductDisplay.scss';

export const ProductDisplay = () => {
    const {
        paginator
    } = useContext(MainContext);
    function handleProductPerPageChange(evt) {
        paginator.setProductsPerPage(evt.target.value);
    }
    return (
        <div className="product-display">
            <Link to="/new-product">
                <Button color="success">+</Button>
            </Link>
            <Paginator />
            <div className="product-display__products-per-page">
                Products per page
                <Input type="select" value={paginator.productPerPage} onChange={handleProductPerPageChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </Input>
            </div>
            <ProductTable />
        </div>
    )
}



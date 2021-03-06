import React, { useContext, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { PRODUCT_DETAILS_ACTIONS } from '../../engine/reducers/productDetails';
import api from '../../engine/api';

import { MainContext } from '../../engine/ContextWrapper';

export const ProductForm = () => {
    const {productId} = useParams();
    const { products, categories, selectedProductInfo, productInfoDispatch, updateProducts } = useContext(MainContext);
    const routerHistory = useHistory();
    useEffect(() => {
        const selectedProduct = products.find(({ID}) => productId === ID);
        if (selectedProduct) {
            productInfoDispatch({
                type: PRODUCT_DETAILS_ACTIONS.CREATE,
                payload: selectedProduct
            });
            return;
        }
        productInfoDispatch({
            type: PRODUCT_DETAILS_ACTIONS.RESET
        });
    }, [products, productId, productInfoDispatch]);
    
    function submitForm(evt) {
        evt.preventDefault();
        if (!productId) {
            api.createProduct(selectedProductInfo).then(() => {
                updateProducts();
                productInfoDispatch({
                    type: PRODUCT_DETAILS_ACTIONS.RESET
                });
                routerHistory.push('/');
            });
            return;
        }
        alert('I had no time to implement the update');
    }

    function onCategoryChange(evt) {
        productInfoDispatch({
            type: PRODUCT_DETAILS_ACTIONS.UPDATE_CATEGORY_ID,
            payload: evt.target.value
        });
    }

    function onNameChange(evt) {
        productInfoDispatch({
            type: PRODUCT_DETAILS_ACTIONS.UPDATE_NAME,
            payload: evt.target.value
        });
    }

    function onDescriptionChange(evt) {
        productInfoDispatch({
            type: PRODUCT_DETAILS_ACTIONS.UPDATE_DESCRIPTION,
            payload: evt.target.value
        });
    }

    function onCreationDateChange(evt) {
        onParamChange(evt, PRODUCT_DETAILS_ACTIONS.UPDATE_CREATION_DATE);
    }

    function onParamChange(evt, actionType) {
        productInfoDispatch({
            type: actionType,
            payload: evt.target.value
        });
    }
    return (
        <div>
            <Link to="/">
                <Button color="danger">HOME</Button>
            </Link>
            <Form onSubmit={submitForm}>
                <FormGroup>
                    <Label for="product-category">Category</Label>
                    <Input type="select" id="product-category" value={selectedProductInfo?.CATEGORY_ID} onChange={onCategoryChange}>
                        {categories.map(category => <option key={category.ID} value={category.ID}>{category.CATEGORY_NAME}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="product-name">Name</Label>
                    <Input type="text" id="product-name" placeholder="Your product name" value={selectedProductInfo?.NAME || ''} onChange={onNameChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="product-description">Description</Label>
                    <Input type="text" id="product-description" placeholder="..." value={selectedProductInfo?.DESCRIPTION || ''} onChange={onDescriptionChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="creation-date">Creation Date</Label>
                    <Input type="datetime-local" id="creation-date" value={selectedProductInfo?.CREATION_DATE || ''} onChange={onCreationDateChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="last-purchase-date">Update Date</Label>
                    <Input type="datetime-local" id="last-purchase-date" value={selectedProductInfo?.UPDATE_DATE || ''} onChange={event => onParamChange(event, PRODUCT_DETAILS_ACTIONS.UPDATE_UPDATE_DATE)} />
                </FormGroup>
                <FormGroup>
                    <Label for="update-date">Last purchase Date</Label>
                    <Input type="datetime-local" id="update-date" value={selectedProductInfo?.LAST_PURCHASE_DATE || ''} onChange={event => onParamChange(event, PRODUCT_DETAILS_ACTIONS.UPDATE_LAST_PURCHASE_DATE)} />
                </FormGroup>
                <FormGroup>
                    {productId ?
                        <Button color="primary">UPDATE</Button> :
                        <Button color="success">CREATE</Button>
                    }
                    <Button color="info" type="reset">Cancel</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

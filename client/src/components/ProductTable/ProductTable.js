import React, { useContext } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MainContext } from '../../engine/ContextWrapper';
import { SortingTh } from '../SortingTh/SortingTh';

export const ProductTable = () => {
    const {
        paginator,
        products,
        deleteProduct,
        tableSort
    } = useContext(MainContext);
    const productsToShow = products.sort((p1, p2) => {
        const sortValue1 = p1[tableSort.key];
        const sortValue2 = p2[tableSort.key];
        if (sortValue1>sortValue2) {
            return tableSort.direction;
        }
        if (sortValue1 < sortValue2) {
            return -tableSort.direction;
        }
        return 0;
    }).slice((paginator.page - 1) * paginator.productsPerPage, paginator.page * paginator.productsPerPage);
    
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <SortingTh sortKey="CATEGORY">Category</SortingTh>
                    <SortingTh sortKey="NAME">Product</SortingTh>
                    <SortingTh sortKey="DESCRIPTION">Description</SortingTh>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {productsToShow.map((product, increment) => <tr key={product.ID}>
                    <td>{(paginator.page - 1) * paginator.productsPerPage + increment + 1}</td>
                    <td>{product.ID}</td>
                    <td>{product.CATEGORY}</td>
                    <td>{product.NAME}</td>
                    <td>{product.DESCRIPTION}</td>
                    <td>
                        <Link to={`/edit-product/${product.ID}`}>
                            <Button color="warning">update</Button>
                        </Link>
                    </td>
                    <td>
                        <Button color="danger" onClick={() => deleteProduct(product.ID)}>delete</Button>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    )
}

import React, { useContext } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { MainContext } from '../../engine/ContextWrapper';

export const Paginator = () => {
    const {
        paginator
    } = useContext(MainContext);

    function goToPage(pageToGo) {
        paginator.setProductPage(pageToGo);
    }

    const isFirstPage = paginator.page === 1;
    const isLastPage = paginator.page >= paginator.lastPage;
    return (
        <>
        <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={isFirstPage}>
                <PaginationLink first onClick={() => goToPage(1)} />
            </PaginationItem>
            <PaginationItem disabled={isFirstPage} onClick={() => goToPage(paginator.page-1)}>
                <PaginationLink previous />
            </PaginationItem>

            <PaginationItem>
                <PaginationLink>
                    { paginator.page }
                </PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={isLastPage}>
                <PaginationLink next onClick={() => goToPage(paginator.page+1)} />
            </PaginationItem>
            <PaginationItem disabled={isLastPage}>
                <PaginationLink last onClick={() => goToPage(paginator.lastPage)}/>
            </PaginationItem>
        </Pagination>
        </>
    )
}

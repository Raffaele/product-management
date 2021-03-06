import React, { useContext } from 'react';
import './SortingTh.scss';

import { MainContext } from '../../engine/ContextWrapper';

export const SortingTh = (props) => {
    const { tableSort, setTableSortKey } = useContext(MainContext);
    
    const {children, sortKey} = props;
    const isSelected = sortKey === tableSort.key;
    const isReverse = tableSort.direction === -1;
    const classes = [
        'sorting-th',
        isSelected && 'sorting-th--selected',
        isReverse && 'sorting-th--reverse'
    ].filter(x => x).join(' ');

    function setSortKey() {
        setTableSortKey(sortKey);
    }
    return (
        <th className={classes} onClick={setSortKey}>
            {children}
        </th>
    )
}

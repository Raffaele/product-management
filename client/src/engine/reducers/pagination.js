const PAGINATION_DEFAULT = {
    page: 1,
    productsPerPage: 5,
    lastPage: 1
};

const ACTION_PREFIX = 'PAGINATION';

export const PAGINATION_ACTIONS = {
    RESET: `${ACTION_PREFIX}:RESET`,
    GO_TO_NEXT_PAGE: `${ACTION_PREFIX}:GO_TO_NEXT_PAGE`,
    GO_TO_PREV_PAGE: `${ACTION_PREFIX}:GO_TO_PREV_PAGE`,
    GO_TO_PAGE: `${ACTION_PREFIX}:GO_TO_PAGE`,
    SET_PRODUCTS_PER_PAGE: `${ACTION_PREFIX}:SET_PRODUCTS_PER_PAGE`,
    SET_LAST_PAGE: `${ACTION_PREFIX}:SET_LAST_PAGE`,
};

export function paginationReducer(state = {...PAGINATION_DEFAULT}, action) {
    switch(action?.type) {
        case PAGINATION_ACTIONS.RESET:
            return { ...PAGINATION_DEFAULT };
        case PAGINATION_ACTIONS.GO_TO_NEXT_PAGE:
            return { ...state, page: state.page + 1 };
        case PAGINATION_ACTIONS.GO_TO_PREV_PAGE:
            return { ...state, page: state.page - 1 };
        case PAGINATION_ACTIONS.GO_TO_PAGE:
            return { ...state, page: parseInt(action.payload) };
        case PAGINATION_ACTIONS.SET_PRODUCTS_PER_PAGE:
            return { ...state, productsPerPage: parseInt(action.payload) };
        case PAGINATION_ACTIONS.SET_LAST_PAGE:
            return { ...state, lastPage: parseInt(action.payload) };
        default:
            return {...state};
    }
};
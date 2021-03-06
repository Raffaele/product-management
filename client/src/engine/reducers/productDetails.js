const PRODUCT_INFO_DEFAULT = {
    NAME: '',
    DESCRIPTION: '',
    CATEGORY_ID: 1,
    CREATION_DATE: '',
    UPDATE_DATE: '',
    LAST_PURCHASE_DATE: ''
};

const ACTION_PREFIX = 'NEW_PRODUCT';

export const PRODUCT_DETAILS_ACTIONS = {
    RESET: `${ACTION_PREFIX}:RESET`,
    UPDATE_NAME: `${ACTION_PREFIX}:UPDATE_NAME`,
    UPDATE_DESCRIPTION: `${ACTION_PREFIX}:UPDATE_DESCRIPTION`,
    UPDATE_CATEGORY_ID: `${ACTION_PREFIX}:CATEGORY_ID`,
    UPDATE_CREATION_DATE: `${ACTION_PREFIX}:CREATION_DATE`,
    UPDATE_UPDATE_DATE: `${ACTION_PREFIX}:UPDATE_DATE`,
    UPDATE_LAST_PURCHASE_DATE: `${ACTION_PREFIX}:LAST_PURCHASE_DATE`,
    CREATE: `${ACTION_PREFIX}:CREATE`,
};

export function productInfoReducer(state = {...PRODUCT_INFO_DEFAULT}, action) {
    switch(action?.type) {
        case PRODUCT_DETAILS_ACTIONS.RESET:
            return { ...PRODUCT_INFO_DEFAULT };
        case PRODUCT_DETAILS_ACTIONS.UPDATE_NAME:
            return { ...state, NAME: action.payload };
        case PRODUCT_DETAILS_ACTIONS.UPDATE_DESCRIPTION:
            return { ...state, DESCRIPTION: action.payload };
        case PRODUCT_DETAILS_ACTIONS.UPDATE_CATEGORY_ID:
            return { ...state, CATEGORY_ID: action.payload };
        case PRODUCT_DETAILS_ACTIONS.UPDATE_CREATION_DATE:
            return { ...state, CREATION_DATE: action.payload };
        case PRODUCT_DETAILS_ACTIONS.UPDATE_UPDATE_DATE:
            return { ...state, UPDATE_DATE: action.payload };
        case PRODUCT_DETAILS_ACTIONS.UPDATE_LAST_PURCHASE_DATE:
            return { ...state, LAST_PURCHASE_DATE: action.payload };
        case PRODUCT_DETAILS_ACTIONS.CREATE:
            return { ...action.payload };
        default:
            return {...state};
    }
};
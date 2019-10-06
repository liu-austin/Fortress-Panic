// jshint esversion: 6
// import { SHOP_DATA } from '../../pages/shop/shop.data';
import CollectionActionTypes from './collection.types';

const INITIAL_STATE = {
    collections: null
};

const collectionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CollectionActionTypes.UPDATE_COLLECTIONS:
            return ({
                ...state,
                collections: action.payload
            });
        default:
            return state;
    }
};

export default collectionReducer;
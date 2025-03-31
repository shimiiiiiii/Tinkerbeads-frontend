import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './Reducers/productReducer';
import cartReducer from './Reducers/cartReducer';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk) 
);

export default store;
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './Reducers/productReducer';
import cartReducer from './Reducers/cartReducer';
import reviewReducer from './Reducers/reviewReducer';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    reviews: reviewReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk) 
);

export default store;
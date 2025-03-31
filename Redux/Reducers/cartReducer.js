import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    TOGGLE_SELECTION,
    CLEAR_CART,
    SET_SELECTED_ITEMS_FOR_CHECKOUT,
    SET_CART_ITEMS, 
} from '../Actions/cartAction';

const initialState = {
    cartItems: [],
    cartCount: 0,
    selectedItemsForCheckout: [], 
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingCartItemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id && item.userId === action.payload.userId
            );
        
            if (existingCartItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingCartItemIndex] = {
                    ...updatedCartItems[existingCartItemIndex],
                    quantity: updatedCartItems[existingCartItemIndex].quantity + action.payload.quantity,
                };
        
                return {
                    ...state,
                    cartItems: updatedCartItems,
                    cartCount: state.cartCount + action.payload.quantity,
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, selected: true }],
                    cartCount: state.cartCount + action.payload.quantity,
                };
            }
        case REMOVE_FROM_CART:
            const removedItem = state.cartItems.find(item => item.id === action.payload);
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
                cartCount: removedItem ? state.cartCount - removedItem.quantity : state.cartCount
            };

        case UPDATE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item
                ),
                cartCount: state.cartItems.reduce((total, item) =>
                    item.id === action.payload.id
                        ? total + action.payload.quantity
                        : total + item.quantity, 0
                ),
            };

        case TOGGLE_SELECTION:
            const updatedCartItems = state.cartItems.map(item => {
                if (item.id === action.payload) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });

            return {
                ...state,
                cartItems: updatedCartItems
            };

        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
                cartCount: 0
            };

        case SET_SELECTED_ITEMS_FOR_CHECKOUT:
            return {
                ...state,
                selectedItemsForCheckout: action.payload
            };

        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
                cartCount: action.payload.reduce((total, item) => total + item.quantity, 0),
            };

        default:
            return state;
    }
};

export default cartReducer;
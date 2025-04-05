// import {
//     ADD_TO_CART,
//     REMOVE_FROM_CART,
//     UPDATE_QUANTITY,
//     TOGGLE_SELECTION,
//     CLEAR_CART,
//     SET_SELECTED_ITEMS_FOR_CHECKOUT,
//     SET_CART_ITEMS,
//     PLACE_ORDER, 
//     FETCH_USER_ORDERS_REQUEST,
//     FETCH_USER_ORDERS_SUCCESS,
//     FETCH_USER_ORDERS_FAIL,
//     FETCH_ADMIN_ORDERS_REQUEST,
//     FETCH_ADMIN_ORDERS_SUCCESS,
//     FETCH_ADMIN_ORDERS_FAIL,
// } from '../Actions/cartAction';

// const initialState = {
//     cartItems: [],
//     cartCount: 0,
//     selectedItemsForCheckout: [],
//     userOrders: {
//         loading: false,
//         orders: [],
//         error: null,
//     },
//     adminOrders: {
//         loading: false,
//         orders: [],
//         error: null,
//     },
// };

// const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_TO_CART:
//             const existingCartItemIndex = state.cartItems.findIndex(
//                 item => item.id === action.payload.id && item.userId === action.payload.userId
//             );

//             if (existingCartItemIndex !== -1) {
//                 const updatedCartItems = [...state.cartItems];
//                 updatedCartItems[existingCartItemIndex] = {
//                     ...updatedCartItems[existingCartItemIndex],
//                     quantity: updatedCartItems[existingCartItemIndex].quantity + action.payload.quantity,
//                 };

//                 return {
//                     ...state,
//                     cartItems: updatedCartItems,
//                     cartCount: state.cartCount + action.payload.quantity,
//                 };
//             } else {
//                 return {
//                     ...state,
//                     cartItems: [...state.cartItems, { ...action.payload, selected: true }],
//                     cartCount: state.cartCount + action.payload.quantity,
//                 };
//             }

//         case REMOVE_FROM_CART:
//             const removedItem = state.cartItems.find(item => item.id === action.payload);
//             return {
//                 ...state,
//                 cartItems: state.cartItems.filter(item => item.id !== action.payload),
//                 cartCount: removedItem ? state.cartCount - removedItem.quantity : state.cartCount,
//             };

//         case UPDATE_QUANTITY:
//             return {
//                 ...state,
//                 cartItems: state.cartItems.map(item =>
//                     item.id === action.payload.id
//                         ? { ...item, quantity: Math.max(1, action.payload.quantity) }
//                         : item
//                 ),
//                 cartCount: state.cartItems.reduce((total, item) =>
//                     item.id === action.payload.id
//                         ? total + action.payload.quantity
//                         : total + item.quantity, 0
//                 ),
//             };

//         case TOGGLE_SELECTION:
//             const updatedCartItems = state.cartItems.map(item => {
//                 if (item.id === action.payload) {
//                     return { ...item, selected: !item.selected };
//                 }
//                 return item;
//             });

//             return {
//                 ...state,
//                 cartItems: updatedCartItems,
//             };

//         case CLEAR_CART:
//             return {
//                 ...state,
//                 cartItems: [],
//                 cartCount: 0,
//             };

//         case SET_SELECTED_ITEMS_FOR_CHECKOUT:
//             return {
//                 ...state,
//                 selectedItemsForCheckout: action.payload,
//             };

//         case SET_CART_ITEMS:
//             return {
//                 ...state,
//                 cartItems: action.payload,
//                 cartCount: action.payload.reduce((total, item) => total + item.quantity, 0),
//             };

//         case PLACE_ORDER:
//             return {
//                 ...state,
//                 cartItems: [],
//                 cartCount: 0,
//                 selectedItemsForCheckout: [],
//             };

//         // Fetch user orders
//         case FETCH_USER_ORDERS_REQUEST:
//             return {
//                 ...state,
//                 userOrders: { ...state.userOrders, loading: true, error: null },
//             };
//         case FETCH_USER_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 userOrders: { loading: false, orders: action.payload, error: null },
//             };
//         case FETCH_USER_ORDERS_FAIL:
//             return {
//                 ...state,
//                 userOrders: { loading: false, orders: [], error: action.payload },
//             };

//         // Fetch admin orders
//         case FETCH_ADMIN_ORDERS_REQUEST:
//             return {
//                 ...state,
//                 adminOrders: { ...state.adminOrders, loading: true, error: null },
//             };
//         case FETCH_ADMIN_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 adminOrders: { loading: false, orders: action.payload, error: null },
//             };
//         case FETCH_ADMIN_ORDERS_FAIL:
//             return {
//                 ...state,
//                 adminOrders: { loading: false, orders: [], error: action.payload },
//             };

//         default:
//             return state;
//     }
// };

// export default cartReducer;

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    TOGGLE_SELECTION,
    CLEAR_CART,
    SET_SELECTED_ITEMS_FOR_CHECKOUT,
    SET_CART_ITEMS,
    PLACE_ORDER,
    FETCH_USER_ORDERS_REQUEST,
    FETCH_USER_ORDERS_SUCCESS,
    FETCH_USER_ORDERS_FAIL,
    FETCH_ADMIN_ORDERS_REQUEST,
    FETCH_ADMIN_ORDERS_SUCCESS,
    FETCH_ADMIN_ORDERS_FAIL,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAIL,
} from '../Actions/cartAction';

const initialState = {
    cartItems: [],
    cartCount: 0,
    selectedItemsForCheckout: [],
    userOrders: {
        loading: false,
        orders: [],
        error: null,
    },
    adminOrders: {
        loading: false,
        orders: [],
        error: null,
    },
    updateOrderStatus: {
        loading: false,
        success: false,
        error: null,
    },
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
                cartCount: removedItem ? state.cartCount - removedItem.quantity : state.cartCount,
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
                cartItems: updatedCartItems,
            };

        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
                cartCount: 0,
            };

        case SET_SELECTED_ITEMS_FOR_CHECKOUT:
            return {
                ...state,
                selectedItemsForCheckout: action.payload,
            };

        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
                cartCount: action.payload.reduce((total, item) => total + item.quantity, 0),
            };

        case PLACE_ORDER:
            return {
                ...state,
                cartItems: [],
                cartCount: 0,
                selectedItemsForCheckout: [],
            };

        // Fetch user orders
        case FETCH_USER_ORDERS_REQUEST:
            return {
                ...state,
                userOrders: { ...state.userOrders, loading: true, error: null },
            };
        case FETCH_USER_ORDERS_SUCCESS:
            return {
                ...state,
                userOrders: { loading: false, orders: action.payload, error: null },
            };
        case FETCH_USER_ORDERS_FAIL:
            return {
                ...state,
                userOrders: { loading: false, orders: [], error: action.payload },
            };

        // Fetch admin orders
        case FETCH_ADMIN_ORDERS_REQUEST:
            return {
                ...state,
                adminOrders: { ...state.adminOrders, loading: true, error: null },
            };
        case FETCH_ADMIN_ORDERS_SUCCESS:
            return {
                ...state,
                adminOrders: { loading: false, orders: action.payload, error: null },
            };
        case FETCH_ADMIN_ORDERS_FAIL:
            return {
                ...state,
                adminOrders: { loading: false, orders: [], error: action.payload },
            };

        // Update order status
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                updateOrderStatus: { loading: true, success: false, error: null },
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                updateOrderStatus: { loading: false, success: true, error: null },
                adminOrders: {
                    ...state.adminOrders,
                    orders: state.adminOrders.orders.map(order =>
                        order._id === action.payload.orderId
                            ? { ...order, status: action.payload.status }
                            : order
                    ),
                },
            };
        case UPDATE_ORDER_STATUS_FAIL:
            return {
                ...state,
                updateOrderStatus: { loading: false, success: false, error: action.payload },
            };

        default:
            return state;
    }
};

export default cartReducer;
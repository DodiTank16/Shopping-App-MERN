import { ActionTypes } from "./Constants/action-types";

const initialState = {
	products: [],
	filterItem: [],
	filteredProductsByCategory: [],
	cart: [],
};

export const productsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_PRODUCTS:
			return { ...state, products: payload, filterItem: payload, filteredProductsByCategory: payload, };
		case ActionTypes.SEARCH_VALUES:
			return { ...state, filterItem: payload.products };
		case ActionTypes.FILTER_BY_CATEGORY:
			// console.log(payload.products);
			return { ...state, filteredProductsByCategory: payload.products };
		default:
			return state;
	}
};

export const handleCart = (state = initialState.cart, action) => {
	const product = action.payload;
	switch (action.type) {
		case ActionTypes.ADD_CART:
			const exist = state.find((x) => x.id === product.id);
			if (exist) {
				return state.map((x) =>
					x.id === product.id ? { ...x, qty: x.qty + 1 } : x
				);
			} else {
				const product = action.payload;

				return [...state, { ...product, qty: 1 }];
			}

		case ActionTypes.DELETE_CART:
			const exist1 = state.find((x) => x.id === product.id);
			if (exist1.qty === 1) {
				return state.filter((x) => x.id !== exist1.id);
			} else {

				return state.map((x) =>
					x.id === product.id ? { ...x, qty: x.qty - 1 } : x
				);
			}
		case ActionTypes.REMOVE_SELECTED_PRODUCT:
			console.log(initialState.cart);
			const exist2 = state.find((x) => x.id === product.id);
			if (exist2) {
				return state.filter((x) => x.id !== exist2.id);
			}
		default:
			return state;
	}
};
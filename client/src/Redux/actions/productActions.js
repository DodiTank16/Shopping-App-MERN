import { ActionTypes } from "../reducer/Constants/action-types";

export const setProducts = (products) => {
	return {
		type: ActionTypes.SET_PRODUCTS,
		payload: products,
	};
};

export const searchProduct = (products, search) => {
	// console.log(products);
	return {
		type: ActionTypes.SEARCH_VALUES,
		payload: {
			products: search === "" ? products : products.filter((item) => item.title.toLowerCase().includes(search.trimStart().toLowerCase()))
		}
	};
};

export const removeSelectedProduct = (products) => {
	return {
		type: ActionTypes.REMOVE_SELECTED_PRODUCT,
		payload: products,
	}
}

export const addCart = (products) => {
	// console.log(products);
	return {
		type: ActionTypes.ADD_CART,
		payload: products
	}
}

export const deleteCart = (products) => {
	return {
		type: ActionTypes.DELETE_CART,
		payload: products
	}
}

export const filterByCategory = (filterData, data) => {
	// console.log("filterData", filterData);
	return {
		type: ActionTypes.FILTER_BY_CATEGORY,
		payload: {
			products: data.filter((item) => filterData.includes(item.category)),
		},
	};
};

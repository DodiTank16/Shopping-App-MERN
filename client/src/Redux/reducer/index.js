import { combineReducers } from "redux";
import { productsReducer, handleCart } from "./productsReducer";

const reducer = combineReducers({
	allProducts: productsReducer,
	handleCart
});

export default reducer;

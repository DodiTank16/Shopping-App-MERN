import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from './Breadcrumb'
import Header from './Header'
import { addCart, deleteCart, removeSelectedProduct } from '../Redux/actions/productActions';
import { useNavigate } from 'react-router-dom';
import EmptyCart from "../Empty Cart.png"


const Cart = () => {
    const products = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("LoginToken");

    useEffect(() => {
        if (!token) navigate("/");
        document.title = "HomePage";
    }, []);

    const deleteProduct = (product) => {
        dispatch(deleteCart(product));
    };

    const handleAddButton = (product) => {
        dispatch(addCart(product));
    };

    const handleDeleteButton = (product) => {
        dispatch(deleteCart(product));
    };

    const deleteProductCart = (product) => {
        dispatch(removeSelectedProduct(product))
    }

    return (
        <>
            <Header />
            <Breadcrumb />
            <div className='container p-10 h-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
                {products && products.length ? (
                    products.map((item) => (
                        <>
                            {/* <div className=" flex p-10 h-100 min-w-max overflow">
                                <div className="max-w-sm rounded  shadow-lg bg-white">
                                    <img className="w-50 ml-24" src={item.image} alt={item.title} />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{item.title}</div>
                                        <p className="text-gray-700 text-base">
                                            {item.description}
                                        </p>
                                        <p className="text-gray-700 text-basemt-5" style={{ fontWeight: "600", color: "rgba(191, 34, 34, 1)", fontSize: 30 }}>
                                            Price: {item.price}$
                                        </p>
                                    </div>
                                    <div className="px-6">
                                        <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-full">
                                            +
                                        </button>
                                        <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-full">
                                            -
                                        </button>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <button className="inline-block bg-red-900 rounded-full py-2 px-4 text-sm font-semibold text-white mr-2 mb-2 ml-16"
                                            onClick={() => handleDeleteButton(item)}>
                                            Remove from Cart
                                        </button>
                                    </div>
                                </div>
                            </div> */}

                            <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <img className="p-8 rounded-t-lg max-h-60 w-3/5 block ml-auto mr-auto" src={item.image} alt={item.title} />
                                <div className="px-5 pb-5">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{item.rating.rate}</span>
                                    </div>
                                    <p className="text-gray-700 text-base">
                                        {item.description}
                                    </p>
                                    <div className="flex px-1 mt-3 mb-3">
                                        <span className="text-3xl mr-5 font-bold text-gray-900 dark:text-white">${item.price * item.qty}</span>
                                        <button className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-1 mr-1 rounded-full"
                                            onClick={() => handleAddButton(item)}
                                        >
                                            +
                                        </button>
                                        <input
                                            type="text"
                                            className="form-control block mr-1 w-16 px-3 py-1.5 text-base font-normal text-gray-700 bg-gray bg-clip-padding border border-solid border-indigo-500/100 rounded transition ease-in-out m-0
                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            disabled
                                            value={item.qty}

                                        />
                                        <button className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-full"
                                            onClick={() => handleDeleteButton(item)}>
                                            -
                                        </button>
                                    </div>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 ml-16 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={() => deleteProductCart(item)}>
                                        Delete</button>

                                </div>
                            </div>
                        </>
                    ))
                ) : (
                    <div className='flex justify-center items-center h-screen w-screen '>
                        {/* <div className='mt-5 ml-60 pl-60'> */}
                        <div
                            className="flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                            title="Mountain"
                        >
                            <img src={EmptyCart} alt='Cart is Empty' className='pl-20' />

                            <p className='text-white text-2xl h-fit'>Your Cart is Empty..!</p>
                            <p>Looks like you have not added anyting to your cart.Go ahead and explore top items. </p>
                        </div>
                    </div>
                    // </div>
                )
                }
            </div>
        </>
    )
}

export default Cart
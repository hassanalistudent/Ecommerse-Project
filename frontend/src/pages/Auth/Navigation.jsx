import React from 'react'
import {
    AiOutlineHome, AiOutlineShopping, AiOutlineLogin
    , AiOutlineUserAdd, AiOutlineShoppingCart
} from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation,useLogoutMutation } from '../../redux/api/usersApiSlice.js'
import { logout } from '../../redux/features/auth/authSlice.js';
import FavoritesCount from '../Products/FavoritesCount.jsx';

const Navigation = () => {
    const { userInfo } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    };
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    };

    const closeSidebar = () => {
        setShowSidebar(false)
    };
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ logoutApiCall ] = useLogoutMutation()
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout());
            navigate('/login')


        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div
            style={{ zIndex: 999 }}
            className={`${showSidebar ? 'hidden' : 'flex'} xl:flex lg:flex md:hidden sm:hidden 
    flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
            id="navigation-container"
        >
            <div className="flex flex-col space-y-4">
                <Link to="/" className="flex items-center">
                    <AiOutlineHome className="mr-2" size={26} />
                    <span className="hidden nav-item-name">HOME</span>
                </Link>

                <Link to="/shop" className="flex items-center">
                    <AiOutlineShopping className="mr-2" size={26} />
                    <span className="hidden nav-item-name">SHOP</span>
                </Link>

                <Link to="/cart" className="flex items-center">
                    <AiOutlineShoppingCart className="mr-2" size={26} />
                    <span className="hidden nav-item-name">CART</span>
                    
                        {cartItems.length > 0 && (
                        
                            <span className='absolute left-4 px-1 py-0 text-sm text-white bg-pink-500 rounded-full'>
                                {cartItems.reduce((a,c)=>a+c.qty,0)}
                            </span>
                        
                    )}
           
                </Link>

                <Link to="/favorite" className="flex items-center">
                    <FaHeart className="mr-2" size={26} />
                    <span className="hidden nav-item-name">FAVOURITE</span>{""}
                    <FavoritesCount/>
                </Link>
            </div>

            <div className='relative'>
                <button onClick={toggleDropdown} className='flex items-center
                text-gray-8000 focus:outlline-none'>
                    {userInfo ? <span className='text-white'>{userInfo.username}</span> : (<></>)}
                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 m-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg>
                    )}
                </button>
                {dropdownOpen && userInfo && (
                    <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white 
                    text-gray-600 ${!userInfo.isadmin ? "-top-30" : "-top-90"
                        }`}
                    >
                        {userInfo.isadmin && (
                            <>
                                <li>
                                    <Link to='/admin/dashboard'
                                        className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
                                </li>
                                <li>
                                    <Link to='/admin/productlist'
                                        className='block px-4 py-2 hover:bg-gray-100'>Products</Link>
                                </li>
                                <li>
                                    <Link to='/admin/categorylist'
                                        className='block px-4 py-2 hover:bg-gray-100'>Categories</Link>
                                </li>
                                <li>
                                    <Link to='/admin/orderlist'
                                        className='block px-4 py-2 hover:bg-gray-100'>Orders</Link>
                                </li>
                                <li>
                                    <Link to='/admin/userslist'
                                        className='block px-4 py-2 hover:bg-gray-100'>Users</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to='/profile'
                                className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/user-orders'
                                className='block px-4 py-2 hover:bg-gray-100'>My Orders</Link>
                        </li>
                        <li>
                            <Link onClick={logoutHandler}
                                className='block px-4 py-2 hover:bg-gray-100'>Logout</Link>
                        </li>
                    </ul>
                )}
            </div>
            {!userInfo && (
                <ul>
                    <li>
                        <Link to="/login" className="flex items-center">
                            <AiOutlineLogin className="mr-2" size={26} />
                            <span className="hidden nav-item-name">LOGIN</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="flex items-center">
                            <AiOutlineUserAdd className="mr-2" size={26} />
                            <span className="hidden nav-item-name">REGISTER</span>
                        </Link>
                    </li>
                </ul>
            )}
        </div>

    )

}

export default Navigation;
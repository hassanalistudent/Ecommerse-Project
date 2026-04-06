import {FaHeart,FaRegHeart} from 'react-icons/fa' 
import { useSelector,useDispatch } from 'react-redux'
import { addTOFavorites,removeFromFavorites,setfavorites } from '../redux/features/faviorite/favoriteSlice'
import { addFavoriteToLocalStorage,getFavoritesFromLocalStorage,removeFavoriteFromLocalStorage } from '../Utils/localStorage'
import Product from '../pages/Products/Product'
import { useEffect } from 'react'

const HeartIcon = ({product}) =>  {
    const dispatch = useDispatch()
    const favorites = useSelector((state)=>state.favorites)||[]
    const isFavorite = favorites.some((p) => p._id == product._id)

    useEffect(()=>{
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setfavorites(favoritesFromLocalStorage));
    },[]);
    const toggleFavorites = ()=> {
        if (isFavorite) {
           dispatch(removeFromFavorites(product)) 
           /// remove product from localstorage
           removeFavoriteFromLocalStorage(product._id);
        }else{
            dispatch(addTOFavorites(product));
            /// add item to localstorage
            addFavoriteToLocalStorage(product);
        }
    }
  return (
    <div onClick={toggleFavorites} className='absolute top-2 right-5 cursor-pointer'>
    {isFavorite?(<FaHeart  className='text-pink-500'/>):(
        <FaRegHeart className='text-white'/>
    )}
    </div>
  )
}

export default HeartIcon
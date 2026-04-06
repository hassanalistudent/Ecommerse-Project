import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from '../../components/Message'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import {FaBox,FaClock,FaShoppingCart,FaStar,FaStore} from 'react-icons/fa'

const ProductCarousel = () => {
   const {data:products,isLoading,error} = useGetTopProductsQuery()
   const settings = {
    dots:false,
    Infinite:true,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    arrows:true,
    autoplay:true,
    autoplaySpeed:3000,
   }

  return (
    <div className="mb-4 xl:block lg:block md:block">
        {isLoading? null:error?(<Message variant={'danger'}>
            {error?.data?.message|| error.message}
        </Message>):
        <Slider {...settings} className="xl:w-[35rem] lg:w-[45rem] md:w-[40rem] sm:w-[35rem] sm:block">
            {
                products.map(({image,_id,name,price,description,brand,createdAt,numReviews,
                    rating,quantity,countInStock })=> (
                    <div key={_id}>
                       <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem]" />
                       <div className="flex justify-between w-[20rem]">
                        <div className="one">
                            <h2>{name}</h2>
                            <p>${price}</p><br />
                            <p className="w-[20rem]">{description.substring(0,170)}...</p>
                        </div>
                        <div className="flex justify-between gap-10 w=[30rem]">
                            <div className="one">
                                <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaStore className="mr-2 text-black w-[2rem]"/> Brand:{" "}{brand}
                                </h1>
                                 <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaClock className="mr-2 text-black w-[2rem]"/> Added:{" "}{moment(createdAt).fromNow()}
                                </h1>
                                 <h1 className="flex items-center mb-6 w-[7rem]">
                                    <FaStar className="mr-2 text-black "/> Reviews:{" "}{numReviews}
                                </h1>
                            </div>
                            <div className="two">
                                <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaStar className="mr-2 text-black "/>Rating:{" "}{Math.round(rating)}
                                </h1>
                                <h1 className="flex items-center mb-6 ">
                                    <FaShoppingCart className="mr-2 text-black w-[1rem]"/>Quantity:{" "}{Math.round(quantity)}
                                </h1>
                                <h1 className="flex items-center mb-6 w-[6rem]">
                                    <FaBox className="mr-2 text-black "/>In Stock:{" "}{Math.round(countInStock)}
                                </h1>
                            </div>
                        </div>
                       </div>
                    </div>

                ))
            }
        </Slider>
        }
    </div>
  )
}

export default ProductCarousel
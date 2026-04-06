import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import Rating from "./Rating";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

 

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch()
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data?.error || error?.data?.message || error.message);
    }
  };
const addToCartHandler =()=>{
     dispatch(addToCart({...product,qty}))
     navigate('/cart')
}


  return (
    <>
      <div>
        <Link
          to="/"
          className="font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          {/* Product block: image + details side by side */}
          <div className="flex items-start mt-[2rem] ml-[10rem] gap-8">
            {/* Left: product image */}
            <div className="flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-[30rem] h-[20rem] object-cover rounded"
              />
            </div>

            {/* Right: product details */}
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#b0b0b0]">
                {product.description}
              </p>
              <p className="text-5xl my-4 font-extrabold">${product.price}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div>
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaClock className="mr-2" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2" /> Reviews: {product.numReviews}
                  </h1>
                </div>
                <div>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2" /> Ratings: {product.rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2" /> In Stock: {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap mt-4">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/* Tabs directly under the whole product block */}
          <div className="mt-[5rem] ml-[10rem] w-full">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
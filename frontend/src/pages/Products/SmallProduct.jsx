import { Link } from "react-router"
import Product from "./Product";
import HeartIcon from "../../components/HeartIcon";

const SmallProduct = ({product}) => {
    return(
        <div className="w-[20rem] ml-[2rem] p-3">
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object_cover rounded"/>
                <HeartIcon product={product}/>
                <div className="p-4">
                    <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between">
                        <div>
                            {product.name}
                        </div>
                        <span className=" bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 
                        rounded-full dark:bg-pink-900 dark:text-pink-300">
                            ${product.price}
                        </span>
                    </h2>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default SmallProduct;

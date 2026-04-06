import { Link } from "react-router";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3 md:w-3/4">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Products ({products.length})
          </div>

          {/* ✅ Grid layout: 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex border rounded-lg p-4 shadow-sm"
              >
                {/* Image on the left */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-md mr-4"
                />

                {/* Details on the right */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold">{product?.name}</h5>
                    <p className="text-gray-400 text-sm">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>

                  <p className=" font-bold mt-1">
                    ${product?.price}
                  </p>

                  <p className="text-gray-600 text-sm mt-2 mb-4">
                    {product?.description?.substring(0, 100)}...
                  </p>

                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300"
                  >
                    Update Product
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0l-4-4m4 4l-4 4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin menu on the right */}
        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

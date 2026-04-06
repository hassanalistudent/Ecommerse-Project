import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setChecked, setProducts } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  const [priceFilter, setPriceFilter] = useState("");

  // Load categories
  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  // Load products initially and apply filters
  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      let filteredProducts = filteredProductsQuery.data;

      // Apply category filter
      if (checked.length) {
        filteredProducts = filteredProducts.filter((product) =>
          checked.includes(product.category) // adjust field name if needed
        );
      }

      // Apply brand filter
      if (radio.length) {
        filteredProducts = filteredProducts.filter((product) =>
          radio.includes(product.brand)
        );
      }

      // Apply price filter
      if (priceFilter) {
        filteredProducts = filteredProducts.filter((product) => {
          return (
            product.price?.toString().includes(priceFilter) ||
            product.price === Number(priceFilter)
          );
        });
      }

      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, priceFilter, filteredProductsQuery.data, filteredProductsQuery.isLoading, dispatch]);

  // Handle category checkbox
  const handlecheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Handle brand radio
  const handleBrandClick = (brand) => {
    // Instead of filtering directly, store brand in radio state
    dispatch(setProducts([])); // optional clear
    // If you have a setRadio action, use that:
    // dispatch(setRadio([brand]))
    // Otherwise filter directly:
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  // Unique brands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          {/* Sidebar Filters */}
          <div className="bg-[#151515] text-white border p-3 mt-2 mb-2">
            <h2 className="h-4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div className="mb-2" key={c._id}>
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={`cat-${c._id}`}
                      onChange={(e) => handlecheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded 
                        focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 
                        focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`cat-${c._id}`}
                      className="ml-2 text-sm font-medium dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h-4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Brand
            </h2>
            <div className="p-5">
              {uniqueBrands?.length > 0 ? (
                uniqueBrands.map((brand) => (
                  <div key={brand} className="flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                    />
                    <label
                      htmlFor={brand}
                      className="ml-2 text-sm font-medium"
                    >
                      {brand}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No brands available</p>
              )}
            </div>

            <h2 className="h-4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full bg-white px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="p-3">
            <h2 className="h-4 text-center font-bold mb-2">
              ({products?.length}) Products
            </h2>
            <div className="flex flex-wrap">
              {filteredProductsQuery.isLoading ? (
                <Loader />
              ) : products.length === 0 ? (
                <div>No Product Available</div>
              ) : (
                products.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
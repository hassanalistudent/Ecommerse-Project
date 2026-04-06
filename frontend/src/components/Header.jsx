import { useGetTopProductsQuery } from '../redux/api/productApiSlice'
import Loader from './Loader';
import SmallProduct from '../pages/Products/SmallProduct';
import ProductCarousel from '../pages/Products/ProductCarousel';

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  // Safely handle data shape
  const products = data?.products || data || [];

  return (
    <div className="container mx-auto px-4">
      {/* Two-column grid: left = product grid, right = carousel */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>

        {/* Product Carousel */}
        <div className="flex ml-[3rem] items-center justify-center">
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;

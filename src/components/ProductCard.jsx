import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to add items to wishlist');
      navigate('/login');
      return;
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const discountedPrice = product.discountPercentage > 0
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <div 
      onClick={handleCardClick}
      className="card group cursor-pointer hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative bg-white aspect-square overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400?text=No+Image';
          }}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg transition-all z-10"
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
              isInWishlist(product.id) 
                ? 'fill-red-500 stroke-red-500' 
                : 'fill-none stroke-gray-600 hover:stroke-red-500'
            }`}
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold shadow-md">
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Category & Stock */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-xs font-semibold text-primary-600 uppercase tracking-wide">
            {product.category}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base mb-1.5 sm:mb-2 line-clamp-2 text-gray-900 min-h-[2.5rem] sm:min-h-[3rem]">
          {product.title}
        </h3>
        
        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.round(product.rating) 
                    ? 'text-yellow-500' 
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs sm:text-sm font-medium text-gray-700 ml-1 sm:ml-2">
              {product.rating.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-end justify-between border-t pt-2.5 sm:pt-4">
          <div className="flex-1">
            <div className="text-lg sm:text-2xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </div>
            {discountedPrice && (
              <div className="text-[10px] sm:text-sm text-gray-500 line-through">
                ${discountedPrice.toFixed(2)}
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary text-xs sm:text-sm py-1.5 px-3 sm:py-2 sm:px-4 whitespace-nowrap"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
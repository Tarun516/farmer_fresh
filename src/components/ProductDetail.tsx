import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wheat from "../assets/Wheat.jpg";
import Barley from "../assets/Barley.jpg";
import Maize from "../assets/Maize.jpg";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  unit: string;
  description: string;
  seller: string;
  location: string;
  type: string;
  inStock: boolean;
  reviews: Review[];
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const products: Product[] = [
    {
      id: 1,
      name: "Organic Maize",
      image: Maize,
      price: "₹60",
      unit: "kg",
      seller: "Cereal Grains",
      location: "Hyderabad, India",
      type: "grains",
      inStock: true,
      description:
        "Premium quality organic maize, perfect for both human consumption and animal feed.",
      reviews: [
        { user: "Priya", rating: 5, comment: "Great maize, very fresh!" },
        { user: "Rahul", rating: 4, comment: "Good taste." },
      ],
    },
    {
      id: 2,
      name: "Barley Grain",
      image: Barley,
      price: "₹45",
      unit: "kg",
      seller: "Cereal Grains",
      location: "Karimnagar, India",
      type: "grains",
      inStock: true,
      description:
        "High-quality barley grain, ideal for brewing and cooking purposes.",
      reviews: [
        {
          user: "Priya",
          rating: 5,
          comment: "Great barley, very fresh and pure!",
        },
        {
          user: "Rahul",
          rating: 4,
          comment: "Good quality, but slightly coarse grind.",
        },
      ],
    },
    {
      id: 3,
      name: "Wheat Grain",
      image: Wheat,
      price: "₹40",
      unit: "kg",
      seller: "Cereal Grains",
      location: "Warangal, India",
      type: "grains",
      inStock: false,
      description:
        "Premium quality wheat grain, perfect for making flour and various wheat-based products.",
      reviews: [
        {
          user: "Priya",
          rating: 5,
          comment: "Great wheat, very fresh and pure!",
        },
        {
          user: "Rahul",
          rating: 4,
          comment: "Good quality, but slightly coarse grind.",
        },
      ],
    },
  ];

  const [, setCart] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Product Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const addToCart = (product: Product) => {
    setCart((cart) => {
      const existingItem = cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...cart, { product, quantity }];
    });
  };

  const relatedProducts = products.filter(
    (p) => p.type === product.type && p.id !== product.id
  );

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const viewProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square rounded-lg transition duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="text-2xl font-semibold text-green-600 mt-2">
              {product.price} / {product.unit}
            </p>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          <div className="space-y-2">
            <p className="flex items-center text-gray-700">
              <span className="font-semibold mr-2">Seller:</span>
              {product.seller}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-semibold mr-2">Location:</span>
              {product.location}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            <button
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-white font-medium transition
                ${
                  product.inStock
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              onClick={() => product.inStock && addToCart(product)}
              disabled={!product.inStock}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {review.user}
                  </h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => viewProduct(relatedProduct.id)}
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-green-600 font-medium mt-1">
                    {relatedProduct.price} / {relatedProduct.unit}
                  </p>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {relatedProduct.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

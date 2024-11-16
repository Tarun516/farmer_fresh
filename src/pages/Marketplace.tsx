import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Filter, X, ShoppingBag } from "lucide-react";
import Wheat from "../assets/Wheat.jpg"
import Barley from "../assets/Barley.jpg"
import Maize from "../assets/Maize.jpg"

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  unit: string;
  seller: string;
  location: string;
  type: string;
  inStock: boolean;
  description: string;
}

interface Filters {
  productType: string;
  priceRange: string;
  location: string;
  availability: string;
}

interface SortOption {
  label: string;
  value: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
        <div className="absolute top-4 right-4">
          {product.inStock ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {product.name}
            </h3>
            <p className="text-green-600 text-xl font-bold mb-2">
              {product.price}
              <span className="text-sm text-gray-500 ml-1">
                per {product.unit}
              </span>
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100"
          >
            <ShoppingBag size={20} />
          </motion.button>
        </div>

        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <span>{product.seller}</span>
          <span>•</span>
          <span>{product.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Marketplace: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Organic Maize",
      image: Maize,
      price: "₹60",
      unit: "kg",
      seller: "Cereal Grains",
      location: "Hyderabad, India",
      type: "maize",
      inStock: true,
      description: "Premium quality organic maize, perfect for both human consumption and animal feed.",
    },
    {
      id: 2,
      name: "Barley Grain",
      image: Barley,
      price: "₹45",
      unit: "kg",
      seller: "Cereal Grains",
      location: "Karimnagar, India",
      type: "barley",
      inStock: true,
      description: "High-quality barley grain, ideal for brewing and cooking purposes.",
    },
    {
      id: 3,
      name: "Wheat Grain",
      image: Wheat,
      price: "₹40",
      unit: "kg",
      seller: "Cereal Grains",
      location: "Warangal, India",
      type: "wheat",
      inStock: false,
      description: "Premium quality wheat grain, perfect for making flour and various wheat-based products.",
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    productType: "",
    priceRange: "",
    location: "",
    availability: "",
  });
  const [sortOption] = useState<SortOption>({
    label: "Price: Low to High",
    value: "price-asc",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      productType: "",
      priceRange: "",
      location: "",
      availability: "",
    });
    setShowFilters(false);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        !filters.productType || product.type === filters.productType;
      const matchesLocation =
        !filters.location ||
        product.location.includes(filters.location);
      const matchesPriceRange = () => {
        if (!filters.priceRange) return true;
        const price = parseInt(product.price.replace("₹", ""));
        switch (filters.priceRange) {
          case "0-40":
            return price <= 40;
          case "40-50":
            return price > 40 && price <= 50;
          case "50+":
            return price > 50;
          default:
            return true;
        }
      };
      const matchesAvailability =
        !filters.availability ||
        (filters.availability === "in-stock"
          ? product.inStock
          : !product.inStock);

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation &&
        matchesPriceRange() &&
        matchesAvailability
      );
    })
    .sort((a, b) => {
      if (sortOption.value === "price-asc") {
        return (
          parseInt(a.price.replace("₹", "")) -
          parseInt(b.price.replace("₹", ""))
        );
      } else if (sortOption.value === "price-desc") {
        return (
          parseInt(b.price.replace("₹", "")) -
          parseInt(a.price.replace("₹", ""))
        );
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Grain Marketplace</h1>
          <p className="text-gray-600">
            Discover premium quality grains from trusted sellers across India
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for grains..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-transparent bg-white shadow-sm focus:border-green-500 focus:ring-0 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
            >
              <Filter size={20} className="mr-2" />
              Filters
            </motion.button>
          </div>

          {/* Expandable Filters Panel */}
          <motion.div
            initial={false}
            animate={{ height: showFilters ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white mt-4 p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grain Type
                  </label>
                  <select
                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-0"
                    value={filters.productType}
                    onChange={(e) =>
                      handleFilterChange("productType", e.target.value)
                    }
                  >
                    <option value="">All Grains</option>
                    <option value="maize">Maize</option>
                    <option value="barley">Barley</option>
                    <option value="wheat">Wheat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-0"
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                  >
                    <option value="">All Locations</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-0"
                    value={filters.priceRange}
                    onChange={(e) =>
                      handleFilterChange("priceRange", e.target.value)
                    }
                  >
                    <option value="">All Prices</option>
                    <option value="0-40">Under ₹40/kg</option>
                    <option value="40-50">₹40 - ₹50/kg</option>
                    <option value="50+">Above ₹50/kg</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-0"
                    value={filters.availability}
                    onChange={(e) =>
                      handleFilterChange("availability", e.target.value)
                    }
                  >
                    <option value="">All</option>
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleClearFilters}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <X size={16} className="mr-1" />
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
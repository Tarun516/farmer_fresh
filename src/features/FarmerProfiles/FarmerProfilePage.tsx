import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Leaf, ArrowLeft, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  unit: string;
}

interface FarmerProfileProps {
  farmers: {
    id: number;
    name: string;
    contact?: { phone: string; email: string };
    location: string;
    practices: string[];
    products: Product[];
  }[];
}

const FarmerProfilePage: React.FC<FarmerProfileProps> = ({ farmers }) => {
  const { farmerId } = useParams();
  const farmer = farmers.find((f) => f.id === parseInt(farmerId || ""));

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Farmer not found</h2>
          <Link
            to="/marketplace"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/marketplace"
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Marketplace
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Farmer Info Section */}
          <div className="lg:col-span-2 p-8">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{farmer.name}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{farmer.location}</span>
                </div>
              </div>

              {farmer.contact && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-3" />
                      <span>{farmer.contact.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-3" />
                      <span>{farmer.contact.email}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Farming Practices</h3>
                <div className="flex flex-wrap gap-2">
                  {farmer.practices.map((practice, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                    >
                      <Leaf className="w-4 h-4 mr-1" />
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3 bg-gray-50">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Available Products</h2>
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {farmer.products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={product.image || "/placeholder-image.jpg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-medium">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          per {product.unit}
                        </span>
                      </div>
                      <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FarmerProfilePage;
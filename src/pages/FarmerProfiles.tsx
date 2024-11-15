import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Leaf, ChevronRight, Users, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface Farmer {
  id: number;
  name: string;
  location: string;
  practices: string[];
  contact?: {
    phone: string;
    email: string;
  };
}

interface FarmerProfilesProps {
  farmers: Farmer[];
}

interface FarmerModalProps {
  farmer: Farmer;
  isOpen: boolean;
  onClose: () => void;
}

const FarmerModal: React.FC<FarmerModalProps> = ({ farmer, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">{farmer.name}</h2>
                    <div className="bg-green-50 rounded-full p-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{farmer.location}</span>
                    </div>
                    
                    {farmer.contact && (
                      <>
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{farmer.contact.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{farmer.contact.email}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Farming Practices</h3>
                    <div className="flex flex-wrap gap-2">
                      {farmer.practices.map((practice, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700"
                        >
                          {practice}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/farmer/${farmer.id}`}
                    className="group flex items-center justify-between w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <span className="font-medium">View Full Profile</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FarmerProfiles: React.FC<FarmerProfilesProps> = ({ farmers }) => {
  const [hoveredFarmer, setHoveredFarmer] = useState<Farmer | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Local Farmers</h2>
          <p className="mt-2 text-gray-600">Connect with sustainable farmers in your area</p>
        </div>
        <div className="bg-green-100 rounded-full p-3">
          <Users className="w-6 h-6 text-green-600" />
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {farmers.map((farmer) => (
          <motion.div
            key={farmer.id}
            variants={itemVariants}
            onHoverStart={() => setHoveredFarmer(farmer)}
            onHoverEnd={() => setHoveredFarmer(null)}
            onClick={() => setSelectedFarmer(farmer)}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{farmer.name}</h3>
                <div className="bg-green-50 rounded-full p-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{farmer.location}</span>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Farming Practices:</h4>
                <div className="flex flex-wrap gap-2">
                  {farmer.practices.slice(0, 3).map((practice, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700"
                    >
                      {practice}
                    </span>
                  ))}
                  {farmer.practices.length > 3 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-50 text-gray-600">
                      +{farmer.practices.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div
                className="group flex items-center justify-between w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                <span className="font-medium">Click to View Details</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {farmers.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-full p-4 inline-block mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Farmers Found</h3>
          <p className="text-gray-600">Check back later for updates or adjust your search criteria.</p>
        </div>
      )}

      {/* Hover Preview */}
      <AnimatePresence>
        {hoveredFarmer && !selectedFarmer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-white rounded-xl shadow-2xl p-6 max-w-sm z-30"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{hoveredFarmer.name}</h3>
                <div className="bg-green-50 rounded-full p-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                </div>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{hoveredFarmer.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {hoveredFarmer.practices.slice(0, 2).map((practice, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-50 text-green-700"
                  >
                    {practice}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-gray-500">Click card for full details</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Profile Modal */}
      {selectedFarmer && (
        <FarmerModal
          farmer={selectedFarmer}
          isOpen={!!selectedFarmer}
          onClose={() => setSelectedFarmer(null)}
        />
      )}
    </div>
  );
};

export default FarmerProfiles;
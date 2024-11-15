import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Leaf, 
  Bell,
  Search,
  ChevronRight,
  StarIcon,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserHomePage = () => {
  // Sample data - replace with actual data from your backend
  const recentOrders = [
    { id: 1, farmer: "Green Acres Farm", items: "Organic Vegetables", date: "2024-11-15", status: "Processing" },
    { id: 2, farmer: "Sunrise Dairy", items: "Fresh Milk, Cheese", date: "2024-11-14", status: "Delivered" },
  ];

  const upcomingDeliveries = [
    { id: 1, date: "Nov 17", farmer: "Fresh Fields Farm", items: "Seasonal Vegetables Box" },
    { id: 2, date: "Nov 18", farmer: "Happy Hens", items: "Farm Fresh Eggs" },
  ];

  const featuredFarmers = [
    { id: 1, name: "Valley View Organics", location: "Springfield Valley", rating: 4.8, specialty: "Organic Vegetables" },
    { id: 2, name: "Mountain Creek Dairy", location: "Highland Region", rating: 4.9, specialty: "Dairy Products" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="relative flex-1 max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Search for farmers, products, or categories..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-8 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
          <p className="text-green-50 mb-4">Support local farmers and eat fresh today.</p>
          <Link 
            to="/marketplace"
            className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200"
          >
            Browse Marketplace
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/marketplace" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <ShoppingBag className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Shop Now</span>
              </Link>
              <Link to="/farmer-profiles" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Users className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Find Farmers</span>
              </Link>
              <Link to="/orders" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Calendar className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">My Orders</span>
              </Link>
              <Link to="/map" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <MapPin className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Near Me</span>
              </Link>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link to="/orders" className="text-sm text-green-600 hover:text-green-700">View all</Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.farmer}</p>
                    <p className="text-sm text-gray-500">{order.items}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Deliveries */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Upcoming Deliveries</h2>
            <div className="space-y-4">
              {upcomingDeliveries.map(delivery => (
                <div key={delivery.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg mr-4">
                    <span className="font-medium">{delivery.date}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{delivery.farmer}</p>
                    <p className="text-sm text-gray-500">{delivery.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Featured Farmers Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Featured Farmers</h2>
            <Link to="/farmer-profiles" className="text-sm text-green-600 hover:text-green-700">
              View all farmers
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFarmers.map(farmer => (
              <motion.div
                key={farmer.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm p-6 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{farmer.name}</h3>
                    <div className="flex items-center mt-1 text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{farmer.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-yellow-700">{farmer.rating}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">{farmer.specialty}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-xl font-semibold text-gray-900">24</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Farmers Connected</p>
                <p className="text-xl font-semibold text-gray-900">8</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sustainability Score</p>
                <p className="text-xl font-semibold text-gray-900">92%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
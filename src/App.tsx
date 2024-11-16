import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import FarmerProfilePage from "./features/FarmerProfiles/FarmerProfilePage";
import LogisticIntegration from "./features/LogistcIntegration";
import EducationalResources from "./features/EducationalResources";
import BuyerAnalytics from "./features/Analytics/BuyerAnalytics";
import FarmerAnalytics from "./features/Analytics/FarmerAnalytics";
import FarmerProfiles from "./pages/FarmerProfiles";
import ProductDetail from "./components/ProductDetail";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/Orders";

function App() {
  const farmers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Warangal",
      practices: ["Traditional farming", "Crop rotation", "Organic practices"],
      products: [
        {
          id: 1,
          name: "Premium Wheat",
          image: "/wheat.jpg",
          price: "₹40",
          unit: "kg",
        },
        {
          id: 2,
          name: "Organic Barley",
          image: "/barley.jpg",
          price: "₹45",
          unit: "kg",
        },
      ],
    },
    {
      id: 2,
      name: "Suresh Patel",
      location: "Karimnagar",
      practices: ["Modern farming", "Sustainable agriculture", "Zero tillage"],
      products: [
        {
          id: 1,
          name: "Yellow Maize",
          image: "/maize.jpg",
          price: "₹35",
          unit: "kg",
        },
        {
          id: 2,
          name: "Pearl Millet (Bajra)",
          image: "/bajra.jpg",
          price: "₹50",
          unit: "kg",
        },
      ],
    },
    // Add more farmers here
  ];

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/farmer-profiles"
            element={<FarmerProfiles farmers={farmers} />}
          />
          <Route
            path="/farmer/:farmerId"
            element={<FarmerProfilePage farmers={farmers} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buyer-analytics" element={<BuyerAnalytics />} />
          <Route path="/farmer-analytics" element={<FarmerAnalytics />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/logistics" element={<LogisticIntegration />} />
          <Route
            path="/educational-resources"
            element={<EducationalResources />}
          />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

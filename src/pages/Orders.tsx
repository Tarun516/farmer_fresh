import  { useState } from 'react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  deliveryAddress: string;
  paymentMethod: string;
}

// Sample orders data - in a real app, this would come from an API
const sampleOrders: Order[] = [
  {
    id: "ORD001",
    date: "2024-03-15",
    status: "delivered",
    total: 2547,
    items: [
      {
        id: 1,
        name: "Product 1",
        quantity: 2,
        price: 999,
        image: "/api/placeholder/100/100"
      },
      {
        id: 2,
        name: "Product 2",
        quantity: 1,
        price: 499,
        image: "/api/placeholder/100/100"
      }
    ],
    deliveryAddress: "123 Main St, City, State, 12345",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD002",
    date: "2024-03-14",
    status: "processing",
    total: 1499,
    items: [
      {
        id: 3,
        name: "Product 3",
        quantity: 1,
        price: 1499,
        image: "/api/placeholder/100/100"
      }
    ],
    deliveryAddress: "456 Oak St, City, State, 12345",
    paymentMethod: "UPI"
  }
];

const OrdersPage = () => {
  const [orders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md">
              {/* Order Header */}
              <div className="border-b p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <p className="text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${getStatusColor(order.status)}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total: ₹{order.total}</span>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>

              {/* Order Details */}
              {selectedOrder?.id === order.id && (
                <div className="p-6 space-y-6">
                  {/* Items */}
                  <div>
                    <h3 className="font-semibold mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Delivery Address</h3>
                      <p className="text-gray-600">{order.deliveryAddress}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-gray-600">{order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      Download Invoice
                    </button>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
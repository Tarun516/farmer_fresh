import { useState } from "react";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Fresh Apples",
      price: 2.5,
      quantity: 3,
    },
    {
      id: 2,
      name: "Organic Carrots",
      price: 1.8,
      quantity: 2,
    },
    {
      id: 3,
      name: "Free-Range Eggs",
      price: 4.0,
      quantity: 1,
    },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const increaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-800">Your Cart</h2>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="mt-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Headers */}
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 pb-2 border-b">
                  <div className="col-span-4">Product</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 items-center py-4 border-b last:border-0"
                  >
                    <div className="col-span-4 font-medium">{item.name}</div>
                    <div className="col-span-2 text-right">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="col-span-3 flex items-center justify-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <MinusCircle className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="col-span-2 text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-lg font-semibold">Total</div>
                  <div className="text-2xl font-bold text-green-800">
                    ${calculateTotal().toFixed(2)}
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

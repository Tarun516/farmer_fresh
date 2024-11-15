import { useState, ChangeEvent } from 'react';

interface LogisticsOption {
  method: string;
  estimate: string;
  charges: number;
}

interface AddressForm {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  contact: string;
}

const logisticsOptions: LogisticsOption[] = [
  { method: "Home Delivery", estimate: "2-3 days", charges: 50 },
  { method: "Pickup", estimate: "Same day", charges: 0 },
];

const DeliveryOptions = () => {
  const [selectedOption, setSelectedOption] = useState<LogisticsOption | null>(null);
  const [address, setAddress] = useState<AddressForm>({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    contact: "",
  });

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Delivery Options */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Choose Delivery Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logisticsOptions.map((option) => (
              <div
                key={option.method}
                onClick={() => setSelectedOption(option)}
                className={`p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedOption?.method === option.method
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{option.method}</h3>
                <p className="text-gray-600 mb-2">Estimate: {option.estimate}</p>
                <p className="text-lg font-medium text-blue-600">
                  {option.charges === 0 ? "Free Delivery" : `₹${option.charges}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Address Form */}
      {selectedOption?.method === "Home Delivery" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "name", placeholder: "Full Name" },
              { name: "contact", placeholder: "Contact Number" },
              { name: "street", placeholder: "Street Address" },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "zip", placeholder: "ZIP Code" },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label 
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {field.name.replace("_", " ")}
                </label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={address[field.name as keyof AddressForm]}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Summary */}
      {selectedOption && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Delivery Method</span>
              <span className="font-medium">{selectedOption.method}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="font-medium text-blue-600">
                {selectedOption.charges === 0 ? "Free" : `₹${selectedOption.charges}`}
              </span>
            </div>
            {selectedOption.method === "Home Delivery" && address.street && (
              <div className="border-t pt-4">
                <p className="text-gray-600 mb-2">Delivery Address:</p>
                <p className="font-medium">
                  {address.name}
                  <br />
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zip}
                  <br />
                  {address.contact}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;
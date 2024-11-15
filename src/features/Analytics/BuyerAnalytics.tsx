import { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);

const BuyerAnalytics = () => {
  const [spendingData, setSpendingData] = useState<any>(null);
  const [purchaseHistoryData, setPurchaseHistoryData] = useState<any>(null);
  const [productPreferences, setProductPreferences] = useState<any>(null);
  const [marketTrends, setMarketTrends] = useState<any>(null);
  const [productInsights, setProductInsights] = useState<any>(null);
  const [orderHistory, setOrderHistory] = useState<any>(null);
  const [topSellers, setTopSellers] = useState<any>(null);

  useEffect(() => {
    // Dummy data setup (same as before)
    const dummySpendingData = {
      dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      spending: [200, 250, 280, 300, 350, 400, 420, 450, 500, 550, 600, 650]
    };

    const dummyPurchaseHistoryData = {
      totalSpent: 6200,
      averageSpendPerMonth: 516,
    };

    const dummyProductPreferences = [
      { productName: 'Apples', quantityPurchased: 50 },
      { productName: 'Tomatoes', quantityPurchased: 40 },
      { productName: 'Carrots', quantityPurchased: 35 },
      { productName: 'Bananas', quantityPurchased: 30 },
      { productName: 'Lettuce', quantityPurchased: 25 },
    ];

    const dummyMarketTrends = {
      popularProducts: ['Apples', 'Tomatoes', 'Bananas', 'Carrots', 'Lettuce'],
      averagePrices: {
        fruits: 3.5,
        vegetables: 2.0,
        dairy: 4.5,
      },
      seasonalDemand: {
        summer: ['Fruits', 'Tomatoes'],
        winter: ['Grains', 'Carrots'],
      },
    };

    const dummyProductInsights = {
      categoryDistribution: {
        fruits: 40,
        vegetables: 30,
        dairy: 20,
        grains: 10,
      },
      priceComparison: [
        { product: 'Apples', price: 3.5 },
        { product: 'Tomatoes', price: 2.0 },
        { product: 'Carrots', price: 2.2 },
      ],
    };

    const dummyOrderHistory = {
      totalSpent: 6200,
      frequentCategories: ['Fruits', 'Vegetables'],
    };

    const dummyTopSellers = [
      { seller: 'Farmer John', rating: 4.5, totalSales: 150 },
      { seller: 'Farmer Jane', rating: 4.7, totalSales: 200 },
      { seller: 'Farmer Bob', rating: 4.3, totalSales: 130 },
    ];

    setSpendingData(dummySpendingData);
    setPurchaseHistoryData(dummyPurchaseHistoryData);
    setProductPreferences(dummyProductPreferences);
    setMarketTrends(dummyMarketTrends);
    setProductInsights(dummyProductInsights);
    setOrderHistory(dummyOrderHistory);
    setTopSellers(dummyTopSellers);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const spendingChartData = {
    labels: spendingData?.dates || [],
    datasets: [
      {
        label: 'Monthly Spending',
        data: spendingData?.spending || [],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const categoryDistributionChartData = {
    labels: Object.keys(productInsights?.categoryDistribution || {}),
    datasets: [
      {
        label: 'Category Distribution',
        data: Object.values(productInsights?.categoryDistribution || {}),
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      },
    ],
  };

  const orderHistoryChartData = {
    labels: ['Fruits', 'Vegetables', 'Dairy', 'Grains'],
    datasets: [
      {
        data: [2000, 1500, 1200, 500],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Buyer Analytics Dashboard</h2>
          <p className="mt-2 text-gray-600">Track your purchasing patterns and market insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-semibold text-gray-900">${purchaseHistoryData?.totalSpent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Average</p>
                <p className="text-2xl font-semibold text-gray-900">${purchaseHistoryData?.averageSpendPerMonth}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{topSellers?.[0]?.totalSales || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Spending Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Trends</h3>
            <div className="h-80">
              <Line data={spendingChartData} options={chartOptions} />
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
            <div className="h-80">
              <Bar data={categoryDistributionChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Preferences */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Preferences</h3>
            <div className="space-y-3">
              {productPreferences?.map((preference: any) => (
                <div key={preference.productName} className="flex justify-between items-center">
                  <span className="text-gray-600">{preference.productName}</span>
                  <span className="font-medium text-gray-900">{preference.quantityPurchased} units</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Popular Products</h4>
                <p className="mt-1 text-gray-900">{marketTrends?.popularProducts.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Average Prices</h4>
                <div className="mt-1 space-y-1">
                  <p className="text-gray-900">Fruits: ${marketTrends?.averagePrices.fruits}</p>
                  <p className="text-gray-900">Vegetables: ${marketTrends?.averagePrices.vegetables}</p>
                  <p className="text-gray-900">Dairy: ${marketTrends?.averagePrices.dairy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Sellers */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Sellers</h3>
            <div className="space-y-4">
              {topSellers?.map((seller: any) => (
                <div key={seller.seller} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{seller.seller}</span>
                    <div className="flex items-center text-yellow-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-gray-900">{seller.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Total Sales: {seller.totalSales}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerAnalytics;
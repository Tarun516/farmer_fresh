import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
}

interface CardContentProps {
  children: React.ReactNode;
}

interface SalesDataPoint {
  month: string;
  unitsSold: number;
  revenue: number;
}

interface RevenueData {
  totalRevenue: number;
  growth: number;
}

interface ProductTrend {
  productName: string;
  sales: number;
  color: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children }: CardHeaderProps) => (
  <div className="p-4 border-b border-gray-200">{children}</div>
);

const CardContent = ({ children }: CardContentProps) => (
  <div className="p-4">{children}</div>
);

const FarmerAnalytics = () => {
  const [salesData, setSalesData] = useState<SalesDataPoint[] | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [productTrends, setProductTrends] = useState<ProductTrend[] | null>(null);

  useEffect(() => {
    // Simulated sales data with revenue included
    const dummySalesData: SalesDataPoint[] = [
      { month: "Jan", unitsSold: 5000, revenue: 200000 },
      { month: "Feb", unitsSold: 5500, revenue: 220000 },
      { month: "Mar", unitsSold: 6000, revenue: 240000 },
      { month: "Apr", unitsSold: 6200, revenue: 248000 },
      { month: "May", unitsSold: 6500, revenue: 260000 },
      { month: "Jun", unitsSold: 7000, revenue: 280000 },
      { month: "Jul", unitsSold: 7200, revenue: 288000 },
      { month: "Aug", unitsSold: 7500, revenue: 300000 },
      { month: "Sep", unitsSold: 8000, revenue: 320000 },
      { month: "Oct", unitsSold: 8500, revenue: 340000 },
      { month: "Nov", unitsSold: 9000, revenue: 360000 },
      { month: "Dec", unitsSold: 9500, revenue: 380000 },
    ];

    const dummyRevenueData: RevenueData = {
      totalRevenue: 3436000,
      growth: 28,
    };

    const dummyProductTrends: ProductTrend[] = [
      { productName: "Wheat", sales: 8500, color: "#FFB841" },
      { productName: "Rice", sales: 7800, color: "#4ECDC4" },
      { productName: "Maize", sales: 6500, color: "#45B7D1" },
      { productName: "Barley", sales: 5200, color: "#96CEB4" },
      { productName: "Millet", sales: 4800, color: "#FFEEAD" },
    ];

    setSalesData(dummySalesData);
    setRevenueData(dummyRevenueData);
    setProductTrends(dummyProductTrends);
  }, []);

  const StatCard = ({ title, value, description }: StatCardProps) => (
    <Card>
      <CardContent>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Farmer Analytics Dashboard
        </h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <StatCard
          title="Total Revenue"
          value={`$${revenueData?.totalRevenue?.toLocaleString()}`}
          description={`${revenueData?.growth}% increase from last month`}
        />
        <StatCard
          title="Total Units Sold"
          value={salesData ? salesData[salesData.length - 1].unitsSold : "-"}
          description="Units sold this month"
        />
        <StatCard
          title="Average Price Per Unit"
          value={`$${
            salesData
              ? Math.round(
                  salesData[salesData.length - 1].revenue /
                    salesData[salesData.length - 1].unitsSold
                )
              : "-"
          }`}
          description="Based on current month's sales"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Sales Performance
            </h3>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData || []}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200"
                  />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    width={50}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="unitsSold"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[400px]">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Product Performance
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 overflow-x-hidden">
              {productTrends?.map((product) => (
                <div key={product.productName} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-sm font-medium text-gray-700 min-w-[100px]">
                      {product.productName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.sales.toLocaleString()} units
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(product.sales / 10000) * 100}%`,
                        backgroundColor: product.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerAnalytics;
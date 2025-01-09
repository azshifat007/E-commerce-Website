import React from 'react';
import { useVendorStore } from '@/store/vendor';
import {
  BarChart,
  DollarSign,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function VendorDashboard() {
  const { profile, products, orders, analytics } = useVendorStore();

  if (!profile) {
    return null;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{profile.shopName}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, {profile.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            {profile.rating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Joined {new Date(profile.joinedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Daily Sales"
          value={formatPrice(analytics.dailySales)}
          icon={DollarSign}
          trend="+12.5%"
        />
        <StatCard
          title="Monthly Sales"
          value={formatPrice(analytics.monthlySales)}
          icon={TrendingUp}
          trend="+8.2%"
        />
        <StatCard
          title="Total Products"
          value={products.length.toString()}
          icon={Package}
        />
        <StatCard
          title="Pending Orders"
          value={orders.filter((o) => o.status === 'pending').length.toString()}
          icon={ShoppingBag}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(order.total)}</p>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Stock: {product.stock}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(product.price)}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    {product.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {trend && (
            <p className="text-sm text-green-500">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {trend}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
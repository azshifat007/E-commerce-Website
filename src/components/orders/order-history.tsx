import { useOrderStore, Order } from '@/store/orders';
import { formatPrice } from '@/lib/utils';
import { Package } from 'lucide-react';

export function OrderHistory() {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start shopping to create your first order
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Order #{order.id}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-yellow-100 text-yellow-800">
          {order.status}
        </span>
      </div>
      <div className="border-t border-b py-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-2">
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Shipping Address</p>
          <p className="text-sm text-gray-500">
            {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
            {order.shippingAddress.state} {order.shippingAddress.zip}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-lg font-bold">{formatPrice(order.total)}</p>
        </div>
      </div>
    </div>
  );
}
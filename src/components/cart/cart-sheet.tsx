import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

interface CartSheetProps {
  onClose: () => void;
}

export function CartSheet({ onClose }: CartSheetProps) {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Show auth dialog
      return;
    }
    navigate('/checkout');
    onClose();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        {items.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-500">Your cart is empty</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 px-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(0, item.quantity - 1))
                      }
                      className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {items.length > 0 && (
        <div className="border-t px-6 py-4">
          <div className="flex items-center justify-between py-2">
            <span className="font-medium">Total</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800 transition-colors"
          >
            {isAuthenticated ? 'Checkout' : 'Login to Checkout'}
          </button>
        </div>
      )}
    </div>
  );
}
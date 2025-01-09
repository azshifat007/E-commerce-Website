import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  getOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => {
        set((state) => ({
          orders: [
            {
              ...order,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
            },
            ...state.orders,
          ],
        }));
      },
      getOrders: () => get().orders,
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },
    }),
    {
      name: 'order-storage',
    }
  )
);
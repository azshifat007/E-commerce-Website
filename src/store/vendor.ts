import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface VendorProfile {
  id: string;
  name: string;
  email: string;
  shopName: string;
  description: string;
  logo?: string;
  banner?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  businessInfo: {
    registrationNumber: string;
    taxId: string;
    phoneNumber: string;
  };
  categories: string[];
  status: 'pending' | 'approved' | 'rejected';
  rating: number;
  totalSales: number;
  joinedAt: string;
}

interface VendorStore {
  profile: VendorProfile | null;
  products: Product[];
  orders: Order[];
  analytics: {
    dailySales: number;
    monthlySales: number;
    totalRevenue: number;
    averageRating: number;
  };
  registerVendor: (profile: Omit<VendorProfile, 'id' | 'status' | 'rating' | 'totalSales' | 'joinedAt'>) => Promise<void>;
  updateProfile: (profile: Partial<VendorProfile>) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'vendorId'>) => Promise<void>;
  updateProduct: (productId: number, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

export const useVendorStore = create<VendorStore>()(
  persist(
    (set, get) => ({
      profile: null,
      products: [],
      orders: [],
      analytics: {
        dailySales: 0,
        monthlySales: 0,
        totalRevenue: 0,
        averageRating: 0,
      },
      registerVendor: async (profile) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          profile: {
            ...profile,
            id: Math.random().toString(36).substr(2, 9),
            status: 'pending',
            rating: 0,
            totalSales: 0,
            joinedAt: new Date().toISOString(),
          },
        });
      },
      updateProfile: async (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        }));
      },
      addProduct: async (product) => {
        set((state) => ({
          products: [
            ...state.products,
            {
              ...product,
              id: Math.random(),
              vendorId: state.profile?.id || '',
            },
          ],
        }));
      },
      updateProduct: async (productId, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId ? { ...product, ...updates } : product
          ),
        }));
      },
      deleteProduct: async (productId) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        }));
      },
      updateOrderStatus: async (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },
    }),
    {
      name: 'vendor-storage',
    }
  )
);
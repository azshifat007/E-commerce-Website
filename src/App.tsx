import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductCard } from './components/ui/product-card';
import { CartSheet } from './components/cart/cart-sheet';
import { AuthDialog } from './components/auth/auth-dialog';
import { OrderHistory } from './components/orders/order-history';
import { AdminDashboard } from './components/admin/admin-dashboard';
import { VendorRegistration } from './components/vendor/VendorRegistration';
import { VendorDashboard } from './components/vendor/VendorDashboard';
import { products } from './data/products';
import { ShoppingBag, User, Moon, Sun } from 'lucide-react';
import { useCartStore } from './store/cart';
import { useAuthStore } from './store/auth';
import { useThemeStore } from './store/theme';
import { useVendorStore } from './store/vendor';

function App() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const cartItems = useCartStore((state) => state.items);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const vendorProfile = useVendorStore((state) => state.profile);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 dark:text-white`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">E-Shop</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Welcome, {user?.name}
                    </span>
                    <button
                      onClick={logout}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative rounded-full bg-gray-100 dark:bg-gray-700 p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <ShoppingBag className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black dark:bg-white dark:text-black text-white text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              }
            />
            <Route
              path="/orders"
              element={
                isAuthenticated ? (
                  <OrderHistory />
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-semibold">Please login to view your orders</h2>
                    <button
                      onClick={() => setIsAuthOpen(true)}
                      className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Login now
                    </button>
                  </div>
                )
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated && user?.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-semibold">Access Denied</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      You don't have permission to access this page
                    </p>
                  </div>
                )
              }
            />
            <Route
              path="/vendor/register"
              element={
                isAuthenticated ? (
                  <VendorRegistration />
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-semibold">Please login to register as a vendor</h2>
                    <button
                      onClick={() => setIsAuthOpen(true)}
                      className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Login now
                    </button>
                  </div>
                )
              }
            />
            <Route
              path="/vendor/dashboard"
              element={
                isAuthenticated && vendorProfile ? (
                  <VendorDashboard />
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-semibold">Become a Vendor</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Register your shop and start selling today
                    </p>
                    <a
                      href="/vendor/register"
                      className="mt-4 inline-block bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100"
                    >
                      Register Now
                    </a>
                  </div>
                )
              }
            />
          </Routes>
        </main>

        {/* Cart Sheet */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
              <CartSheet onClose={() => setIsCartOpen(false)} />
            </div>
          </div>
        )}

        {/* Auth Dialog */}
        {isAuthOpen && <AuthDialog onClose={() => setIsAuthOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;
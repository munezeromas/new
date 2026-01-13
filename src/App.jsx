import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/wishlist"
                    element={
                      <ProtectedRoute>
                        <Wishlist />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute adminOnly>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
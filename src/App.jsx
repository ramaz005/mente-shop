import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import About from './pages/About';
import PageTransition from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/catalog" element={<PageTransition><Catalog /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
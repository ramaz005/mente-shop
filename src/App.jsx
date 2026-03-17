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

function Layout({ children, hideNav }) {
  return (
    <>
      {!hideNav && <Navbar />}
      <main>{children}</main>
      {!hideNav && <Footer />}
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Layout hideNav={true}>
            <PageTransition><Home /></PageTransition>
          </Layout>
        } />
        <Route path="/catalog" element={
          <Layout>
            <PageTransition><Catalog /></PageTransition>
          </Layout>
        } />
        <Route path="/product/:id" element={
          <Layout>
            <PageTransition><Product /></PageTransition>
          </Layout>
        } />
        <Route path="/cart" element={
          <Layout>
            <PageTransition><Cart /></PageTransition>
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <PageTransition><About /></PageTransition>
          </Layout>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </CartProvider>
  );
}
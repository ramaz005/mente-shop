import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import CookieBanner from './components/CookieBanner';

const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const About = lazy(() => import('./pages/About'));

function Layout({ children, hideNav }) {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {!hideNav && <Navbar />}
      <main>{children}</main>
      {!hideNav && <Footer />}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      backgroundColor: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <p style={{
        fontFamily: 'Anonymous Pro, monospace',
        fontSize: '12px', letterSpacing: '6px',
        color: '#000', opacity: 0.4
      }}>
        MENTE
      </p>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Layout hideNav={true}>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Home /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="/catalog" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Catalog /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="/product/:id" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Product /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="/cart" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Cart /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><About /></PageTransition>
            </Suspense>
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
        <CookieBanner />
      </BrowserRouter>
    </CartProvider>
  );
}
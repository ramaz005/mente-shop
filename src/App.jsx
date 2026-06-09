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
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Delivery = lazy(() => import('./pages/Delivery'));
const Returns = lazy(() => import('./pages/Returns'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Offer = lazy(() => import('./pages/Offer'));
const Contacts = lazy(() => import('./pages/Contacts'));

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
        <Route path="/admin" element={
          <Suspense fallback={<LoadingScreen />}>
            <Admin />
          </Suspense>
        } />
        <Route path="/delivery" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Delivery /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="/returns" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Returns /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="/privacy" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Privacy /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="/offer" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Offer /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="/contacts" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><Contacts /></PageTransition>
            </Suspense>
          </Layout>
        } />
        <Route path="*" element={
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <PageTransition><NotFound /></PageTransition>
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
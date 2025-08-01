import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('./pages/login'));
const HomePage = lazy(() => import('./pages/home'));
const ContactPage = lazy(() => import('./pages/contact'));
const AddItemPage = lazy(() => import('./pages/additem'));
const Layout = lazy(() => import('./components/layout'));

function App() {
  return (
    <Suspense fallback={<div className="text-center text-3xl text-[blue] mt-10">Yuklanmoqda...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="home/additem" element={<AddItemPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>

    </Suspense>
  );
}

export default App;

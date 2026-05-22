/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import History from './pages/History.tsx';
import Services from './pages/Services.tsx';
import Gallery from './pages/Gallery.tsx';
import Contact from './pages/Contact.tsx';
import Assessment from './pages/Assessment.tsx';
import SeoAdestramentoNovoHamburgo from './pages/SeoAdestramentoNovoHamburgo.tsx';
import SeoComportamentoCanino from './pages/SeoComportamentoCanino.tsx';
import SeoTreinamentoProfissional from './pages/SeoTreinamentoProfissional.tsx';
import Splash from './pages/Splash.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isSplash = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-[#0F0F0F] selection:text-white">
      <ScrollToTop />
      {!isSplash && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isSplash && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/historia" element={<History />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/avaliacao" element={<Assessment />} />
          <Route path="/adestramento-novo-hamburgo" element={<SeoAdestramentoNovoHamburgo />} />
          <Route path="/comportamento-canino" element={<SeoComportamentoCanino />} />
          <Route path="/treinamento-profissional" element={<SeoTreinamentoProfissional />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

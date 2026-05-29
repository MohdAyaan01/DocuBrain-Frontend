import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FooterTwo from '../components/FooterTwo';

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <div className="bg-zinc-950 border-t border-white/5">
        <Footer />
        <FooterTwo />
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Gallery />
      <Contact />
    </div>
  );
}

export default Home;

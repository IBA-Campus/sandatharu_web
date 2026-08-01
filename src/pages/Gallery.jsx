import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  { id: 1, src: '/images/hotel_lobby.jpg', title: 'Grand Lobby Botanical Installation', category: 'Hotel Interior Decor' },
  { id: 2, src: '/images/hotel_suite.jpg', title: 'Luxury Suite Floral Styling', category: 'Hotel Interior Decor' },
  { id: 3, src: '/images/hotel_restaurant.jpg', title: 'Fine Dining Floral Centerpieces', category: 'Hotel Interior Decor' },
  { id: 4, src: '/images/hotel_event.jpg', title: 'Hotel Event Grand Styling', category: 'Hotel Interior Decor' },
  { id: 5, src: '/images/table_centerpiece.jpg', title: 'Resort Restaurant Arrangement', category: 'Hotel Interior Decor' },
  { id: 6, src: '/images/hero_farm.jpg', title: 'Our Sustainable Flower Farm', category: 'Eco Tourism Agriculture' },
  { id: 7, src: '/images/fresh_flowers_1.jpg', title: 'Farm-Fresh Harvest Display', category: 'Eco Tourism Agriculture' },
  { id: 8, src: '/images/fresh_flowers_2.jpg', title: 'Eco Floral Market Showcase', category: 'Eco Tourism Agriculture' },
  { id: 9, src: '/images/single_rose.jpg', title: 'Organic Single-Stem Cultivation', category: 'Eco Tourism Agriculture' },
  { id: 10, src: '/images/bridal_bouquet.jpg', title: 'Sustainable Botanical Arrangement', category: 'Eco Tourism Agriculture' },
];

const filters = ['Hotel Interior Decor', 'Eco Tourism Agriculture'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('Hotel Interior Decor');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = galleryItems.filter(
    (item) => item.category === activeFilter
  );

  const openLightbox = (item) => setSelectedItem(item);
  const closeLightbox = () => setSelectedItem(null);

  const showPrev = useCallback(() => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  }, [selectedItem, filteredItems]);

  const showNext = useCallback(() => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  }, [selectedItem, filteredItems]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, showPrev, showNext]);

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-emerald-deep to-emerald-forest py-20 px-6 text-center text-white">
        <h1 className="heading-serif text-5xl mb-4">Our Gallery</h1>
        <p className="text-lg max-w-2xl mx-auto text-white/90">
          Explore our portfolio of luxury hotel floral installations and eco-tourism agricultural showcases
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-12 mb-10 flex justify-center space-x-2 md:space-x-4 flex-wrap gap-y-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`relative px-6 py-2 rounded-full font-medium transition-colors z-10 ${
              activeFilter === filter ? 'text-white' : 'text-gray-600 hover:text-emerald-forest'
            }`}
          >
            {activeFilter === filter && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-emerald-forest rounded-full -z-10 shadow-md"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div layout className="masonry-grid columns-1 sm:columns-2 md:columns-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl cursor-pointer group mb-6 shadow-sm inline-block w-full"
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {item.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all hover:scale-110 z-50"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 md:left-10 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all hover:scale-110 z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 md:right-10 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all hover:scale-110 z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-white heading-serif">{selectedItem.title}</h2>
                <p className="text-white/70 text-sm mt-1">{selectedItem.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

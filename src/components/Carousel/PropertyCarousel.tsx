import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Home, DollarSign } from 'lucide-react';

interface Property {
  id: number;
  image: string;
  title: string;
  price: string;
  location: string;
  type: string;
}

const properties: Property[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1600',
    title: 'Modern Luxury Villa',
    price: '$1,250,000',
    location: 'Beverly Hills, CA',
    type: 'Villa'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600',
    title: 'Oceanfront Paradise',
    price: '$2,500,000',
    location: 'Malibu, CA',
    type: 'Beach House'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
    title: 'Urban Penthouse',
    price: '$3,750,000',
    location: 'Manhattan, NY',
    type: 'Penthouse'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600',
    title: 'Mountain Retreat',
    price: '$1,850,000',
    location: 'Aspen, CO',
    type: 'Cabin'
  }
];

const PropertyCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [page]);

  const paginate = (newDirection: number) => {
    setPage(([current]) => {
      const newPage = current + newDirection;
      const totalPages = properties.length;
      
      if (newPage >= totalPages) return [0, newDirection];
      if (newPage < 0) return [totalPages - 1, newDirection];
      return [newPage, newDirection];
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#001F3F] to-[#003366] p-12 rounded-2xl">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
      
      <h2 className="relative text-4xl font-bold text-white mb-12 border-l-4 border-orange-500 pl-6">
        FEATURED PROPERTIES
        <span className="block text-sm font-normal text-orange-400 mt-2">
          Discover Your Dream Home
        </span>
      </h2>
      
      <div className="relative h-[600px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="absolute w-full h-full"
          >
            <div className="flex h-full gap-8">
              <div className="w-2/3 relative overflow-hidden rounded-2xl group">
                <motion.img
                  src={properties[page].image}
                  alt={properties[page].title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-8 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold mb-2">{properties[page].title}</h3>
                  <div className="flex items-center gap-4 text-orange-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{properties[page].location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      <span className="text-sm">{properties[page].type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <DollarSign className="w-6 h-6" />
                    {properties[page].price}
                  </div>
                </motion.div>
              </div>
              
              <div className="w-1/3 grid grid-rows-3 gap-4">
                {[...properties.slice(page + 1), ...properties.slice(0, page)]
                  .slice(0, 3)
                  .map((property, index) => (
                    <motion.div
                      key={property.id}
                      className="relative overflow-hidden rounded-xl cursor-pointer group"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      onClick={() => setPage([properties.findIndex(p => p.id === property.id), 1])}
                    >
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h4 className="text-lg font-semibold">{property.title}</h4>
                        <p className="text-sm text-orange-400">{property.location}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-sm transition-all duration-200 z-10 text-white"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-sm transition-all duration-200 z-10 text-white"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > page ? 1 : -1])}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === page 
                ? 'bg-orange-500 w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCarousel;
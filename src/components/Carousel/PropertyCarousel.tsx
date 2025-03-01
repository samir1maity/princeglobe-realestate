import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Home } from 'lucide-react';
import bolra_1 from '../../assets/properties/boral_1.jpeg'
import garia_1 from '../../assets/properties/garia_1.jpeg'
import garia_2 from '../../assets/properties/garia_2.jpeg'
import gt_road from '../../assets/properties/gt_road.jpeg'

interface Property {
  id: number;
  image: string;
  // title: string;
  price: string;
  location: string;
  area: string;
  type: string;
}

const properties: Property[] = [
  {
    id: 1,
    image: bolra_1,
    // title: 'Premium Riverside Villa',
    price: '₹3700/- per sqft',
    location: 'Behind Boral High School',
    area: 'Boral, West Bengal',
    type: 'Apartment'
  },
  {
    id: 2,
    image: garia_1,
    // title: 'Modern Apartment Complex',
    price: '₹3600/- per sqft',
    location: 'Satindra Pally, Garia',
    area: 'Garia, West Bengal',
    type: 'Apartment'
  },
  {
    id: 3,
    image: garia_2,
    // title: 'Luxury Garden Residence',
    price: '₹3700/- per sqft',
    location: 'Satindra Pally,1/2/3 bhk available',
    area: 'Garia, West Bengal',
    type: 'Apartment'
  },
  {
    id: 4,
    image: gt_road,
    // title: 'Riverside Heritage Home',
    price: '₹18 Lakhs/2bhk available',
    location: 'G T Road,  Ganga View',
    area: 'West Bengal',
    type: 'Flat'
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
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#1e40af] to-[#3b82f6] p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
      
      <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 lg:mb-12 border-l-4 border-orange-500 pl-4 md:pl-6">
        FEATURED PROPERTIES
        <span className="block text-sm sm:text-sm font-normal text-orange-400 mt-1 md:mt-2">
          Discover Your Dream Home in West Bengal
        </span>
      </h2>
      
      <div className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden">
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
            <div className="flex md:flex-row h-full gap-4 md:gap-6 lg:gap-8">
              <div className="w-full md:w-2/3 relative overflow-hidden rounded-2xl group">
                <motion.img
                  src={properties[page].image}
                  // alt={properties[page].title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{properties[page].title}</h3> */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white mb-2 sm:mb-4">
                    <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                      <span className="text-xs sm:text-sm font-medium">{properties[page].location}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                      <Home className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                      <span className="text-xs sm:text-sm font-medium">{properties[page].type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl md:text-2xl font-bold">
                    <span className="bg-blue-600/90 px-3 py-1 rounded-lg flex items-center">
                      {/* <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> */}
                      {properties[page].price}
                    </span>
                    <span className="text-xs text-white font-medium ml-2 mt-1 bg-orange-500/80 px-2 py-1 rounded-full">Premium Property</span>
                  </div>
                </motion.div>
              </div>
              
              <div className="hidden md:grid w-full md:w-1/3 grid-cols-3 md:grid-cols-1 gap-2 md:gap-4">
                {[...properties.slice(page + 1), ...properties.slice(0, page)]
                  .slice(0, 3)
                  .map((property, index) => (
                    <motion.div
                      key={property.id}
                      className="relative overflow-hidden rounded-xl cursor-pointer group aspect-[4/3] md:aspect-auto"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      onClick={() => setPage([properties.findIndex(p => p.id === property.id), 1])}
                    >
                      <img
                        src={property.image}
                        // alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white">
                        {/* <h4 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{property.title}</h4> */}
                        <p className="text-xs sm:text-sm bg-black/30 text-white inline-block px-2 py-0.5 rounded-full mt-1 line-clamp-1">{property.location}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 sm:p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-200 z-10 text-white"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <button
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 sm:p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-200 z-10 text-white"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-1 sm:space-x-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > page ? 1 : -1])}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === page 
                ? 'w-6 sm:w-8 bg-orange-500' 
                : 'w-3 sm:w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCarousel;
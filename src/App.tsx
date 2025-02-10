import { useEffect, useState, useRef } from "react";
import "./App.css";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  // Search,
  MapPin,
  Leaf,
  Users,
  Phone,
  Mail,
  Menu,
  Sun,
  TrendingUp,
  Zap,
  Droplet,
  // CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PropertyCarousel from "./components/Carousel/PropertyCarousel";

function App() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const realEstateProperties = [
    {
      name: "Luxury Villa",
      address: "123 Palm Street, Beverly Hills, CA",
      image:
        "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
      price: "$2,500,000",
      ecoFeatures: ["Solar Panels", "Rainwater Harvesting", "Energy-Efficient"],
    },
    {
      name: "Modern Apartment",
      address: "456 Maple Avenue, New York, NY",
      image:
        "https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment.jpg",
      price: "$850,000",
      ecoFeatures: ["Solar Panels", "Rainwater Harvesting", "Energy-Efficient"],
    },
    {
      name: "Cozy Cottage",
      address: "789 Sunset Boulevard, Miami, FL",
      image:
        "https://media.istockphoto.com/id/1393537665/photo/modern-townhouse-design.jpg?s=612x612&w=0&k=20&c=vgQesOXDRzz0UfOZxmUtE-rFe75YgA9GvkKS8eeeumE=",
      price: "$350,000",
      ecoFeatures: ["Solar Panels", "Rainwater Harvesting", "Energy-Efficient"],
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //   },
  // };

  const images = [
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-sm sticky top-0 z-10"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-emerald-600">Logo</h1>
          </motion.div>
          <nav className="hidden md:block">
            <motion.ul
              className="flex space-x-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {["Home", "Properties", "About", "Contact"].map((item) => (
                <motion.li key={item} whileHover={{ scale: 1.1 }}>
                  <a href="#" className="text-gray-600 hover:text-emerald-600">
                    {item}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>XXXX</SheetTitle>
                <SheetDescription>
                  Navigate our eco-friendly properties
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  {["Home", "Properties", "About", "Contact"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-emerald-600"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>

      {/*  hero section */}
      <section className="relative h-[500px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`Eco-friendly home ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4">
                Discover Your Eco-Friendly Dream Home
              </h2>
              <p className="text-xl mb-8">
                Sustainable living in harmony with nature
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section (replacing Get Started) */}
      <div className="bg-[#e6f7e9] min-h-screen w-full p-4 md:p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-[#2e7d32] text-center">
            About Us
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-6">
            <p className="text-[#1b5e20] text-xl leading-relaxed">
              Welcome to XXXXX, where dreams find their perfect address!
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are more than just a real estate platform—we are your trusted
              partners in navigating the dynamic property market. Whether you're
              searching for your dream home, a lucrative investment opportunity,
              or a commercial space that inspires growth, we combine innovation
              with personalized service to make it happen.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our platform connects buyers, sellers, and renters through a
              seamless, user-friendly experience powered by cutting-edge
              technology. With a deep understanding of local markets and a
              commitment to transparency, we empower you to make informed
              decisions with confidence.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              At XXXXX, we value relationships as much as transactions. Let us
              help you find not just a property but a place to thrive.
            </p>
            <p className="text-[#2e7d32] font-semibold text-2xl text-center">
              Your journey starts here!
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-white border-none shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <Users className="w-12 h-12 text-[#4caf50] mb-4" />
                <h4 className="text-[#2e7d32] font-semibold text-xl mb-2">
                  Trusted Partners
                </h4>
                <p className="text-gray-600">
                  Building lasting relationships with our clients and community
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <TrendingUp className="w-12 h-12 text-[#4caf50] mb-4" />
                <h4 className="text-[#2e7d32] font-semibold text-xl mb-2">
                  Market Insights
                </h4>
                <p className="text-gray-600">
                  Providing you with the latest trends and data-driven decisions
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <Zap className="w-12 h-12 text-[#4caf50] mb-4" />
                <h4 className="text-[#2e7d32] font-semibold text-xl mb-2">
                  Innovative Tech
                </h4>
                <p className="text-gray-600">
                  Leveraging cutting-edge technology for a seamless experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <PropertyCarousel />
      </div>

      {/* Featured Properties */}
      <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1b5e20]">
          Featured Eco-Friendly Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realEstateProperties.map((data, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0 relative">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={data.image}
                      alt={`Eco-friendly Property: ${data.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-2xl font-bold mb-2 drop-shadow-md">
                      {data.name}
                    </h3>
                    <p className="text-sm mb-2 drop-shadow-md">
                      {data.address}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {data.ecoFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="bg-[#4caf50] bg-opacity-80 text-white text-xs px-2 py-1 rounded-full flex items-center"
                        >
                          <Leaf className="w-3 h-3 mr-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* Services Section */}

      <section ref={ref} className="bg-emerald-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-[#1b5e20]"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            Our Eco-Friendly Services
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Leaf className="w-16 h-16" />,
                title: "Green Building",
                description:
                  "Sustainable construction practices for eco-friendly homes.",
                category: "Construction",
              },
              {
                icon: <Droplet className="w-16 h-16" />,
                title: "Water Conservation",
                description:
                  "Innovative solutions for reducing water consumption.",
                category: "Utilities",
              },
              {
                icon: <Sun className="w-16 h-16" />,
                title: "Solar Integration",
                description:
                  "Seamless incorporation of solar power into your property.",
                category: "Energy",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="overflow-hidden bg-gradient-to-br from-emerald-50 to-white hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative h-40 bg-emerald-600 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center text-white"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        {service.icon}
                      </motion.div>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-600 to-transparent"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      />
                    </div>
                    <div className="p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <Badge
                          variant="secondary"
                          className="mb-2 bg-emerald-100 text-emerald-800"
                        >
                          {service.category}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Our Eco-Conscious Clients Say
          </h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <p className="text-xl italic mb-4 text-gray-700">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              <p className="font-semibold text-gray-800">
                {testimonials[currentTestimonial].name}
              </p>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </motion.div>
            <div className="flex justify-center mt-8 space-x-4">
              <Button variant="outline" onClick={prevTestimonial}>
                <ChevronLeft />
              </Button>
              <Button variant="outline" onClick={nextTestimonial}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Contact Us
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Subject" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={4} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked: boolean) =>
                    setAcceptTerms(checked)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the terms and conditions
                </label>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0">
                    View Terms and Conditions
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                    <DialogDescription>
                      Please read our terms and conditions carefully.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-2">
                      1. Acceptance of Terms
                    </h3>
                    <p className="mb-4">
                      By using EcoHaven Estates services, you agree to these
                      terms.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">
                      2. Privacy Policy
                    </h3>
                    <p className="mb-4">
                      Your use of our services is also governed by our Privacy
                      Policy.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">
                      3. User Responsibilities
                    </h3>
                    <p className="mb-4">
                      Users are responsible for maintaining the confidentiality
                      of their account.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">
                      4. Limitation of Liability
                    </h3>
                    <p className="mb-4">
                      EcoHaven Estates is not liable for any indirect,
                      incidental, or consequential damages.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">
                      5. Modifications to Service
                    </h3>
                    <p className="mb-4">
                      We reserve the right to modify or discontinue our service
                      at any time.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!acceptTerms}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">XXXXX</h3>
              <p className="mb-4">
                Your trusted partner in finding the perfect eco-friendly home.
              </p>
              <p>
                © 2024 xxxxx. All rights reserved | Designed and maintained by
                princeglobe{" "}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Properties", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-emerald-400">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="flex items-center mb-2">
                <MapPin className="mr-2" /> 123 Eco Estate St, Green City, State
                12345
              </p>
              <p className="flex items-center mb-2">
                <Phone className="mr-2" /> (123) xxx-xxxxx
              </p>
              <p className="flex items-center">
                <Mail className="mr-2" /> info@xxxxxx.com
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

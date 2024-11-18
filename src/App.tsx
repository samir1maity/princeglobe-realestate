import { useEffect, useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  // Search,
  MapPin,
  Home,
  Leaf,
  Users,
  Phone,
  Mail,
  Menu,
  Recycle,
  Sun,
  // CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

function App() {
  // const [count, setCount] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const realEstateProperties = [
    {
      name: "Luxury Villa",
      address: "123 Palm Street, Beverly Hills, CA",
      image:
        "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
      price: "$2,500,000",
    },
    {
      name: "Modern Apartment",
      address: "456 Maple Avenue, New York, NY",
      image:
        "https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment.jpg",
      price: "$850,000",
    },
    {
      name: "Cozy Cottage",
      address: "789 Sunset Boulevard, Miami, FL",
      image:
        "https://media.istockphoto.com/id/1393537665/photo/modern-townhouse-design.jpg?s=612x612&w=0&k=20&c=vgQesOXDRzz0UfOZxmUtE-rFe75YgA9GvkKS8eeeumE=",
      price: "$350,000",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

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
                  {["Home", "Properties", "About", "Contact"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-emerald-600"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
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
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-xl mb-8">
              Pioneering sustainable living through eco-friendly real estate
              solutions.
              Revolutionizing sustainable living with innovative and eco-friendly real estate solutions that harmonize modern living with environmental responsibility.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-12 h-12" />,
                title: "Eco-Friendly Properties",
                description:
                  "We specialize in homes that minimize environmental impact and maximize energy efficiency.",
              },
              {
                icon: <Recycle className="w-12 h-12" />,
                title: "Sustainable Practices",
                description:
                  "Our operations prioritize recycling, waste reduction, and the use of renewable resources.",
              },
              {
                icon: <Sun className="w-12 h-12" />,
                title: "Green Technology",
                description:
                  "We promote properties equipped with solar panels, smart home systems, and other green technologies.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white bg-opacity-10 p-6 rounded-lg text-center"
              >
                <motion.div
                  className="inline-block mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Eco-Friendly Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realEstateProperties.map((data, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={data.image}
                      alt={`Eco-friendly Property ${i}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {data.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{data.address}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Eco-Friendly Services
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Home className="w-12 h-12 text-emerald-600" />,
                title: "Sustainable Listings",
                description:
                  "Browse our curated list of eco-friendly properties",
              },
              {
                icon: <Leaf className="w-12 h-12 text-emerald-600" />,
                title: "Green Property Management",
                description:
                  "We manage your property with sustainable practices",
              },
              {
                icon: <Users className="w-12 h-12 text-emerald-600" />,
                title: "Eco-Expert Agents",
                description: "Our agents specialize in sustainable real estate",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <motion.div
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="bg-emerald-100 p-3 rounded-full mr-4"
                    whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                </motion.div>
                <p className="text-gray-600">{service.description}</p>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="link" className="mt-4 text-emerald-600 p-0">
                    Learn More
                  </Button>
                </motion.div>
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
              <p>© 2024 xxxxx. All rights reserved |  Designed and maintained by princeglobe </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Properties", "About", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-emerald-400">
                        {item}
                      </a>
                    </li>
                  )
                )}
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

import { useEffect, useState, useRef } from "react";
import "./App.css";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Menu,
  Home,
  Paintbrush,
  Eye,
  MessageSquare,
  X,
  ChevronDown,
  Map,
  Banknote,
  Scale,
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
import logo from "./assets/icons/as 3d png.png";
import konnagar1 from "./assets/properties/konnagar1.jpeg";
import konnagar_2 from "./assets/properties/konnagar_2.jpeg";
import gt_road from './assets/properties/gt_road.jpeg'
import eco_cast from "./assets/properties/eco_cast.jpeg";
import muktu from "./assets/properties/muktu.jpeg";
import dooars from "./assets/properties/dooars.jpeg";
import { Link, Element } from 'react-scroll';
import emailjs from '@emailjs/browser';

function App() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  // const [setCurrentImageIndex] = useState(0);
  // const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const chatFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change color after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Log environment variables for debugging
    console.log("Environment variables check:", {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ,
      templateId: import.meta.env.VITE_EMAILJS_CHAT_TEMPLATE_ID ,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
    });
    
    // Initialize with public key from environment variable or fallback
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ;
    emailjs.init(publicKey);
  }, []);

  const realEstateProperties = [
    {
      name: "Master para project",
      address: "konnagar, Hoogly",
      image: konnagar1,
      price: "₹2700/- per sqft",
      description: "1/2/3 bhk available",
    },
    {
      name: "Lake View",
      address: "Konnagar",
      image: konnagar_2,
      price: "₹2500/- per sqft",
      description: "1/2/3 bhk Available in Konnagar",
    },
    {
      name: "Raj Rajeshswari Enclave",
      address: "GT Road, Konnagar",
      image: gt_road,
      ecoFeatures: ["Green Roof", "Recycled Materials", "Solar Water Heating"],
      price: "₹2700/- per sqft.",
      description:
        "Ganga view from your balcony",
    },
    {
      name: "Eco Crest",
      address: "Garia ,South Kolkata",
      image: eco_cast,
      description:
        "With all modern amenities, roof top Swimming pool, kids paly area, club house, gym, garden, G+11 with commercial space.",
    },
    {
      name: "Muktodhara",
      address: "Bolpur-Shantiniketan",
      image: muktu,
      description:
        "",
    },
    {
      name: "Dooars",
      address: "Jalpaiguri",
      image: dooars,
      description:
        "Beautifully restored colonial-era home with modern eco-friendly upgrades and riverside location.",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    
    try {
      // Log the form data to verify all fields are being captured
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData.entries());
      console.log('Contact form data being sent:', formValues);
      
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID 
      const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
      
      console.log("Using EmailJS config:", { serviceId, templateId, publicKey: publicKey.substring(0, 3) + "..." });
      
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        e.currentTarget,
        publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      
      // Clear the form
      if (formRef.current) {
        formRef.current.reset();
      } else {
        (e.target as HTMLFormElement).reset();
      }
      
      setSubmitSuccess(true);
      setAcceptTerms(false);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitError("Failed to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID 
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
    
    
    try {
      // Log the form data to verify all fields are being captured
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData.entries());
      console.log('Form data being sent:', formValues);
      
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        e.currentTarget,
        publicKey
      );
      
      console.log('Chat inquiry sent successfully:', result.text);
      
      // Clear the form
      if (chatFormRef.current) {
        chatFormRef.current.reset();
      } else {
        (e.target as HTMLFormElement).reset();
      }
      
      // Show success message
      alert("Your inquiry has been sent successfully!");
      setIsChatOpen(false);
    } catch (error) {
      console.error('Failed to send chat inquiry:', error);
      alert("Failed to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden max-w-full">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-[999] top-0 transition-all duration-300 ${
          isScrolled ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto p-2 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="AS Property Management"
              className="h-14 w-auto mr-2"
            />
          </motion.div>
          <nav className="hidden md:block">
            <motion.ul
              className="flex space-x-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {["Home", "Why Us", "Featured", "Services", "Contact"].map(
                (item) => (
                  <motion.li
                    key={item}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center"
                  >
                    <Link
                      smooth={true} 
                      offset={50} 
                      duration={500} 
                      to={item}
                      className={`${
                        isScrolled ? "text-gray-600" : "text-white"
                      } hover:text-emerald-600`}
                    >
                      {item}
                    </Link>
                  </motion.li>
                )
              )}
            </motion.ul>
          </nav>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>AS Property Management</SheetTitle>
                <SheetDescription>
                  Navigate our eco-friendly properties
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  {[
                    "Home",
                    "Why Us",
                    "Featured",
                    "Services",
                    "Contact Us",
                  ].map((item) => (
                    <li key={item} className="flex items-center justify-center">
                      <Link
                        to={item}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className="text-gray-600 hover:text-emerald-600"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>

      {/* Sidebar for Mobile */}
      {/* <div
        className={`fixed inset-y-0 left-0 z-1000 w-64 bg-blue-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="text-xl font-bold">Menu</div>
          <button onClick={toggleSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {["Home", "Why Us", "Featured", "Services", "Contact"].map(
            (item) => (
              <Link
                key={item}
                to={item}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="hover:bg-blue-700 p-2 rounded transition-colors duration-300"
                onClick={toggleSidebar}
              >
                {item}
              </Link>
            )
          )}
        </nav>
      </div> */}

      {/* Hero Section */}
      <Element name="Home">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative inline-block mb-2 md:mb-0">
                <span>Discover Your Dream</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[.15rem] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 rounded-full"
                  initial={{ width: 0, left: "50%" }}
                  animate={{ width: "100%", left: "0%" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </div>{" "}
              <div className="relative inline-block mt-2 md:mt-0">
                <span>Home With Us</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[.15rem] bg-gradient-to-r from-blue-300 via-blue-500 to-blue-400 rounded-full"
                  initial={{ width: 0, left: "50%" }}
                  animate={{ width: "100%", left: "0%" }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </div>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your Dream Our Priority
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-4xl transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10">Explore Properties</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-white text-sm mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Element>

      {/* About Us Section (replacing Get Started) */}
      <Element name="Why Us">
        <div className="bg-[#e6f0f9] min-h-[85vh] w-full p-4 md:p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="relative text-4xl font-bold text-center mb-12">
              <span className="inline-flex items-center">
                <span className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full mr-4"></span>
                <span className="relative text-[#1e40af]">Why Us</span>
                <span className="h-1 w-12 bg-gradient-to-l from-transparent to-blue-500 rounded-full ml-4"></span>
              </span>
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-6">
              <p className="text-[#1e3a8a] text-xl leading-relaxed">
                Welcome to AS Property Management, where dreams find their perfect
                address!
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are more than just a real estate platform—we are your trusted
                partners in navigating the dynamic property market. Whether you're
                searching for your dream home, a lucrative investment opportunity,
                or a commercial space that inspires growth, we combine innovation
                with personalized service to make it happen.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                From premium flats in urban centers to strategic land investments
                with high growth potential, our diverse portfolio caters to both
                homebuyers and investors seeking value.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                At AS Property Management, we value relationships as much as
                transactions. Let us help you find not just a property but a place
                to thrive.
              </p>
              <p className="text-[#1e40af] font-semibold text-2xl text-center">
                Your journey starts here!
              </p>
            </div>
          </div>
        </div>
      </Element>

      <Element name='Properties'>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <PropertyCarousel />
        </div>
      </Element>

      {/* Featured Eco-Friendly Properties */}
      <Element name='Featured'>
        <section className="py-16 bg-gray-50 px-4 sm:px-6">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="inline-flex items-center">
                <span className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full mr-4"></span>
                <span className="relative text-[#1e40af] drop-shadow-sm">
                  Featured Eco-Friendly Properties
                </span>
                <span className="h-1 w-12 bg-gradient-to-l from-transparent to-blue-500 rounded-full ml-4"></span>
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realEstateProperties.map((data, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden aspect-[16/9] rounded-t-xl">
                      <img
                        src={data.image}
                        alt={data.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-blue-900/20 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-16 pb-2 px-4 -mx-4 -mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white text-xl font-bold">
                              {data.name}
                            </h3>
                            
                            {data.price ? (
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg">
                                {data?.price}
                              </span>
                            ) : null}
                          </div>

                          <p className="text-blue-100 flex items-center text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1 text-blue-200 flex-shrink-0" />
                            <span className="truncate">{data.address}</span>
                          </p>
                          {data?.description ? (
                            <p className="text-gray-200 text-sm line-clamp-2">
                              {data?.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Element>


      {/* Services Section */}
      <Element name='Services'>
        <section ref={ref} className="bg-white py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                <span className="inline-flex items-center">
                  <span className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full mr-4"></span>
                  <span className="relative text-[#1e40af]">
                    Our Professional Services
                  </span>
                  <span className="h-1 w-12 bg-gradient-to-l from-transparent to-blue-500 rounded-full ml-4"></span>
                </span>
              </h2>
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <Home className="w-10 h-10" />,
                  title: "Flat Sale",
                  description:
                    "Find your dream flat with our extensive listings across West Bengal, featuring premium properties in prime locations.",
                  category: "Sales",
                },
                {
                  icon: <Map className="w-10 h-10" />,
                  title: "Land Sale",
                  description:
                    "Invest in high-potential land parcels with clear titles and excellent appreciation prospects throughout the region.",
                  category: "Sales",
                },
                {
                  icon: <Banknote className="w-10 h-10" />,
                  title: "Home Loan",
                  description:
                    "Access competitive home loan options through our network of trusted financial partners with simplified processing.",
                  category: "Finance",
                },
                {
                  icon: <Scale className="w-10 h-10" />,
                  title: "Legal Assistance",
                  description:
                    "Our expert legal team provides comprehensive assistance for verification, documentation, and dispute resolution.",
                  category: "Support",
                },
                {
                  icon: <Paintbrush className="w-10 h-10" />,
                  title: "Interior Design",
                  description:
                    "Transform your property with our professional interior design services that blend aesthetics with functionality.",
                  category: "Design",
                },
                {
                  icon: <Eye className="w-10 h-10" />,
                  title: "Property Visits",
                  description:
                    "Schedule guided property tours with our experts who provide comprehensive information and personalized assistance.",
                  category: "Support",
                },
              ].map((service, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card className="h-full border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-3 rounded-lg bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110 group-hover:rotate-3">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <Badge
                            variant="outline"
                            className="mb-2 text-blue-600 bg-blue-50 border-blue-200 transition-all duration-300 group-hover:bg-blue-100"
                          >
                            {service.category}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-700">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 transition-all duration-300 group-hover:text-gray-700">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Element>


      {/* Contact Form */}
      <Element name='Contact'>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="inline-flex items-center">
                <span className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full mr-4"></span>
                <span className="relative text-[#1e40af]">Contact Us</span>
                <span className="h-1 w-12 bg-gradient-to-l from-transparent to-blue-500 rounded-full ml-4"></span>
              </span>
            </h2>
            <div className="max-w-2xl mx-auto">
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                  {submitError}
                </div>
              )}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Subject" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message" rows={4} required />
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
                    I Authorize AS Property to send notifications via
                    Email/Call/SMS/Rcs/Whatsapp
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
                  className="w-full bg-gradient-to-r from-transparent to-blue-500 hover:bg-blue-600"
                  disabled={!acceptTerms || isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </Element>


      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isChatOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-6xl flex items-center justify-center"
            >
              <MessageSquare className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="absolute bottom-0 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h3 className="font-medium">Send us an inquiry</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:bg-blue-700 rounded-full p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <form ref={chatFormRef} onSubmit={handleChatSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="chat-name">Name</Label>
                    <Input
                      id="chat-name"
                      name="name"
                      placeholder="Your name"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="chat-email">Email</Label>
                    <Input
                      id="chat-email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="chat-phone">Phone</Label>
                    <Input
                      id="chat-phone"
                      name="phone"
                      placeholder="Your phone number"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="chat-location">Preferred Location</Label>
                    <select 
                      id="chat-location" 
                      name="location"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      required
                    >
                      <option value="">Select a location</option>
                      <option value="konnagar">Konnagar, Hoogly</option>
                      <option value="hindmotor">Hindmotor</option>
                      <option value="garia">Garia, South Kolkata</option>
                      <option value="bolpur">Bolpur-Shantiniketan</option>
                      <option value="dooars">Dooars, Jalpaiguri</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="chat-message">Message</Label>
                    <Textarea
                      id="chat-message"
                      name="message"
                      placeholder="How can we help you?"
                      className="mt-1 resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AS Property</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner for real estate solutions across West
                Bengal.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61560450938328&mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
            
                <a
                  href="https://www.instagram.com/aspropertie2023?igsh=OGQ5ZDc2ODk2ZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                {/* <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a> */}
                <a
                  href="https://youtube.com/@aspropertymanagement-li1ht?si=kfy-tDOZyzE5jWXF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-youtube"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Properties", "Services", "About Us", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Our Services</h3>
              <ul className="space-y-2">
                {[
                  "Flat Sale",
                  "Land Sale",
                  "Home Loan",
                  "Legal Assistance",
                  "Interior Design",
                  "Property Visits",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p className="flex items-start mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    19/a/3/a D. J. Bye Lane (W),<br />
                    Konnagar, Hooghly, 712235.
                  </span>
                </p>
                <p className="flex items-start mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    1/232 Naktala,<br />
                    Kolkata, 700047.
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  <a
                    href="tel:+919051396162"
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    (+91) 9051396162
                  </a>
                  <span className="mx-2">,</span>
                  <a
                    href="tel:+919123699601"
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    (+91) 9123699601
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-400" />
                  <a
                    href="mailto:aspropertymanagement2023@gmail.com"
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    aspropertymanagement2023@gmail.com
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p className="mb-2">
              &copy; {new Date().getFullYear()} AS Property Management. All
              rights reserved.
            </p>
            <p>
              Designed and Developed by{" "}
              <a
                href="https://princeglobe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
              >
                Prince Globe
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

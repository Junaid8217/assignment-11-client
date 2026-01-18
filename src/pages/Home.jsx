import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Users, 
  Droplets, 
  Award, 
  ArrowRight, 
  Gift,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  UserCheck,
  Activity,
  Globe,
  Zap,
  BookOpen,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Link } from 'react-router';
import ImageSlider from '../components/ui/ImageSlider';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ScrollIndicator from '../components/ui/ScrollIndicator';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import { useState } from 'react';
import Img from '../assets/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Newsletter form validation
  const {
    values: newsletterValues,
    errors: newsletterErrors,
    touched: newsletterTouched,
    isSubmitting: newsletterSubmitting,
    handleChange: handleNewsletterChange,
    handleBlur: handleNewsletterBlur,
    handleSubmit: handleNewsletterSubmit
  } = useFormValidation(
    { email: '' },
    { email: [validationRules.required, validationRules.email] }
  );

  const onNewsletterSubmit = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNewsletterSubmitted(true);
  };

  // Hero slider images with content
  const heroImages = [
    {
      src: Img,
      alt: "Blood donation in progress",
      content: (
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Save Lives,
            <span className="text-red-400 block">Donate Blood</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            A single donation can save up to three lives. Join thousands of heroes making a difference in their community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate("/register")}
              size="lg"
              className="min-w-[200px]"
            >
              <Heart className="mr-2" size={20} />
              Join as a Donor
            </Button>
            <Button 
              onClick={() => navigate("/search")}
              variant="secondary"
              size="lg"
              className="min-w-[200px] bg-white/90 text-gray-900 hover:bg-white"
            >
              <Users className="mr-2" size={20} />
              Find Donors
            </Button>
          </div>
        </div>
      )
    },
    {
      src: Img,
      alt: "Community blood drive",
      content: (
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Be a
            <span className="text-red-400 block">Community Hero</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Every 2 seconds, someone needs blood. Your donation provides hope and healing to patients in critical need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate("/donation-request")}
              size="lg"
              className="min-w-[200px]"
            >
              <Droplets className="mr-2" size={20} />
              Request Blood
            </Button>
            <Button 
              onClick={() => navigate("/donate")}
              variant="secondary"
              size="lg"
              className="min-w-[200px] bg-white/90 text-gray-900 hover:bg-white"
            >
              <Gift className="mr-2" size={20} />
              Donate Funds
            </Button>
          </div>
        </div>
      )
    },
    {
      src: Img,
      alt: "Blood donation impact",
      content: (
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Impact
            <span className="text-red-400 block">Matters</span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400">
                <AnimatedCounter end={15000} suffix="+" />
              </div>
              <p className="text-sm md:text-base text-gray-200">Lives Saved</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400">
                <AnimatedCounter end={5000} suffix="+" />
              </div>
              <p className="text-sm md:text-base text-gray-200">Active Donors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400">
                <AnimatedCounter end={25000} suffix="+" />
              </div>
              <p className="text-sm md:text-base text-gray-200">Donations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400">
                <AnimatedCounter end={100} suffix="+" />
              </div>
              <p className="text-sm md:text-base text-gray-200">Hospitals</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate("/register")}
            size="lg"
            className="min-w-[200px]"
          >
            <Award className="mr-2" size={20} />
            Start Your Journey
          </Button>
        </div>
      )
    }
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const services = [
    {
      icon: Droplets,
      title: "Blood Donation",
      description: "Safe and easy blood donation process with trained medical professionals.",
      features: ["Free health screening", "Comfortable environment", "Professional staff"]
    },
    {
      icon: Users,
      title: "Donor Matching",
      description: "Advanced matching system to connect donors with recipients quickly.",
      features: ["Real-time matching", "Location-based", "Emergency alerts"]
    },
    {
      icon: Shield,
      title: "Health Monitoring",
      description: "Comprehensive health checks and monitoring for all donors.",
      features: ["Regular check-ups", "Health reports", "Medical consultation"]
    },
    {
      icon: Gift,
      title: "Financial Support",
      description: "Help patients with medical expenses through our donation platform.",
      features: ["Secure payments", "Transparent tracking", "Direct impact"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Donor",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "I've been donating blood for 5 years through this platform. The process is seamless and I love seeing the impact of my donations."
    },
    {
      name: "Dr. Michael Chen",
      role: "Hospital Administrator",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "This platform has revolutionized how we manage blood supplies. The emergency alert system has saved countless lives."
    },
    {
      name: "Emily Rodriguez",
      role: "Blood Recipient",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "Thanks to the generous donors on this platform, I received the blood I needed during my surgery. Forever grateful!"
    }
  ];

  const blogPosts = [
    {
      title: "The Science Behind Blood Types",
      excerpt: "Understanding compatibility and why different blood types matter in transfusions.",
      date: "Jan 15, 2025",
      readTime: "5 min read",
      category: "Education"
    },
    {
      title: "Preparing for Your First Donation",
      excerpt: "Everything you need to know before donating blood for the first time.",
      date: "Jan 12, 2025",
      readTime: "3 min read",
      category: "Guide"
    },
    {
      title: "Emergency Blood Drive Success",
      excerpt: "How our community came together to help during the recent medical emergency.",
      date: "Jan 10, 2025",
      readTime: "4 min read",
      category: "News"
    }
  ];

  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Generally, healthy individuals aged 18-65 who weigh at least 50kg can donate blood. Specific eligibility criteria may vary based on medical history and current health status."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 8 weeks (56 days). Platelet donations can be made every 7 days, up to 24 times per year."
    },
    {
      question: "Is blood donation safe?",
      answer: "Yes, blood donation is very safe. We use sterile, single-use equipment and follow strict safety protocols. All donors receive a mini health screening."
    },
    {
      question: "How long does the donation process take?",
      answer: "The entire process typically takes 45-60 minutes, including registration, screening, donation (8-10 minutes), and recovery time."
    }
  ];

  return (
    <div className="font-sans">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px] overflow-hidden">
        <ImageSlider 
          images={heroImages}
          autoPlay={true}
          interval={6000}
          className="w-full h-full"
        />
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollIndicator targetId="services" />
        </div>
      </section>

      {/* Quick Access Banner */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about">
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <Heart size={16} />
                About Blood Donation
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <BookOpen size={16} />
                Blog & News
              </Button>
            </Link>
            <Link to="/help">
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <HelpCircle size={16} />
                Help & Support
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <Phone size={16} />
                Contact Us
              </Button>
            </Link>
            <Link to="/privacy-policy">
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <Shield size={16} />
                Privacy Policy
              </Button>
            </Link>
            <Link to="/terms-of-service">
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <FileText size={16} />
                Terms of Service
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section id="services" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive blood donation services designed to save lives and support our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-red-600 dark:text-red-400" size={32} />
                  </div>
                  <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Blood Types Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Blood Type Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understanding blood types and their compatibility is crucial for safe transfusions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {bloodTypes.map((type) => (
              <Card key={type} className="text-center p-6 hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {type}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Blood Type
                </div>
              </Card>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Universal Donor
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">O-</div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Can donate to all blood types
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Most needed in emergencies
                  </p>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Universal Recipient
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">AB+</div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Can receive from all blood types
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Great plasma donors
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Features & Highlights */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced features designed to make blood donation efficient, safe, and impactful.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Zap className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Real-time Matching
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our AI-powered system instantly matches donors with recipients based on blood type, location, and urgency.
              </p>
            </Card>
            
            <Card className="group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Shield className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Secure & Private
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Your personal information is protected with bank-level security and strict privacy controls.
              </p>
            </Card>
            
            <Card className="group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Activity className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Health Tracking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Monitor your donation history, health metrics, and receive personalized recommendations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Statistics Section */}
      <section className="py-16 bg-red-600 dark:bg-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-red-100 mb-12 text-lg max-w-3xl mx-auto">
            Together, we're making a real difference in our community's health and well-being.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">
                <AnimatedCounter end={15000} suffix="+" />
              </div>
              <p className="text-red-100">Lives Saved</p>
              <div className="flex items-center justify-center gap-1 text-sm">
                <TrendingUp size={16} />
                <span>+12% this year</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">
                <AnimatedCounter end={5000} suffix="+" />
              </div>
              <p className="text-red-100">Active Donors</p>
              <div className="flex items-center justify-center gap-1 text-sm">
                <UserCheck size={16} />
                <span>Verified</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">
                <AnimatedCounter end={25000} suffix="+" />
              </div>
              <p className="text-red-100">Total Donations</p>
              <div className="flex items-center justify-center gap-1 text-sm">
                <Calendar size={16} />
                <span>Since 2020</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">
                <AnimatedCounter end={100} suffix="+" />
              </div>
              <p className="text-red-100">Partner Hospitals</p>
              <div className="flex items-center justify-center gap-1 text-sm">
                <Globe size={16} />
                <span>Nationwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Community Says
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real stories from donors, recipients, and healthcare professionals who trust our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Users className="text-red-600 dark:text-red-400" size={20} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Blog/News Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Latest News & Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay informed with the latest updates, educational content, and community stories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="group hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              View All Articles
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Newsletter Signup */}
      <section className="py-16 bg-red-600 dark:bg-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-red-100 mb-8 text-lg max-w-2xl mx-auto">
            Get the latest updates on blood drives, health tips, and community impact stories delivered to your inbox.
          </p>
          
          {!newsletterSubmitted ? (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleNewsletterSubmit(onNewsletterSubmit);
              }}
              className="max-w-md mx-auto"
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterValues.email}
                    onChange={(e) => handleNewsletterChange('email', e.target.value)}
                    onBlur={() => handleNewsletterBlur('email')}
                    error={newsletterTouched.email && newsletterErrors.email}
                    className="bg-white/10 border-white/20 text-white placeholder-white/70"
                  />
                </div>
                <Button 
                  type="submit" 
                  loading={newsletterSubmitting}
                  variant="secondary"
                  className="bg-white text-red-600 hover:bg-gray-100"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-green-300 mb-4">
                <CheckCircle size={24} />
                <span className="text-lg font-semibold">Successfully Subscribed!</span>
              </div>
              <p className="text-red-100">
                Thank you for joining our community. You'll receive our next newsletter soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about blood donation and our platform.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg shrink-0">
                    <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Still have questions? We're here to help.
            </p>
            <Button variant="secondary" size="lg">
              Contact Support
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* 10. Call to Action */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-red-600 dark:text-red-400" size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Save Lives?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of heroes in our community. Whether you're donating blood, requesting help, or supporting financially, every action makes a difference.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate("/register")}
              size="lg"
              className="min-w-[200px] group"
            >
              <Heart className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Become a Donor
            </Button>
            <Button 
              onClick={() => navigate("/donation-request")}
              variant="secondary"
              size="lg"
              className="min-w-[200px] group"
            >
              <Droplets className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Request Blood
            </Button>
            <Button 
              onClick={() => navigate("/donate")}
              variant="outline"
              size="lg"
              className="min-w-[200px] group"
            >
              <Gift className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Donate Funds
            </Button>
          </div>
        </div>
      </section>

      {/* 11. Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Explore More
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover additional resources and information to help you on your blood donation journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => navigate('/about')}>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">About Blood Donation</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Learn about the importance of blood donation and how it saves lives every day.
              </p>
              <Button variant="secondary" size="sm" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                Learn More
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Card>

            <Card className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => navigate('/blog')}>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">Blog & News</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Stay updated with the latest articles, success stories, and community news.
              </p>
              <Button variant="secondary" size="sm" className="group-hover:bg-green-600 group-hover:text-white transition-colors">
                Read Articles
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Card>

            <Card className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => navigate('/help')}>
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <HelpCircle className="text-purple-600 dark:text-purple-400" size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">Help & Support</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Find answers to common questions and get support from our team.
              </p>
              <Button variant="secondary" size="sm" className="group-hover:bg-purple-600 group-hover:text-white transition-colors">
                Get Help
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* 12. Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions or need assistance? Our team is here to help you make a difference.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Send us a Message
              </h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Subject"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  className="input min-h-[120px] resize-y"
                  rows="5"
                  required
                ></textarea>
                <Button type="submit" className="w-full">
                  <Mail className="mr-2" size={20} />
                  Send Message
                </Button>
              </form>
            </Card>
            
            <Card>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-300">+880 123 456 789</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">24/7 Emergency Hotline</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Mail className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">support@blooddonate.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <MapPin className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Address</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Healthcare Avenue<br />
                      Medical District<br />
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <Clock className="text-red-600 dark:text-red-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Hours</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Mon - Fri: 8:00 AM - 8:00 PM<br />
                      Sat - Sun: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-600 rounded-lg">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-2xl">BloodDonate</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Connecting donors with those in need. Together, we're building a healthier, more caring community one donation at a time.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-red-400">
                  <AnimatedCounter end={15000} suffix="+" />
                </div>
                <span className="text-gray-300">Lives Saved</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/register" className="hover:text-white transition-colors">Register</a></li>
                <li><a href="/search" className="hover:text-white transition-colors">Find Donors</a></li>
                <li><a href="/donation-request" className="hover:text-white transition-colors">Request Blood</a></li>
                <li><a href="/donate" className="hover:text-white transition-colors">Donate Funds</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Blood Donation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 BloodDonate. All Rights Reserved. Made with ❤️ for humanity.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <span>Emergency Hotline:</span>
              <a href="tel:+8801234567890" className="text-red-400 font-semibold hover:text-red-300 transition-colors">
                +880 123 456 789
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

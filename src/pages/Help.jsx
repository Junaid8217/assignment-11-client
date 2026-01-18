import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Heart,
  Droplets,
  Shield,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Download,
  Video,
  FileText
} from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormValidation(
    { name: '', email: '', subject: '', message: '', priority: 'medium' },
    {
      name: [validationRules.required],
      email: [validationRules.required, validationRules.email],
      subject: [validationRules.required],
      message: [validationRules.required, validationRules.minLength(10)]
    }
  );

  const onSubmitTicket = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTicketSubmitted(true);
  };

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'donation', name: 'Blood Donation', icon: Droplets },
    { id: 'account', name: 'Account & Profile', icon: Users },
    { id: 'technical', name: 'Technical Issues', icon: AlertCircle },
    { id: 'safety', name: 'Safety & Health', icon: Shield }
  ];

  const faqs = [
    {
      id: 1,
      category: 'donation',
      question: "Who can donate blood?",
      answer: "Generally, healthy individuals aged 18-65 who weigh at least 50kg can donate blood. You must be in good health, have normal blood pressure and pulse, and meet other eligibility criteria. Specific requirements may vary based on medical history and current medications."
    },
    {
      id: 2,
      category: 'donation',
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 8 weeks (56 days). Platelet donations can be made every 7 days, up to 24 times per year. Plasma donations can be made twice per week with at least 48 hours between donations."
    },
    {
      id: 3,
      category: 'donation',
      question: "Is blood donation safe?",
      answer: "Yes, blood donation is very safe. We use sterile, single-use equipment for each donor. All equipment is disposed of after one use. You cannot contract any infectious disease by donating blood. All donors receive a mini health screening before donation."
    },
    {
      id: 4,
      category: 'donation',
      question: "How long does the donation process take?",
      answer: "The entire process typically takes 45-60 minutes, including registration, health screening, the actual donation (8-10 minutes), and recovery time. First-time donors may need additional time for the initial screening process."
    },
    {
      id: 5,
      category: 'account',
      question: "How do I create an account?",
      answer: "Click the 'Register' button in the top navigation, fill out the required information including your personal details, contact information, and blood type. You'll receive a verification email to activate your account."
    },
    {
      id: 6,
      category: 'account',
      question: "How do I update my profile information?",
      answer: "Log into your account and go to the Dashboard. Click on 'My Profile' or 'Settings' to update your personal information, contact details, availability, and notification preferences."
    },
    {
      id: 7,
      category: 'technical',
      question: "I'm having trouble logging in. What should I do?",
      answer: "First, make sure you're using the correct email and password. Try resetting your password using the 'Forgot Password' link. Clear your browser cache and cookies, or try using a different browser. If issues persist, contact our support team."
    },
    {
      id: 8,
      category: 'technical',
      question: "The website is not working properly on my mobile device.",
      answer: "Our website is optimized for mobile devices. Try refreshing the page, clearing your browser cache, or updating your mobile browser. If you continue experiencing issues, please contact support with details about your device and browser."
    },
    {
      id: 9,
      category: 'safety',
      question: "What should I do before donating blood?",
      answer: "Get a good night's sleep, eat a healthy meal, drink plenty of water, avoid alcohol for 24 hours before donation, and bring a valid ID. Wear comfortable clothing with sleeves that can be rolled up above the elbow."
    },
    {
      id: 10,
      category: 'safety',
      question: "What should I do after donating blood?",
      answer: "Rest for 10-15 minutes, drink plenty of fluids, avoid heavy lifting for 24 hours, keep the bandage on for 4-6 hours, and eat iron-rich foods. If you feel dizzy or unwell, sit down and contact our support team immediately."
    }
  ];

  const resources = [
    {
      title: "Blood Donation Guide",
      description: "Complete guide covering everything about blood donation",
      type: "PDF",
      icon: FileText,
      link: "#"
    },
    {
      title: "Donor Eligibility Checklist",
      description: "Quick checklist to determine if you're eligible to donate",
      type: "PDF",
      icon: CheckCircle,
      link: "#"
    },
    {
      title: "How to Prepare for Donation",
      description: "Video guide on preparing for your blood donation",
      type: "Video",
      icon: Video,
      link: "#"
    },
    {
      title: "Post-Donation Care",
      description: "Important information about caring for yourself after donation",
      type: "Article",
      icon: BookOpen,
      link: "#"
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Help & Support
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions, access helpful resources, or get in touch with our support team.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get instant help from our support team
            </p>
            <Button variant="secondary" size="sm">Start Chat</Button>
          </Card>

          <Card className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Phone className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Call Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Speak directly with our support team
            </p>
            <a href="tel:+8801234567891">
              <Button variant="secondary" size="sm">Call Now</Button>
            </a>
          </Card>

          <Card className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="text-red-600 dark:text-red-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Send us a detailed message
            </p>
            <a href="mailto:support@blooddonate.com">
              <Button variant="secondary" size="sm">Send Email</Button>
            </a>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="text-red-600 dark:text-red-400" size={24} />
                Frequently Asked Questions
              </h2>

              {/* Search and Filter */}
              <div className="mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/20'
                        }`}
                      >
                        <Icon size={16} />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      No FAQs found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Try adjusting your search terms or category filter.
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map(faq => (
                    <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </span>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="text-gray-400 shrink-0" size={20} />
                        ) : (
                          <ChevronRight className="text-gray-400 shrink-0" size={20} />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Contact Info */}
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <Phone className="text-red-600 dark:text-red-400" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Emergency Hotline</p>
                    <a href="tel:+8801234567890" className="text-red-600 dark:text-red-400 hover:underline">
                      +880 123 456 789
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400">24/7 Available</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Phone className="text-blue-600 dark:text-blue-400" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Support Line</p>
                    <a href="tel:+8801234567891" className="text-blue-600 dark:text-blue-400 hover:underline">
                      +880 123 456 791
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mon-Fri, 8AM-8PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Mail className="text-green-600 dark:text-green-400" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                    <a href="mailto:support@blooddonate.com" className="text-green-600 dark:text-green-400 hover:underline">
                      support@blooddonate.com
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Response within 24h</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Clock className="text-purple-600 dark:text-purple-400" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Office Hours</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Mon-Fri: 8AM-8PM<br />
                      Sat-Sun: 9AM-6PM
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Resources */}
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Helpful Resources
              </h3>
              <div className="space-y-3">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <a
                      key={index}
                      href={resource.link}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                        <Icon className="text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {resource.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.description}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* Submit Ticket */}
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Submit Support Ticket
              </h3>
              
              {!ticketSubmitted ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmitTicket);
                  }}
                  className="space-y-4"
                >
                  <Input
                    label="Name"
                    type="text"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    error={touched.name && errors.name}
                    required
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    error={touched.email && errors.email}
                    required
                  />
                  
                  <div className="form-group">
                    <label className="form-label">
                      Priority
                    </label>
                    <select
                      value={values.priority}
                      onChange={(e) => handleChange('priority', e.target.value)}
                      className="input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <Input
                    label="Subject"
                    type="text"
                    value={values.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    onBlur={() => handleBlur('subject')}
                    error={touched.subject && errors.subject}
                    required
                  />
                  
                  <div className="form-group">
                    <label className="form-label">
                      Message
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      value={values.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      className={`input min-h-[100px] resize-y ${
                        touched.message && errors.message ? 'error' : ''
                      }`}
                      rows="4"
                      placeholder="Describe your issue..."
                      required
                    />
                    {touched.message && errors.message && (
                      <div className="form-error">{errors.message}</div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    loading={isSubmitting}
                    className="w-full"
                  >
                    Submit Ticket
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="mx-auto text-green-500 mb-3" size={32} />
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    Ticket Submitted!
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
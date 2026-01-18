import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormValidation(
    { name: '', email: '', subject: '', message: '' },
    {
      name: [validationRules.required],
      email: [validationRules.required, validationRules.email],
      subject: [validationRules.required],
      message: [validationRules.required, validationRules.minLength(10)]
    }
  );

  const onSubmit = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help you make a difference.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <MessageCircle className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Send us a Message
              </h2>
            </div>

            {!submitted ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit);
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    type="text"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    error={touched.name && errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    error={touched.email && errors.email}
                    required
                  />
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
                    className={`input min-h-[120px] resize-y ${
                      touched.message && errors.message ? 'error' : ''
                    }`}
                    rows="5"
                    placeholder="Tell us how we can help you..."
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
                  <Send className="mr-2" size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-600 rounded-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-red-800 dark:text-red-300">
                  Emergency Hotline
                </h3>
              </div>
              <a 
                href="tel:+8801234567890" 
                className="text-2xl font-bold text-red-600 dark:text-red-400 hover:underline block mb-2"
              >
                +880 123 456 789
              </a>
              <p className="text-red-700 dark:text-red-300">
                Available 24/7 for urgent blood requests
              </p>
            </Card>

            {/* Regular Contact Info */}
            <Card>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Phone className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">General Inquiries</h4>
                    <a 
                      href="tel:+8801234567891" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      +880 123 456 791
                    </a>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri, 8AM-8PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Mail className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email Support</h4>
                    <a 
                      href="mailto:support@blooddonate.com" 
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      support@blooddonate.com
                    </a>
                    <p className="text-sm text-gray-500 dark:text-gray-400">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <MapPin className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Office Address</h4>
                    <address className="text-gray-600 dark:text-gray-300 not-italic">
                      123 Healthcare Avenue<br />
                      Medical District<br />
                      Dhaka 1000, Bangladesh
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Clock className="text-orange-600 dark:text-orange-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Office Hours</h4>
                    <div className="text-gray-600 dark:text-gray-300">
                      <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p>Saturday - Sunday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
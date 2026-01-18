import Card from '../components/ui/Card';
import { FileText, Scale, Shield, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: `By accessing and using the BloodDonate platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: 'description',
      title: 'Service Description',
      icon: FileText,
      content: `BloodDonate is a platform that connects blood donors with recipients and healthcare facilities. We facilitate blood donation requests, donor matching, and provide educational resources about blood donation. We do not provide medical services directly but serve as an intermediary platform.`
    },
    {
      id: 'eligibility',
      title: 'User Eligibility',
      icon: Users,
      content: `To use our services, you must be at least 18 years old and legally capable of entering into binding contracts. Blood donors must meet medical eligibility requirements as determined by healthcare professionals and applicable regulations.`
    },
    {
      id: 'responsibilities',
      title: 'User Responsibilities',
      icon: Shield,
      content: `Users are responsible for providing accurate and up-to-date information, maintaining the confidentiality of their account credentials, and using the platform in accordance with applicable laws and regulations. Donors must honestly disclose their medical history and current health status.`
    },
    {
      id: 'prohibited',
      title: 'Prohibited Uses',
      icon: AlertTriangle,
      content: `Users may not use the platform for any unlawful purpose, to transmit harmful or malicious content, to impersonate others, or to interfere with the platform's operation. Commercial use of donor information is strictly prohibited.`
    },
    {
      id: 'medical',
      title: 'Medical Disclaimer',
      icon: Scale,
      content: `BloodDonate does not provide medical advice, diagnosis, or treatment. All medical decisions should be made in consultation with qualified healthcare professionals. We are not responsible for medical outcomes related to blood donation or transfusion.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our blood donation platform.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg shrink-0">
                    <Icon className="text-red-600 dark:text-red-400" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Detailed Terms */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Detailed Terms and Conditions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  1. Account Registration
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  2. Blood Donation Process
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>All blood donations must be conducted at licensed medical facilities</li>
                  <li>Donors must meet all medical eligibility requirements</li>
                  <li>We facilitate connections but do not conduct medical procedures</li>
                  <li>Emergency requests will be prioritized based on medical urgency</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  3. Privacy and Data Protection
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>We collect and process personal data in accordance with our Privacy Policy</li>
                  <li>Medical information is shared only with authorized healthcare providers</li>
                  <li>You have the right to access, update, or delete your personal information</li>
                  <li>We implement appropriate security measures to protect your data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  4. Limitation of Liability
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>We are not liable for medical outcomes related to blood donation</li>
                  <li>Our liability is limited to the maximum extent permitted by law</li>
                  <li>We do not guarantee the availability of donors or recipients</li>
                  <li>Users participate in blood donation at their own risk</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  5. Intellectual Property
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>All platform content is owned by BloodDonate or its licensors</li>
                  <li>Users may not reproduce, distribute, or modify platform content</li>
                  <li>User-generated content remains the property of the user</li>
                  <li>We reserve the right to remove content that violates these terms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  6. Termination
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Either party may terminate the agreement at any time</li>
                  <li>We may suspend or terminate accounts for violations of these terms</li>
                  <li>Upon termination, your right to use the platform ceases immediately</li>
                  <li>Certain provisions of these terms will survive termination</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  7. Governing Law
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  These terms are governed by the laws of Bangladesh. Any disputes arising from 
                  these terms will be resolved in the courts of Dhaka, Bangladesh.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  8. Changes to Terms
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We reserve the right to modify these terms at any time. Users will be notified 
                  of significant changes via email or platform notifications. Continued use of the 
                  platform after changes constitutes acceptance of the new terms.
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Questions About These Terms?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> legal@blooddonate.com
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Phone:</strong> +880 123 456 789
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Address:</strong> 123 Healthcare Avenue, Medical District, Dhaka 1000, Bangladesh
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
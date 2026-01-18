import Card from '../components/ui/Card';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Information We Collect
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              register as a donor, or contact us for support.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Personal identification information (name, email, phone number)</li>
              <li>Health information relevant to blood donation eligibility</li>
              <li>Location data to match donors with recipients</li>
              <li>Communication preferences and history</li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Lock className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                How We Use Your Information
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We use the information we collect to provide, maintain, and improve our services.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Match donors with recipients based on blood type and location</li>
              <li>Send notifications about donation opportunities</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our platform and develop new features</li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Eye className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Information Sharing
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share information with 
              healthcare providers and blood banks to facilitate donations.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <UserCheck className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Your Rights
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              You have the right to access, update, or delete your personal information at any time.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Access and review your personal information</li>
              <li>Update or correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
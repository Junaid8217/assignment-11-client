import Card from '../components/ui/Card';
import { Heart, Users, Shield, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About Blood Donation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn about the importance of blood donation and how it saves lives every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Heart className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Why Donate Blood?
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Blood donation is a voluntary procedure that can help save lives. Every donation can help up to three people, making it one of the most impactful ways to help your community.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Who Can Donate?
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Most healthy adults aged 18-65 who weigh at least 50kg can donate blood. Specific eligibility criteria ensure the safety of both donors and recipients.
            </p>
          </Card>
        </div>

        <Card className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Blood Donation Facts
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">1 in 7</div>
              <p className="text-gray-600 dark:text-gray-300">People entering hospitals need blood</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">2 seconds</div>
              <p className="text-gray-600 dark:text-gray-300">Someone needs blood every 2 seconds</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">3 lives</div>
              <p className="text-gray-600 dark:text-gray-300">Can be saved with one donation</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
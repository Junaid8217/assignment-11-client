import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxios from '../hooks/useAxios';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';
import { HeartHandshake, DollarSign, Shield, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { toast } from 'react-toastify';

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  // Form validation setup
  const initialValues = {
    donateAmount: ''
  };

  const validation = {
    donateAmount: [
      validationRules.required,
      validationRules.number,
      validationRules.positiveNumber,
      validationRules.minValue(1)
    ]
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormValidation(initialValues, validation);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        donateAmount: formData.donateAmount,
        donorEmail: user?.email,
        donorName: user?.displayName,
      };

      const response = await axiosInstance.post('/create-payment-checkout', payload);
      
      if (response.data?.url) {
        toast.success('Redirecting to secure payment...');
        window.location.href = response.data.url;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const predefinedAmounts = [10, 25, 50, 100, 250];

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-6">
        
        {/* Main Donation Card */}
        <Card className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
              <HeartHandshake className="text-red-600 dark:text-red-400" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Support a Patient in Need
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Your donation saves lives
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Shield className="text-red-600 dark:text-red-400" size={20} />
              <span className="font-semibold text-red-800 dark:text-red-300">
                100% Secure & Transparent
              </span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">
              Every donation directly supports verified patients. Your contribution covers treatment costs and emergency support.
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }} className="space-y-6">
            
            {/* Quick Amount Selection */}
            <div>
              <label className="form-label text-center block mb-4">
                Choose an amount or enter custom
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleChange('donateAmount', amount.toString())}
                    className={`p-3 rounded-lg border-2 transition-all font-semibold ${
                      values.donateAmount === amount.toString()
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <Input
              label="Custom Amount (USD)"
              type="number"
              min="1"
              step="0.01"
              placeholder="Enter amount"
              value={values.donateAmount}
              onChange={(e) => handleChange('donateAmount', e.target.value)}
              onBlur={() => handleBlur('donateAmount')}
              error={touched.donateAmount && errors.donateAmount}
              required
              className="text-center text-lg font-semibold"
            />

            {/* Donation Impact */}
            {values.donateAmount && !errors.donateAmount && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Users className="text-green-600 dark:text-green-400" size={20} />
                  <span className="font-semibold text-green-800 dark:text-green-300">
                    Your Impact
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  ${values.donateAmount} can help cover {Math.floor(values.donateAmount / 10)} hours of medical care
                  {values.donateAmount >= 50 && " and potentially save a life"}
                </p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              disabled={!values.donateAmount || !!errors.donateAmount}
              className="w-full"
            >
              <DollarSign size={20} className="mr-2" />
              {isSubmitting ? 'Processing...' : `Donate $${values.donateAmount || '0'} Securely`}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Shield size={14} />
              Secure Payment
            </span>
            <span>•</span>
            <span>Trusted by 10,000+ Donors</span>
            <span>•</span>
            <span>Saving Lives Together</span>
          </div>
        </Card>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Secure & Safe</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Bank-level encryption protects your donation
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <HeartHandshake className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Direct Impact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              100% goes to verified patient care
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Join thousands of life-savers
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;

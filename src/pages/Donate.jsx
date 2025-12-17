import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxios from '../hooks/useAxios';
import { HeartHandshake } from 'lucide-react';

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const handleCheckout = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;

    const formdata = {
      donateAmount,
      donorEmail: user?.email,
      donorName: user?.displayName,
    };

    axiosInstance
      .post('/create-payment-checkout', formdata)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-4">
          <HeartHandshake className="text-red-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Support a Patient in Need</h1>
        </div>

        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Your donation directly supports patients who urgently need blood-related medical care.
          Every contribution helps cover treatment costs, emergency support, and saves lives.
        </p>

        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700">
            ❤️ 100% of your donation is allocated to verified patients.
            Transparency and care are our top priorities.
          </p>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount
            </label>
            <input
              name="donateAmount"
              type="number"
              required
              placeholder="Enter amount (USD)"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition"
          >
            Donate Securely
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Secure payment • Trusted by donors • Saving lives together
        </p>
      </div>
    </div>
  );
};

export default Donate;

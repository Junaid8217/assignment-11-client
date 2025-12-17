import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosInstance = useAxios();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    axiosInstance
      .post(`/success-payment?session_id=${sessionId}`)
      .then((res) => {
        setPayment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosInstance, sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <CheckCircle className="text-green-500" size={56} />
          <h1 className="text-2xl font-bold text-gray-800 mt-3">
            Payment Successful
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Thank you for your generous contribution. Your donation will directly support patients in need.
          </p>
        </div>

        <div className="border rounded-xl p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium text-gray-800">${payment?.amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Currency</span>
            <span className="font-medium uppercase text-gray-800">{payment?.currency}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Donor Email</span>
            <span className="font-medium text-gray-800">{payment?.donorEmail}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-mono text-xs text-gray-700 break-all">{payment?.transactionId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Status</span>
            <span className="font-semibold text-green-600">Paid</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-6">
          <p className="text-xs text-green-700 text-center">
            💚 Your donation has been securely processed via Stripe and recorded in our system.
          </p>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

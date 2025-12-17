import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/request')
      .then(res => {
        // only pending requests
        const pendingRequests = res.data.filter(
          req => req.donationStatus === 'pending'
        );
        setRequests(pendingRequests);
      })
      .catch(err => console.log(err));
  }, [axiosInstance]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Blood Donation Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">
          No pending donation requests available.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map(request => (
            <div
              key={request._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {request.recipientName}
              </h2>

              <p className="text-gray-600 mb-1">
                📍 {request.upazila}, {request.district}
              </p>

              <p className="text-gray-600 mb-1">
                🩸 Blood Group: 
                <span className="font-bold text-red-600 ml-1">
                  {request.blood}
                </span>
              </p>

              <p className="text-gray-600 mb-1">
                📅 Date: {request.donationDate}
              </p>

              <p className="text-gray-600 mb-4">
                ⏰ Time: {request.donationTime}
              </p>

              <button
                onClick={() => navigate(`/donation-request-details/${request?._id}`)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequest;



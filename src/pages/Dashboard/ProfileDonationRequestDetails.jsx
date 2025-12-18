import React, { useContext } from 'react';
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from '../../provider/AuthProvider';

const ProfileDonationRequestDetails = () => {

    
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const{role} = useContext(AuthContext)

useEffect(() => {
  const api = role === "Admin" 
    ? `/admin/donation-request/${id}`
    : `/donation-request/${id}`;

  axiosSecure.get(api)
    .then(res => setRequest(res.data))
    .catch(err => console.error(err));
}, [axiosSecure, id, role]);

  if (!request) return <p>Loading...</p>;



    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Donation Request Details</h2>

      <p><b>Recipient:</b> {request.recipientName}</p>
      <p><b>Blood Group:</b> {request.blood}</p>
      <p><b>Location:</b> {request.district}, {request.upazila}</p>
      <p><b>Date:</b> {request.donationDate}</p>
      <p><b>Time:</b> {request.donationTime}</p>
      <p><b>Status:</b> {request.donationStatus}</p>

      {request.donationStatus === "inprogress" && (
        <>
          <p><b>Donor Name:</b> {request.donorName}</p>
          <p><b>Donor Email:</b> {request.donorEmail}</p>
        </>
      )}
    </div>
    );
};

export default ProfileDonationRequestDetails;
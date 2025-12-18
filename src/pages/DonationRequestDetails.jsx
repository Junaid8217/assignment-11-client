import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useAxios from '../hooks/useAxios';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const [request, setRequest] = useState(null);
  const [openModal, setOpenModal] = useState(false);



  const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([])
    const { loading } = useContext(AuthContext)

    const fetchUser = () => {
        axiosSecure.get('/users')
        .then(res=>{
            setUsers(res.data)
        })
        .catch(err=>{
            console.log(err);
            
        })
    }

    useEffect(()=>{
        if (loading || !user) return;
        fetchUser()
        
    },[axiosSecure])

   


  useEffect(() => {
    axiosInstance.get(`/request-details/${id}`)
      .then(res => setRequest(res.data))
      .catch(err => console.log(err));
  }, [axiosInstance, id]);

  const handleConfirmDonation = async (id, 
donationStatus) => {
    try {
      await axiosSecure.patch(`/update/donation/status?id=${id}&donationStatus=${donationStatus}`)
        .then(res=>{
            console.log(res.data);
            fetchUser()    
        })

      setRequest(prev => ({
        ...prev,
        donationStatus: 'inprogress'
      }));

      setOpenModal(false);
      toast("Donation Confirm Successfully")
    } 
    catch (error) {
      console.error(error);
    }
  };

  if (!request) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Donation Request Details
      </h1>

     
      <div className="bg-white shadow rounded-xl p-6 space-y-3">
        <p><strong>Recipient Name:</strong> {request.recipientName}</p>
        <p><strong>Blood Group:</strong> <span className="text-red-600 font-bold">{request.blood}</span></p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Location:</strong> {request.upazila}, {request.district}</p>
        <p><strong>Address:</strong> {request.fullAddress}</p>
        <p><strong>Date:</strong> {request.donationDate}</p>
        <p><strong>Time:</strong> {request.donationTime}</p>
        <p><strong>Status:</strong>
          <span className="ml-2 px-2 py-1 rounded bg-yellow-100 text-yellow-700">
            {request.donationStatus}
          </span>
        </p>
        <p><strong>Message:</strong> {request.requestMessage}</p>

        {request.donationStatus === 'pending' && (
          <button
            onClick={() => setOpenModal(true)}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            Donate Blood
          </button>
        )}
      </div>

      
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Confirm Donation
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />

              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="w-1/2 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleConfirmDonation(request._id, 'inprogress')}
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;

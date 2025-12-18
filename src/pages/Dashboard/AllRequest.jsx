import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const AllRequest = () => {

    const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const {role} = useContext(AuthContext)

  useEffect(() => {
    axiosSecure.get("/all-donation-requests")
      .then(res => setRequests(res.data))
      .catch(() => toast.error("Failed to load requests"));
  }, [axiosSecure]);

  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/update/donation/status?id=${id}&donationStatus=${status}`);
      setRequests(prev =>
        prev.map(r => r._id === id ? { ...r, donationStatus: status } : r)
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this request?")) return;

 
  const api = role === "Admin" 
    ? `/admin/donation-request/${id}` 
    : `/donation-request/${id}`;

  try {
    await axiosSecure.delete(api);
    setRequests(prev => prev.filter(r => r._id !== id)); 
    toast.success("Deleted");
  } catch {
    toast.error("Delete failed");
  }
};

    return (
        <div className="p-6">
  <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
    All Blood Donation Requests
  </h2>

  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {requests.map(req => (
      <div
        key={req._id}
        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
      >
        
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
            {req.blood}
          </span>
          <span className={`capitalize text-sm font-medium 
            ${req.donationStatus === "inprogress" ? "text-yellow-600" :
              req.donationStatus === "done" ? "text-green-600" :
              "text-gray-500"}`}>
            {req.donationStatus}
          </span>
        </div>

       
        <div className="text-gray-700 space-y-2 mb-4">
          <p><b>Recipient:</b> {req.recipientName}</p>
          <p><b>Requester:</b> {req.requesterName} ({req.requesterEmail})</p>
          <p><b>Location:</b> {req.district}, {req.upazila}</p>
          <p><b>Date:</b> {req.donationDate}</p>
        </div>

     
        <div className="flex flex-wrap gap-2 mt-auto">
          {req.donationStatus === "inprogress" && (
            <>
              <button
                onClick={() => handleStatus(req._id, "done")}
                className="flex-1 btn btn-xs btn-success"
              >
                Done
              </button>
              <button
                onClick={() => handleStatus(req._id, "canceled")}
                className="flex-1 btn btn-xs btn-error"
              >
                Cancel
              </button>
            </>
          )}


          <button
            onClick={() => handleDelete(req._id)}
            className="flex-1 btn btn-xs btn-outline btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    );
};

export default AllRequest;
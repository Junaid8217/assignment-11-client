import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const MainDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState({});
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [myRequest, setMyRequest] = useState([]);

  
  useEffect(() => {
    axiosSecure.get("/user-profile")
      .then(res => {
        setProfileInfo(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error(err));
  }, [axiosSecure]);

  
  useEffect(() => {
    axiosSecure.get('/my-request-profile')
      .then(res => setMyRequest(res.data.request))
      .catch(err => console.error(err));
  }, [axiosSecure]);

 
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 
  const handleSave = async () => {
    try {
      await axiosSecure.put("/user-profile", formData);
      setProfileInfo(formData);
      setIsEdit(false);
      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  
  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/update/donation/status?id=${id}&donationStatus=${status}`);
      setMyRequest(prev =>
        prev.map(item => item._id === id ? { ...item, donationStatus: status } : item)
      );
      toast.success("Status Updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  
  const handleDelete = async id => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/donation-request/${id}`);
      setMyRequest(prev => prev.filter(item => item._id !== id));
      toast.success("Donation request deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete request");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">

   
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="btn btn-outline btn-primary btn-sm"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn btn-success btn-sm"
          >
            Save Changes
          </button>
        )}
      </div>

    
      <div className="flex flex-col items-center mb-6">
        <img
          src={profileInfo?.mainPhotURL}
          alt="avatar"
          className="w-24 h-24 rounded-full border shadow-sm"
        />
        <p className="text-sm text-gray-500 mt-2">Profile Picture</p>
      </div>

    
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            name="email"
            value={formData.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Blood Group</label>
          <input
            name="blood"
            value={formData.blood || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="input input-bordered w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">District</label>
            <input
              name="district"
              value={formData.district || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Upazila</label>
            <input
              name="upazila"
              value={formData.upazila || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </form>

   
      {myRequest.length > 0 && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">My Recent Donation Requests</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5">
            {myRequest.slice(0, 3).map(req => (
              <div
                key={req._id}
                className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
              >
              
                <div className="mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold">
                    {req.blood}
                  </span>
                </div>

          
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Recipient:</span> {req.recipientName}</p>
                  <p><span className="font-semibold">Location:</span> {req.district}, {req.upazila}</p>
                  <p><span className="font-semibold">Date:</span> {req.donationDate}</p>
                  <p><span className="font-semibold">Time:</span> {req.donationTime}</p>
                  <p>
                    <span className="font-semibold">Status:</span> 
                    <span
                      className={`capitalize font-medium ${
                        req.donationStatus === "pending"
                          ? "text-yellow-500"
                          : req.donationStatus === "inprogress"
                          ? "text-blue-500"
                          : req.donationStatus === "done"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {req.donationStatus}
                    </span>
                  </p>

                  {req.donationStatus === "inprogress" && (
                    <div className="mt-2 p-2 rounded-md bg-gray-50 text-xs">
                      <p className="font-semibold">Donor Info</p>
                      <p>{req.donorName}</p>
                      <p className="text-gray-500">{req.donorEmail}</p>
                    </div>
                  )}
                </div>

             
                <div className="mt-4 flex flex-wrap gap-2">
                  {req.donationStatus === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatus(req._id, "done")}
                        className="btn btn-xs btn-success"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatus(req._id, "canceled")}
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => navigate(`/dashboard/edit-request/${req._id}`)}
                    className="btn btn-xs btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/donation-request/${req._id}`)}
                    className="btn btn-xs btn-primary"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          <div className="mt-6 text-right">
            <button
              onClick={() => navigate("/dashboard/my-all-request")}
              className="btn btn-primary"
            >
              View My All Request
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MainDashboard;

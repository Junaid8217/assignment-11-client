import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyAllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [myRequest, setMyRequest] = useState([]);

  useEffect(() => {
    axiosSecure.get("/my-request-profile")
      .then(res => setMyRequest(res.data.request))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/update/donation/status?id=${id}&donationStatus=${status}`);
      setMyRequest(prev =>
        prev.map(item =>
          item._id === id ? { ...item, donationStatus: status } : item
        )
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      await axiosSecure.delete(`/donation-request/${id}`);
      setMyRequest(prev => prev.filter(item => item._id !== id));
      toast.success("Request deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Donation Requests</h2>

      <div className="grid gap-5">
        {myRequest.map(req => (
          <div
            key={req._id}
            className="bg-white border rounded-xl shadow-sm p-5"
          >
            <div className="mb-2">
              <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold">
                {req.blood}
              </span>
            </div>

            <div className="space-y-1 text-sm">
              <p><b>Recipient:</b> {req.recipientName}</p>
              <p><b>Location:</b> {req.district}, {req.upazila}</p>
              <p><b>Date:</b> {req.donationDate}</p>
              <p><b>Time:</b> {req.donationTime}</p>
              <p>
                <b>Status:</b>{" "}
                <span className="capitalize font-medium">
                  {req.donationStatus}
                </span>
              </p>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
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
    </div>
  );
};

export default MyAllRequests;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    axiosSecure.get(`/donation-request/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure, id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axiosSecure.put(`/donation-request/${id}`, formData);
      toast("Donation request updated!");
      navigate("/dashboard/my-request");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update request");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Donation Request</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient Name</label>
          <input
            name="recipientName"
            value={formData.recipientName || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">District</label>
          <input
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upazila</label>
          <input
            name="upazila"
            value={formData.upazila || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Blood Group</label>
          <input
            name="blood"
            value={formData.blood || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditRequest;

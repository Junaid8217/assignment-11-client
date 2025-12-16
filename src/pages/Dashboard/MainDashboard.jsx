import React, {  useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const MainDashboard = () => {

    const axiosSecure = useAxiosSecure();

  const [profileInfo, setProfileInfo] = useState({});
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    axiosSecure.get("/user-profile").then((res) => {
      setProfileInfo(res.data);
      setFormData(res.data); 
    });
  }, [axiosSecure]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSave = async () => {
    try {
      await axiosSecure.put("/user-profile", formData);
      setProfileInfo(formData);
      setIsEdit(false);
      toast("Profile Updated Successfully")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
  {/* Header */}
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

  {/* Avatar */}
  <div className="flex flex-col items-center mb-6">
    <img
      src={
        profileInfo?.mainPhotURL
      }
      alt="avatar"
      className="w-24 h-24 rounded-full border shadow-sm"
    />
    <p className="text-sm text-gray-500 mt-2">Profile Picture</p>
  </div>

  {/* Form */}
  <form className="space-y-4">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Full Name
      </label>
      <input
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        disabled={!isEdit}
        className="input input-bordered w-full"
        placeholder="Enter your name"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Email Address
      </label>
      <input
        name="email"
        value={formData.email || ""}
        disabled
        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
      />
    </div>

    {/* Blood Group */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Blood Group
      </label>
      <input
        name="blood"
        value={formData.blood || ""}
        onChange={handleChange}
        disabled={!isEdit}
        className="input input-bordered w-full"
        placeholder="e.g. A+"
      />
    </div>

    {/* Address */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          District
        </label>
        <input
          name="district"
          value={formData.district || ""}
          onChange={handleChange}
          disabled={!isEdit}
          className="input input-bordered w-full"
          placeholder="District"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Upazila
        </label>
        <input
          name="upazila"
          value={formData.upazila || ""}
          onChange={handleChange}
          disabled={!isEdit}
          className="input input-bordered w-full"
          placeholder="Upazila"
        />
      </div>
    </div>
  </form>
</div>

  );
};

export default MainDashboard;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';

const SearchRequest = () => {


    const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);



        const [upazilas, setUpazilas] = useState([])
        const [districts, setDistricts] = useState([]);
        const [district, setDistrict]= useState('')
        const[upazila, setUpazila] = useState('')

        const axiosInstance= useAxios();
    
        useEffect(()=>{
            axios.get('./upazila.json')
            .then(res=>{
                setUpazilas(res.data.upazilas)
                
    
            })
    
            axios.get('./district.json')
            .then(res=>{
                setDistricts(res.data.districts)
            })
        },[])

        const handleSearch =(e) =>{
            e.preventDefault();
            const blood= e.target.blood.value.trim();
            setLoading(true);
            

            axiosInstance.get(`/search-request?blood=${blood}&district=${district}&upazila=${upazila}`)
            .then(res=>{
                setResults(res.data);
      setLoading(false);
                
            })
            .catch(() => setLoading(false));

        }




    return (
        <div className="min-h-screen bg-gray-50 py-8">
  
  <div className="max-w-6xl mx-auto px-4">
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
    >
     
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Blood Group
        </label>
        <select name="blood" className="select select-bordered w-full">
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

     
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          District
        </label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Upazila
        </label>
        <select
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      
      <button
        type="submit"
        className="btn btn-primary w-full lg:w-auto bg-red-600 hover:bg-red-700"
      >
        Search
      </button>
    </form>
  </div>

  
  <div className="max-w-6xl mx-auto mt-10 px-4">
    {loading && (
      <p className="text-center text-gray-500">
        Searching blood requests...
      </p>
    )}

    {!loading && results.length === 0 && (
      <p className="text-center text-gray-500">
        No blood requests found.
      </p>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((req) => (
        <div
          key={req._id}
          className="bg-white rounded-2xl shadow-md border p-5 flex flex-col justify-between"
        >
         
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg text-gray-800">
              {req.recipientName}
            </h3>
            <span className="badge badge-error">
              {req.blood}
            </span>
          </div>

         
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Hospital:</strong> {req.hospitalName}</p>
            <p><strong>Location:</strong> {req.upazila}, {req.district}</p>
            <p><strong>Date:</strong> {req.donationDate}</p>
            <p><strong>Time:</strong> {req.donationTime}</p>
          </div>

        
          <div className="bg-gray-50 border rounded-xl p-3 mt-4 text-sm text-gray-700">
            {req.requestMessage}
          </div>

        
          <div className="flex justify-between items-center mt-5">
            <span
              className={`badge ${
                req.donationStatus === 'pending'
                  ? 'badge-warning'
                  : 'badge-success'
              }`}
            >
              {req.donationStatus}
            </span>

            <button className="btn btn-sm btn-primary">
              Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    );
};

export default SearchRequest;
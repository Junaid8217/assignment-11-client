import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddRequest = () => {

    const { user } = useContext(AuthContext)

    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')




    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => {
                setUpazilas(res.data.upazilas)


            })

        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts)
            })
    }, [])

    // console.log(upazilas, districts)
    // return


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            requesterName: e.target.requesterName.value,
            requesterEmail: e.target.requesterEmail.value,
            recipientName: e.target.recipientName.value,
            hospitalName: e.target.hospitalName.value,
            fullAddress: e.target.fullAddress.value,
            blood: e.target.blood.value,
            donationDate: e.target.donationDate.value,
            donationTime: e.target.donationTime.value,
            requestMessage: e.target.requestMessage.value,
            donationStatus: "pending",
            district,
            upazila

        };


        axiosSecure.post('/request', formData)
        .then(()=>{
            toast("Request Added Successfully")
            e.target.reset()
        })
        .catch(err=>{
            console.log(err);
            
        })


    };
    // console.log(user);
    
   
    





    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto p-6 bg-white shadow-md rounded"
            >

                <div className="mb-4">
                    <label className="block mb-1">Requester Name</label>
                    <input
                        type="text"
                        name="requesterName"
                        readOnly
                        defaultValue={user?.displayName
                        }
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>


                <div className="mb-4">
                    <label className="block mb-1">Requester Email</label>
                    <input
                        type="email"
                        name="requesterEmail"
                        readOnly
                        defaultValue={user?.
                            email
                        }
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>


                <div className="mb-4">
                    <label className="block mb-1">Recipient Name</label>
                    <input
                        type="text"
                        name="recipientName"
                        placeholder="Recipient Name"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 ">District</label>
                    <select value={district} onChange={(e) => setDistrict(e.target.value)} className="select w-full border px-3 py-2 rounded">
                        <option disabled selected value=''>Select Your District</option>
                        {
                            districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                        }
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Upazila</label>
                    <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="select w-full border px-3 py-2 rounded">
                        <option disabled selected value=''>Select Your Upazila</option>
                        {
                            upazilas.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                        }
                    </select>
                </div>


                <div className="mb-4">
                    <label className="block mb-1">Hospital Name</label>
                    <input
                        type="text"
                        name="hospitalName"
                        placeholder="Dhaka Medical College Hospital"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Full Address</label>
                    <input
                        type="text"
                        name="fullAddress"
                        placeholder="Zahir Raihan Rd, Dhaka"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="block mb-1">Blood Group</label>
                    <select name="blood" className="w-full border px-3 py-2 rounded" required>
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


                <div className="mb-4">
                    <label className="block mb-1">Donation Date</label>
                    <input type="date" name="donationDate" className="w-full border px-3 py-2 rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Donation Time</label>
                    <input type="time" name="donationTime" className="w-full border px-3 py-2 rounded" required />
                </div>


                <div className="mb-4">
                    <label className="block mb-1">Request Message</label>
                    <textarea
                        name="requestMessage"
                        placeholder="Explain why you need the blood"
                        className="w-full border px-3 py-2 rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Request
                </button>
            </form>


        </div>
    );
};

export default AddRequest;
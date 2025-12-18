import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { Link } from "react-router";

const AllFund = () => {
  const [funds, setFunds] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/fund")
      .then((res) => setFunds(res.data))
      .catch(() => toast.error("Failed to load funding data"));
  }, [axiosInstance]);



  const totalFunds = funds.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-semibold">All Funding</h2>
        <Link to='/donate'><button
    
          className="btn btn-primary"
        >
          Give Fund
        </button></Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Donor Email</th>
              <th className="px-4 py-2 border">Amount (USD)</th>
              <th className="px-4 py-2 border">Payment Status</th>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((f) => (
              <tr key={f.transactionId} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{f.donorEmail}</td>
                <td className="px-4 py-2 border">${f.amount}</td>
                <td className="px-4 py-2 border capitalize">{f.paymentStatus}</td>
                <td className="px-4 py-2 border">{f.transactionId}</td>
                <td className="px-4 py-2 border">
                  {new Date(f.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right font-semibold text-lg">
        Total Funds: ${totalFunds}
      </div>
    </div>
  );
};

export default AllFund;

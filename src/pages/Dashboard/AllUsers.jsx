import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([])
    const {user, loading, role } = useContext(AuthContext)

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

    console.log(users);

    const handleStatusChange = (email, status, role) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}&role=${role}`)
        .then(res=>{
            console.log(res.data);
            fetchUser()
            
            
        })
    }
    
    
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
   
    <thead>
      <tr>
        <th>Name</th>
        <th>Blood Group</th>
        <th>Email</th>
        <th>District</th>
        <th>Upazila</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    
      {
        users?.map(user=><tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user?.mainPhotURL}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user?.name}</div>
              <div className="text-sm opacity-50">{user?.role}</div>
            </div>
          </div>
        </td>
        <td>
          {user?.blood}
          
        </td>
        <td>{user?.email}</td>
        <td>{user?.district}</td>
        <td>{user?.upazila}</td>
        <td>{user?.status}</td>



        <th className='flex gap-3'>
          {user?.role !== 'Admin' && (
  <>

    {user?.status === 'active' ? (
      <button
        onClick={() => handleStatusChange(user?.email, 'blocked', user?.role)}
        className="btn btn-primary btn-sm"
      >
        Block
      </button>
    ) : (
      <button
        onClick={() => handleStatusChange(user?.email, 'active', user?.role)}
        className="btn btn-primary btn-sm"
      >
        Active
      </button>
    )}

    
    {role === 'Admin' && (
  user?.role === 'Donor' ? (
    <button
      onClick={() =>
        handleStatusChange(user?.email, 'active', 'Volunteer')
      }
      className="btn btn-primary btn-sm"
    >
      Make Volunteer
    </button>
  ) : (
    <button
      onClick={() =>
        handleStatusChange(user?.email, 'active', 'Donor')
      }
      className="btn btn-primary btn-sm"
    >
      Remove Volunteer
    </button>
  )
)}

  </>
)}

          
        </th>
      </tr>)
      }
    </tbody>
    
  </table>
</div>
        </div>
    );
};

export default AllUsers;



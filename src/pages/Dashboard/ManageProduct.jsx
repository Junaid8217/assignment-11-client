import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const ManageProduct = () => {
    const [products, setProducts] = useState([])
    const axiosInstance= useAxios();
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        axiosInstance.get(`/manager/products/${user?.email}`)
        .then(res=>{
            setProducts(res.data)
        })
        .catch(err=>{
            console.log(err);
            
        })
    },[axiosInstance, user?.email])

    console.log(products);
    



    return (
        <div className="overflow-x-auto">
  <table className="table">
  
    <thead>
      <tr>
        
        <th>Product Name</th>
        <th>Price</th>
        <th>Available Quantity</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    
      {
        products?.map(product=> 
            <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={product?.mainPhotURL
}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{product?.productName}</div>
              
            </div>
          </div>
        </td>
        <td>
          {product?.price}
        </td>
        <td>{product?.availableQuantity
            }</td>
            <td>
          {product?.productDescription
}
        </td>
        <th className='flex gap-3'>
          <button className="btn btn-primary btn-sm">Edit</button>
          <button className="btn btn-sm btn-error">Delete</button>
        </th>
      </tr>
         )
      }
    </tbody>
  
  </table>
</div>
    );
};

export default ManageProduct;
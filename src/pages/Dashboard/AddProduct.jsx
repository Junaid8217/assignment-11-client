import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../provider/AuthProvider";

const AddProduct = () => {

    const axiosInstance = useAxios()
    const {user} = useContext(AuthContext);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value
        const productDescription = form.productDescription.value
        const category = form.category.value
        const price = parseInt(form.price.value)
        const availableQuantity = parseInt(form.availableQuantity.value)
        const minimumOrderQuantity = parseInt(form.minimumOrderQuantity.value)
        const images = form.images
        const file = images.files[0];
        const paymentOption = form.paymentOption.value


        //to grab image from device 
        const res = await axios.post(`https://api.imgbb.com/1/upload?&key=d10fcf86c44edda7407c4d175029945a`, { image: file }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })


        const mainPhotURL = res.data.data.display_url
        
        


        const formData = {
            productName,
            productDescription,
            category,
            price,
            availableQuantity,
            minimumOrderQuantity,
            mainPhotURL,
            paymentOption,
            productManagerEmail: user?.email
        }

        console.log(formData);
        axiosInstance.post('/products', formData)
        .then(res=>{
            console.log(res.data);
            toast('Product Added Successfully')
           form.reset();
            
        })
        .catch(err=>{
            console.log(err);
            
        })
        
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                    <label className="block mb-1 font-semibold">Product Name / Title</label>
                    <input
                        type="text"
                        name="productName"
                        placeholder="Enter product name"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Product Description */}
                <div>
                    <label className="block mb-1 font-semibold">Product Description</label>
                    <textarea
                        name="productDescription"
                        placeholder="Enter detailed description"
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        required
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-semibold">Category</label>
                    <select
                        name="category"
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-semibold">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Available Quantity */}
                <div>
                    <label className="block mb-1 font-semibold">Available Quantity</label>
                    <input
                        type="number"
                        name="availableQuantity"
                        placeholder="Enter available quantity"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Minimum Order Quantity (MOQ) */}
                <div>
                    <label className="block mb-1 font-semibold">Minimum Order Quantity (MOQ)</label>
                    <input
                        type="number"
                        name="minimumOrderQuantity"
                        placeholder="Enter minimum order quantity"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Images Upload */}
                <div>
                    <label className="block mb-1 font-semibold">Images Upload</label>
                    <input
                        type="file"
                        name="images"
                        className="file-input file-input-bordered w-full"
                        multiple
                        required
                    />
                </div>


                {/* Payment Option */}
                <div>
                    <label className="block mb-1 font-semibold">Payment Option</label>
                    <select
                        name="paymentOption"
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select payment option</option>
                        <option value="COD">Cash on Delivery</option>
                        <option value="PayFirst">Pay First</option>
                    </select>
                </div>

                {/* Show on Home Page */}
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="showOnHome" id="showOnHome" className="checkbox" />
                    <label htmlFor="showOnHome" className="font-semibold">
                        Show on Home Page
                    </label>
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" className="btn btn-primary w-full">
                        Add Product
                    </button>
                </div>
            </form>

        </div>
    );
};


export default AddProduct;
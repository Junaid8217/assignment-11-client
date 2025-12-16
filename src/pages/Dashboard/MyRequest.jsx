import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';

const MyRequest = () => {

    const [myRequest, setMyRequest] = useState([])

    const [totalRequest, setTotalRequest] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPageNo, setCurrentPageNo] = useState(1)

    const axiosSecure = useAxiosSecure()

    const { user } = useContext(AuthContext)
    console.log(user);


    useEffect(() => {
        axiosSecure.get(`/my-request?page=${currentPageNo - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequest(res.data.request);
                setTotalRequest(res.data.totalRequest)

            })
    }, [axiosSecure, currentPageNo, itemsPerPage])


    const numberOfPages = Math.ceil(totalRequest / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)


    // console.log(myRequest);
    // console.log(totalRequest);
    // console.log(numberOfPages);
    console.log(pages);

    const handlePrev =()=>{
        if(currentPageNo>1){
            setCurrentPageNo(currentPageNo-1)
        }
    }
    const handleNext =()=>{
        if(currentPageNo< pages.length){
            setCurrentPageNo(currentPageNo+1)
        }
    }




    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Recipient Name</th>
                            <th>Place</th>
                            <th>Blood Group</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myRequest.map((request, index) =>
                                <tr>
                                    <th>{(currentPageNo*10)+(index + 1)-10}</th>
                                    <td>{request?.recipientName}</td>
                                    <td>{request?.hospitalName}</td>
                                    <td>{request?.
                                        blood}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
           <div className='flex justify-center mt-12 gap-4'>
            <button onClick={handlePrev} className="btn">Prev</button>
            {
                pages.map(page=>
                    <button className={`btn ${page === currentPageNo? 'bg-[#435585] text-white' : ''}`}
                     onClick={()=> setCurrentPageNo(page)}>
                        {page}
                    </button>
                )
            }
            <button onClick={handleNext} className="btn">Next</button>
           </div>
        </div>
    );
};

export default MyRequest;
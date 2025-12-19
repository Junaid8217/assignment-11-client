import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";



const axiosSecure = axios.create({
    baseURL: 'https://backend-11-topaz.vercel.app'
})

const useAxiosSecure = () => {

    const {user} = useContext(AuthContext)

    useEffect(()=>{
        const reqInterceptor = axiosSecure.interceptors.request.use(config=>{
            config.headers.authorization = `Bearer ${user?.accessToken}`
            return config
        })

        const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
            return response
        },(err)=>{
            console.log(err);
            return Promise.reject(err)
        })

        //cleanup function
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }

    },[user])

    return axiosSecure
}

export default useAxiosSecure;
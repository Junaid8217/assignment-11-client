import axios from "axios";

//interceptors
const axiosInstance = axios.create({
    baseURL: 'https://backend-11-topaz.vercel.app'
})

const useAxios = () =>{
    return axiosInstance
}

export default useAxios
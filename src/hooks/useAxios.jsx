import axios from "axios";

//interceptors
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxios = () =>{
    return axiosInstance
}

export default useAxios
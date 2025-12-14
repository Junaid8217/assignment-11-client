import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {

    const { registerWithEmailPAssword, setUser, user, handleGoogleSignIn } = useContext(AuthContext)

    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict]= useState('')
    const[upazila, setUpazila] = useState('')

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

   
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.pass.value;
        const photoUrl = e.target.photoURL;
        const file = photoUrl.files[0]
        const blood = e.target.blood.value





        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;

        if (password.length < 6) {
            return alert("less then 6 characters")
        }
        if (!upperCase.test(password)) {
            return alert("Need a upper case")
        }
        if (!lowerCase.test(password)) {
            return alert("Need a lower case")
        }

        //to grab image from device 
        const res = await axios.post(`https://api.imgbb.com/1/upload?&key=d10fcf86c44edda7407c4d175029945a`, { image: file }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })


        const mainPhotURL = res.data.data.display_url

        const formData = {
            name,
            email,
            password,
            mainPhotURL,
            blood,
             district, 
             upazila

        }

    
        
        
        if (res.data.success == true) {

            registerWithEmailPAssword(email, password)
                .then((userCredential) => {

                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: mainPhotURL
                    }).then(() => {
                        // console.log(userCredential.user);
                        setUser(userCredential.user)
                        axios.post('http://localhost:3000/Users', formData)
                            .then(res => {
                                console.log(res.data);

                            })
                            .catch(err => {
                                console.log(err);

                            })
                    }).catch((error) => {
                        console.log(error)
                    });
                    toast("Registration Successful")
                    e.target.reset();
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }



    const googleSignUp = () => {
        handleGoogleSignIn()
            .then(result => {
                const user = result.user
                setUser(user)
                toast("Registration Successful")
            })
            .catch(err => {
                console.log(err)
            })

    }

    console.log(user)




    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="fieldset">
                            <label className="label">Name</label>
                            <input name='name' type="text" className="input" placeholder="Name" />

                            <label className="label">Email</label>
                            <input name='email' type="email" className="input" placeholder="Email" />
                            <label className="label">PhotoURL</label>
                            <input name='photoURL' type="file" className="input" placeholder="PhotoURL" />
                            <label className="label">Blood Group</label>
                            <select name='blood' defaultValue="Select Blood Group" className="select">
                                <option value="">-- Select Blood Group --</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                            <label className="label">District</label>
                            <select value={district} onChange={(e)=>setDistrict(e.target.value)} className="select">
                                <option disabled selected value=''>Select Your District</option>
                                {
                                    districts.map(d=> <option value={d?.name} key={d.id}>{d?.name}</option>)
                                }
                            </select>
                            <label className="label">Upazila</label>
                            <select value={upazila} onChange={(e)=>setUpazila(e.target.value)} className="select">
                                <option disabled selected value=''>Select Your Upazila</option>
                                {
                                    upazilas.map(d=> <option value={d?.name} key={d.id}>{d?.name}</option>)
                                }
                            </select>

                            <label className="label">Password</label>
                            <input name='pass' type="password" className="input" placeholder="Password" />

                            <div>
                                <span>Already have an account? <Link to={'/login'} className='text-blue-700 underline'>Login</Link></span>
                            </div>
                            <button className="btn btn-neutral mt-4">Register</button>
                        </form>
                        <button onClick={googleSignUp} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
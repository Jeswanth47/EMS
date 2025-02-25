// // import React from 'react'

// import axios from "axios"
// import { useState } from "react"
// import { useAuth } from "../context/authContext"
// import { useNavigate } from "react-router-dom"

// const Login = () => {
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')
//     const[error,setError]=useState(null)
//     const {login}=useAuth()
//     const navigate=useNavigate()

//     const handleSubmit= async (e) => {
//         e.preventDefault()
//         try {
//             const response=await axios.post("http://localhost:5000/api/auth/login",{email,password})
//             if(response.data.success) {
//                 login(response.data.user)
//                 localStorage.setItem("token",response.data.token)
//                 if(response.data.user.role==='admin') {
//                     navigate('/admin-dashboard')
//                 }
//                 else {
//                     navigate('employee-dashboard')
//                 }
//             }
//         }
//         catch(error) {
//             if(error.response && !error.response.data.success) {
//                 setError(error.response.data.error)
//             }
//             else {
//                 setError('Server Error')
//             }
//         }
//     }

//   return (
//     <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6'>
//         <h2 className='font-DMSan text-3xl text-white'>
//             Employee Management System
//         </h2>
//         <div className="border shadow p-6 w-80 bg-white">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <form onSubmit={handleSubmit}>
//             <div className='mb-4'>
//                 <label htmlFor='email' className='block text-gray-700'>Email</label>
//                 <input 
//                 type='email'
//                 className='w-full px-3 py-2 border' 
//                 placeholder='Enter Email'
//                 onChange={(e)=>setEmail(e.target.value)}
//                 required
//                 >
//                 </input>
//             </div>
//             <div className='mb-4'>
//                 <label htmlFor='password' className='block text-gray-700'>Password</label>
//                 <input 
//                 type='password' 
//                 className='w-full px-3 py-2 border'
//                 placeholder='Enter Password'
//                 onChange={(e)=>setPassword(e.target.value)}
//                 required
//                 >
//                 </input>
//             </div>
//             <div className='mb-4 flex items-center justify-between'>
//                 <label className='inline-flex items-center'>
//                     <input type="checkbox" className='form-checkbox'></input>
//                     <span className='ml-2 text-gray-700'>Remember me</span>
//                 </label>
//                 <a href='#' className='text-teal-600'>
//                     Forgot Password
//                 </a>
//             </div>
//             <div className='mb-4'>
//             <button
//             type='submit'
//             className='w-full bg-teal-600 text-white py-2 cursor-pointer'
//             >Login</button>
//             </div>
//         </form>
//         </div>
//     </div>
//   )
// }

// export default Login


import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError('Server Error');
            }
        }
    };

    return (
        <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-br from-teal-700 to-gray-300 p-6'>
            <h2 className='font-bold text-4xl text-white mb-6 drop-shadow-lg'>
                Employee Management System
            </h2>
            <div className="border shadow-lg p-8 w-96 bg-white rounded-2xl"> 
                <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Login</h2>
                {error && <p className="text-red-500 text-center font-medium mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
                        <input 
                            type='email'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block text-gray-700 font-medium mb-1'>Password</label>
                        <input 
                            type='password' 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                            placeholder='Enter Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                        <label className='inline-flex items-center text-gray-600'>
                            <input type="checkbox" className='form-checkbox text-teal-600'/>
                            <span className='ml-2'>Remember me</span>
                        </label>
                        <a href='#' className='text-teal-600 hover:underline'>Forgot Password?</a>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition duration-300 cursor-pointer'
                    >Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

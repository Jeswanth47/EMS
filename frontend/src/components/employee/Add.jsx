import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Add = () => {
    const [departments,setDepartments]=useState([])
    const [formData,setFormData]=useState({})

    const navigate=useNavigate();

    useEffect(()=>{
        const getDepartments=async ()=> {
        const departments=await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments()
    },[])

    const handleChange = (e)=>{
        const {name,value,files}=e.target
        if(name==='image') {
            setFormData((prevData)=>({...prevData,[name]:files[0]}))
        }
        else {
            setFormData((prevData)=>({...prevData,[name]:value}))
        }
    }

const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
        if (key === 'department') {
            formDataObj.append(key, JSON.stringify(formData[key])); // Ensure department is sent as string
        } else {
            formDataObj.append(key, formData[key]);
        }
    });

    try {
        const response = await axios.post('http://localhost:5000/api/employee/add', formDataObj, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.data.success) {
            navigate('/admin-dashboard/employees');
        }
    } catch (error) {
        console.error("Error:", error.response?.data?.error || error.message);
        alert(error.response?.data?.error || "Something went wrong!");
    }
};


  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input type='text' name='name' onChange={handleChange} placeholder='Enter Name' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input type='email' name='email' onChange={handleChange} placeholder='Enter Email' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          
          {/* Employee ID */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Employee ID</label>
            <input type='text' name='employeeId' onChange={handleChange} placeholder='Enter Employee ID' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          
          {/* Date of Birth */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
            <input type='date' name='dob' onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          
          {/* Gender */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select name='gender' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
          
            </select>
          </div>
          
          {/* Marital Status */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
            <select name='maritalStatus' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value=''>Select Status</option>
              <option value='single'>Single</option>
              <option value='married'>Married</option>
            </select>
          </div>
          
          {/* Designation */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Designation</label>
            <input type='text' name='designation' onChange={handleChange} placeholder='Enter Designation' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          
          {/* Department */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Department</label>
            <select name='department' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value=''>Select Department</option>
             {departments.map((dep)=>(
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
            ))}
            </select>
          </div>
          
          {/* Salary */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Salary</label>
            <input type='number' name='salary' onChange={handleChange} placeholder='Enter Salary' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          
          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input type='password' name='password' onChange={handleChange} placeholder='Enter Password' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
          </div>
          
          {/* Role */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Role</label>
            <select name='role' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value=''>Select Role</option>
              {/* <option value='admin'>Admin</option> */}
              <option value='employee'>Employee</option>
            </select>
          </div>
          
          {/* Upload Image */}
          {/* <div>
            <label className='block text-sm font-medium text-gray-700'>Upload Image</label>
            <input type='file' name='image' onChange={handleChange} accept='image/*' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
          </div> */}
        </div>
        
        {/* Submit Button */}
        <div className='mt-6 text-center'>
          <button type='submit' className='px-6 py-2 bg-teal-600 text-white rounded-md text-lg cursor-pointer'>
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add; 
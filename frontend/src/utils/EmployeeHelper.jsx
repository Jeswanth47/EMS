import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// export const fetchDepartments=async()=>{
//     let departments
//     try {
//       const response=await axios.get('http://localhost:5000/api/department',{
//         headers:{
//           'Authorization':`Bearer ${localStorage.getItem('token')}`
//         }
//       })
//       if (response.data.success) {
//         response.data.departments
//       }        
//     }
//     catch(error){
//       if(error.response && !error.response.data.success) {
//         alert(error.response.data.error)
//       }
//     }
//     return departments
//   }

export const columns=[
    {
        name:"S No",
        selector:(row) => row.sno,
        width:"70px"
    },
    {
        name:"Name",
        selector:(row) =>row.name,
        sortable:true,
        width:"100px"
    },
    // {
    //     name:"Image",
    //     selector:(row) =>row.profileImage,
    //     width:"90px"
    // },
    {
        name:"Department",
        selector:(row) =>row.dep_name,
        width:"120px"
    },
    {
        name:"DOB",
        selector:(row) =>row.dob,
        sortable:true,
        width:"130px"
    },
    {
        name:"Action",
        selector:(row)=>row.action,
        center:true
    }
]

export const fetchDepartments = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            return response.data.departments; // Fix: Return the fetched departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
        return []; // Fix: Return an empty array in case of error
    }
};

//employee for salary form
// export const getEmployees = async (id) => {
//     let employees;
//     try {
//         const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//         if (response.data.success) {
//             employees=response.data.employees; // Fix: Return the fetched departments
//         }
//     } catch (error) {
//         if (error.response && !error.response.data.success) {
//             alert(error.response.data.error);
//         }
//         return employees; // Fix: Return an empty array in case of error
//     }
// };

export const getEmployees = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            return response.data.employees || []; // Ensure an array is returned
        }
    } catch (error) {
        console.error("Error fetching employees:", error.response?.data?.error || error.message);
        return []; // Return an empty array in case of an error
    }
};


export const EmployeeButtons = ({ Id,onEmployeeDelete }) => {
    const navigate=useNavigate()

    const handleDelete= async(id)=> {
        const confirm=window.confirm("Do you want to delete")
        if(confirm) {
        try {
            const response=await axios.delete(`http://localhost:5000/api/employee/${id}`,{
              headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
              }
            })
            if (response.data.success) {
                onEmployeeDelete(id)
            }        
          }
          catch(error){
            if(error.response && !error.response.data.success) {
              alert(error.response.data.error)
            }
          }
        }
    }

    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white cursor-pointer" 
            onClick={()=>navigate(`/admin-dashboard/employees/${Id}`)}>View</button>
            <button className="px-3 py-1 bg-green-600 text-blue cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-yellow-600 text-yellow cursor-pointer"
            onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >Salary</button>
            <button className="px-3 py-1 bg-pink-600 text-white cursor-pointer"
            onClick={()=>navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >Leave</button>
             <button className="px-3 py-1 bg-red-600 text-white cursor-pointer"
            onClick={() => handleDelete(Id)}
            >Delete</button>
        </div>
    )
}
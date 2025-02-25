import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { columns, LeaveButtons } from '../../utils/LeaveHelper'
import DataTable from 'react-data-table-component'

const Table = () => {
    const [leaves,setLeaves]=useState(null)
    const [filteredLeaves,setFilteredLeaves]=useState(null)

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId?.employeeId || "N/A",  // Ensure employeeId exists
                    name: leave.employeeId?.userId?.name || "N/A",
                    leaveType: leave.leaveType || "N/A",
                    department: leave.employeeId?.department?.dep_name || "N/A",
                    days: leave.startDate && leave.endDate
                        ? (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
                        : "N/A", // Calculate days safely
                    status: leave.status || "N/A",
                    action: leave._id ? <LeaveButtons Id={leave._id} /> : "N/A"
                }));
    
                setLeaves(data);
                setFilteredLeaves(data);
            } else {
                console.error("API response success is false");
            }
        } catch (error) {
            console.error("Error fetching leaves:", error);
            alert(error.response?.data?.error || "Error fetching leave data");
        }
    };
    
    

    useEffect(()=>{
        fetchLeaves()
    },[])

    const filterByInput = (e) => {
    const data = leaves.filter(leave =>
        leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
};

const filterByButton = (status) => {
    const data = leaves.filter(leave =>
        leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
};




  return (
    <>
    {filteredLeaves?(
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input type='text' placeholder='Search By Emp Id' className='px-4 py-0.5 border'
            onChange={filterByInput}
            />
            <div className='space-x-4'>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
                onClick={()=>filterByButton("Pending")}>Pending</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
                onClick={()=>filterByButton("Approved")}>Approved</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
                onClick={()=>filterByButton("")}>Rejected</button>
            </div>
        </div>
        <div className='mt-6'>
        <DataTable columns={columns} data={filteredLeaves} pagination/>
        </div>
    </div>
):<div>Loading....</div>}
</>
  )
}

export default Table
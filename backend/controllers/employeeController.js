import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import path from 'path'
import Department from "../models/Department.js"

const storage=multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"public/uploads")
    },
    filename:(req,file,cb) => {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage:storage})

// const addEmployee=async(req,res)=>{
//     try {
//     const {name,email,employeeId,dob,gender,maritalStatus,designation,department,salary,password,role}=req.body;
//     const user=await User.findOne({email})
//     if(user) {
//         return res.status(400).json({
//             success:false,
//             error:"user already registered in emp"
//         })
//     }
//     const hashPassword=await bcrypt.hash(password,10)
    
//     const newUser=new User({
//         name,email,password:hashPassword,role,profileImage:req.file?req.file.filename : ""
//     })
//    const savedUser=await newUser.save()

//    const newEmployee=new Employee({
//     userId:savedUser._id,
//     employeeId,
//     dob,
//     gender,
//     maritalStatus,
//     designation,
//     department,
//     salary
//    })
//    await newEmployee.save()
//    return res.status(200).json({success:true,message:'employee created'})
// }
// catch(error){
//     return res.status(500).json({
//         success:false,
//         error:'server error in adding employee'
//     })
// }
// }

// const addEmployee = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         console.log("Uploaded File:", req.file);

//         const { name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;

//         if (!employeeId) {
//             return res.status(400).json({ success: false, error: "Employee ID is required" });
//         }

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 success: false,
//                 error: "User already registered in emp",
//             });
//         }

//         const hashPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             email,
//             password: hashPassword,
//             role,
//             profileImage: req.file ? req.file.filename : "",
//         });
//         const savedUser = await newUser.save();

//         console.log("Saved User:", savedUser);

//         const newEmployee = new Employee({
//             userId: savedUser._id,
//             employeeId,
//             dob,
//             gender,
//             maritalStatus,
//             designation,
//             department,
//             salary,
//         });

//         const savedEmployee = await newEmployee.save();
//         console.log("Saved Employee:", savedEmployee);

//         return res.status(200).json({ success: true, message: "Employee created successfully" });
//     } catch (error) {
//         console.error("Error in adding employee:", error);
//         return res.status(500).json({
//             success: false,
//             error: "Server error in adding employee",
//         });
//     }
// };

// const addEmployee = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         console.log("Uploaded File:", req.file);

//         const { name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;

//         if (!employeeId) {
//             return res.status(400).json({ success: false, error: "Employee ID is required" });
//         }

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 success: false,
//                 error: "User already registered in emp",
//             });
//         }

//         const hashPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             email,
//             password: hashPassword,
//             role,
//             profileImage: req.file ? req.file.filename : "",
//         });
//         const savedUser = await newUser.save();

//         console.log("Saved User:", savedUser);

//         const departmentId = department ? JSON.parse(department) : null;  // ✅ Parse department ID correctly

//         const newEmployee = new Employee({
//             userId: savedUser._id,
//             employeeId,
//             dob,
//             gender,
//             maritalStatus,
//             designation,
//             department: departmentId,  // ✅ Ensure department is stored as ObjectId
//             salary,
//         });

//         const savedEmployee = await newEmployee.save();
//         console.log("Saved Employee:", savedEmployee);

//         return res.status(200).json({ success: true, message: "Employee created successfully" });
//     } catch (error) {
//         console.error("Error in adding employee:", error);
//         return res.status(500).json({
//             success: false,
//             error: "Server error in adding employee",
//         });
//     }
// };
const addEmployee = async (req, res) => {
    try {

        const { name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;

        // Validate required fields
        if (!employeeId) {
            return res.status(400).json({ success: false, error: "Employee ID is required" });
        }

        if (!maritalStatus || maritalStatus.trim() === "") {
            return res.status(400).json({ success: false, error: "Marital Status is required" });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                error: "User already registered in the system",
            });
        }

        // Hash password securely
        if (!password) {
            return res.status(400).json({ success: false, error: "Password is required" });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        });
        const savedUser = await newUser.save();

        // Ensure department is parsed correctly
        let departmentId = null;
        if (department) {
            try {
                departmentId = JSON.parse(department);
            } catch (error) {
                return res.status(400).json({ success: false, error: "Invalid department format" });
            }
        }

        // Create and save the employee
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department: departmentId,  // Store as ObjectId
            salary,
        });

        const savedEmployee = await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
        console.error("Error in adding employee:", error);
        return res.status(500).json({
            success: false,
            error: error.message || "Server error in adding employee",
        });
    }
};


const getEmployees=async(req,res)=>{
    try {
        const employees=await Employee.find().populate('userId',{password:0}).populate('department')
        return res.status(200).json({success:true,employees})
    }
    catch(error) {
        return res.status(500).json({success:false,error:'get employee server error'})
    }
}

const getEmployee=async(req,res)=>{
    const {id}=req.params;
    try {
        let employee;
        employee=await Employee.findById({_id:id}).populate('userId',{password:0}).populate('department')
        if(!employee) {
           employee=await Employee.findOne({userId:id}).populate("userId",{password:0}).populate("department")
        }
        return res.status(200).json({success:true,employee})
    }
    catch(error) {
        return res.status(500).json({success:false,error:'get employee server error'})
    }
}

const updateEmployee=async(req,res) =>{
    try {
        const {id}=req.params;
        const {name,maritalStatus,designation,department,salary}=req.body

        const employee=await Employee.findById({_id:id})
        if(!employee) {
            return res.status(404).json({success:false,error:"employee not found"})
        }
        const user=await User.findById({_id:employee.userId})
        if(!user) {
            return res.status(404).json({success:false,error:"user not found"})
        }
        const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name})
        const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{
            maritalStatus,designation,salary,department
        })
        if(!updateEmployee || !updateUser) {
            return res.status(404).json({success:false,error:"document not found"})
        }
        return res.status(200).json({success:true,message:"employee update"})
    }
    catch(error) {
        return res.status(500).json({success:false,error:'update employee server error'})
    }
}

const fetchEmployeesByDepId =  async (req,res) => {
    const {id}=req.params;
    try {
        const employees=await Employee.find({department:id})
        return res.status(200).json({success:true,employees})
    }
    catch(error) {
        return res.status(500).json({success:false,error:'get employeesByDepId server error'})
    }

}

const deleteEmployee=async(req,res)=> {
    try {
        const {id}=req.params;
        const deleteEmp=await Employee.findById({_id:id})
        await deleteEmp.deleteOne()
        return res.status(200).json({
            success:true,
            deleteEmp
        })
     }
     catch(error) {
        return res.status(500).json({
            success:false,
            error:"delete Employee server error"
        })
     }
}
export {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId,deleteEmployee}
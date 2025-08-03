
import {comparePassword, hashpassword} from '../helper/authHelper.js'
import ordermodel from '../models/ordermodel.js';

import usermodel from '../models/usermodel.js';
import JWT from "jsonwebtoken"




// ==================
// register api
// ==================
export const registerController = async(req, res) => {
    const{ name, email, phone, address, answer, password } = req.body;
    if(!name || !email || !phone || !address || !answer || !password ){
        return res.status(422).json({error: "please fill all fields"});

    }
    try{ 
        const useExist = await usermodel.findOne({email: email})
        if(useExist){ 
            return res.status(422).json({error:"email already exist"});
        }

        const hashedpassword = await hashpassword(password);
        const user= new usermodel ({ name, email, phone, address,answer, password: hashedpassword });
        const userregister = await user.save();
        if(userregister){
           res.status(201).json({ message: 'User Registered successfully'}) 
           
        }
    } catch(error){
        console.log(error);
    }
}


// =============================
// POST LOGIN
// =============================

  
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
     // =================
    // validations
    // ==================
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

     // =================
    // chek user
    // ==================

    const user = await usermodel.findOne({ email});
    if(!user){ 
        return res.status(404).send({
            success:false,
            message:"Email is not registred",
        });
    }

 const match = await comparePassword(password, user.password);
if (!match) {
  return res.status(200).send({
    success: false,
    message: "Invalid Password"
  });
}


  const token = await JWT.sign({_id: user._id},
    process.env.JWT_SECRET,{
        expiresIn: "10d"
    }
  )
  console.log(token);

    res.status(200).send({
      success: true,
      message: "Login successful",
       token,
      users:{
        _id: user._id,
        name: user.name,
        email:user.email,
        password:user.password,
        address:user.address,
        answer: user.answer,
        role: user.role
      } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};
  // ==================
  // test  controler
  // ==================
   export const testController = (req, res) => {
    try{
        res.send("Protected  routes");
    } catch{ 
         console.log(error);
         res.send({error});
    }
   };


// ============================
// Forgot password API
// ============================

   export const forgotPasswordController = async (req, res) => {
   try {
    const { email, answer, newPassword } = req.body;

    // Validation
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    // Find user
    const user = await usermodel.findOne({ email, answer }); 

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    const hashed = await hashpassword(newPassword); 
    await usermodel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) { 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


 // ===================
// Update Profile
// ====================
export const UpdateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, answer, phone } = req.body;

    const user = await usermodel.findById(req.user._id);

    let hashedPassword = user.password;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
      }
      hashedPassword = await hashpassword(password);
    }

    const updatedUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
        phone: phone || user.phone,
        address: address || user.address,
        answer: answer || user.answer,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

// ======================
// order controller
// ======================
 export const getOrdersController = async (req,res) =>{
  try{
  const orders = await ordermodel
  .find({buyer : req.user._id})
  .populate("products", "-photo")
  res.json(orders);
  }catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
 }

 // ======================
// order controller
// ======================
 export const getAllOrdersController = async (req,res) =>{
  try{
  const orders = await ordermodel
  .find({})
  .populate("products", "-photo")
  // .populate("user", "name")
  // .sort({createdAt: "-1"})

  res.json(orders);
  }catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to get all orders",
      error: error.message,
    });
  }
 }

 //  status 

  export const OrdersStatusController = async (req,res) =>{
  try{
  const{orderId } = req.parms;
  const{status} = req.body;
  const orders = await ordermodel.findByIdAndUpdate(
    orderId,
    {status},
    {new: true}
  )
  res.json(orders);
  }catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to get all orders",
      error: error.message,
    });
  }
 }
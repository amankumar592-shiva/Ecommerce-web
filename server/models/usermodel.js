import mongoose from 'mongoose'
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: true,
//     // minlength: 6
//   },
//   phone: {
//     type: String,
//     required: true,
//     // match: /^[0-9]{10}$/  //Adjust regex based on format
//   },
//   address: {
//     type: { },
//     required: true
//   },
//   answer: {
//     type: String,
//     required: true,
//     maxlength: 500
//   },

//   role:{
//     type:Number,
//     default:0
//   },

// },
//   {timestamps:true},
// );



// new work 
const userSchema = new mongoose.Schema({
  googleId: { type: String, default: null },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  photo: { type: String },
  password: { type: String, default: null },     //  not required
  phone: { type: String, default: null },        //  not required
  address: { type: Object, default: {} },        //  not required
  answer: { type: String, default: null },       //  not required
  role: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('user', userSchema);





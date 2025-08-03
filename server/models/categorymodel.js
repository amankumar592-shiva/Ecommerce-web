import mongoose from 'mongoose'
const categoryModel = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  slug:{
    type: String
  },
  });
  
  export default mongoose.model('Category', categoryModel);
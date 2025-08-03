import express from 'express'
import slugify from 'slugify'
import fs from 'fs';import Category from '../models/categorymodel.js'
import productmodel from "../models/productModel.js"
import categorymodel from '../models/categorymodel.js';
import ordermodel from '../models/ordermodel.js';

import braintree from "braintree";

import dotenv from "dotenv";

dotenv.config({path:'./config.env'});

dotenv.config();

// ======================
// payment gatway
//=======================

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



export const CreateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
// ==============
// Validation
// ==============
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
       
    }

    const product = new productmodel({
      ...req.fields,
      slug: slugify(name)
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};


// ===================
//  get all product
// ===================

  export const getProductController = async (req, res) => {
  try {
    const product = await productmodel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: product.length,
      message: "All product",
      product,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product",
      error: error.message,
    });
  }
};


// ==============================
// get single product
// ============================== 

export const getSingleProductController = async (req, res) => {
   try{
  const product = await productmodel
  .findOne({slug: req.params.slug})
 
  .select("-photo")
  .populate("category");
  res.status(200).send({
    success: true,
     message: " single product fetched",
     product,
  });

   }catch(error){
    console.log(error);
    res.status(500).send({ 
      success:true,
      message:"errer while getting single product",
      error,
    });
   }   
};

// =============
// get photo
// =============

export const productPhotoController = async (req, res) => {

  try{
     const product = await productmodel.findById(req.params.pid).select("photo");
     if(product.photo.data){
      res.set("Content-type",product.photo.contentType);
      return res.status(200).send(product.photo.data);
     }
     }

  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message:" error while getting photo",
      error,
    });
  }
};

// ====================
//  delete Controller
// ====================

 export const deleteProductController = async (req,  res) => {

  try{
    await productmodel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Delete successfuly",

    });

  }catch(errer){
    console.log(errer);
     res.status(500).send({
      success: false,
      message: "error while deleting product",
      errer,
     });
  }
 }


 // ===========================
 //  Update Category
 // ===========================

 export const UpdateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
// ==============
// Validation
// ==============
  switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo is Required should be less than 1MB" });
      //  case !shipping:
      //   return res.status(500).send({error: "shipping is required"}); 
    }
const product = await productmodel.findByIdAndUpdate(
  req.params.pid,
  {...req.fields,slug: slugify(name)},
  {new: true}
);

if(photo){
  product.photo.data = fs.readFileSync(photo.path);
  product.photo.contentType = photo.type;
}
await product.save();
res.status(201).send({
  success: true,
  message: "product Update Successfully",
  product,
 });
  }catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in  update product",
      error,
    });
  }
};

 // ====================================
// product Controller 03/07-2025/12:18
// =====================================


export const productFiltersCntroller = async (req, res) => {
   try{
 const {checked, radio} = req.body;
 let args={};
 if(checked.length > 0) args.category = checked;
 if(radio.length) args.price = {$gte: radio[0],$lte:radio[1]};
 const product  = await productmodel.find(args);
 res.status(200).send({
  success:true,
  product,
 })


   }catch( error){
     console.log(error);
     res.status(400).send({
      success: false,
      message: " error while headling product filter",
      error
     });

   }
};




// =================================
// product count
// =================================

export const productCountController = async (req, res) => {

 try{
  const total = await productmodel.find({}).estimatedDocumentCount();
  res.status(200).send({
     success:true,
     total,
  })
 }catch(error){
  console.log(error);
  res.status(500).send({ 
    message: " error in product error",
    error,
    success: false,
  });
 }
};


// ============================
// product list base on page
// ============================

  export const  ProductListController = async (req,res) =>{

      try{
          const perPage = 6;
          const page = req.params.page ? req.params.page : 1;
          const product = await productmodel
          .find({})
          .select("-photo")
          .skip((page -1) * perPage)
          .limit(perPage)
          .sort({createdAt: -1});
          res.status(200).send({
          success: true,
          product,
          })
      }catch(error){
  console.log(error);
  res.status(400).send({ 
    message: " error in per page ctrl",
    error,
    success: false,
  });
 }
  }

  // ===========================
  //  product category controller 
  // ===========================

   export const productCategoryController = async ( req, res) => {
      try { 
           const category = await categorymodel.findOne({ slug: req.params.slug});
           const product = await productmodel.find({category}).populate("category");
           res.status(200).send({
            success: true,
            category,
            product,
            });
      } catch(error) { 
         console.log(error);
         res.status(400).send({ success: false,
           message: " error while getting product",
           error,
         }); 
      }
   };


   // ============================
   //  token, Braintree token generator
   // ============================

   
export const braintreeTokenController = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      console.error("Braintree Token Error:", err);
      res.status(500).send(err);
    } else {
      console.log("Braintree Client Token:", response.clientToken);

      res.send({ clientToken: response.clientToken });
    }
  });
};

// =================================
// payment controller
// =================================
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;

    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    // Create Braintree transaction
    gateway.transaction.sale(
      {
        amount: total.toFixed(2), 
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (result && result.success) {
          const order = new ordermodel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          });
          await order.save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error || { message: "Payment failed" });
        }
      }
    );
  } catch (error) {
    console.log("Payment error:", error);
    res.status(500).send({
      success: false,
      message: "Error in payment",
      error,
    });
  }
};



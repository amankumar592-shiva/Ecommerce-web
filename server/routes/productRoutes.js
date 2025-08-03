import express from 'express';
import { CreateProductController, deleteProductController, 
  getProductController, getSingleProductController,productPhotoController, 
  UpdateProductController, productFiltersCntroller,productCountController, 
  ProductListController, braintreeTokenController,brainTreePaymentController } from '../controller/productController.js';
import Formidable from 'express-formidable';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  Formidable(),
  CreateProductController
);

// routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  Formidable(),
  UpdateProductController
);

// =====================
// Profile Update Route
// =====================


// get product
 router.get("/get-product", getProductController);
 // single product
 router.get("/get-product/:slug", getSingleProductController);
 // get photo
 router.get("/product-photo/:pid", productPhotoController);
  // delete product
 router.delete("/delete-product/:pid", deleteProductController);
  // filter product
  router.post("/product-filters", productFiltersCntroller);
  // product
  router.get("/product-count", productCountController);
  // product per page
  router.get("/product-list/:page", ProductListController);

  // braintreeToken 
  router.get("/braintree/token", braintreeTokenController);
  
//  braintree post
 router.post("/braintree/payment", requireSignIn, brainTreePaymentController)

 

export default router;

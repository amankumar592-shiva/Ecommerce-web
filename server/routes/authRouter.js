import express, { Router } from 'express'
import { forgotPasswordController, loginController, registerController, testController, UpdateProfileController } from '../controller/authcontroller.js'
import { isAdmin,requireSignIn } from '../middleware/authMiddleware.js';
import passport from 'passport';
import { getOrdersController,getAllOrdersController,OrdersStatusController } from '../controller/authcontroller.js';
import User from '../models/usermodel.js';





const router = express.Router();
router.post('/register', registerController);
router.post('/login',loginController);

router.put(
  "/update-profile",
  requireSignIn,       
  UpdateProfileController 
);

router.get('/test',requireSignIn,isAdmin,testController);
router.post("/forgot-password", forgotPasswordController);


// ============================
// protected User Route auth
// ============================

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok:true});
});

// =============================
// Protected Admin route auth
// ============================= 
 router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok:true});
 });




// =============================================
//  google login route api
// =============================================

//  Step 1: Redirect user to Google for login
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],     // Google se profile + email milega
    accessType: 'offline',           // Refresh token ke liye
    prompt: 'consent'                // Hamesha consent dikhaye
  })
);

//  Step 2: Google callback

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    session: true
  }),
  async (req, res) => {
    try {
      //  Check if user still exists in DB via googleId
      const user = await User.findOne({ googleId: req.user.googleId });

      if (user) {
        console.log(" User already exists:", user.email);
        return res.redirect('http://localhost:3000?existing=true');
      } else {
        //  req.user exists from passport, but not in DB → logout & destroy session
        req.logout(() => {
          req.session.destroy();
        });
        console.log(" Google profile exists but user not in DB. Logging out...");
        return res.redirect('http://localhost:3000/login?deleted=true');
      }
    } catch (err) {
      console.error(" Callback Error:", err);
      return res.redirect('http://localhost:3000?error=true');
    }
  }
);



//  Step 3: Frontend can hit this to check if user is logged in
// router.get('/me', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);   //  Frontend can store this
//   } else {
//     res.status(401).json({ message: 'Not logged in' });
//   }
// });

//  Step 4: Logout route
// router.get('/logout', (req, res) => {
//   req.logout(() => {
//     res.redirect('http://localhost:3000/login'); // after logout
//   });
// });


// =======================================
// google login api end
// =======================================








// ==================================
// order routes
// ==================================
 router.get("/orders", requireSignIn, getOrdersController);

// all orders routes
 router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

 //order status update
  router.put("/order-status/:orderId", requireSignIn,isAdmin,OrdersStatusController);

// 2. Callback URL
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res) => {
    console.log(passport);
    
    res.redirect('/dashboard');
  }
);



export default router;


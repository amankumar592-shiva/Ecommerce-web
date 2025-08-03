// import express  from 'express';
// import dotenv from 'dotenv';
// import connectDB from "./databace/databace.js"
// import categoryRoutes from './routes/categoryRoutes.js'
// import productRoutes from './routes/productRoutes.js';
// import authroutes from './routes/authRouter.js';
// import passport from 'passport';
// import './config/passport.js'; 
// import cors from 'cors';
// import session from 'express-session';

// import wishlistRoute from './routes/wishlistRoute.js';




// dotenv.config();
// const app = express();

// app.use(express.json());
// connectDB();



// app.use("/api/v1/auth",authroutes);
// app.use("/api/v1/category",categoryRoutes);
// app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/user", productRoutes);

// app.use('/api/v1/wishlist', wishlistRoute);



// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// app.use(session({
//   secret: process.env.SESSION_SECRET || "keyboardcat",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,     
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24 // 1 day
//   }
// }));

// app.use(passport.initialize());
// app.use(passport.session());


// const PORT = process.env.PORT || 5040;
// app.listen(PORT, ()=>{ 
//     console.log(`server running on port ${PORT}`);
// });


// work 25/07/ 25

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './databace/databace.js';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js'; // this must be loaded after passport import

// ROUTES
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authroutes from './routes/authRouter.js';
import wishlistRoute from './routes/wishlistRoute.js';

dotenv.config();
const app = express();

//  Connect to DB
connectDB();

//  Use CORS before session
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//  Use body parser before routes
app.use(express.json());

// Use express-session before passport.session
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboardcat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

//  Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//  Now place your routes AFTER middleware setup
app.use('/api/v1/auth', authroutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user', productRoutes); // may be incorrect route (user → product?)
app.use('/api/v1/wishlist', wishlistRoute);

//  Start server
const PORT = process.env.PORT || 5040;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

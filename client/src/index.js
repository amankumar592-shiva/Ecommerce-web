import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './Components/context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Components/context/Cart';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
<>
<AuthProvider>
       <CartProvider>


       <BrowserRouter>
           
       <App />
      
    
       </BrowserRouter>
</CartProvider>

</AuthProvider>

 </>
);



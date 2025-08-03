//import React, { children } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster} from "react-hot-toast";

  export const Layout =({children, title, Description,Keywords, author }) =>{
    return (
      <>
     
       {/* <Layout title="Register - Ecommer app"> */}
        <Helmet>
         <meta  charSet="utf-8" /> 
         <meta  name="Description" content={Description}/>   
         <meta  name="Keywords" content={Keywords}/>
         <meta  name="author" content={author}/>
         <title>{title}</title>
        
        </Helmet>

        <Header/>
        <main style={{ mainHeight:"90vh"}}>

            <Toaster/>
            {children}
           
            </main>
            <Footer/>

         </>

    )
  }
  export default Layout;
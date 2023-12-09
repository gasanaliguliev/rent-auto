import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";


const Layout = () => {
    return (
      <div>
        <Header/>
        <Suspense>
            <Outlet fallback={<h3>Loading...</h3>}/>
        </Suspense>
      </div>
    )
    
  }
   
  export default Layout;
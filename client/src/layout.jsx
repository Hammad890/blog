import Header from "./header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx";

export default function Layout (){
   return(
    <main>
      <Header/>
     <Outlet/>
     <Footer />
    </main>
   );
}
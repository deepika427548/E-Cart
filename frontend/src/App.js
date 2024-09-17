import "./App.css"
import {Route, BrowserRouter as Router,Routes} from "react-router-dom"

import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";
import  { Toaster } from 'react-hot-toast';
import useUserRoutes from "./components/routes/UserRoutes";
import useAdminRoutes from "./components/routes/AdminRoutes"
import useSellerRoutes from "./components/routes/SellerRoutes"
import { useSelector } from "react-redux";
import NotFound from "./components/Layouts/NotFound";


function App() {

  const { mode } = useSelector((state) => state.darkMode);

  const userRoutes=useUserRoutes();
  const adminRoutes=useAdminRoutes();
  const sellerRoutes=useSellerRoutes();
  return (
    <Router>
       <div className={`App ${mode ? "dark-mode" : "light-mode"}`}>
    {/* <div className="App"> */}
    <Toaster  position="top-center"/>
     <Header/>
     <div className="container">
     <Routes>
     {userRoutes}
     {adminRoutes}
     {sellerRoutes}
     <Route path="*" element={<NotFound/>}/>
    
     </Routes>
     </div>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
import { BrowserRouter, Routes, Route,useLocation  } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { useContext,useEffect } from 'react';
import { message } from "antd";
import Register from './pages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import OwnerDashboard from './pages/owner/dashboard/OwnerDashboard.jsx';
import Main from './pages/global/Main.jsx';
import Bikes from  './pages/global/vehicleCategories/Bikes.jsx';
import NavigationBar from "./pages/global/components/NavigationBar.jsx";
import './index.css';
import Vans from './pages/global/vehicleCategories/Vans.jsx';
import ThreeWheelers from './pages/global/vehicleCategories/ThreeWheelers.jsx';
import Lorries from './pages/global/vehicleCategories/Lorries.jsx';
import Cars from './pages/global/vehicleCategories/Cars.jsx';
import VehicleDetail from './pages/global/VehicleDetail.jsx'
import PostAnAdd from './pages/global/PostAnAdd.jsx'
import PayForAdvertiesment from './pages/global/PayForAdvertiesment.jsx';
import {GlobalProvider} from './GlobalContext.js'
import { GlobalContext } from './GlobalContext';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAdminRoute from './ProtectedAdminRoute.jsx'
import ChatIcon from './pages/global/chatSection/ChatIcon.jsx';
import AppFooter from './pages/global/AppFooter.jsx';
import AdvertisementList from './pages/global/AdvertiesmentList.jsx';
import SparePartList from './pages/global/SparePartList.jsx';
import AdvertisementDetail from './pages/global/AdvertisementDetail.jsx';
import SparePartDetails from './pages/global/SparePartDetails.jsx';
function App() {
  // Set global configuration for the message component
message.config({
  top: 50, // Set the distance from the top
  duration: 3, // Set the duration of the message
});


 return (
  <GlobalProvider>
  <BrowserRouter>
 
    <AppContent />
   
  </BrowserRouter>
  </GlobalProvider>
);
}

function AppContent() {
// Use the useLocation hook to get the current location
const location = useLocation();
 
const { response } = useContext(GlobalContext);
useEffect(() => {
  if (response) {
    const addId = response.id
    localStorage.setItem('add-id',addId)
  }
}, [response]);
// Function to check if the current path contains 'admin'
const isAdminPath = location.pathname.startsWith('/admin');

return (
  <div>
    <ToastContainer />
    {!isAdminPath && <NavigationBar />}
    <Routes>
      <Route path='/' element={<Main />} />
      {/* Global Routes */}
      <Route path='/vehicleCategories/Bikes' element={<Bikes />} />
      <Route path='/vehicleCategories/Vans' element={<Vans />} />
      <Route path='/vehicleCategories/Three-Wheels' element={<ThreeWheelers/>} />
      <Route path='/vehicleCategories/lorries' element={<Lorries/>} />
      <Route path='/vehicleCategories/cars' element={<Cars/>} />
      <Route path="/vehicle/:id" element={<VehicleDetail />} />
      <Route path="/advertisements" element={<AdvertisementList />} />
      <Route path="/spareParts" element={<SparePartList />} />
      <Route path='/advertiesments/details/:id' element={<AdvertisementDetail />} />
      <Route path='/spareParts/details/:id' element={<SparePartDetails />} />
      <Route
          path="/post-ad/"
          element={
            <ProtectedRoute>
              <PostAnAdd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PayForAdvertiesment />
            </ProtectedRoute>
          }
        />

      

      {/* Admin Routes */}
      <Route path='/admin/login' element={<Login />} />
      
      <Route path='/admin/register' element={<Register />} />
      <Route path='/admin/dashboard' element={ <ProtectedAdminRoute><OwnerDashboard /></ProtectedAdminRoute>} />
    </Routes>

    {!isAdminPath && localStorage.getItem('userName') && <ChatIcon />}
    {!isAdminPath && <AppFooter />} {/* Add the footer here */}
  </div>
);
}

export default App;

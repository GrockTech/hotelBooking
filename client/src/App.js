import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Home from './pages/home/Home';

import HotelF from "./pages/hotel/HotelF";

import List from "./pages/list/List";

import LoginPage from "./pages/login/LoginPage";
function App() {
  return (
 <BrowserRouter>
 <Routes>

  <Route path="/" element={<Home/>}/>
  <Route path="/hotels" element={<List/>}/>
  <Route path="/hotels/:id" element={<HotelF/>}/>
  <Route path="/login" element={<LoginPage/>}/>
 </Routes>
 
 </BrowserRouter>
    
  );
}

export default App;

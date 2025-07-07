import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllLessons from './pages/AllLessons';
import LessonDetails from './pages/LessonDetails';
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import TotalUsing from "./components/DashBord/AdminPannel/TotalUsing";
import DashBord from "./components/DashBord/AdminPannel/DashBord";
import Users from "./components/DashBord/AdminPannel/Users";
import Maps from "./components/DashBord/AdminPannel/Maps";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/lessons" element={<AllLessons />} />
        <Route path="/lesson/:id" element={<LessonDetails />} />
        <Route path="*" element={<NotFound />} /> 
        <Route path="/profile" element={<Profile/>} />
         {/* Here Related By Page Admin-DashBord */}
          <>
          <Route path="/admin/dashbord" element={<DashBord/>} />
          <Route  path="/admin/dashbord"  element={<DashBord />}  children={<Route path="/admin/dashbord" element={<TotalUsing />} />}/>
          <Route path="/admin/dashbord" element={<DashBord />} children={   <Route path="/admin/dashbord/users" element={<Users />} /> }/>
          <Route  path="/admin/dashbord"  element={<DashBord />}  children={<Route path="/admin/dashbord/maps" element={<Maps />} />}/>
        </>
      </Routes>
    </Router>
  );
}

export default App;

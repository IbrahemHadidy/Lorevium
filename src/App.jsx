import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBord from "./Components/DashBord/AdminPannel/DashBord";
import "./Components/DashBord/AdminPannel/Style/AdminPannel.scss"
import TotalUsing from "./Components/DashBord/AdminPannel/TotalUsing";
import Users from "./Components/DashBord/AdminPannel/Users";
import Maps from "./Components/DashBord/AdminPannel/Maps";

function App() {
  return (
    <Router>
      <Routes>
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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import AllLessons from './pages/AllLessons';
import LessonDetails from './pages/LessonDetails';
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Exams from "./pages/Exams";
import StudentExam from "./pages/StudentExam";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/lessons" element={<AllLessons />} />
        <Route path="/lesson/:id" element={<LessonDetails />} />
        <Route path="*" element={<NotFound />} /> 
        <Route path="/profile" element={<Profile/>} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/student-exam/:id" element={<StudentExam />} />
      </Routes>
    </Router>
  );
}

export default App;

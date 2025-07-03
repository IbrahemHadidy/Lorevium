import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import AllLessons from './pages/AllLessons';
import LessonDetails from './pages/LessonDetails';
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AddLessonForm from './pages/AddLessonForm'; // 👈 make sure the path is correct

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lessons" element={<AllLessons />} />
                <Route path="/lesson/:id" element={<LessonDetails />} />
                <Route path="/add-lesson" element={<AddLessonForm />} /> {/* ✅ this is the missing route */}
                <Route path="/edit-lesson/:id" element={<AddLessonForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;

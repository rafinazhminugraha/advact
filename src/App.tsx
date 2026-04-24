import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LearningPage from "./pages/LearningPage";
import ExercisesPage from "./pages/ExercisesPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route
          path="*"
          element={
            <div style={{ color: "white", padding: "20px" }}>404 Not Found</div>
          }
        />
      </Routes>
    </Router>
  );
}

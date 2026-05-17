import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vocabulary from "./pages/Vocabulary";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Certificate from "./pages/Certificate";
import Community from "./pages/Community";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume"
          element={<ResumeAnalyzer />}
        />
        <Route
          path="/vocabulary"
          element={<Vocabulary />}
        />
        <Route
          path="/certificate"
          element={<Certificate />}
        />
        <Route
          path="/community"
          element={<Community />}
        />
      </Routes>
    </div>
  );
}

export default App;
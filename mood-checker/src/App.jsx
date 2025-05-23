import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Mood from "./pages/Mood";
import Login from "./pages/Login";       // create these pages next
import Signup from "./pages/Signup";
import MoodHistory from "./pages/MoodHistory";
import Recommendations from "./pages/Recommendations";
import ProtectedRoute from "./components/ProtectedRoute";

function RedirectIfAuth({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
      <div id="root" className="bg-gradient-to-br from-blue-100 to-purple-100">
      <Navbar />
        <div className="app-container">
      <main >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <Mood />
              </ProtectedRoute>
            }
          />
              <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <MoodHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/recommendations" element={<ProtectedRoute>
                  <Recommendations />
                </ProtectedRoute>
              } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* other routes */}
        </Routes>
      </main>
      <Footer />
      </div>
    </div>
  );
}
export default App;

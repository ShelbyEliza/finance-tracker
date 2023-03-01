import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const { authIsReady, isUserVerified } = useAuthContext();
  console.log(isUserVerified);

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              exact="true"
              path="/"
              element={isUserVerified ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={isUserVerified ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={isUserVerified ? <Navigate to="/" /> : <Signup />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

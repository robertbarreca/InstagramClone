import './App.css';
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile"
import Feed from "./pages/Feed"
import { useUser, UserProvider } from "./context/UserContext";

const Routing = () => {
  const { state } = useUser()
  return (
    <Routes>
          {/* authenticated routes */}
          <Route
            path="/"
            element={state ? <Home /> : <Navigate to="/signup" />}
          />
          <Route
            path="/create"
            element={state ? <CreatePost /> : <Navigate to="/signup" />}
          />
          <Route
            path="/profile/:userId"
            element={state ? <UserProfile /> : <Navigate to="/signup" />}
          />
          <Route
            path="/feed"
            element={state ? <Feed /> : <Navigate to="/signup" />}
          />
          {/* unauthenticated routes */}
          <Route
            path="/login"
            element={!state ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!state ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
  )
  
}

function App() {
  
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

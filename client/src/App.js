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
  const {user} = useUser()
  return (
    <Routes>
          {/* authenticated routes */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/signup" />}
          />
          <Route
            path="/create"
            element={user ? <CreatePost /> : <Navigate to="/signup" />}
          />
          <Route
            path="/profile/:userId"
            element={user ? <UserProfile /> : <Navigate to="/signup" />}
          />
          <Route
            path="/feed"
            element={user ? <Feed /> : <Navigate to="/signup" />}
          />
          {/* unauthenticated routes */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
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

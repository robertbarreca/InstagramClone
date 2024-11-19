import './App.css';
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile"
import { useEffect } from "react";
import { useUser, UserProvider } from "./context/UserContext";

const Routing = () => {
  const { dispatch } = useUser();
  let user = (localStorage.getItem("user"))
  if (user) {
    user = JSON.parse(user) 
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    } 
    else {
      navigate("/signup")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ( 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
    </Routes>
  );
};

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

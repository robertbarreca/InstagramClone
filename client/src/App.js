import './App.css';
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import { useEffect } from "react";
import { useUser, UserProvider } from "./context/UserContext";

const Routing = () => {
  const { dispatch } = useUser();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      console.log(user)
      dispatch({ type: "LOGIN", payload: user });
      navigate("/")
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
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<CreatePost />} />
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

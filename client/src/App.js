/**
 * @fileoverview Main Application Component
 * 
 * @description
 * This component serves as the entry point of the application, providing routing functionality
 * for authenticated and unauthenticated users. 
 */

import './App.css';
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile"
import Feed from "./pages/Feed"
import ResetPassword from './pages/ResetPassword';
import { useUser, UserProvider } from "./context/UserContext";


/**
 * @function Routing
 * 
 * @description
 * Handles the routing for the application. It conditionally renders pages based on the user's
 * authentication state. Authenticated users have access to protected routes, while unauthenticated
 * users are redirected to the signup page.
 * 
 * @returns {JSX.Element} The routes for the application.
 */
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
          <Route
            path="/resetpassword"
            element={!state ? <ResetPassword /> : <Navigate to="/" />}
          />
      
        </Routes>
  )
  
}

/**
 * @function App
 * 
 * @description
 * The main application component that wraps the app with the `UserProvider` to manage user 
 * authentication state and renders the `NavBar` and `Routing` components. It also includes 
 * routing using `BrowserRouter` for client-side navigation.
 * 
 * @returns {JSX.Element} The main layout of the application with navigation and routing.
 */
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

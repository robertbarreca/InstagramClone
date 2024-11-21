/**
 * @fileoverview NavBar Component
 * 
 * @description This component renders the navigation bar for the application. 
 * It adjusts the displayed options based on the user's authentication state.
 * 
 * @dependencies react-router-dom 
 * 
 */

import { useUser } from "../context/UserContext"
import { useNavigate, Link } from "react-router-dom"

const NavBar = () => {
    const { state, dispatch } = useUser()
    const navigate = useNavigate()

    /**
     * @function handleLogout
     * 
     * @description Logs the user out by clearing the authentication state 
     * and redirecting to the login page.
     */
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        navigate("/login")
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state? "/" : "/signup"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {/* conditionally render buttons when logged out */}
                    {!state && (
                        <div>
                            <li><Link to="/login">Log in</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                        </div>
                    )}
                    {/* conditionally render buttons when logged in */}
                    {state && (
                        <div>
                            <li>
                                <button
                                    className="btn #c62828 red darken-3"
                                    onClick={handleLogout}
                                >Logout</button>
                            </li>
                            <li><Link to={state ? `/profile/${state._id}` : "/signup"}>Profile</Link></li>
                            <li><Link to="/create">Create Post</Link></li>
                            <li><Link to="/feed">Feed</Link></li>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default  NavBar
import {Link} from "react-router-dom"
import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const { state, dispatch } = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        dispatch({ type: "LOGOUT" })
        navigate("/login")
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state? "/" : "/signup"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {!state && (
                        <div>
                            <li><Link to="/login">Log in</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                        </div>
                    )}
                    {state && (
                        <div>
                            <li>
                                <button
                                    className="btn #c62828 red darken-3"
                                    onClick={handleLogout}
                                >Logout</button>
                            </li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/create">Create Post</Link></li>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default  NavBar
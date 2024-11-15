import {Link} from "react-router-dom"
import {useUser} from "../context/UserContext"

const NavBar = () => {
    const {state} = useUser()
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
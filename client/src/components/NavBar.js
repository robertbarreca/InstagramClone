/**
 * @file Navigation Bar
 * @description This file renders the navigation bar at the top of all pages to the website. It contains links to other pages.
 * 
 * @dependencies UserContext, react-router-dom, SearchModal
 */

import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import SearchModal from "./SearchModal";

const NavBar = () => {
    const { state, dispatch } = useUser();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signup"} className="brand-logo left">Instaclone</Link>
                <ul id="nav-mobile" className="right">
                    {/* Conditionally render links based on logged in state */}
                    {!state ? (
                        <div>
                            <li><Link to="/login">Log in</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                        </div>
                    ) : (
                        <div>
                            <li>
                                <i className="material-icons search-icon modal-trigger" data-target="modal1">
                                    search
                                </i>
                            </li>
                            <li>
                                <button className="btn #c62828 red darken-3" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                            <li><Link to={`/profile/${state._id}`}>Profile</Link></li>
                            <li><Link to="/create">Create Post</Link></li>
                            <li><Link to="/feed">Feed</Link></li>
                        </div>
                    )}
                </ul>
            </div>
            {/* Include the extracted modal component */}
            <SearchModal />
        </nav>
    );
};

export default NavBar;

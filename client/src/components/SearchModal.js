import { useRef, useEffect, useState} from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";

const SearchModal = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const searchModal = useRef(null);
    const [search, setSearch] = useState("");
    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        M.Modal.init(searchModal.current);
    }, []);


    const fetchUsers = async (query) => {
    setSearch(query);
    if (!query.trim()) {
        setUserDetails([]);
        return;
    }

    try {
        const res = await fetch("/api/users/searchUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user.token ? `Bearer ${user.token}` : "",
            },
            body: JSON.stringify({ query }),
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const users = await res.json();
        setUserDetails(users.user);
    } catch (error) {
        console.error("Error fetching users:", error);
        setUserDetails([]);
    }
};


    return (
        <div id="modal1" className="modal" ref={searchModal}>
            <div className="modal-content">
                <input
                    type="text"
                    placeholder="Search users"
                    value={search}
                    onChange={e => fetchUsers(e.target.value)}
                />
                <ul className="collection">
                    {userDetails.map((item) => (
                        <Link
                            key={item._id}
                            to={`/profile/${item._id}`}
                            onClick={() => {
                                M.Modal.getInstance(searchModal.current).close()
                                fetchUsers("")
                            }}
                        >
                            <li className="collection-item">{item.name}</li>
                        </Link>
                        
                    ))}
                </ul>
            </div>
            <div className="modal-footer">
                <button
                    className="modal-close waves-effect waves-green btn-flat"
                    onClick={() => fetchUsers("")}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SearchModal;

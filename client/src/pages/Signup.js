/**
 * @fileoverview Sign Up Page
 * 
 * @description This component renders a sign up form for new users, allowing them to sign up upon form submission. It handles user input for email, username and password and displays error messages if sign up fails.
 * 
 * @dependencies react-router-dom, materialize-css
 */

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import M from "materialize-css"

/**
 * @function Signup
 * @description This page renders the form for user sign up. And it contains the logic to create a new user document on the backend api.
 * 
 * @returns {JSX.Element} The rendered sign up page containing a form to sign up
 */
const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    /**
     * @function handleSubmit
     * @description Sends a post request to the API setting the body to be username, password and email. It then alerts the user if the request was a success or not.
     * 
     * @returns {void} Sends a success message and navigates to the login page upon success. Or sends an error message upon failiure
     */
    const handleSubmit = async () => {
        const res = await fetch(`/api/auth/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ name: username, password, email })
        })
        const json = await res.json()
        if (json.error) {
            M.toast({html: json.error, classes: "#c62828 red darken-3"})
        }
        else {
            M.toast({ html: "Succesfully signed up!", classes: "#43a047 green darken-1" })
            navigate("/login")
        }
    }
    
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                <input type="text" placeholder="username" value={username} onChange={(e)=> {setUsername(e.target.value)}}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
                <button className="btn waves-effect waves-light #64bf56 blue darken-1" onClick={handleSubmit}>
                    Sign Up
                </button>
                <h5>
                    <Link to="/login">Already have an account?</Link>
                </h5>
            </div>    
        </div>
    )
}

export default Signup
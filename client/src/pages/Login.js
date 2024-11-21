/**
 * @fileoverview Log In Page
 * 
 * @description This component renders a login form for existing users, allowing them to log in upon form submission. It handles user input for email and password and displays error messages if log in fails.
 * 
 * @dependencies materialize-css, react-router-dom
 */

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import M from "materialize-css"

import { useUser } from "../context/UserContext";

/**
 * @function Login
 * @description This page renders the form for user sign up. And it contains the logic to create a new user document on the backend api.
 * 
 * @returns {JSX.Element} The rendered sign up page containing a form to sign up
 */
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch} = useUser()

    /**
     * @function handleSubmit
     * @description Sends a post request to the API setting the body to be password and email. It then alerts the user if the request was a success or not.
     * 
     * @async
     * @returns {void} Sends a success message and navigates to the login page upon success. Or sends an error message upon failiure
     */
    const handleSubmit = async () => {
        try {
            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ password, email })
            })

            const json = await res.json()
            
            if (json.error) {
                M.toast({html: json.error, classes: "#c62828 red darken-3"})
            }
            else {
                dispatch({type: "LOGIN", payload: json.user})
                M.toast({ html: "Succesfully logged in!", classes: "#43a047 green darken-1" })
                navigate("/")
            }
        } catch (error) {
            M.toast({html: error.message, classes: "#c62828 red darken-3"})
        }
    }

    // render page
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
                <button className="btn waves-effect waves-light #64bf56 blue darken-1" onClick={handleSubmit}>
                    Log In
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>    
        </div>
    )
}

export default Login
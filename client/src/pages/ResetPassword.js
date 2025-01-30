/**
 * @fileoverview Reset Password Page
 * 
 * @description This component renders a form for existing users to get a link via email to reset their password, It handles user input for email and displays error messages if the request fails.
 * 
 * @dependencies materialize-css, react-router-dom
 */

import {useNavigate } from "react-router-dom"
import { useState } from "react"
import M from "materialize-css"

/**
 * @function Login
 * @description This page renders the form for user emails. And sends a request to the backend to send the user corresponding to the email a link.
 * 
 * @returns {JSX.Element} The rendered sign up page containing a form to sign up
 */
const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    /**
     * @function handleSubmit
     * @description Sends a post request to the API that sends a link to the corresponding user to reset their password
     * 
     * @async
     * @returns {void} Sends a success message and sends a success toast upon success. Or sends an error message upon failiure
     */
    const handleSubmit = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/resetpassword`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email })
            })

            const json = await res.json()
            
            if (json.error) {
                M.toast({html: json.error, classes: "#c62828 red darken-3"})
            }
            else {
                M.toast({ html: "A link has been sent to your email to reset your password", classes: "#43a047 green darken-1" })
                navigate("/login")
            }
        } catch (error) {
            M.toast({html: error.message, classes: "#c62828 red darken-3"})
        }
    }

    // render page
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instaclone</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                <button className="btn waves-effect waves-light #64bf56 blue darken-1" onClick={handleSubmit}>
                    Reset Password
                </button>
            </div>    
        </div>
    )
}

export default ResetPassword
/**
 * @fileoverview New Password Page
 * 
 * @description This component renders a reset password form for existing users, allowing them to change their password assuming they have the link. 
 * 
 * @dependencies materialize-css, react-router-dom
 */

import {useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import M from "materialize-css"


/**
 * @function NewPassword
 * @description This page renders the form for users to reset their passwords. And it contains the logic to create a new user document on the backend api.
 * 
 * @returns {JSX.Element} The rendered reset password page containing a form to do so
 */
const NewPassword = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {token} = useParams()

    /**
     * @function handleSubmit
     * @description Sends a post request to the API setting the body to be the new password. It then alerts the user if the request was a success or not.
     * 
     * @async
     * @returns {void} Sends a success message and navigates to the login page upon success. Or sends an error message upon failiure
     */
    const handleSubmit = async () => {
        if (password !== confirmPassword) {
                    M.toast({ html: "passwords do not match", classes: "#c62828 red darken-3" })
                    return
                }
        try {
            console.log(password, token)
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/newpassword`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    password,
                    token
                })
            })

            const json = await res.json()
            console.log(json)
            
            if (json.error) {
                M.toast({html: json.error, classes: "#c62828 red darken-3"})
            }
            else {
                M.toast({ html: "Succesfully reset password!", classes: "#43a047 green darken-1" })
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
                <input type="password" placeholder="enter new password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                <button className="btn waves-effect waves-light #64bf56 blue darken-1" onClick={handleSubmit}>
                    Reset Password
                </button>
            </div>    
        </div>
    )
}

export default NewPassword
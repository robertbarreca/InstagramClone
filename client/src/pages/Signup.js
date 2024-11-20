/**
 * @fileoverview Sign Up Page
 * 
 * @description This component renders a sign up form for new users, allowing them to sign up upon form submission. It handles user input for email, username and password and displays error messages if sign up fails.
 * 
 * @dependencies react-router-dom, materialize-css
 */

import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
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
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)


    useEffect(() => {
        if (url) {
            createAccount()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    const createAccount = async () => {
        try {
            const res = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, password, email, pic: url })
            }) 
            const json = await res.json()
            if (json.error) {
                M.toast({ html: json.error, classes: "#c62828 red darken-3" })
            }
            else {
                M.toast({ html: "Succesfully signed up!", classes: "#43a047 green darken-1" })
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        if (image) {
            uploadPic()
        }
        else {
            createAccount()
        }
        
    }

    /**
     * @function uploadPic 
     * @description Verifies that state variables exist and that image is of type image. Then sends a post request to cloudinary to convert image to url.
     * 
     * @returns {void} Sets url state variable upon success, and sends error message upon failiure.
     */
    const uploadPic = async () => {
    // Check if the file is an image
        if (!image.type.startsWith('image/')) {
            M.toast({ html: "Please upload a valid image file", classes: "#c62828 red darken-3" })
            setImage("")
            return
        }
        // add url to cloud if all fields are filled and image is of type image
        try {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "dgbh16ua3")
        const res = await fetch("https://api.cloudinary.com/v1_1/dgbh16ua3/image/upload", {
            method: "POST",
            body: data,
        })
            // set url upon succesful post
            const json = await res.json()
            setUrl(json.secure_url)
        } catch (error) {
            console.error(error)
            return
        }
    }
    
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                <input type="text" placeholder="username" value={username} onChange={(e)=> {setUsername(e.target.value)}}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <div className="file-field input-field">
                <div className="btn #64bf56 blue darken-1">
                    <span>Upload Profile Picture</span>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
                </div>
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
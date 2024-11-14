import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import M from "materialize-css"

const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
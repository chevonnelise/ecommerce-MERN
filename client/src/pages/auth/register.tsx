import { SyntheticEvent, useState } from "react";
import axios from 'axios';
import { UserErrors } from "../../models/errors";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await axios.post("https://3001-chevonnelis-ecommerceme-73rjnovqumw.ws-us110.gitpod.io/user/register", {
                username,
                password,
            });
            alert("Registration completed. Please login to continue shopping.");
            setSubmitted(true);
            navigate("/auth");
        } catch (err) {
            if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
                alert("Error: Username already exists.");
            } else {
                alert("Error: Something went wrong.");
            }
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
            {submitted && ( // Conditionally render the login button if the form is submitted
                <button onClick={() => navigate("/auth")}>Login</button>
            )}
        </div>
    )
}


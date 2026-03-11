import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // For demo purposes, we will just check if email and password are not empty
        if (email && password) {
            setIsLoggedIn(true);
            navigate('/'); // Redirect to the home page after login
        } else {
            alert("Please enter both email and password.");
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: "center"}}>Welcome Back!!</h2>
            <p style={{ textAlign: "center", color: "#6b7280", marginBottom: '20px'}}>
                Log in to to track your workouts and view your  workout history!.
            </p>

            <form onSubmit={handleLogin} className="workout-form">
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" style={{ backgroundColor: "#3b82f6" }}>
                    Log In
                </button>
            </form>

        </div>
    );
}
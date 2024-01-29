// import { Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { Paper, TextField, Button, Link, Typography } from "@mui/material";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3002/login", {
        username,
        password,
      });
  
      if (response.status === 200) {
        localStorage.setItem("loggedInUser", response.data.message); 
        navigate("/");
        setErrMsg("");
      } else {
        setErrMsg("Invalid Credentials");
      }
    } catch (error) {
      setErrMsg("Internal server error");
    }
  };

  return (
    <div className="root">
      <Paper className="paper" elevation={3}>
        <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
          Login
        </Typography>
        <form className="form">
          <TextField
            required
            label="Username"
            variant="outlined"
            type="text"
            size="normal"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        
          <br />
          <TextField
            required
            label="Password"
            variant="outlined"
            type="password"
            size="normal"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         
          <br />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          {errMsg && (
            <Typography
              variant="body2"
              color="error"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              {errMsg}
            </Typography>
          )}
        </form>
        <Typography
          className="registerLink"
          variant="body2"
          style={{ textAlign: "center" }}
        >
          Don't have an account?{" "}
          <Link href="#" id="registeredLink">
            Register here
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default LoginPage;

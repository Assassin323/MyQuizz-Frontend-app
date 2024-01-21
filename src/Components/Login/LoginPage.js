// import { Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { Paper, TextField, Button, Link, Typography } from '@mui/material';
import './LoginPage.css'
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check the credentials (for demo purposes, using hardcoded values)
    if (username === 'admin' && password === 'admin') {
      // If credentials are correct, navigate to the uploadFile page
      localStorage.setItem('loggedInUser', username); // You can store user information in localStorage or use a state management solution
      navigate('/');
    } else {
      // Handle invalid login here (e.g., show an error message)
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="root">
      <Paper className="paper" elevation={3}>
        <Typography variant="h3" gutterBottom style={{ textAlign: 'center' }}>
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
        </form>
        <Typography className="registerLink" variant="body2" style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link href="#" id="registeredLink">
            Register here
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};


export default LoginPage;

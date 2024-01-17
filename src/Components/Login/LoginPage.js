// import { Grid, Paper, TextField } from "@mui/material";
import React from "react";
import { Paper, TextField, Button, Link, Typography } from '@mui/material';
import './LoginPage.css'


const LoginPage = () => {
  
  return (
    <React.Fragment>
       <div className="root">
      <Paper className="paper" elevation={3}>
        <Typography variant="h3" gutterBottom>
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
          />
          <br/>
          <TextField
          required
          label="Password"
          variant="outlined"
          type="password"
          size="normal"
          margin="normal"
          />
   <br/>
          <Button variant="contained" color="primary">
            Login
          </Button>
        </form>
        <Typography className="registerLink" variant="body2">
          Don't have an account? &nbsp;
          <Link href="#"  id="registeredLink">Register here</Link>
        </Typography>
      </Paper>
    </div>
    </React.Fragment>
  );
};

export default LoginPage;

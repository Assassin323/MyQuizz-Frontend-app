// AppBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';

const CustomAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtons = () => {
    switch (location.pathname) {
      case '/login':
        return (
          <Link color="inherit" component={RouterLink} to="/register" underline="none">
            <Button color="inherit">Register</Button>
          </Link>
        );
      case '/register':
        return (
          <Link color="inherit" component={RouterLink} to="/login" underline="none">
            <Button color="inherit">Login</Button>
          </Link>
        );
      case '/upload':
        return (
          <>
            <Link color="inherit" component={RouterLink} to="/viewFile" underline="none">
              <Button color="inherit">ViewFile</Button>
            </Link>
            {location.pathname !== '/' && (
              <Link color="inherit" component={RouterLink} to="/" underline="none">
                <Button color="inherit">Home</Button>
              </Link>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        );
      case '/viewFile':
        return (
          <>
            <Link color="inherit" component={RouterLink} to="/upload" underline="none">
              <Button color="inherit">UploadFile</Button>
            </Link>
            {location.pathname !== '/' && (
              <Link color="inherit" component={RouterLink} to="/" underline="none">
                <Button color="inherit">Home</Button>
              </Link>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        );
      default:
        return (
          <>
            <Link color="inherit" component={RouterLink} to="/upload" underline="none">
              <Button color="inherit">UploadFile</Button>
            </Link>
            <Link color="inherit" component={RouterLink} to="/viewFile" underline="none">
              <Button color="inherit">View-File</Button>
            </Link>
            {location.pathname !== '/' && (
              <Link color="inherit" component={RouterLink} to="/" underline="none">
                <Button color="inherit">Home</Button>
              </Link>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        );
    }
  };
  

  const handleLogout = () => {
    // Handle logout logic (e.g., clear localStorage)
    navigate('/login');
    

  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          App Name
        </Typography>
        {getButtons()}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;

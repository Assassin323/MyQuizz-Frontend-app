import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadFile from './Components/DropBox/uploadFile';
import LoginPage from './Components/Login/LoginPage';
import ViewFile from './Components/ViewFile/ViewFile';
import CustomAppBar from './Components/UI/AppBar';
import Home from './Components/UI/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <CustomAppBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/viewFile" element={<ViewFile />} />
          <Route  path="/login" element={<LoginPage />} index={true}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

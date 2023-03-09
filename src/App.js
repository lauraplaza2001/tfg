
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, {  useState }  from 'react';
import MainAppBar from './components/MainAppBar/MainAppBar';
import Main from './pages/Main/Main';







function App() {
 /*const clientId='809085480924-kd4b5cqfatoiirqu60ehktf5u7iobnnu.apps.googleusercontent.com'*/ 
  const [setUser] = useState({});
  

  return (
    <GoogleOAuthProvider clientId="809085480924-kd4b5cqfatoiirqu60ehktf5u7iobnnu.apps.googleusercontent.com">
      <BrowserRouter>
        <MainAppBar login={setUser}/>
        <Routes>
          <Route path="" element={<Main />} /> 
        
        </Routes>
      </BrowserRouter>
 
  </GoogleOAuthProvider>
  );
}

export default App;





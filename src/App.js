
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, {  useState }  from 'react';
import MainAppBar from './components/MainAppBar/MainAppBar';
import Main from './pages/Main/Main';
import InfoEjercicio from './pages/InfoEjercicio/InfoEjercicio';
import Ejercicios from './pages/Ejercicios/Ejercicios';
import SubirVideo from './pages/SubirVideo/SubirVideo';







function App() {
 /*const clientId='809085480924-kd4b5cqfatoiirqu60ehktf5u7iobnnu.apps.googleusercontent.com'*/ 
  const [user,setUser] = useState({});
  

  return (
    <GoogleOAuthProvider clientId="809085480924-kd4b5cqfatoiirqu60ehktf5u7iobnnu.apps.googleusercontent.com">
      <BrowserRouter>
        <MainAppBar login={setUser}/>
        <Routes>
          <Route path="" element={<Main usuario={user}/>} /> 
          <Route path="Ejercicio/:id" element={<InfoEjercicio usuario={user}/>} /> 
          <Route path="Ejercicios" element={<Ejercicios usuario={user}/>} /> 
          <Route path="SubirVideo" element={<SubirVideo usuario={user}/>} /> 
        
        </Routes>
      </BrowserRouter>
 
  </GoogleOAuthProvider>
  );
}

export default App;





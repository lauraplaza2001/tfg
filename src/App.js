
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, {  useState }  from 'react';
import MainAppBar from './components/MainAppBar/MainAppBar';
import Main from './pages/Main/Main';
import InfoEjercicio from './pages/InfoEjercicio/InfoEjercicio';
import Ejercicios from './pages/Ejercicios/Ejercicios';
import SubirVideo from './pages/SubirVideo/SubirVideo';
import AdminEjercicios from './pages/AdminEjercicios/AdminEjercicios'
import AdminUsuarios from './pages/AdminUsuarios/AdminUsuarios'
import NuevoEjercicio from './pages/NuevoEjercicio/NuevoEjercicio'
import ModificarEjercicio from './pages/ModificarEjercicio/ModificarEjercicio';
import ModificarUsuario from './pages/ModificarUsuario/ModificarUsuario';
import NuevoUsuario from './pages/NuevoUsuario/NuevoUsuario'








function App() {
 /*const clientId='809085480924-kd4b5cqfatoiirqu60ehktf5u7iobnnu.apps.googleusercontent.com'*/ 
  const [user,setUser] = useState({});
  const dificultades=["ALTA","MEDIA","BAJA"];
  const gruposMusculares = ["PIERNAS", "BRAZOS", "ESPALDA", "HOMBROS" , "PECHO", "ABDOMEN"]
  const tips = ["ANCHURAPIESCADERA","ANCHURAABIERTOAGARREBARRA","ANCHURACERRADOAGARREBARRA","EXTENSIONCADERA","EXTENSIONRODILLAS","EXTENSIONCOMPLETACODOS","BARRAPEGADACUERPO","RODILLASSIGUENLINEAPIES","MANTENERESPALDARECTADESDESUELO","MANTENERESPALDARECTADESDENOSUELO","BARRAAPOYADAHOMBROS","CODOSALTOSPOSICIONFRONTRACK","BARRASUBEVERTICALMENTE","ROMPERELPARALELO","PESODISTRIBUIDOENTODOELPIE","SACARCABEZA"]
  const roles = ["ADMIN","USUARIO"]


  

  return (
    <GoogleOAuthProvider clientId="809085480924-kd4b5cqfatoiirqu60ehktf5u7iobnnu.apps.googleusercontent.com">
      <BrowserRouter>
        <MainAppBar login={setUser}/>
        <Routes>
          <Route path="" element={<Main usuario={user}/>} /> 
          <Route path="Ejercicio/:id" element={<InfoEjercicio usuario={user}/>} /> 
          <Route path="Ejercicios" element={<Ejercicios usuario={user}/>} /> 
          <Route path="SubirVideo" element={<SubirVideo usuario={user}/>} /> 
          <Route path="AdminEjercicios" element={<AdminEjercicios usuario={user}/>}/>
          <Route path="AdminUsuarios" element={<AdminUsuarios usuario={user}/>}/>
          <Route path="NuevoEjercicio" element={<NuevoEjercicio gruposMusculares={gruposMusculares} dificultades={dificultades} tips={tips}/>}/>
          <Route path="ModificarEjercicio" element={<ModificarEjercicio gruposMusculares={gruposMusculares} dificultades={dificultades} tips={tips}/>}/>
          <Route path="AdminUsuarios" element={<AdminUsuarios/>} />
          <Route path="ModificarUsuario/:id" element={<ModificarUsuario roles={roles}/>} />
          <Route path="NuevoUsuario" element={<NuevoUsuario roles={roles}/>} />
        </Routes>
      </BrowserRouter>
 
  </GoogleOAuthProvider>
  );
}

export default App;





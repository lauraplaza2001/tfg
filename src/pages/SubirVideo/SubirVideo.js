
import React, {useState,useEffect} from 'react'
import Cloudinary from "../../components/Cloudinary/Cloudinary"
import { useNavigate } from 'react-router-dom';
import { Styler } from '../../components/Styler/Styler'
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { useLocation } from "react-router-dom";
import { Box, Container, Button, Typography, Grid } from '@mui/material';



const SubirVideo = () => {
  const navigate = useNavigate();
  const usuario = useLocation().state.usuario;
  const ejercicio= useLocation().state.ejercicio[0];
  //const texto = useState("")
  const [texto, setTexto] = useState("");



  useEffect(() => {
    if(usuario.email === undefined){
      alert("Inicie sesión para poder subir un vídeo")
       navigate("/");
   }

   getTips();

   
}, []);
 

function getTips () {
  let tipText = "";

 
  ejercicio.tips.forEach(function(currentValue, index) {
    if(currentValue==="PESODISTRIBUIDOENTODOELPIE"){
     tipText+="Distribuya el peso en todo el pie. "
    }

    if(currentValue==="ANCHURAPIESCADERA"){
      tipText += "Anchura de los pies a la altura de las caderas. "
    }
    if(currentValue==="ANCHURAPIESHOMBROS"){
      tipText+="Anchura de los pies a la altura de los hombros. "
    }
    if(currentValue==="ANCHURAABIERTOAGARREBARRA"){
      tipText+="Anchura del agarre de la barra abierto. "
    }
    if(currentValue==="ANCHURACERRADOAGARREBARRA"){
      tipText+="Anchura del agarre de la barra cerrado. ";
    }
    if(currentValue==="EXTENSIONCOMPLETACADERAYRODILLAS"){
      tipText+="Recuerde realizar la extensión completa de caderas y rodillas al finalizar el movimiento. "
    }
    if(currentValue==="EXTENSIONCOMPLETACODOS"){
      tipText+="Recuerde realizar la extensión completa de codos al finalizar el movimiento. "
    }
    if(currentValue==="BARRAPEGADACUERPO"){
      tipText+="En todo momento busque que la barra esté lo más cerca posible del cuerpo. ";
    }
    if(currentValue==="RODILLASSIGUENLINEAPIES"){
      tipText+="Manten las rodillas en línea con los pies. "
    }
    if(currentValue==="MANTENERESPALDARECTA"){
      tipText+="Manten la espalda recta. "
    }
    if(currentValue==="BARRAAPOYADAHOMBROS"){
      tipText+="En posición de inicio la barra debe estar apoyada en los hombros. "
    }
    if(currentValue==="CODOSALTOSPOSICIONFRONTRACK"){
      tipText+="Los codos deben están altos en la posición de inicio. "
    }
    if(currentValue==="BARRASUBEVERTICALMENTE"){
      tipText+="La barra debe subir verticalmente. Para ello los codos siempre deben estar por delante de la barra. "
    }
    if(currentValue==="ROMPERELPARALELOS"){
      tipText+="Baje profundamente. Sobrepase los 90 grados. "
    }
  

  })


  setTexto(tipText);
}
  

  const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',  
};


const {
  handleSubmit,
 
} = useForm({
  mode: 'onChange',
});

  const defaultValues= {
    user: usuario,
    ej: ejercicio,
    videoPerfil: "",
    videoFrontal: "",
    informe: []
  }
  const [values, setValues] = useState(defaultValues);

  const addVideoPerfil = (url) => {
    setValues({ ...values, videoPerfil: url });
    console.log(values.videoPerfil)
  };
  const addVideoFrontal = (url) => {
    setValues({ ...values, videoFrontal: url });
    console.log(values.videoFrontal)
  }

 


  const generarInforme = (data) => {
    if(values.videoFrontal !== "" && values.videoPerfil !== ""){
    //if(values.videoFrontal.length >= 1 && values.videoPerfil.length >= 1){
      axios.post("https://localhost:8002/informes/crear",
          {
              "idUsuario" : values.user._id.$oid, 
              "videoPerfil": values.videoPerfil,
              "videoFrontal": values.videoFrontal,
              "idEjercicio": values.ej._id.$oid,        
          }).then(() => {
              navigate("/Ejercicios")
          }).catch((response) =>{
              console.log(response)
          });
  }
      
  }


  


    return(

      <Box
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#FFFFFF'}}
        >
         <Container sx={{ mt: 3, mb: 3, display: 'flex' }}>
          <Grid container spacing={1}>

              <Grid item xs={6} md={6}>
                    <Box sx={item}>
                    <Button
                    color="error"
                    variant="outlined"    sx={{backgroundColor:  "black",
                    fontFamily:   '"Segoe UI Symbol"',
                    fontSize: "20px",
                    height: "60px",
                    width: "120px" }}
                    onClick={() => navigate("/Ejercicios")}
                     >
                    Volver
                    </Button>
                    </Box>
              </Grid>

              <Grid item xs={12} md={12}>
                    <Typography 
                        color="black" 
                        align="center"
                        variant="h4"
                        marked="center" 
                        style={ Styler.textosombra }
                        sx={{ mb: 2 }}
                        >
                            Instrucciones {ejercicio.nombre}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Box sx={item}>
                    <Typography backgroundColor="#E9E2E2" align='center' variant="h6" sx={{ my:0, fontFamily: '"Segoe UI Symbol"' }}>
                        - El movimiento a realizar es el <b>{ejercicio.nombre} </b> 
                    </Typography>
                    <Typography backgroundColor="#E9E2E2"  align='center' variant="h6" sx={{ my: 0, fontFamily: '"Segoe UI Symbol"' }}>
                        - Deberás grabarte dos vídeos : uno de <b>perfil </b> y otro de <b>frente a la cámara </b>
                    </Typography>
                    <Typography backgroundColor="#E9E2E2"  align='center'  variant="h6" sx={{ my: 0, fontFamily: '"Segoe UI Symbol"' }}>
                        - Evita que haya más personas en el vídeo. Sólo debe aparecer <b>una persona </b> en el vídeo
                    </Typography>
                    <Typography backgroundColor="#E9E2E2"   align='center' variant="h6" sx={{ my: 0, fontFamily: '"Segoe UI Symbol"' }}>
                        - Colócate en el <b> centro </b> de la cámara
                    </Typography>
                    <Typography backgroundColor="#E9E2E2"   align='center' variant="h6" sx={{ my: 0, fontFamily: '"Segoe UI Symbol"' }}>
                        - No pulse generar informe hasta que no haya subido ambos vídeos
                    </Typography>
                    <Typography backgroundColor="#E9E2E2"   align='center' variant="h6" sx={{ my: 0, fontFamily: '"Segoe UI Symbol"' }}>
                        - El vídeo debe <b>comenzar justo en el momento en el que comienza el movimiento </b>y <b>terminar justo en el momento en el que finaliza el movimiento</b>. Recorte el vídeo si es necesario.
                    </Typography>
                   

                    </Box>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Box sx={item}>
                    <Typography backgroundColor="#E9E2E2" align='center' variant="h6" sx={{ my: 0, fontFamily: '"Segoe UI Symbol"' }}>
                         Y recuerda los <b>TIPS</b> del movimiento : 
                    </Typography>
                    <Typography backgroundColor="#E9E2E2" align='center' variant="h6" sx={{ my: 0, fontFamily: '"Segoe UI Symbol"' }}>
                      {
                          texto
                      }
                   </Typography>
                    </Box>
                </Grid>


                <Grid item xs={4} md={4}>
                    <Box sx={item}>
                    <Typography  align= 'center' variant="h6" sx={{ my: 2, fontFamily: '"Segoe UI Symbol"' }}>
                        <b>VIDEO PERFIL </b> 
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} md={4}>
                    <Box sx={item}>
                    <Typography  align= 'center' variant="h6" sx={{ my: 2, fontFamily: '"Segoe UI Symbol"' }}>
                        <b>VIDEO FRONTAL </b> 
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} md={4}></Grid>

                <Grid item xs={4} md={4}>
                    <Box sx={item}>
                    <Typography  align= 'center' variant="h6" sx={{ my: 2, fontFamily: '"Segoe UI Symbol"' }}>
                     <Cloudinary func={addVideoPerfil} nombre={"porbando"}></Cloudinary>
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} md={4}>
                    <Box sx={item}>
                    <Typography  align= 'center' variant="h6" sx={{ my: 2, fontFamily: '"Segoe UI Symbol"' }}>
                    <Cloudinary func={addVideoFrontal} nombre={"esteeselnombre"} ></Cloudinary>
                    </Typography>
                    </Box>
                </Grid>

                <Grid item xs={4} md={4}>
                    <Box sx={item}>
                    <Typography  align= 'center' variant="h6" sx={{ my: 2, fontFamily: '"Segoe UI Symbol"' }}>

                    <form onSubmit={handleSubmit(generarInforme)} onKeyPress={e => { e.which === 13 && e.preventDefault() }} noValidate>
                    <Button
                    type="submit"
                    color="error"
                    variant="outlined"    sx={{backgroundColor:  "black",
                    fontFamily:   '"Segoe UI Symbol"',
                    fontSize: "20px",
                    height: "90px",
                    width: "150px" }}
                   
                     >
                   Generar informe
                    </Button>
                    </form>




                    </Typography>
                    
                
                    </Box>
                </Grid>
               




          </Grid>
        </Container>
      </Box> 
    );

}

export default SubirVideo ; 
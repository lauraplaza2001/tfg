import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Styler } from '../../components/Styler/Styler';
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";


const InfoEjercicio = ({usuario }) => {
    const ejercicio = useLocation().state.ejercicio
 
    const [gruposMusculares,setGruposMusculares] = useState("");
    const [cargando, setCargando] = useState(true);
    const [texto, setTexto] = useState("");
    const navigate = useNavigate();

  

    const getEjercicio = async () => {
      {/*   const ej = await axios.get("http://localhost:8001/ejercicios/filter/nombre/Deadlift")
        setEjercicio(ej.data);
        console.log(ejercicio);
    */}
        setCargando(false);
        getTips()
        getGruposMusculares()
    }

    useEffect(() => {
         getEjercicio()
         console.log(usuario)
        
          }, [cargando]);
    
     
        if(cargando){
          return <CircularProgress />;
        }
        

        const item = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          
        };
        function getGruposMusculares () {
            let tipText = "";
          
           
            ejercicio.gruposMusculares.forEach(function(currentValue, index) {
              if(currentValue==="PIERNAS"){
               tipText+="Piernas. "
              }
              if(currentValue==="BRAZOS"){
                tipText+="Brazos. "
               }
               if(currentValue==="ESPALDA"){
                tipText+="Espalda. "
               }
               if(currentValue==="HOMBROS"){
                tipText+="Hombros. "
               }
               if(currentValue==="PECHO"){
                tipText+="Pecho. "
               }
               if(currentValue==="ABDOMEN"){
                tipText+="Abdomen. "
               }
          
            
          
            })
          
          
            setGruposMusculares(tipText);
          }


        function getTips () {
            let tipText = "";
          
           
            ejercicio.tips.forEach(function(currentValue, index) {

          
              if(currentValue==="ANCHURAPIESCADERA"){
                tipText += "Anchura de los pies a la altura de las caderas. "
              }
        
              if(currentValue==="ANCHURAABIERTOAGARREBARRA"){
                tipText+="Anchura del agarre de la barra abierto. "
              }
              if(currentValue==="ANCHURACERRADOAGARREBARRA"){
                tipText+="Anchura del agarre de la barra cerrado. ";
              }
              if(currentValue==="EXTENSIONCADERA"){
                tipText+="Recuerde realizar la extensión completa de caderas al finalizar el movimiento, es decir, tus hombros deben acabar en línea con tu cuerpo "
              }
              if(currentValue==="EXTENSIONRODILLAS"){
                tipText+="Recuerde realizar la extensión completa de rodillas finalizar el movimiento. "
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
              if(currentValue==="MANTENERESPALDARECTADESDESUELO"){
                tipText+="Manten la espalda recta.  "
              }
              if(currentValue==="MANTENERESPALDARECTADESDENOSUELO"){
                tipText+="Manten la espalda recta."
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
              if(currentValue==="SACARCABEZA"){
                tipText+="Acaba sacando la cabeza, es decir , tus hombros deben quedar por detrás de las orejas "
              }

            
          
            })
            setTexto(tipText);
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
                            {ejercicio.nombre.toUpperCase()}
                    </Typography>
                </Grid>

                <Grid item xs={7} md={7}>
                    <Box sx={item}>
                        <VideoPlayer videoUrl={ejercicio.video}></VideoPlayer>

                    </Box>
                </Grid>
                <Grid item xs={5} md={5}>
                    <Box sx={item}>
                    <Typography backgroundColor="#E9E2E2" variant="h6" sx={{ my: 1, fontFamily: '"Segoe UI Symbol"' }}>
                        <b>DIFICULTAD: </b> {ejercicio.dificultad}
                    </Typography>
                    <Typography backgroundColor="#E9E2E2" variant="h6" sx={{my: 1, fontFamily: '"Segoe UI Symbol"' }}>
                        <b>GRUPOS MUSCULARES: </b> {
                            gruposMusculares
                        }
                    </Typography>
                    <Typography backgroundColor="#E9E2E2" variant="h6" sx={{my: 2, fontFamily: '"Segoe UI Symbol"'}} >
                        {ejercicio.descripcion}
                    </Typography>
                    </Box>
                </Grid>

                
                <Grid item xs={7} md={7}>
                    <Box sx={item}>
                    <Typography backgroundColor="#E9E2E2" variant="h6" sx={{ my: 1, fontFamily: '"Segoe UI Symbol"' }}>
                        <b>TIPS: </b> {texto}
                    </Typography>

                    </Box>
                </Grid>
                <Grid item xs={3} md={3}></Grid>
                <Grid item xs={2} md={2}>
                    <Box sx={item} align="right">
                    <Button
                    align="center"
                    color="error"
                    variant="outlined"    sx={{backgroundColor:  "black",
                    fontFamily:   '"Segoe UI Symbol"',
                    fontSize: "20px",
                    height: "60px",
                    width: "170px" }}
                    onClick={() => 

                      navigate("/SubirVideo", {state: {usuario, ejercicio}})}
                     >
                    Subir vídeo
                    </Button>
                    </Box>
                </Grid>

                

        </Grid>


           </Container>
        </Box>
       
    );

}

export default InfoEjercicio 
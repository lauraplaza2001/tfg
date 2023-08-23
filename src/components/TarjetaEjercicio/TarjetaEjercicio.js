import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const TarjetaEjercicio = ({ ejercicio,admin}) => {

  const [show, setShow] = useState("auto");
  const navigate = useNavigate();

    
  return ( 
    <Card sx={{ mt:4 ,mr: 80, height: '280px' ,width: '300px' ,  border: '4px solid black' ,  padding:"5px" ,  borderRadius: 6}}>
      <CardMedia
        component="img"
        height="140"
        image={ejercicio.foto}
        alt="ejercicio"
        onClick={() => {

          if(admin=== false){
            navigate("/ejercicio/"+ ejercicio.nombre, {state: {ejercicio}})
          }else {
            navigate("/ModificarEjercicio/",{state: {ejercicio}})
          }
        }}
      />
      <CardContent>
        
     
     
       
      </CardContent>

      <CardActions style={{justifyContent: 'center' }}>
        <Typography backgroundColor="#E9E2E2" variant="h4" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI Symbol', textTransform: 'uppercase', textDecoration: 'underline' }}  onClick={() => {

                                                                                                                                                                                    if(admin === false){
                                                                                                                                                                                      navigate("/ejercicio/"+ ejercicio.nombre, {state: {ejercicio}})
                                                                                                                                                                                    }else {
                                                                                                                                                                                      navigate("/ModificarEjercicio/",{state: {ejercicio}})
                                                                                                                                                                                    }
                                                                                                                                                                                    }}
                                                                                                                                                                                    >
         {ejercicio.nombre}
        </Typography>
    </CardActions>


    </Card>   

  )
}

export default TarjetaEjercicio

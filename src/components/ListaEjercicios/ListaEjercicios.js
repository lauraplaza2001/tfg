
import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TarjetaEjercicio from '../TarjetaEjercicio/TarjetaEjercicio';

const ListaEjercicios = ({locations }) => {
   

  if (locations.length == 0){
    return null;
  }


  return (
     <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
      {locations.map((ejercicio) => {
          return (
            <Grid key={ejercicio.nombre} item xs={12} sm={4} md={4} lg={3}>
              <TarjetaEjercicio ejercicio={ejercicio}   />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  )
}

export default ListaEjercicios
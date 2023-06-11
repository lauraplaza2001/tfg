
import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TarjetaEjercicio from '../TarjetaEjercicio/TarjetaEjercicio';

const ListaEjercicios = ({locations,admin }) => {
   

  if (locations.length == 0){
    return null;
  }


  return (
     <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
      {locations.map((ejercicio) => {
          return (
            <Grid key={ejercicio.nombre} item xs={4}>
              <TarjetaEjercicio admin={admin} ejercicio={ejercicio}  />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  )
}

export default ListaEjercicios

import Button from '@mui/material/Button';
import React from 'react';
import { Box, Container } from '@mui/system';
import {  Typography } from '@mui/material';
import { Styler } from '../../components/Styler/Styler'
import foto from "../../images/portada.jpg";




const Main = () => {


    return(
        <Box
        sx={{
            backgroundPosition: 'center',
        }} >
        
            <Container sx={{
            mb: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 0,
            }}>
                  <Typography
                    color="black"
                    align="left" 
                    variant="h5" 
                    marked="center" 
                    sx={{fontFamily: "roboto", mb: 1, mt: { sx: 1, sm: 2 } }}>
                   Bienvenido a
                  </Typography>
                
                  <Typography 
                    color="black" 
                    align="left"
                    variant="h4"
                    marked="center" 
                    style={ Styler.textosombra }
                    sx={{ mb: 2 }}
                    >
                  Functional Training Assistance
                  </Typography>

                    <Box
                    component="img"
                    sx={{
                        height: 350,
                        width:800,
                        mb: 2,
                      
                    }}
                    src={foto}
                    
                    >
                    </Box>

                    <Box
                    backgroundColor="#E9E2E2"
                    sx={{
                        height: 100,
                        width:800, 
                        mb: 2
                    }}
                  
                    >
                         <Typography 
                    color="black" 
                    align="center"
                    variant="h6"
                    marked="center" 
                    fontFamily={ '"Segoe UI Symbol"' }
                    sx={{ mb: 2 , mt: 2, ml: 2 , mr: 2 }}
                    >
                  Bienvenido a Functional Training Assistance, una aplicación que te ayudará a mejorar tus movimientos de Crossfit y Cross-Training sin necesidad de un entrenador.
                  </Typography>
                       
                    </Box>

                  
          
                
                <Button
                    color="error"
                    variant="outlined"    sx={{backgroundColor:  "black",
                    fontFamily:   '"Segoe UI Symbol"',
                    fontSize: "20px",
                    height: "60px",
                    width: "200px" }}
                >
                    Comenzar
                </Button>

            </Container>
        </Box>
    
        
       
    );

}

export default Main ; 
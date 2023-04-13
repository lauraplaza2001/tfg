import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


{/*   ESTE BOTON NEGRO SOLO ME PERMITE, QUE CUANDO HAGO CLICK, NAVEGO A OTRO ENLACE*/}
const BotonNegro = ({ texto , ancho, altura, navegar}) => {
    const navigate = useNavigate();

    return (

        <Button
        color="error"
        variant="outlined"    sx={{backgroundColor:  "black",
        fontFamily:   '"Segoe UI Symbol"',
        fontSize: "20px",
        height: {altura},
        width: {ancho},
        ml: 2 }}
        onClick={() => navigate({navegar})}
    >
       {texto}
    </Button>




    )
}

export default BotonNegro


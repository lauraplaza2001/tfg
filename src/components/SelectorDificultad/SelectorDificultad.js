import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectorDificultad() {
  const [dificultad, setDificultad] = React.useState('');

  const handleChange = (event) => {
    setDificultad(event.target.value);
  };

  return (
    <FormControl sx={{ m: 3, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Dificultad</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={dificultad}
        label="Dificultad"
        onChange={handleChange}
      >
       
        <MenuItem value={"ALTA"}>Alta</MenuItem>
        <MenuItem value={"MEDIA"}>Media</MenuItem>
        <MenuItem value={"BAJA"}>Baja</MenuItem>
      </Select>
    </FormControl>
  );
}

import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function SearchBar() {
  return (
    <>
      <Container maxWidth="false" sx={{ mt: 2 } }>
        <TextField  type="search" id="search" label="Nombre" sx={{ width: 300 }} />
        <Button>holta</Button>
      </Container>
    </>
  );
}
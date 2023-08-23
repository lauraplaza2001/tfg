import React, { Component } from "react";
import { Button, Snackbar } from "@mui/material";
import PropTypes from "prop-types";

class Cloudinary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessageOpen: false,
    };
  }

  handleSuccessMessageClose = () => {
    this.setState({ successMessageOpen: false });
  };

  componentDidMount() {
    const { cloudName, uploadPreset, nombre, func } = this.props;

    this.myWidget = window.cloudinary.createUploadWidget({
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      sources: ["local"],
      resourceType: "video",
      folder: "TFG",
      public_id: nombre,
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        func(result.info.secure_url);
        this.setState({ successMessageOpen: true });
      }
    });
  }

  componentWillUnmount() {
    this.myWidget.destroy(); // Destruye el widget al desmontar el componente
  }

  render() {
    const { nombre } = this.props;
    const { successMessageOpen } = this.state;

    return (
      <>
        <Button
          id={`upload_widget_${nombre}`}
          className="cloudinary-button"
          align="center"
          color="error"
          variant="outlined"
          sx={{
            backgroundColor: "black",
            fontFamily: '"Segoe UI Symbol"',
            fontSize: "18px",
            height: "60px",
            width: "164px",
          }}
          onClick={() => this.myWidget.open()} // Abre el widget al hacer clic en el botón
        >
          Subir Video
        </Button>

        <Snackbar
          open={successMessageOpen}
          autoHideDuration={3000}
          onClose={this.handleSuccessMessageClose}
          message="¡Video subido con éxito!"
        />
      </>
    );
  }
}

Cloudinary.propTypes = {
  cloudName: PropTypes.string.isRequired,
  uploadPreset: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default Cloudinary;

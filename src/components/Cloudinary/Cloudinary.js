import React, { Component } from "react";
import { Button } from "@mui/material";


class Cloudinary extends Component {
  constructor(props) {
    super(props);
    this.nombre=props.nombre;
    };

  
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "drcsegsao",
        uploadPreset: "trabajofingrado",
        sources: ["local"],
        resourceType: "video",
        folder: "TFG",
        public_id: this.nombre,

      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          this.props.func(result.info.secure_url);
        //  myWidget.close();
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <Button id="upload_widget" className="cloudinary-button" align="center"
      color="error"
      variant="outlined"    sx={{backgroundColor:  "black",
      fontFamily:   '"Segoe UI Symbol"',
      fontSize: "18px",
      height: "60px",
      width: "1640x" }}>
        Subir Video
      </Button>
    );
  }
}

export default Cloudinary;

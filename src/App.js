import React from "react";
import Resizer from "react-image-file-resizer";
import mergeImages from "merge-images";
import InputFile from "./Components/InputFile";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      1080,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      1080,
      1080
    );
  });

const App = () => {
  const [foto, setFoto] = React.useState("");
  const [frame, setFrame] = React.useState("");
  const [resultado, setResultado] = React.useState("");

  async function handleChange(e) {
    try {
      const file = e.target.files[0];
      const fileResize = await resizeFile(file);

      if (e.target.name === "foto") {
        setFoto(fileResize);
      }

      if (e.target.name === "frame") {
        setFrame(fileResize);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick(e) {
    e.preventDefault();

    mergeImages([foto, frame], { width: 1080, height: 1080 })
      .then((b64) => setResultado(b64))
      .catch((e) => console.log(e));
  }

  return (
    <div className="Container">
      <h1>
        Escolher um <span id="Destaque">frame/borda</span> para uma foto
      </h1>

      <form>
        <InputFile 
          label="Foto" 
          nome="foto" 
          onChange={handleChange} 
        />

        <InputFile
          label="Frame"
          nome="frame"
          accept=".png"
          onChange={handleChange}
        />

        <button 
          onClick={handleClick} 
          disabled={foto && frame ? false : true}
          style={
            (foto && frame) 
            ? {opacity: 1, pointerEvents: 'visible'} 
            : {opacity: 0.5, pointerEvents: 'none'}}
        >
          Gerar image
        </button>
      </form>

      {resultado && <img src={resultado} alt="nova foto com frame" />}
    </div>
  );
};

export default App;

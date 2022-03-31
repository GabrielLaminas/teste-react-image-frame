import React from 'react';
import './inputfile.css';

const InputFile = ({
  label, 
  nome, 
  accept = '.jpg', 
  onChange}
) => {
  return (
    <label htmlFor={nome}>{label}
      <input 
        type="file"
        id={nome}
        name={nome}
        accept={accept}
        onChange={onChange}
      />
    </label>
  )
}

export default InputFile;
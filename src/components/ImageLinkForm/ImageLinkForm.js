import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="image-link-form-container">
      <p className="image-word">
        {"This Magic Brain will detect faces in your pictures. Git it a try."}
      </p>
      <div className="link-input-field">
        <input className="link-input" type="tex" onChange={onInputChange} />
        <button className="link-btn" onClick={onButtonSubmit}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;

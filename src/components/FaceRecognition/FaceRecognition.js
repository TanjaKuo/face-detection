import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="face-container">
      <div className="face-hero">
        {imageUrl ? (
          <img
            id="inputimage"
            alt=""
            src={imageUrl}
            width="400px"
            heigh="auto"
          />
        ) : null}
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;

import React from "react";
import "../../Style/rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div class="rank-container">
      <div className="rank-hero">
        {`${name.toUpperCase()}, your current entry count is...`}
      </div>
      <div className="rank">{entries}</div>
    </div>
  );
};

export default Rank;

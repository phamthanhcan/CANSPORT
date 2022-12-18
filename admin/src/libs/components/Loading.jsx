import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ inline }) => {
  return (
    <div className={`loading ${inline ? "inline" : ""}`}>
      <ReactLoading type={"spin"} color={"#424141"} height={60} width={60} />
    </div>
  );
};

export default Loading;

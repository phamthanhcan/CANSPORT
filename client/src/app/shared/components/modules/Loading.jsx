import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="ovelay f-center-x f-center-y">
      <ReactLoading type={"spin"} color={"#424141"} height={60} width={60} />
    </div>
  );
};

export default Loading;

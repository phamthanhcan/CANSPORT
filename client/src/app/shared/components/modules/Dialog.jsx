import { useState } from "react";

export const DIALOG_TYPE = {
  CONFIRM: "confirm",
  ALERT: "alert",
};

const Dialog = (props) => {
  const [isShow, setIsShow] = useState(true);
  const afterClosed = () => {
    if (props.afterClosed) {
      props.afterClosed();
    } else {
      setIsShow(false);
    }
  };

  const handleConfirm = () => {
    if (props.handleConfirm) {
      props.handleConfirm();
    } else {
      setIsShow(false);
    }
  };

  return (
    <div
      className={`${
        isShow ? "hidden" : ""
      } dialog d-flex f-center-x f-center-y`}
    >
      <div className="dialog-wrap bg-white pd-5">
        <h4 className="txt-sm txt-center txt-demi my-2">{props.header}</h4>
        <p className="txt-center txt-xs mb-3">{props.content}</p>
        <div className="d-flex f-center-x f-center-y mt-6">
          {props.type === DIALOG_TYPE.ALERT ? (
            <button
              className="btn btn-success btn-sm"
              onClick={() => afterClosed()}
            >
              Close
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary btn-xs mr-3"
                onClick={() => handleConfirm()}
              >
                Yes
              </button>
              <button
                className="btn btn-secondary btn-xs"
                onClick={() => afterClosed()}
              >
                No
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

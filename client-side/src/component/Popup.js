import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import './../style/popup.css';

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}><CloseIcon/></button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
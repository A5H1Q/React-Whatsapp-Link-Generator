import {useRef, useState} from "react";
import {ReactComponent as Close} from "../Icons/close.svg";

const Popup = (props) => {
 const [copystat, isCopy] = useState(false);
 const textAreaRef = useRef(null);

 const closeDialog = () => props.control[1]([false, "", "", 0]);

 const copyToClipboard = (e) => {
  textAreaRef.current.select();
  document.execCommand("copy"); //? Deprecated?
  isCopy(true);
 };

 return (
  <div>
   <div className="Overlay" onClick={closeDialog}></div>
   <div className="Dialog">
    <h4 className="titlebar">
     {props.control[0][1]}
     <Close onClick={closeDialog} />
    </h4>
    {props.control[0][2] === "" ? (
     <div className="content">
      This is a simple tool designed to generate whatsapp links for quick messaging and marketing. <br />
      <br />
      Using this tool you can message your customers without saving their contact info on your device. Not Indended for spamming, we dont support that.
      <br />
      <br />
     </div>
    ) : (
     <div>
      <textarea
       className={props.control[0][3] ? "md" : "sm"}
       onChange={() => {
        isCopy(false);
       }}
       ref={textAreaRef}
       defaultValue={props.control[0][2]}
      ></textarea>

      <div className="actionbar">
       {copystat && <span>Copied!</span>}
       <button onClick={copyToClipboard} className="btn primary">
        COPY !
       </button>
      </div>
     </div>
    )}
   </div>
  </div>
 );
};

export default Popup;

import CountryCodes from "./CountryCodes";
import {useState, useRef} from "react";
import {ReactComponent as Add} from "../Icons/plus.svg";
import {ReactComponent as Remove} from "../Icons/close.svg";
import {ReactComponent as Info} from "../Icons/info.svg";

// Generate Unique ID
const uidGen = () => {
 return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);
};

const MainUI = (props) => {
 const [toNumber, setToNumber] = useState(""); // Main Recipient (To)
 const [ccNumbers, setCCNumbers] = useState([]); // Others Recipients (CC)
 const [code, setCountryCode] = useState("+91"); // Default Country Code
 const [err, setError] = useState([false, false]); // Error format | (x,y) => x: MsgErr, y: NumberErr
 const [textareaValue, setTextareaValue] = useState("");

 const textFocus1 = useRef(null);
 const textFocus2 = useRef(null);

 // On Generate button
 const linkGen = () => {
  if (textareaValue === "") {
   setError([true, false]);
   textFocus1.current.focus();
  } else if (toNumber === "") {
   setError([false, true]);
   textFocus2.current.focus();
  } else {
   setError([false, false]);
   // API Format: https://api.whatsapp.com/send?phone=+1{number}&text={text}

   if (ccNumbers.length === 0) {
    props.control([true, "Output", "https://api.whatsapp.com/send?phone=" + code + toNumber + "&text=" + encodeURIComponent(textareaValue), false]);
   } else {
    var txt = "1) https://api.whatsapp.com/send?phone=" + code + toNumber + "&text=" + encodeURIComponent(textareaValue);
    for (let i = 0; i < ccNumbers.length; i++) {
     if (ccNumbers[i].number !== "") {
      txt += "\n\n" + (parseInt(i, 10) + 2) + ") https://api.whatsapp.com/send?phone=" + ccNumbers[i].code + ccNumbers[i].number + "&text=" + encodeURIComponent(textareaValue);
     }
    }
    props.control([true, "Output", txt, true]);
   }
  }
 };

 // Check Error
 const isError = () => {
  if (err[0]) {
   return (
    <div className="info_bar">
     <Info />
     Please Provide a message
    </div>
   );
  } else if (err[1]) {
   return (
    <div className="info_bar">
     <Info />
     Number cannot be empty
    </div>
   );
  } else {
   return null;
  }
 };

 return (
  <div className="container">
   <div className="msg_section">
    <h4>Message: </h4>
    <textarea
     ref={textFocus1}
     className={err[0] ? "i_err" : null}
     value={textareaValue}
     placeholder="Your Message "
     onChange={(e) => {
      setTextareaValue(e.target.value);
     }}
    ></textarea>
   </div>

   <div className="contacts_section">
    <h4>To:</h4>
    {/* Main Recipient (To)*/}
    <div className="Wrap">
     <CountryCodes apply={setCountryCode} defaultVal={code} />
     <label className="Nbox">
      <input
       type="number"
       value={toNumber}
       className={err[1] ? "i_err" : null}
       ref={textFocus2}
       onChange={(e) => {
        setToNumber(e.target.value);
       }}
       placeholder="&nbsp;"
      />
      <span className={err[1] ? "p_err placeholder" : "placeholder"}>Enter Number </span>
     </label>
     <Add
      onClick={() => {
       setCCNumbers([...ccNumbers, {code: code, id: uidGen(), number: ""}]);
      }}
     />
    </div>

    {/* Others Recipients (CC)*/}
    {ccNumbers.map((x, i) => (
     <div key={x.id} className="Wrap">
      <CountryCodes defaultVal={code} data={[i, ccNumbers, setCCNumbers]} />
      <label className="Nbox">
       <input
        type="number"
        onChange={(e) => {
         x.number = e.target.value;
         setCCNumbers([...ccNumbers]);
        }}
        placeholder="&nbsp;"
       />
       <span className="placeholder">Enter Number {i + 2}</span>
      </label>
      <Remove
       onClick={(e) => {
        setCCNumbers(ccNumbers.filter((item) => item.id !== x.id));
       }}
      />
     </div>
    ))}
   </div>

   <div className="actions_section">
    <div>{isError()}</div>
    <div className="btn_bar">
     <button onClick={linkGen} className="btn primary">
      GENERATE
     </button>
     <button
      onClick={() => {
       setTextareaValue("");
       setCCNumbers([]);
       setToNumber("");
      }}
      className="btn secondary"
     >
      RESET
     </button>
    </div>
   </div>
  </div>
 );
};
export default MainUI;

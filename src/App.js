import {useState} from "react";
import {ReactComponent as Help} from "./Icons/help.svg";
import Popup from "./Components/Popup";
import MainUI from "./Components/MainUI";

function App() {
 const [popup, showPopup] = useState([false, "", "", false]);
 // Data Format: showPopup(a,b,c,d) => a: Popup Visibity, b: Popup-Title, c: Popup-Content(""->Default msg), d: Popup-size(F->sm,T->md)

 return (
  <div>
   <header>
    <h3>Link Generator</h3>
    <Help
     onClick={() => {
      showPopup([true, "Help", "", false]);
     }}
    />
   </header>
   {popup[0] && <Popup control={[popup, showPopup]} />}
   <MainUI control={showPopup} />
  </div>
 );
}

export default App;

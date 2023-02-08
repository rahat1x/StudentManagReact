import React from 'react'
import "./Popup.css";
const Popup = (props) => {
    return (props.triger) ? (
        <div className='popupd'>
            <div className="popup-innerd">
                <button className="close-btnd" onClick={()=>props.setTriger(false)}>close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup
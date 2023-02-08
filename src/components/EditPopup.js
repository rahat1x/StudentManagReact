import React from 'react'
import "./EditPopup.css";
const EditPopup = (props) => {
    return (props.triger) ? (
        <div className='popup'>
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setTriger(false)}>close</button>
                <br />
                {props.children}
            </div>
        </div>
    ) : "";
}

export default EditPopup
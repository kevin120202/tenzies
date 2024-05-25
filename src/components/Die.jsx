import React from "react";

export default function Die(props) {
    return (
        <button
            className="die"
            style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }} onClick={() => props.onHold(props.id)}>
            {props.value}
        </button>
    )
}
import React from 'react'

function Record(props) {
    return (
        <>
            {props.record && <div className="record-info" onClick={props.handleRecord}>
                <h3>Personal Record👆(hide) </h3>
                <h3>⭐Rolls:  </h3>
                <h3>⭐Time: </h3>
            </div>}
        </>
    )
}
import React from 'react'

export default ( props ) => {
    return <label 
        htmlFor={props.name}
        className="form-label">
        {props.label}
    </label>;
};
import React from 'react'
import FieldLabel from '../FieldLabel'

export default ( props ) => {
    return <div className="form-group">
        <FieldLabel {...props } />
        <input
            className="form-input"
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder} 
        />
    </div>;
};
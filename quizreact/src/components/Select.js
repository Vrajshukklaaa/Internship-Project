import React from 'react'
import FieldLabel from './../FieldLabel';

export default ( props ) => {
    return <div className="form-group">
        <FieldLabel {...props } />
        <select
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            >
                <option value="" disabled>{props.placeholder}</option>
                { props.options.map(option => {
                    return <option
                        key={option}
                        value={option}
                        label={option}>{option}
                    </option>;
                    } )
                 }
        </select>
    </div>
}
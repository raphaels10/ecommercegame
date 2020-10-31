import React from 'react'


export default params => {

    return (
        <>
            <label htmlFor={params.id} className="sr-only">{params.label}</label>
            <input type={params.type} id={params.id} className={`form-control ${params.hidden ? "d-none": ""}`} placeholder={params.placeholder} 
            required autoFocus {...params.input} disabled={params.disabled}></input>
        </>
    )
}
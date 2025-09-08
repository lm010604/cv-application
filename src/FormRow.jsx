import React from "react";

function FormRow({ label, id, type = "text", value, onChange, required = false }) {
    return (
        <div className="form-row">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}

export default FormRow;

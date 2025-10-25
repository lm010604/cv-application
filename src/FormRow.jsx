import React from "react";

function FormRow({ label, id, type = "text", value, onChange, required = false, rows, placeholder }) {
    const isTextarea = type === "textarea";
    return (
        <div className={`form-row${isTextarea ? " textarea-row" : ""}`}>
            <label htmlFor={id}>{label}</label>
            {isTextarea ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={rows || 4}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}

export default FormRow;

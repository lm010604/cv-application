import React from "react";
import FormRow from "./FormRow";
import CustomButton from "./CustomButton";

function ExperienceForm({ fields, form, onChange, onSave, onCancel, error, children, rows }) {
    return (
        <form onSubmit={onSave}>
            {rows
                ? rows.map((row, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px' }}>
                        {row.map((fieldId,) => {
                            const field = fields.find(f => f.id === fieldId);
                            if (!field) return null;
                            // If field is 'dateFrom' or 'dateTo', align right
                            const isRight = fieldId === 'dateFrom' || fieldId === 'dateTo';
                            return (
                                <div key={field.id} style={{ flex: isRight ? '0 0 180px' : 1, display: 'flex', justifyContent: isRight ? 'flex-end' : 'flex-start' }}>
                                    <FormRow
                                        label={field.label}
                                        id={field.id}
                                        type={field.type}
                                        value={form[field.id]}
                                        onChange={onChange}
                                        required={field.required}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))
                : fields.map(({ label, id, type, required }) => (
                    <FormRow
                        key={id}
                        label={label}
                        id={id}
                        type={type}
                        value={form[id]}
                        onChange={onChange}
                        required={required}
                    />
                ))}
            {children}
            {error && (
                <div style={{ color: 'red', textAlign: 'center', margin: '12px 0' }}>{error}</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24, width: '100%' }}>
                <CustomButton text="Save" handleClick={onSave} />
                <CustomButton text="Cancel" handleClick={onCancel} />
            </div>
        </form>
    );
}

export default ExperienceForm;

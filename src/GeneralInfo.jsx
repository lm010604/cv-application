import { useState, useEffect, useMemo } from "react";
import CustomButton from "./CustomButton";

function GeneralInfo({ data, onChange }) {
    const defaultFormValues = useMemo(() => ({
        name: "Lauren Mok",
        email: "laurensymok@gmail.com",
        phone: "607-339-1653",
        linkedIn: "linkedin.com/in/laurensymok",
        website: "laurensymok.com",
    }), []);

    const [form, setForm] = useState({
        ...defaultFormValues,
        ...data,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setForm({
            ...defaultFormValues,
            ...data,
        });
    }, [data, defaultFormValues]);

    useEffect(() => {
        onChange(form);
    }, [form, onChange]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
    }

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        // Reset to last saved version from props
        setForm({
            ...defaultFormValues,
            ...data,
        });
        setIsEditing(false);
    };

    return (
        <section className="general-info">
            {!isEditing ? (
                <>
                    <section className="general-info-header">
                        <h1 className="print-name">{form.name}</h1>
                        <div className="contact-info">
                            <p>{form.email}</p>
                            <p>|</p>
                            <p>{form.phone}</p>
                            {form.linkedIn !== "" && (
                                <>
                                    <p>|</p>
                                    <p>{form.linkedIn}</p>
                                </>
                            )}
                            {form.website !== "" && (
                                <>
                                    <p>|</p>
                                    <p>{form.website}</p>
                                </>
                            )}

                        </div>
                    </section>

                </>
            ) : (
                <form onSubmit={handleSave}>
                    <div className="form-row">
                        <label htmlFor="name">Name: <span className="required-asterisk">*</span></label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">Email: <span className="required-asterisk">*</span></label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="phone">Phone Number: <span className="required-asterisk">*</span></label>
                        <input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="linkedIn">LinkedIn:</label>
                        <input
                            id="linkedIn"
                            type="text"
                            value={form.linkedIn}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="website">Website:</label>
                        <input
                            id="website"
                            type="text"
                            value={form.website}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24, width: '100%' }}>
                        <button type="submit" className="custom-btn">Save</button>
                        <CustomButton text="Cancel" handleClick={handleCancel} />

                    </div>
                </form>
            )}
            {/* Button at bottom left, aligned with section items */}
            {!isEditing && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <CustomButton handleClick={handleEdit} text="Edit Personal Info" />
                </div>
            )}
        </section>
    );
}

export default GeneralInfo;
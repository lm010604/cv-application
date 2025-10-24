import { useState } from "react";
import CustomButton from "./CustomButton";

function GeneralInfo(props) {
    const [form, setForm] = useState({
        name: props.name || "Lauren Mok",
        email: props.email || "laurensymok@gmail.com",
        phone: props.phone || "607-339-1653",
        linkedIn: props.linkedIn || "linkedin.com/in/laurensymok",
        website: props.website || "laurensymok.com"
    });
    const [isEditing, setIsEditing] = useState(false);

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
    const handleCancel = () => setIsEditing(false);

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
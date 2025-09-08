import { useState } from "react";
import CustomButton from "./CustomButton";

function GeneralInfo(props) {
    const [form, setForm] = useState({
        name: props.name || "Lauren Mok",
        email: props.email || "laurensymok@gmail.com",
        phone: props.phone || "607-339-1653",
        linkedIn: props.linkedIn || "linkedin.com/in/laurensymok",
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
        <section>
            {!isEditing ? (
                <>
                    <section style={{ marginBottom: 0 }}>
                        <h1>{form.name}</h1>
                        <div style={{ display: "flex", flexDirection: "row", gap: 16, justifyContent: "center" }}>
                            <p>{form.email}</p>
                            <p> | </p>
                            <p>{form.phone}</p>
                            <p> | </p>
                            <p>{form.linkedIn}</p>
                        </div>
                    </section>
                </>
            ) : (
                <form onSubmit={handleSave}>
                    <div className="form-row">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
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
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24, width: '100%' }}>
                        <CustomButton text="Save" handleClick={handleSave} />
                        <CustomButton text="Cancel" handleClick={handleCancel} />
                    </div>
                </form>
            )}
            {/* Button at bottom left, aligned with section items */}
            {!isEditing && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <CustomButton handleClick={handleEdit} text="Edit Personal Info" style={{ margin: 0, padding: 0 }} />
                </div>
            )}
        </section>
    );
}

export default GeneralInfo;
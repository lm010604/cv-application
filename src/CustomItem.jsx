import { useState } from "react";
import CustomButton from "./CustomButton";

function CustomItem({ onDelete }) {
    const [form, setForm] = useState({ title: "", description: "" });
    const [isEditing, setIsEditing] = useState(true);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return; // Require a title
        setIsEditing(false);
    };

    return (
        <div className="custom-item">
            {isEditing ? (
                <form onSubmit={handleSave}>
                    <div className="form-row">
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Project Title"
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            rows="2"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe this entry..."
                        />
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        <CustomButton text="Save" type="submit" />
                        <CustomButton text="Cancel" handleClick={onDelete} />
                    </div>
                </form>
            ) : (
                <div style={{ marginBottom: "8px" }}>
                    <strong>{form.title}</strong>
                    <p style={{ margin: "4px 0" }}>{form.description}</p>
                    <div style={{ display: "flex", gap: 8 }}>
                        <CustomButton text="Edit" handleClick={() => setIsEditing(true)} />
                        <CustomButton text="Delete" handleClick={onDelete} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomItem;

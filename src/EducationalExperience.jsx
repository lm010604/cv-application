import { useState } from "react";
import CustomButton from "./CustomButton";

function EducationalExperience() {
    const [experiences, setExperiences] = useState([
        {
            schoolName: "Cornell University, College of Arts and Sciences",
            titleOfStudy: "Bachelor of Arts, Computer Science",
            dateOfStudy: "2022 - 2026",
        },
    ]);
    const [form, setForm] = useState({
        schoolName: "",
        titleOfStudy: "",
        dateOfStudy: "",
    });
    const [isAdding, setIsAdding] = useState(false);
    const [editIdx, setEditIdx] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((f) => ({ ...f, [id]: value }));
    };

    const handleAdd = () => {
        setForm({ schoolName: "", titleOfStudy: "", dateOfStudy: "" });
        setIsAdding(true);
        setEditIdx(null);
    };

    const handleEdit = (idx) => {
        setForm({ ...experiences[idx] });
        setEditIdx(idx);
        setIsAdding(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editIdx !== null) {
            // Update existing experience
            setExperiences((prev) => prev.map((exp, idx) => idx === editIdx ? form : exp));
        } else {
            // Add new experience
            setExperiences((prev) => [...prev, form]);
        }
        setForm({ schoolName: "", titleOfStudy: "", dateOfStudy: "" });
        setIsAdding(false);
        setEditIdx(null);
    };

    const handleCancel = () => {
        setForm({ schoolName: "", titleOfStudy: "", dateOfStudy: "" });
        setIsAdding(false);
        setEditIdx(null);
    };

    return (
        <section>
            <p>EDUCATION</p>
            <hr />
            {/* List all experiences */}
            {experiences.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "1rem" }}>
                    <div className="same-row" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <p style={{ marginBottom: 0, marginTop: 0 }}><strong>{exp.schoolName}</strong></p>
                        <CustomButton isIcon isEditIcon handleClick={() => handleEdit(idx)} />
                        <p style={{ marginTop: 0, marginLeft: "auto" }}>{exp.dateOfStudy}</p>
                    </div>
                    <p style={{ marginTop: 0 }}>{exp.titleOfStudy}</p>
                    {editIdx === idx && (
                        <form onSubmit={handleSave} style={{ marginTop: "1rem" }}>
                            <div className="form-row">
                                <label htmlFor="schoolName">School Name:</label>
                                <input
                                    id="schoolName"
                                    type="text"
                                    value={form.schoolName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="titleOfStudy">Title of Study:</label>
                                <input
                                    id="titleOfStudy"
                                    type="text"
                                    value={form.titleOfStudy}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="dateOfStudy">Date of Study:</label>
                                <input
                                    id="dateOfStudy"
                                    type="text"
                                    value={form.dateOfStudy}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                <CustomButton text="Save" handleClick={handleSave} />
                                <CustomButton text="Cancel" handleClick={handleCancel} />
                            </div>
                        </form>
                    )}
                </div>
            ))}
            {/* Add experience form at the bottom */}
            {isAdding ? (
                <form onSubmit={handleSave}>
                    <div className="form-row">
                        <label htmlFor="schoolName">School Name:</label>
                        <input
                            id="schoolName"
                            type="text"
                            value={form.schoolName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="titleOfStudy">Title of Study:</label>
                        <input
                            id="titleOfStudy"
                            type="text"
                            value={form.titleOfStudy}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="dateOfStudy">Date of Study:</label>
                        <input
                            id="dateOfStudy"
                            type="text"
                            value={form.dateOfStudy}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <CustomButton text="Save" handleClick={handleSave} />
                        <CustomButton text="Cancel" handleClick={handleCancel} />
                    </div>
                </form>
            ) : (
                <CustomButton handleClick={handleAdd} text="Add Educational Experience" />
            )}
        </section>
    );
}

export default EducationalExperience;

import { useState } from "react";
import CustomButton from "./CustomButton";

function FormFields({ form, handleChange }) {
    return (
        <>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div className="form-row" style={{ flex: 2 }}>
                    <label htmlFor="schoolName">School Name:</label>
                    <input
                        id="schoolName"
                        type="text"
                        value={form.schoolName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row" style={{ flex: 1 }}>
                    <label htmlFor="dateFrom">Date From:</label>
                    <input
                        id="dateFrom"
                        type="text"
                        value={form.dateFrom}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div className="form-row" style={{ flex: 2 }}>
                    <label htmlFor="titleOfStudy">Title of Study:</label>
                    <input
                        id="titleOfStudy"
                        type="text"
                        value={form.titleOfStudy}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row" style={{ flex: 1 }}>
                    <label htmlFor="dateTo">Date To:</label>
                    <input
                        id="dateTo"
                        type="text"
                        value={form.dateTo}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        </>
    );
}

function EducationalExperience() {
    const [experiences, setExperiences] = useState([
        {
            schoolName: "Cornell University, College of Arts and Sciences",
            titleOfStudy: "Bachelor of Arts, Computer Science",
            dateFrom: "2022",
            dateTo: "2026",
        },
    ]);
    const [form, setForm] = useState({
        schoolName: "",
        titleOfStudy: "",
        dateFrom: "",
        dateTo: "",
    });
    const [error, setError] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editIdx, setEditIdx] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((f) => ({ ...f, [id]: value }));
    };

    const handleAdd = () => {
        setForm({ schoolName: "", titleOfStudy: "", dateFrom: "", dateTo: "" });
        setIsAdding(true);
        setEditIdx(null);
        setError("");
    };

    const handleEdit = (idx) => {
        setForm({ ...experiences[idx] });
        setEditIdx(idx);
        setIsAdding(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Validation: check all fields
        const requiredFields = ["schoolName", "titleOfStudy", "dateFrom", "dateTo"];
        const hasBlank = requiredFields.some((field) => !form[field].trim());
        if (hasBlank) {
            setError("Please fill out all fields before saving.");
            return;
        }
        setError("");
        if (editIdx !== null) {
            // Update existing experience
            setExperiences((prev) => prev.map((exp, idx) => idx === editIdx ? form : exp));
        } else {
            // Add new experience
            setExperiences((prev) => [...prev, form]);
        }
        setForm({ schoolName: "", titleOfStudy: "", dateFrom: "", dateTo: "" });
        setIsAdding(false);
        setEditIdx(null);
    };

    const handleCancel = () => {
        setForm({ schoolName: "", titleOfStudy: "", dateFrom: "", dateTo: "" });
        setIsAdding(false);
        setEditIdx(null);
        setError("");
    };

    const handleDelete = (idx) => {
        setExperiences((prev) => prev.filter((_, i) => i !== idx));
        // If deleting the currently edited experience, close the form
        if (editIdx === idx) {
            setEditIdx(null);
            setIsAdding(false);
            setForm({ schoolName: "", titleOfStudy: "", dateFrom: "", dateTo: "" });
        }
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
                        <CustomButton isIcon isDeleteIcon handleClick={() => handleDelete(idx)} />
                        <p style={{ marginTop: 0, marginLeft: "auto" }}>{exp.dateFrom} - {exp.dateTo}</p>
                    </div>
                    <p style={{ marginTop: 0 }}>{exp.titleOfStudy}</p>
                    {editIdx === idx && (
                        <form onSubmit={handleSave}>
                            <FormFields form={form} handleChange={handleChange} />
                            {error && (
                                <div style={{ color: 'red', textAlign: 'center', margin: '12px 0' }}>{error}</div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24, width: '100%' }}>
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
                    <FormFields form={form} handleChange={handleChange} />
                    {error && (
                        <div style={{ color: 'red', textAlign: 'center', margin: '12px 0' }}>{error}</div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24, width: '100%' }}>
                        <CustomButton text="Save" handleClick={handleSave} />
                        <CustomButton text="Cancel" handleClick={handleCancel} />
                    </div>
                </form>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <CustomButton handleClick={handleAdd} text="Add Educational Experience" />
                </div>
            )}
        </section>
    );
}

export default EducationalExperience;

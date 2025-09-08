import { useState } from "react";
import CustomButton from "./CustomButton";

function WorkExperience() {
    const [experiences, setExperiences] = useState([
        {
            companyName: "Tech Corp",
            positionTitle: "Software Engineer",
            mainTasks: "Developed web applications",
            dateFrom: "2023",
            dateTo: "Present",
        }
    ])
    const [form, setForm] = useState({
        companyName: "",
        positionTitle: "",
        mainTasks: "",
        dateFrom: "",
        dateTo: "",
    });
    const [isAdding, setIsAdding] = useState(false);
    const [editIdx, setEditIdx] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((f) => ({ ...f, [id]: value }));
    };

    const handleAdd = () => {
        setForm({ companyName: "", positionTitle: "", mainTasks: "", dateFrom: "", dateTo: "" });
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
        setForm({ companyName: "", positionTitle: "", mainTasks: "", dateFrom: "", dateTo: "" });
        setIsAdding(false);
        setEditIdx(null);
    };

    const handleCancel = () => {
        setForm({ schoolName: "", positionTitle: "", mainTa: "" });
        setIsAdding(false);
        setEditIdx(null);
    };

    return (
        <section>
            <p>WORK EXPERIENCE</p>
            <hr />
            {/* List all experiences */}
            {experiences.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "1rem" }}>
                    <div className="same-row" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <p style={{ marginBottom: 0, marginTop: 0 }}><strong>{exp.companyName} | {exp.positionTitle} </strong></p>
                        <CustomButton isIcon isEditIcon handleClick={() => handleEdit(idx)} />
                        <p style={{ marginTop: 0, marginLeft: "auto" }}>{exp.dateFrom} - {exp.dateTo}</p>
                    </div>
                    <p style={{ marginTop: 0 }}>{exp.mainTasks}</p>
                    {editIdx === idx && (
                        <form onSubmit={handleSave} style={{ marginTop: "1rem" }}>
                            <div className="same-row" style={{ display: "flex", gap: "16px" }}>
                                <div className="form-row" style={{ flex: 1 }}>
                                    <label htmlFor="companyName">Company Name:</label>
                                    <input
                                        id="companyName"
                                        type="text"
                                        value={form.companyName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-row" style={{ flex: 1 }}>
                                    <label htmlFor="dateFrom">Date From:</label>
                                    <input
                                        id="dateFrom"
                                        type="text"
                                        value={form.dateFrom}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="same-row" style={{ display: "flex", gap: "16px" }}>
                                <div className="form-row" style={{ flex: 1 }}>
                                    <label htmlFor="positionTitle">Position Title:</label>
                                    <input
                                        id="positionTitle"
                                        type="text"
                                        value={form.positionTitle}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-row" style={{ flex: 1 }}>
                                    <label htmlFor="dateTo">Date To:</label>
                                    <input
                                        id="dateTo"
                                        type="text"
                                        value={form.dateTo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row" style={{ width: "100%" }}>
                                <label htmlFor="mainTasks">Main Tasks:</label>
                                <textarea
                                    id="mainTasks"
                                    rows={4}
                                    value={form.mainTasks}
                                    onChange={handleChange}
                                    className="main-tasks-textarea"
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
                        <label htmlFor="companyName">Company Name:</label>
                        <input
                            id="companyName"
                            type="text"
                            value={form.companyName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="positionTitle">Position Title:</label>
                        <input
                            id="positionTitle"
                            type="text"
                            value={form.positionTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="mainTasks">Main Tasks:</label>
                        <textarea
                            id="mainTasks"
                            rows={4}
                            value={form.mainTasks}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="dateFrom">Date From:</label>
                        <input
                            id="dateFrom"
                            type="text"
                            value={form.dateFrom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="dateTo">Date To:</label>
                        <input
                            id="dateTo"
                            type="text"
                            value={form.dateTo}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <CustomButton text="Save" handleClick={handleSave} />
                        <CustomButton text="Cancel" handleClick={handleCancel} />
                    </div>
                </form>
            ) : (
                <CustomButton handleClick={handleAdd} text="Add Work Experience" />
            )}
        </section>
    );
}

export default WorkExperience;

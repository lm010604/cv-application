import { useState } from "react";
import CustomButton from "./CustomButton";

function WorkFormFields({ form, handleChange }) {
    return (
        <>
            <div className="same-row" style={{ display: "flex", gap: "16px" }}>
                <div className="form-row" style={{ flex: 2 }}>
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        id="companyName"
                        type="text"
                        value={form.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', gap: '16px' }}>
                    <div className="form-row" style={{ minWidth: '140px' }}>
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
            </div>
            <div className="same-row" style={{ display: "flex", gap: "16px" }}>
                <div className="form-row" style={{ flex: 2 }}>
                    <label htmlFor="positionTitle">Position Title:</label>
                    <input
                        id="positionTitle"
                        type="text"
                        value={form.positionTitle}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', gap: '16px' }}>
                    <div className="form-row" style={{ minWidth: '140px' }}>
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
            </div>
            <div className="form-row" style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <label htmlFor="mainTasks" style={{ alignSelf: 'flex-start', marginTop: '4px', minWidth: '120px', marginRight: '8px' }}>Main Tasks:</label>
                <textarea
                    id="mainTasks"
                    rows={4}
                    value={form.mainTasks}
                    onChange={handleChange}
                    className="main-tasks-textarea"
                    style={{ flex: 1 }}
                    required
                    onKeyDown={e => {
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            const { selectionStart, selectionEnd, value } = e.target;
                            const newValue = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);
                            handleChange({
                                target: {
                                    id: 'mainTasks',
                                    value: newValue
                                }
                            });
                            // Move cursor after tab
                            setTimeout(() => {
                                e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
                            }, 0);
                        }
                    }}
                />
            </div>
        </>
    );
}

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
        setError("");
    };

    const handleEdit = (idx) => {
        setForm({ ...experiences[idx] });
        setEditIdx(idx);
        setIsAdding(false);
    };

    const [error, setError] = useState("");
    const handleSave = (e) => {
        e.preventDefault();
        // Validation: check all fields
        const requiredFields = ["companyName", "positionTitle", "mainTasks", "dateFrom", "dateTo"];
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
        setForm({ companyName: "", positionTitle: "", mainTasks: "", dateFrom: "", dateTo: "" });
        setIsAdding(false);
        setEditIdx(null);
    };

    const handleCancel = () => {
        setForm({ companyName: "", positionTitle: "", mainTasks: "", dateFrom: "", dateTo: "" });
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
            <p>WORK EXPERIENCE</p>
            <hr />
            {/* error message now only inside the form */}
            {/* List all experiences */}
            {experiences.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "1rem" }}>
                    <div className="same-row" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <p style={{ marginBottom: 0, marginTop: 0 }}><strong>{exp.companyName} | {exp.positionTitle} </strong></p>
                        <CustomButton isIcon isEditIcon handleClick={() => handleEdit(idx)} />
                        <CustomButton isIcon isDeleteIcon handleClick={() => handleDelete(idx)} />
                        <p style={{ marginTop: 0, marginLeft: "auto" }}>{exp.dateFrom} - {exp.dateTo}</p>
                    </div>
                    <p style={{ marginTop: 0, whiteSpace: 'pre-wrap' }}>{exp.mainTasks.replace(/\t/g, '\n')}</p>
                    {editIdx === idx && (
                        <form onSubmit={handleSave} style={{ marginTop: "1rem" }}>
                            <WorkFormFields form={form} handleChange={handleChange} />
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
                    <WorkFormFields form={form} handleChange={handleChange} />
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
                    <CustomButton handleClick={handleAdd} text="Add Work Experience" />
                </div>
            )}
        </section>
    );
}

export default WorkExperience;

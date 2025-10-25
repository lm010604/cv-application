import React, { useState, useEffect } from "react";
import ExperienceItem from "./ExperienceItem";
import ExperienceForm from "./ExperienceForm";
import CustomButton from "./CustomButton";

function ExperienceSection({
    title,
    fields,
    initialItems = [],
    getMainText,
    getSubText,
    getDateText,
    extraFormFields, // for textarea or other custom fields
    formRows,
    renderExtraContent,
}) {
    const [items, setItems] = useState(Array.isArray(initialItems) ? initialItems : []);
    const [form, setForm] = useState(fields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {}));
    const [error, setError] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editIdx, setEditIdx] = useState(null);

    useEffect(() => {
        if (Array.isArray(initialItems)) {
            setItems(initialItems);
        }
    }, [initialItems]);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((f) => ({ ...f, [id]: value }));
    };

    const handleAdd = () => {
        setForm(fields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {}));
        setIsAdding(true);
        setEditIdx(null);
        setError("");
    };

    const handleEdit = (idx) => {
        setForm({ ...items[idx] });
        setEditIdx(idx);
        setIsAdding(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const requiredFields = fields.filter(f => f.required).map(f => f.id);
        const hasBlank = requiredFields.some((field) => !form[field]?.trim());
        if (hasBlank) {
            setError("Please fill out all fields before saving.");
            return;
        }
        setError("");
        if (editIdx !== null) {
            setItems((prev) => prev.map((exp, idx) => idx === editIdx ? form : exp));
        } else {
            setItems((prev) => [...prev, form]);
        }
        setForm(fields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {}));
        setIsAdding(false);
        setEditIdx(null);
    };

    const handleCancel = () => {
        setForm(fields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {}));
        setIsAdding(false);
        setEditIdx(null);
        setError("");
    };

    const handleDelete = (idx) => {
        setItems((prev) => prev.filter((_, i) => i !== idx));
        if (editIdx === idx) {
            setEditIdx(null);
            setIsAdding(false);
            setForm(fields.reduce((acc, f) => ({ ...acc, [f.id]: "" }), {}));
        }
    };

    const getAddButtonText = (title) => {
        if (!title) return "Add Item";
        const normalized = title.trim().toLowerCase();
        const map = {
            education: "Add Education",
            work: "Add Work Experience",
            experience: "Add Experience",
            project: "Add Project",
            award: "Add Award",
            publication: "Add Publication",
            skill: "Add Skill",
        };

        for (const key in map) {
            if (normalized.includes(key)) return map[key];
        }

        const firstWord = title.split(" ")[0];
        return `Add ${firstWord}`;
    };

    const addButtonText = getAddButtonText(title);


    return (
        <section>
            <p>{title}</p>
            <hr />
            {items.map((item, idx) => (
                <ExperienceItem
                    key={idx}
                    mainText={getMainText(item)}
                    subText={getSubText(item)}
                    dateText={getDateText(item)}
                    onEdit={() => handleEdit(idx)}
                    onDelete={() => handleDelete(idx)}
                >
                    {renderExtraContent && editIdx !== idx && renderExtraContent(item)}
                    {editIdx === idx && (
                        <ExperienceForm
                            fields={fields}
                            form={form}
                            onChange={handleChange}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            error={error}
                            rows={formRows}
                        >
                            {extraFormFields && extraFormFields(form, handleChange)}
                        </ExperienceForm>
                    )}
                </ExperienceItem>
            ))}
            {isAdding ? (
                <ExperienceForm
                    fields={fields}
                    form={form}
                    onChange={handleChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    error={error}
                    rows={formRows}
                >
                    {extraFormFields && extraFormFields(form, handleChange)}
                </ExperienceForm>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <CustomButton handleClick={handleAdd} text={addButtonText} />
                </div>
            )}
        </section>
    );
}

export default ExperienceSection;

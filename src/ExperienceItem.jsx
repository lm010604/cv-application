import React from "react";
import CustomButton from "./CustomButton";

function ExperienceItem({
    mainText,
    subText,
    dateText,
    onEdit,
    onDelete,
    children
}) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <div className="same-row" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <p style={{ marginBottom: 0, marginTop: 0 }}><strong>{mainText}</strong></p>
                <CustomButton isIcon isEditIcon handleClick={onEdit} />
                <CustomButton isIcon isDeleteIcon handleClick={onDelete} />
                <p style={{ marginTop: 0, marginLeft: "auto" }}>{dateText}</p>
            </div>
            {subText && <p style={{ marginTop: 0 }}>{subText}</p>}
            {children}
        </div>
    );
}

export default ExperienceItem;

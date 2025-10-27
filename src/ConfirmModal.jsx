import React from "react";

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null; // Don’t render if not visible

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "24px 32px",
                    borderRadius: "8px",
                    width: "340px",
                    textAlign: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <h3 style={{ marginTop: 0 }}>{title || "Confirm"}</h3>
                <p style={{ whiteSpace: "pre-wrap", marginBottom: "20px" }}>{message}</p>

                <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                    <button
                        onClick={onConfirm}
                        style={{
                            backgroundColor: "#c0392b",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        Delete
                    </button>
                    <button
                        onClick={onCancel}
                        style={{
                            backgroundColor: "#bdc3c7",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;

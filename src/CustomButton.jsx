import editUrl from "./assets/edit.svg"
import deleteUrl from "./assets/delete.svg"

function CustomButton({
    text,
    handleClick,
    isEditIcon,
    isDeleteIcon,
    type,
    style
}) {
    const btnClass = isEditIcon ? "edit-icon-btn" : (isDeleteIcon ? "delete-icon-btn" : "custom-btn")
    const buttonType = type || (isEditIcon || isDeleteIcon ? "button" : "submit")

    return (
        <button className={btnClass} onClick={handleClick} type={buttonType} style={style}>
            {isEditIcon ? (
                <img src={editUrl} alt="Edit" style={{ width: 15, height: 15, verticalAlign: "middle" }} />
            ) : isDeleteIcon ? (
                <img src={deleteUrl} alt="Delete" style={{ width: 15, height: 15, verticalAlign: "middle" }} />
            ) : text}
        </button>
    )
}

export default CustomButton

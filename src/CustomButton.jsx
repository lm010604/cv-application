import editUrl from "/edit.svg";
import deleteUrl from "/delete.svg";


function CustomButton(props) {
    const btnClass = props.isEditIcon ? "edit-icon-btn" : (props.isDeleteIcon ? "delete-icon-btn" : "custom-btn");
    return (
        <button className={btnClass} onClick={props.handleClick}>
            {props.isEditIcon ? (
                <img src={editUrl} alt="Edit" style={{ width: 15, height: 15, verticalAlign: "middle" }} />
            ) : props.isDeleteIcon ? (
                <img src={deleteUrl} alt="Delete" style={{ width: 15, height: 15, verticalAlign: "middle" }} />
            ) : props.text}
        </button>
    )
}

export default CustomButton

function CustomButton(props) {
    const btnClass = props.isEditIcon ? "edit-icon-btn" : "custom-btn";
    return (
        <button className={btnClass} onClick={props.handleClick}>
            {props.isIcon ? (
                <img src="/edit.svg" alt="Edit" style={{ width: 20, height: 20, verticalAlign: "middle" }} />
            ) : props.text}
        </button>
    )
}

export default CustomButton
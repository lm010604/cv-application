
function CustomButton(props) {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

export default CustomButton